/* Organization registration: stepped form. */
(function () {
  "use strict";

  var form = document.getElementById("register-form");
  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var indicators = document.querySelectorAll(".stepper li");
  var back = document.getElementById("step-back");
  var next = document.getElementById("step-next");
  var submit = document.getElementById("step-submit");
  var current = 0;

  function validStep(index) {
    var fields = steps[index].querySelectorAll("input, select, textarea");
    for (var i = 0; i < fields.length; i += 1) {
      if (!fields[i].reportValidity()) return false;
    }
    if (index === 2) {
      var pw = document.getElementById("reg-password");
      var confirm = document.getElementById("reg-password-confirm");
      if (pw.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match.");
        confirm.reportValidity();
        confirm.setCustomValidity("");
        return false;
      }
    }
    return true;
  }

  function renderSummary() {
    var items = [
      ["Organization", "org-name"],
      ["Sector", "org-sector"],
      ["Country", "org-country"],
      ["Admin", "admin-name"],
      ["Admin email", "admin-email"],
      ["Key algorithm", "key-algorithm"]
    ];
    var list = document.getElementById("register-summary");
    list.innerHTML = "";
    items.forEach(function (item) {
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = item[0];
      dd.textContent = document.getElementById(item[1]).value || "-";
      list.appendChild(dt);
      list.appendChild(dd);
    });
  }

  function show(index) {
    current = index;
    steps.forEach(function (step, i) {
      step.hidden = i !== index;
    });
    indicators.forEach(function (li, i) {
      li.classList.toggle("is-complete", i < index);
      if (i === index) li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    back.disabled = index === 0;
    next.hidden = index === steps.length - 1;
    submit.hidden = index !== steps.length - 1;
    if (index === steps.length - 1) renderSummary();
    var first = steps[index].querySelector("input:not([readonly]):not([disabled]), select, textarea");
    if (first) first.focus();
  }

  next.addEventListener("click", function () {
    if (validStep(current)) show(current + 1);
  });

  back.addEventListener("click", function () {
    show(current - 1);
  });

  document.getElementById("public-key").addEventListener("change", function () {
    // TODO(api): compute or request the fingerprint for the provided public key.
    document.getElementById("key-fingerprint").value = this.value.trim() ? "SHA256:placeholder-fingerprint" : "";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validStep(current)) return;
    // TODO(api): POST registration (organization, admin, credentials, public key) and start the approval flow.
    form.hidden = true;
    document.querySelector(".stepper").hidden = true;
    document.getElementById("register-pending").hidden = false;
  });

  show(0);
})();
