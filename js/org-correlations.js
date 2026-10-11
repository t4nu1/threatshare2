/* Correlations. */
(function () {
  "use strict";

  // TODO(api): fetch correlation results into #correlations-table.
  // TODO(api): fetch cross-organization correlation summary into #cross-org-table.
  // TODO(api): fetch matching indicators into #matching-table.
  // TODO(api): fetch indicator relationships into #relationships-table.

  var placeholder = {
    "COR-1093": { indicator: "login-verify.example.net", orgs: "Northwind Energy, Org B, Org C", confidence: "92%", method: "Exact indicator match", detected: "2026-10-10 09:05 UTC" },
    "COR-1088": { indicator: "203.0.113.42", orgs: "Northwind Energy, Org D", confidence: "78%", method: "Exact indicator match", detected: "2026-10-09 17:40 UTC" },
    "COR-1081": { indicator: "e3b0c442...b855", orgs: "Northwind Energy, Org B, Org E, Org F", confidence: "96%", method: "File hash match", detected: "2026-10-06 12:18 UTC" },
    "COR-1074": { indicator: "198.51.100.17", orgs: "Northwind Energy, Org C", confidence: "54%", method: "Network infrastructure overlap", detected: "2026-09-29 08:02 UTC" }
  };

  var container = document.getElementById("correlation-details");

  function render(id) {
    // TODO(api): fetch full correlation details for the selected ID.
    var item = placeholder[id];
    if (!item) return;
    var rows = [
      ["Correlation", id],
      ["Matching indicator", item.indicator],
      ["Organizations", item.orgs],
      ["Confidence", item.confidence],
      ["Method", item.method],
      ["Detected", item.detected]
    ];
    var list = document.createElement("dl");
    list.className = "meta-list";
    rows.forEach(function (row) {
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = row[0];
      dd.textContent = row[1];
      list.appendChild(dt);
      list.appendChild(dd);
    });
    container.innerHTML = "";
    container.appendChild(list);
    document.getElementById("correlation-details-card").scrollIntoView({ block: "nearest" });
  }

  document.querySelectorAll("[data-correlation]").forEach(function (button) {
    button.addEventListener("click", function () {
      render(button.getAttribute("data-correlation"));
    });
  });
})();
