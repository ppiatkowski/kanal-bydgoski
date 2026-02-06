document.addEventListener('DOMContentLoaded', function() {
  // Wait for fonts to load before measuring nav positions
  document.fonts.ready.then(function() {

  // Nav indicator animation
  (function() {
    var navList = document.querySelector('.nav-list');
    var activeLink = document.querySelector('.nav-link.active');
    var navLinks = document.querySelectorAll('.nav-link');
    if (!navList || !activeLink || navLinks.length === 0) return;

    var navRect = navList.getBoundingClientRect();

    // Create indicator with inner container for white text clones
    var indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    var inner = document.createElement('div');
    inner.className = 'nav-indicator-inner';
    indicator.appendChild(inner);
    navList.appendChild(indicator);

    // Clone all nav link texts as white labels inside the indicator
    navLinks.forEach(function(link) {
      var rect = link.getBoundingClientRect();
      var label = document.createElement('span');
      label.className = 'nav-indicator-label';
      label.textContent = link.textContent.trim();
      label.style.left = (rect.left - navRect.left) + 'px';
      label.style.top = (rect.top - navRect.top) + 'px';
      label.style.width = rect.width + 'px';
      label.style.height = rect.height + 'px';
      inner.appendChild(label);
    });

    // Helper to set indicator + inner positions
    function positionAt(x, y, w, h, animate) {
      if (!animate) {
        indicator.style.transition = 'none';
        inner.style.transition = 'none';
      }
      indicator.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      indicator.style.width = w + 'px';
      indicator.style.height = h + 'px';
      inner.style.transform = 'translate(' + (-x) + 'px, ' + (-y) + 'px)';
      if (!animate) {
        indicator.offsetHeight; // force reflow
        indicator.style.transition = '';
        inner.style.transition = '';
      }
    }

    // Get active link position relative to nav-list
    var activeRect = activeLink.getBoundingClientRect();
    var activeLeft = activeRect.left - navRect.left;
    var activeTop = activeRect.top - navRect.top;

    // Find index of current active link
    var activeIndex = -1;
    navLinks.forEach(function(link, i) {
      if (link.classList.contains('active')) activeIndex = i;
    });

    // Check for previous position stored from last page
    var prevIndex = null;
    try { prevIndex = sessionStorage.getItem('navActiveIndex'); } catch(e) {}
    var shouldAnimate = prevIndex !== null && parseInt(prevIndex) !== activeIndex;

    if (shouldAnimate) {
      var prevLink = navLinks[parseInt(prevIndex)];
      if (prevLink) {
        var prevRect = prevLink.getBoundingClientRect();
        var prevLeft = prevRect.left - navRect.left;
        var prevTop = prevRect.top - navRect.top;

        // Place at old position, then animate to new
        positionAt(prevLeft, prevTop, prevRect.width, prevRect.height, false);
        positionAt(activeLeft, activeTop, activeRect.width, activeRect.height, true);
      }
    } else {
      positionAt(activeLeft, activeTop, activeRect.width, activeRect.height, false);
    }

    // Store current active index for next navigation
    try { sessionStorage.setItem('navActiveIndex', activeIndex); } catch(e) {}

    navLinks.forEach(function(link, i) {
      link.addEventListener('click', function() {
        try { sessionStorage.setItem('navActiveIndex', activeIndex); } catch(e) {}
      });
    });
  })();

  // Nav hover line animation
  (function() {
    var navList = document.querySelector('.nav-list');
    var navLinks = document.querySelectorAll('.nav-link');
    var activeLink = document.querySelector('.nav-link.active');
    if (!navList || navLinks.length === 0) return;

    var hoverLine = document.createElement('div');
    hoverLine.className = 'nav-hover-line';
    navList.appendChild(hoverLine);

    var isVisible = false;

    function getLinkX(link) {
      var navRect = navList.getBoundingClientRect();
      var rect = link.getBoundingClientRect();
      return { left: rect.left - navRect.left, width: rect.width };
    }

    // Initialize collapsed at active item position
    if (activeLink) {
      var pos = getLinkX(activeLink);
      hoverLine.style.transition = 'none';
      hoverLine.style.transform = 'translateX(' + pos.left + 'px) scaleY(0)';
      hoverLine.style.width = pos.width + 'px';
      hoverLine.offsetHeight;
      hoverLine.style.transition = '';
    } else {
      hoverLine.style.transform = 'scaleY(0)';
    }

    navLinks.forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        var target = getLinkX(link);

        if (!isVisible) {
          // Start at target position, collapsed — then rise up
          hoverLine.style.transition = 'none';
          hoverLine.style.transform = 'translateX(' + target.left + 'px) scaleY(0)';
          hoverLine.style.width = target.width + 'px';
          hoverLine.offsetHeight;
          hoverLine.style.transition = '';
        }

        // Animate to hovered item, expanded
        hoverLine.style.transform = 'translateX(' + target.left + 'px) scaleY(1)';
        hoverLine.style.width = target.width + 'px';
        isVisible = true;
      });
    });

    navList.addEventListener('mouseleave', function() {
      // Collapse down at current position
      var current = hoverLine.style.transform.replace('scaleY(1)', 'scaleY(0)');
      hoverLine.style.transform = current;
      isVisible = false;
    });
  })();

  }); // end document.fonts.ready

  // Gallery lightbox
  const gallery = document.querySelector('.gallery-lightbox');
  const galleryImg = document.querySelector('.gallery-image');
  const galleryClose = document.querySelector('.gallery-close');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');
  const photoLinks = document.querySelectorAll('.photo-link');

  let currentIndex = 0;
  let images = [];

  if (gallery && photoLinks.length > 0) {
    // Collect all image URLs
    photoLinks.forEach(function(link, index) {
      images.push(link.href);

      link.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = index;
        openGallery(currentIndex);
      });
    });

    function openGallery(index) {
      galleryImg.src = images[index];
      gallery.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      gallery.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      galleryImg.src = images[currentIndex];
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      galleryImg.src = images[currentIndex];
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
          otherCard.querySelector('.video-card-player').innerHTML = '';
        });

        // Toggle current card
        if (!isActive) {
          card.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          var youtubeId = card.getAttribute('data-youtube-id');
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
