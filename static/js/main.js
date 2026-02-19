// Validate YouTube video ID format (11 chars, alphanumeric + hyphen/underscore)
function isValidYoutubeId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
}

// Header background parallax scroll with fade
const headerBgEl = document.querySelector('.header-bg');
const headerOverlay = document.querySelector('.header-overlay');
const header = document.querySelector('.site-header');

if (headerBgEl && headerOverlay && header) {
  let fadeDistance = 400; // default fallback

  // Calculate fade distance based on actual image dimensions
  const img = new Image();
  img.onload = function() {
    const headerHeight = header.offsetHeight;
    const viewportWidth = window.innerWidth;

    // With background-size: cover, image scales to fill width
    const scale = viewportWidth / img.naturalWidth;
    const scaledHeight = img.naturalHeight * scale;

    // Available scroll distance before image runs out
    fadeDistance = Math.max(100, scaledHeight - headerHeight - 50);
  };
  img.src = '/header_background.webp';

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / fadeDistance);

        // Directly set styles on the elements
        headerBgEl.style.transform = 'translateY(' + (-scrollY) + 'px)';
        headerBgEl.style.opacity = opacity;
        headerOverlay.style.opacity = opacity;

        headerBgEl.classList.toggle('bg-hidden', opacity === 0);
        headerOverlay.classList.toggle('bg-hidden', opacity === 0);

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', function() {
  // Gallery lightbox
  const gallery = document.querySelector('.gallery-lightbox');
  const galleryImg = document.querySelector('.gallery-image');
  const galleryClose = document.querySelector('.gallery-close');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');
  const photoLinks = document.querySelectorAll('.photo-link');

  let currentIndex = 0;
  let images = [];
  let altTexts = [];
  let lastFocusedElement = null;
  const focusableElements = [galleryClose, galleryPrev, galleryNext];

  if (gallery && photoLinks.length > 0) {
    // Collect all image URLs and alt texts
    photoLinks.forEach(function(link, index) {
      images.push(link.href);
      var img = link.querySelector('img');
      altTexts.push(img ? img.alt : 'Wizualizacja projektu');

      link.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = index;
        openGallery(currentIndex);
      });
    });

    function openGallery(index) {
      lastFocusedElement = document.activeElement;
      galleryImg.src = images[index];
      galleryImg.alt = altTexts[index];
      gallery.classList.add('active');
      gallery.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      galleryClose.focus();
    }

    function closeGallery() {
      gallery.classList.remove('active');
      gallery.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    // Focus trap within modal
    gallery.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      var firstEl = focusableElements[0];
      var lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    });

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      galleryImg.src = images[currentIndex];
      galleryImg.alt = altTexts[currentIndex];
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      galleryImg.src = images[currentIndex];
      galleryImg.alt = altTexts[currentIndex];
    }

    galleryClose.addEventListener('click', closeGallery);
    galleryPrev.addEventListener('click', showPrev);
    galleryNext.addEventListener('click', showNext);

    // Close on backdrop click
    gallery.addEventListener('click', function(e) {
      if (e.target === gallery) {
        closeGallery();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!gallery.classList.contains('active')) return;

      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      });
    }
  });

  // Video card accordion
  var videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(function(card) {
    var header = card.querySelector('.video-card-header');

    if (header) {
      header.addEventListener('click', function() {
        var isActive = card.classList.contains('active');

        // Close all cards and remove iframes
        videoCards.forEach(function(otherCard) {
          otherCard.classList.remove('active');
          otherCard.querySelector('.video-card-header').setAttribute('aria-expanded', 'false');
          otherCard.querySelector('.video-card-player').textContent = '';
        });

        // Toggle current card
        if (!isActive) {
          var youtubeId = card.getAttribute('data-youtube-id');
          if (!isValidYoutubeId(youtubeId)) {
            console.error('Invalid YouTube ID:', youtubeId);
            return;
          }
          card.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          var player = card.querySelector('.video-card-player');
          var iframe = document.createElement('iframe');
          iframe.src = 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1';
          iframe.setAttribute('allow', 'autoplay; encrypted-media');
          iframe.setAttribute('allowfullscreen', '');
          player.appendChild(iframe);
        }
      });
    }
  });
});
