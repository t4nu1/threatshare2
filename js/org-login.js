/* Organization login. */
(function () {
  "use strict";

  var form = document.getElementById("login-form");

  // TODO(api): request a fresh login challenge and place it in #challenge.

  TS.handleSubmit(form, function (data) {
    // TODO(api): POST credentials, authentication code and challenge signature; verify signature server-side.
    // TODO(api): on success, store the session and redirect to home.html.
    TS.setStatus(form, "Placeholder: sign-in is not connected to the backend yet.");
  });
})();
