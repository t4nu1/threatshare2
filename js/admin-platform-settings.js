/* Platform settings. */
(function () {
  "use strict";

  var form = document.getElementById("platform-settings-form");

  // TODO(api): load platform settings into #platform-settings-form.

  TS.handleSubmit(form, function (data) {
    // TODO(api): PUT updated platform settings.
    TS.setStatus(form, "Placeholder: settings were not saved. Backend not connected.");
  });
})();
