/* Submit threat. */
(function () {
  "use strict";

  var form = document.getElementById("submit-threat-form");

  // TODO(api): load the organization's signing key fingerprint into #signing-key.
  // TODO(api): load the organization's open investigations into #related-incident.

  TS.handleSubmit(form, function (data) {
    // TODO(api): sign and encrypt the payload, upload evidence files, then POST the submission.
    TS.setStatus(form, "Placeholder: submission was not sent. Backend not connected.");
  });

  form.addEventListener("reset", function () {
    TS.setStatus(form, "");
  });
})();
