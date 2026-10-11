/* Timeline. */
(function () {
  "use strict";

  var form = document.getElementById("timeline-filters");

  // TODO(api): fetch timeline events for the selected investigation into #timeline-events.
  // TODO(api): fetch incident / indicator relationships into #timeline-relationships.

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO(api): re-fetch events using investigation, organization and date range filters.
  });
})();
