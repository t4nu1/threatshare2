/* System security. */
(function () {
  "use strict";

  var form = document.getElementById("security-policy-form");

  // TODO(api): fetch platform keys into #keys-table.
  // TODO(api): load current security policy into #security-policy-form.

  TS.handleSubmit(form, function (data) {
    // TODO(api): PUT updated security policy.
    TS.setStatus(form, "Placeholder: policy was not saved. Backend not connected.");
  });
})();
