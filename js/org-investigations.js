/* Investigations. */
(function () {
  "use strict";

  var toggle = document.getElementById("new-investigation-toggle");
  var form = document.getElementById("new-investigation");
  var cancel = document.getElementById("new-investigation-cancel");

  function setFormOpen(open) {
    form.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) document.getElementById("inv-title").focus();
  }

  toggle.addEventListener("click", function () {
    setFormOpen(form.hidden);
  });
  cancel.addEventListener("click", function () {
    setFormOpen(false);
    toggle.focus();
  });

  if (window.location.hash === "#new-investigation") setFormOpen(true);

  // TODO(api): fetch investigations into #investigations-table.

  TS.handleSubmit(form, function (data) {
    // TODO(api): POST new investigation and refresh the investigations table.
    TS.setStatus(form, "Placeholder: investigation was not created. Backend not connected.");
  });

  document.querySelectorAll("[data-investigation]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest("tr");
      // TODO(api): fetch investigation detail (related threats, organizations, evidence, correlations).
      document.getElementById("inv-detail-title").textContent =
        row.cells[0].textContent + " \u00b7 " + row.cells[1].textContent;
      document.getElementById("inv-status").value = row.cells[2].textContent.trim();
      document.getElementById("investigation-detail").scrollIntoView({ block: "start" });
    });
  });

  document.getElementById("inv-status").addEventListener("change", function () {
    // TODO(api): PATCH investigation status.
  });
})();
