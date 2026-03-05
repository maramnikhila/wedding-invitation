// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "flex";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});
$(window).on('load', function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});

// ─── Rose Petals ───────────────────────────────────────────────────────────────
function createRosePetals() {
  var heroWrapper = document.querySelector('.header-wrapper .hero');
  if (!heroWrapper) return;
  heroWrapper.style.position = 'relative';
  heroWrapper.style.overflow = 'hidden';

  var symbols = ['🌸', '🌺', '🌷', '❀', '✿', '🌹'];
  for (var i = 0; i < 22; i++) {
    (function (idx) {
      var petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = symbols[idx % symbols.length];
      petal.style.left             = (Math.random() * 100) + '%';
      petal.style.fontSize         = (Math.random() * 16 + 10) + 'px';
      petal.style.animationDuration = (Math.random() * 10 + 8) + 's';
      petal.style.animationDelay   = (Math.random() * 14) + 's';
      petal.style.opacity          = (Math.random() * 0.35 + 0.5).toString();
      heroWrapper.appendChild(petal);
    })(i);
  }
}

// ─── Music Button ──────────────────────────────────────────────────────────────
function setupMusicButton() {
  var music = document.getElementById('weddingMusic');
  var btn   = document.getElementById('musicBtn');
  if (!music || !btn) return;

  function syncBtn() {
    if (music.paused) {
      btn.innerHTML = '<i class="fas fa-music"></i>';
      btn.classList.remove('playing');
    } else {
      btn.innerHTML = '<i class="fas fa-pause"></i>';
      btn.classList.add('playing');
    }
  }

  btn.addEventListener('click', function () {
    if (music.paused) {
      music.play().catch(function () {});
    } else {
      music.pause();
    }
  });

  music.addEventListener('play',  syncBtn);
  music.addEventListener('pause', syncBtn);
}

// ─── Lightbox Gallery ──────────────────────────────────────────────────────────
function setupLightbox() {
  var lightbox    = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn    = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-photo').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ─── Init ──────────────────────────────────────────────────────────────────────
$(document).ready(function () {
  createRosePetals();
  setupMusicButton();
  setupLightbox();
});

