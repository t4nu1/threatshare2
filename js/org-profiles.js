/* Threat activity profiles. */
(function () {
  "use strict";

  // TODO(api): fetch threat activity profiles into #profiles-table.

  document.querySelectorAll("[data-profile]").forEach(function (button) {
    button.addEventListener("click", function () {
      var row = button.closest("tr");
      // TODO(api): fetch full profile (indicators, techniques, malware, organizations, observed range, confidence).
      document.getElementById("profile-title").textContent =
        row.cells[0].textContent + " \u00b7 " + row.cells[1].textContent;
      document.getElementById("profile-detail").scrollIntoView({ block: "start" });
    });
  });
})();
