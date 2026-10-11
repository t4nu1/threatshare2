/* Shared behaviour: nav highlight, sidebar toggle, table helpers, tabs, form placeholders. */
(function () {
  "use strict";

  var TS = (window.TS = {});

  var SEVERITY_ORDER = { low: 1, medium: 2, high: 3, critical: 4 };

  function currentFile() {
    var file = window.location.pathname.split("/").pop();
    return file || "index.html";
  }

  TS.highlightNav = function () {
    var file = currentFile();
    document.querySelectorAll(".site-nav a, .sidebar__nav a").forEach(function (link) {
      var target = (link.getAttribute("href") || "").split("#")[0].split("/").pop();
      if (target === file) {
        link.setAttribute("aria-current", "page");
      }
    });
  };

  TS.initSidebar = function () {
    var portal = document.querySelector(".portal");
    var toggle = document.querySelector(".sidebar-toggle");
    var backdrop = document.querySelector(".sidebar-backdrop");
    if (!portal || !toggle) return;

    function setOpen(open) {
      portal.classList.toggle("is-sidebar-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (backdrop) backdrop.hidden = !open;
    }

    toggle.addEventListener("click", function () {
      setOpen(!portal.classList.contains("is-sidebar-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setOpen(false);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && portal.classList.contains("is-sidebar-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  };

  /* ---------- Table helpers ---------- */

  function cellValue(row, index) {
    var cell = row.cells[index];
    if (!cell) return "";
    return (cell.getAttribute("data-value") || cell.textContent).trim();
  }

  function compare(a, b, type) {
    if (type === "number") return parseFloat(a) - parseFloat(b);
    if (type === "date") return new Date(a) - new Date(b);
    if (type === "severity") {
      return (SEVERITY_ORDER[a.toLowerCase()] || 0) - (SEVERITY_ORDER[b.toLowerCase()] || 0);
    }
    return a.localeCompare(b, undefined, { sensitivity: "base", numeric: true });
  }

  TS.sortTable = function (table, columnIndex, type, direction) {
    var body = table.tBodies[0];
    var rows = Array.prototype.slice.call(body.rows);
    rows.sort(function (a, b) {
      var result = compare(cellValue(a, columnIndex), cellValue(b, columnIndex), type);
      return direction === "descending" ? -result : result;
    });
    rows.forEach(function (row) {
      body.appendChild(row);
    });
  };

  TS.initSortableTables = function (root) {
    (root || document).querySelectorAll("table[data-sortable]").forEach(function (table) {
      var headers = table.querySelectorAll("thead th[data-sort]");
      headers.forEach(function (th) {
        if (th.querySelector("button")) return;
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = th.textContent;
        th.textContent = "";
        th.appendChild(button);
        th.setAttribute("aria-sort", "none");

        button.addEventListener("click", function () {
          var next = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
          headers.forEach(function (other) {
            other.setAttribute("aria-sort", "none");
          });
          th.setAttribute("aria-sort", next);
          TS.sortTable(table, th.cellIndex, th.getAttribute("data-sort"), next);
        });
      });
    });
  };

  TS.applyTableFilters = function (table) {
    var controls = document.querySelectorAll('[data-filter-table="' + table.id + '"]');
    var visible = 0;

    Array.prototype.forEach.call(table.tBodies[0].rows, function (row) {
      var show = true;
      controls.forEach(function (control) {
        var value = control.value.trim().toLowerCase();
        if (!value) return;
        var column = control.getAttribute("data-filter-col");
        if (column === null) {
          if (row.textContent.toLowerCase().indexOf(value) === -1) show = false;
        } else if (cellValue(row, parseInt(column, 10)).toLowerCase() !== value) {
          show = false;
        }
      });
      row.hidden = !show;
      if (show) visible += 1;
    });

    var empty = document.querySelector('[data-empty-for="' + table.id + '"]');
    if (empty) empty.hidden = visible !== 0;
  };

  TS.initTableFilters = function (root) {
    (root || document).querySelectorAll("[data-filter-table]").forEach(function (control) {
      var table = document.getElementById(control.getAttribute("data-filter-table"));
      if (!table) return;
      var eventName = control.tagName === "SELECT" ? "change" : "input";
      control.addEventListener(eventName, function () {
        TS.applyTableFilters(table);
      });
    });
  };

  /* ---------- Tabs ---------- */

  TS.selectTab = function (tab, moveFocus) {
    var list = tab.closest('[role="tablist"]');
    list.querySelectorAll('[role="tab"]').forEach(function (other) {
      var selected = other === tab;
      other.setAttribute("aria-selected", String(selected));
      other.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(other.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    });
    if (moveFocus) tab.focus();
  };

  TS.initTabs = function (root) {
    (root || document).querySelectorAll('[role="tablist"]').forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          TS.selectTab(tab, false);
        });
        tab.addEventListener("keydown", function (event) {
          var next = null;
          if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
          if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
          if (event.key === "Home") next = tabs[0];
          if (event.key === "End") next = tabs[tabs.length - 1];
          if (next) {
            event.preventDefault();
            TS.selectTab(next, true);
          }
        });
      });

      var hash = window.location.hash.slice(1);
      var fromHash = hash && tabs.filter(function (tab) {
        return tab.getAttribute("aria-controls") === hash;
      })[0];
      TS.selectTab(fromHash || tabs[0], false);
    });
  };

  /* ---------- Forms ---------- */

  TS.setStatus = function (form, message) {
    var status = form.querySelector(".form-status");
    if (status) status.textContent = message;
  };

  TS.handleSubmit = function (form, onSubmit) {
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      onSubmit(new FormData(form), form);
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    TS.highlightNav();
    TS.initSidebar();
    TS.initSortableTables();
    TS.initTableFilters();
    TS.initTabs();
  });
})();
