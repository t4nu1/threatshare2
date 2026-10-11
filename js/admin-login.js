/* Platform admin login. */
(function () {
  "use strict";

  var form = document.getElementById("admin-login-form");

  TS.handleSubmit(form, function (data) {
    // TODO(api): POST admin credentials and authentication code; on success redirect to home.html.
    TS.setStatus(form, "Placeholder: sign-in is not connected to the backend yet.");
  });
})();
