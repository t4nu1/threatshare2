/* Organization settings. */
(function () {
  "use strict";

  // TODO(api): load organization settings into each form.
  // TODO(api): fetch organization users into #org-users-table.

  ["org-info-form", "admin-info-form", "security-form", "sharing-form", "other-form"].forEach(function (id) {
    var form = document.getElementById(id);
    TS.handleSubmit(form, function (data) {
      // TODO(api): PUT the settings section represented by this form.
      TS.setStatus(form, "Placeholder: changes were not saved. Backend not connected.");
    });
  });

  document.getElementById("invite-user").addEventListener("click", function () {
    // TODO(api): open invite flow and POST the new user invitation.
  });

  document.getElementById("rotate-key").addEventListener("click", function () {
    // TODO(api): start signing key rotation (upload new public key, revoke old key).
  });
})();
