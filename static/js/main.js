// Validate YouTube video ID format (11 chars, alphanumeric + hyphen/underscore)
function isValidYoutubeId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
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
