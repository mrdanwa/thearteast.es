/* Lightweight client-side i18n for The Arteast.
   Spanish is the inline default; English (and a re-applied Spanish) come from
   assets/js/translations.js. No build step / no server required. */
(function () {
  "use strict";
  var DICT = window.I18N_TRANSLATIONS || { es: {}, en: {} };
  var ATTRS = ["alt", "placeholder", "value", "title", "aria-label", "content"];
  var DEFAULT = "es";

  var _decoder;
  function decode(str) {
    // turn HTML entities into their characters for attribute values
    _decoder = _decoder || document.createElement("textarea");
    _decoder.innerHTML = str;
    return _decoder.value;
  }

  function apply(lang) {
    if (lang !== "es" && lang !== "en") lang = DEFAULT;
    var d = DICT[lang] || {};

    // text / inline-html nodes
    var nodes = document.querySelectorAll("[data-i18n], [data-i18n-html]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
      if (key && d[key] != null) el.innerHTML = d[key];
    }

    // translated attributes
    for (var a = 0; a < ATTRS.length; a++) {
      var attr = ATTRS[a];
      var list = document.querySelectorAll("[data-i18n-" + attr + "]");
      for (var j = 0; j < list.length; j++) {
        var k = list[j].getAttribute("data-i18n-" + attr);
        if (k && d[k] != null) list[j].setAttribute(attr, decode(d[k]));
      }
    }

    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("lang", lang); } catch (e) {}

    var toggles = document.querySelectorAll("[data-setlang]");
    for (var t = 0; t < toggles.length; t++) {
      toggles[t].classList.toggle("active", toggles[t].getAttribute("data-setlang") === lang);
    }
  }

  function preferred() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q === "es" || q === "en") return q;
    } catch (e) {}
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") return saved;
    } catch (e) {}
    return DEFAULT; // Spanish-first site; English only on explicit choice
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-setlang]") : null;
    if (t) { e.preventDefault(); apply(t.getAttribute("data-setlang")); }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var lang = preferred();
    if (lang !== DEFAULT) apply(lang);  // inline is already Spanish; only swap when needed
    else {
      // still mark the active toggle
      var toggles = document.querySelectorAll('[data-setlang="es"]');
      for (var t = 0; t < toggles.length; t++) toggles[t].classList.add("active");
    }
  });

  window.setLang = apply;
})();
