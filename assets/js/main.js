/*
    Salient by TEMPLATE STOCK
    https://templatestock.co  @templatestock
    Released for free under the Creative Commons Attribution 3.0 license.
*/

// Web3Forms access key (safe to expose). Change the delivery email at web3forms.com.
var WEB3FORMS_ACCESS_KEY = "2755daff-ce40-445d-81f3-93ad1882b6a7";

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  let overlay;

  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }
  createOverlay();

  function toggleMenu() {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  overlay.addEventListener("click", function (e) {
    if (navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fixedHeader = document.querySelector(".fixed-header");
  const heroSection = document.querySelector("#hero-section");

  window.addEventListener("scroll", function () {
    if (heroSection && fixedHeader) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (window.pageYOffset > heroBottom - 100) {
        fixedHeader.classList.add("scrolled");
      } else {
        fixedHeader.classList.remove("scrolled");
      }
    }
  });
});

(function ($) {
  "use strict";

  $(document).ready(function () {
    var $heroSection = $("#hero-section");
    function setHeroHeight() {
      $heroSection.css("height", $(window).height());
    }
    setHeroHeight();
    $(window).on("resize", setHeroHeight);

    $.stellar({
      responsive: true,
      horizontalScrolling: false,
      verticalOffset: 0,
    });

    var captionSlider = $(".caption-slides").bxSlider({
      pager: true,
      mode: "fade",
      adaptiveHeight: true,
      controls: false,
      auto: true,
      speed: 1000,
      pause: 5000,
      onSlideAfter: function () {
        captionSlider.startAuto();
      },
    });

    $("a[href*=#]:not([href=#])").on("click", function (e) {
      var pathCheck =
        location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "");
      var hostCheck = location.hostname === this.hostname;
      if (pathCheck && hostCheck) {
        var $target = $(this.hash);
        $target = $target.length
          ? $target
          : $("[name=" + this.hash.slice(1) + "]");
        if ($target.length) {
          $("html, body").animate(
            {
              scrollTop: $target.offset().top - 66,
            },
            1000
          );
          e.preventDefault();
        }
      }
    });

    $("input, textarea").placeholder();

    $(".animated").appear(
      function () {
        var $thisElement = $(this);
        var animationClass = $thisElement.data("animation");
        var animationDelay = $thisElement.data("delay");
        if (animationDelay) {
          setTimeout(function () {
            $thisElement.addClass(animationClass + " in").removeClass("out");
          }, animationDelay);
        } else {
          $thisElement.addClass(animationClass + " in").removeClass("out");
        }
      },
      { accY: -150 }
    );

    // Newsletter signup — emails the entered address to us via Web3Forms (no backend)
    $("#subscribeform").on("submit", function (e) {
      e.preventDefault();
      var isEN = document.documentElement.lang === "en";
      var email = $(this).find('input[name="EMAIL"]').val();
      var $ok = $(this).find(".subscription-success");
      var $err = $(this).find(".subscription-error");
      var fail = isEN
        ? "Something went wrong. Please try again."
        : "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
      $.ajax({
        url: "https://api.web3forms.com/submit",
        method: "POST",
        dataType: "json",
        headers: { Accept: "application/json" },
        contentType: "application/json",
        data: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nueva suscripción al boletín — The Arteast",
          from_name: "The Arteast Website",
          email: email,
          message: "Nueva suscripción al boletín: " + email,
        }),
        success: function (resp) {
          if (resp && resp.success) {
            $ok
              .html(
                '<span class="icon-happy"></span><br/>' +
                  (isEN ? "Subscribed — thanks!" : "¡Suscrito! Gracias.")
              )
              .fadeIn(1000);
            $err.fadeOut(500);
            $("#subscriber-email").val("");
          } else {
            $err
              .html('<span class="icon-sad"></span><br/>' + fail)
              .fadeIn(1000);
            $ok.fadeOut(500);
          }
        },
        error: function () {
          $err.html('<span class="icon-sad"></span><br/>' + fail).fadeIn(1000);
          $ok.fadeOut(500);
        },
      });
    });

    // Contact form (Web3Forms — no backend)
    $("#contactform").on("submit", function (e) {
      e.preventDefault();
      var isEN = document.documentElement.lang === "en";
      var okMsg = isEN
        ? "Message sent — thanks! We'll get back to you soon."
        : "¡Mensaje enviado! Gracias, te responderemos pronto.";
      var errMsg = isEN
        ? "Something went wrong. Please try again."
        : "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
      $("#alert").slideUp(750, function () {
        $("#alert").hide();
        $("#submit").attr("disabled", "disabled");
        $.ajax({
          url: "https://api.web3forms.com/submit",
          method: "POST",
          dataType: "json",
          headers: { Accept: "application/json" },
          contentType: "application/json",
          data: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "Nuevo mensaje de contacto — The Arteast",
            from_name: "The Arteast Website",
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            message: $("#message").val(),
          }),
          success: function (resp) {
            var ok = resp && resp.success;
            $("#alert")
              .html(
                '<div class="alert alert-' + (ok ? "success" : "danger") + '">' +
                  (ok ? okMsg : errMsg) +
                  "</div>"
              )
              .slideDown("slow");
            $("#submit").removeAttr("disabled");
            if (ok) {
              $("#name").val("");
              $("#email").val("");
              $("#phone").val("");
              $("#message").val("");
            }
          },
          error: function () {
            $("#alert")
              .html('<div class="alert alert-danger">' + errMsg + "</div>")
              .slideDown("slow");
            $("#submit").removeAttr("disabled");
          },
        });
      });
      return false;
    });

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 500) {
        $(".back-to-top").fadeIn();
      } else {
        $(".back-to-top").fadeOut();
      }
    });
    $(".back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 750);
      return false;
    });

    $(".testimonials-slider").bxSlider({
      nextSelector: ".tc-arrows .tc-arrow-right",
      prevSelector: ".tc-arrows .tc-arrow-left",
      nextText: "<i class='fa fa-angle-right'></i>",
      prevText: "<i class='fa fa-angle-left'></i>",
      pager: false,
      auto: true,
      pause: 5000,
      mode: "vertical",
      useCSS: false,
    });

    $(".owl-carousel").owlCarousel({
      autoPlay: 3000,
      items: 4,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 3],
    });

    $(".zoom").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
    $(".video-pop-up").magnificPopup({
      type: "inline",
      midClick: true,
      callbacks: {
        close: function () {
          var v = document.querySelector("#video-popup video");
          if (v) {
            v.pause();
            v.currentTime = 0;
          }
        },
      },
    });

    $(".screenshots-carousel").owlCarousel({
      autoPlay: 3000,
      items: 5,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 3],
      loop: true,
      rewind: false,
    });
  });

  $(window).on("load", function () {
    $("#loading-animation").fadeOut();
    $("#preloader").delay(600).fadeOut("slow");
  });
})(jQuery);
