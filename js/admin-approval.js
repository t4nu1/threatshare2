/* Organization approval. */
(function () {
  "use strict";

  var form = document.getElementById("approval-form");
  var title = document.getElementById("review-title");
  var note = document.getElementById("decision-note");

  // TODO(api): fetch pending registrations into #approval-table.

  document.querySelectorAll("[data-review]").forEach(function (button) {
    button.addEventListener("click", function () {
      var ref = button.getAttribute("data-review");
      // TODO(api): fetch registration details for the selected reference into #review-details.
      title.textContent = "Review " + ref;
      form.reset();
      TS.setStatus(form, "");
      form.scrollIntoView({ block: "start" });
    });
  });

  TS.handleSubmit(form, function () {
    var checks = form.querySelectorAll('input[type="checkbox"]');
    var allChecked = Array.prototype.every.call(checks, function (c) { return c.checked; });
    if (!allChecked) {
      TS.setStatus(form, "Complete all verification checks before approving.");
      return;
    }
    // TODO(api): POST approval decision for the selected registration.
    TS.setStatus(form, "Placeholder: approval was not sent. Backend not connected.");
  });

  document.getElementById("reject-btn").addEventListener("click", function () {
    if (!note.value.trim()) {
      TS.setStatus(form, "Add a decision note before rejecting.");
      note.focus();
      return;
    }
    // TODO(api): POST rejection decision with note for the selected registration.
    TS.setStatus(form, "Placeholder: rejection was not sent. Backend not connected.");
  });
})();
