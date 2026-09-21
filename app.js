function playHarpChime() {}
/**
 * EphraimArts • Whimsical Watercolor Children's Stories & Storybook Studio
 * Specializations: Christian Books & Faith Stories | Bedtime Stories & Adventure | Fairytales & Fantasy
 * Offerings: Storybook Illustration | Storybook Cover Design | Storybook Trailers | Comic Book & Graphic Novel
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. COMPLETE STORYBOOK REPOSITORY & METADATA (30 BOOKS, 10 COVERS, 3 TRAILERS)
     ========================================================================== */
  const BOOKS_DB = (typeof STORYBOOK_LIBRARY !== 'undefined') ? STORYBOOK_LIBRARY : {};
  const BOOK_IDS = Object.keys(BOOKS_DB);
  const STORY_KEYS = BOOK_IDS;
  let currentStoryIndex = 0;

  /* ==========================================================================
     2. HEAVENLY AMBIANCE CANVAS (SOFT GOLDEN LIGHT PARTICLES)
     ========================================================================== */
  const canvas = document.getElementById('heavenly-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const PARTICLE_COUNT = 36;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class LightParticle {
      constructor() {
        this.reset(true);
      }
      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.8 + 1.2;
        this.speedY = Math.random() * 0.45 + 0.18;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.45 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.003;
        this.fadingIn = true;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.25;

        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) this.fadingIn = false;
        } else {
          this.alpha -= this.fadeSpeed * 0.8;
          if (this.alpha <= 0) this.reset();
        }

        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `rgba(248, 222, 140, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(235, 185, 80, ${this.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(235, 185, 80, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new LightParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================================
     3. AUDIO SPECIFICATION: NO SOUND EFFECTS / NO AMBIENT SOUND
     (All sound effects and ambient chimes completely removed per specification)
     ========================================================================== */

  /* ==========================================================================
     4. VIEW-ONLY PROTECTION SYSTEM
     ========================================================================== */
  const protectionToast = document.getElementById('protection-toast');
  const toastCloseBtn = document.getElementById('toast-close-btn');

  function triggerProtectionToast(e) {
    if (protectionToast) {
      protectionToast.classList.remove('hidden');
      if (window._toastTimeout) clearTimeout(window._toastTimeout);
      window._toastTimeout = setTimeout(() => {
        protectionToast.classList.add('hidden');
      }, 7000);
    }
  }

  if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', () => {
      protectionToast.classList.add('hidden');
    });
  }

  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (
      target.closest('.protected-art-container') ||
      target.closest('.storybook-frame-outer') ||
      target.closest('.open-storybook') ||
      target.closest('.card-thumb-wrap') ||
      target.tagName === 'IMG' ||
      target.classList.contains('protection-shield')
    ) {
      e.preventDefault();
      triggerProtectionToast(e);
      return false;
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('.protected-art-container')) {
      e.preventDefault();
      return false;
    }
  });

  /* ==========================================================================
     5. DYNAMIC MULTI-PAGE STORYBOOK READER (10 DYNAMIC PAGES PER BOOK)
     ========================================================================== */
    /* ==========================================================================
     5. DEDICATED STORYBOOK PAGE VIEWER & READ ALOUD CONTROLLER
     ========================================================================== */
  const viewerModal = document.getElementById('storybook-reader-modal');
  const viewerTitle = document.getElementById('viewer-project-title');
  const viewerCategory = document.getElementById('viewer-project-category');
  const viewerCounter = document.getElementById('viewer-page-counter');
  const viewerStorySelect = document.getElementById('viewer-story-select');
  const viewerFullscreenBtn = document.getElementById('viewer-fullscreen-btn');
  const viewerCloseBtn = document.getElementById('viewer-close-btn');

  const viewerStageArea = document.getElementById('viewer-stage-area');
  const viewerPrevBtn = document.getElementById('viewer-prev-btn');
  const viewerNextBtn = document.getElementById('viewer-next-btn');
  const viewerMainImage = document.getElementById('viewer-main-image');
  const viewerArtViewport = document.getElementById('viewer-art-viewport');
  const viewerFinalCard = document.getElementById('viewer-final-card');
  const finalCardBookTitle = document.getElementById('final-card-book-title');
  const finalBackBtn = document.getElementById('final-back-btn');
  const finalExploreBtn = document.getElementById('final-explore-btn');

  const viewerStageTitle = document.getElementById('viewer-stage-title');
  const viewerDropcap = document.getElementById('viewer-dropcap');
  const viewerP1 = document.getElementById('viewer-p1');
  const viewerP2 = document.getElementById('viewer-p2');
  const viewerThumbnailsStrip = document.getElementById('viewer-thumbnails-strip');

  // Read Aloud Controls
  const raPlayBtn = document.getElementById('ra-play-btn');
  const raPauseBtn = document.getElementById('ra-pause-btn');
  const raResumeBtn = document.getElementById('ra-resume-btn');
  const raStopBtn = document.getElementById('ra-stop-btn');
  const raStatusLabel = document.getElementById('ra-status-label');

  let currentBookId = 'christian-01';
  let currentPageIdx = 0; // 0-based page index
  let isSpeaking = false;
  let isPaused = false;
  let speechUtterance = null;

  const LEGACY_ID_MAP = {
    'good-shepherd': 'christian-01',
    'little-light': 'christian-01',
    'walking-jesus': 'christian-02',
    'noahs-ark': 'christian-03',
    'david-giant': 'christian-04',
    'creation-garden': 'christian-05',
    'prayer-bed': 'christian-06',
    'shepherd-heart': 'christian-07',
    'esther-courage': 'christian-08',
    'lost-sheep': 'christian-09',
    'seeds-faith': 'christian-10',
    'luna-forest': 'bedtime-01',
    'bedtime-adventure': 'bedtime-01',
    'milo-cloud': 'bedtime-02',
    'sleepy-dragon': 'bedtime-03',
    'emma-star': 'bedtime-04',
    'oliver-garden': 'bedtime-05',
    'little-bear': 'bedtime-06',
    'flying-book': 'bedtime-07',
    'lantern-woods': 'bedtime-08',
    'benny-stars': 'bedtime-09',
    'journey-home': 'bedtime-10',
    'kingdom-woods': 'fairytale-01',
    'fairytale-fantasy': 'fairytale-01',
    'girl-dragons': 'fairytale-02',
    'enchanted-castle': 'fairytale-03',
    'silver-trees': 'fairytale-04',
    'tiny-kingdom': 'fairytale-05',
    'mermaids-secret': 'fairytale-06',
    'boy-phoenix': 'fairytale-07',
    'clockwork-kingdom': 'fairytale-08',
    'secret-door': 'fairytale-09',
    'last-star-keeper': 'fairytale-10',
    'cover-design': 'cov-01',
    'graphic-novel': 'christian-04'
  };

  function resolveBookId(key) {
    if (BOOKS_DB[key]) return key;
    if (LEGACY_ID_MAP[key] && BOOKS_DB[LEGACY_ID_MAP[key]]) return LEGACY_ID_MAP[key];
    return BOOK_IDS[0] || 'christian-01';
  }

  /* --------------------------------------------------------------------------
     READ ALOUD CONTROLLER (Web Speech API)
     Controls: Read Aloud, Pause, Resume, Stop
     Reads ONLY current page's story text. Never plays music or sound FX.
     -------------------------------------------------------------------------- */
  function updateReadAloudUI(state) {
    if (!raPlayBtn) return;
    if (state === 'playing') {
      raPlayBtn.style.display = 'none';
      if (raPauseBtn) raPauseBtn.style.display = 'inline-flex';
      if (raResumeBtn) raResumeBtn.style.display = 'none';
      if (raStopBtn) raStopBtn.style.display = 'inline-flex';
      if (raStatusLabel) raStatusLabel.textContent = `Reading Page ${currentPageIdx + 1} text...`;
    } else if (state === 'paused') {
      raPlayBtn.style.display = 'none';
      if (raPauseBtn) raPauseBtn.style.display = 'none';
      if (raResumeBtn) raResumeBtn.style.display = 'inline-flex';
      if (raStopBtn) raStopBtn.style.display = 'inline-flex';
      if (raStatusLabel) raStatusLabel.textContent = `Paused on Page ${currentPageIdx + 1}`;
    } else { // idle
      raPlayBtn.style.display = 'inline-flex';
      if (raPauseBtn) raPauseBtn.style.display = 'none';
      if (raResumeBtn) raResumeBtn.style.display = 'none';
      if (raStopBtn) raStopBtn.style.display = 'none';
      if (raStatusLabel) raStatusLabel.textContent = '';
    }
  }

  function stopReadAloud() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    isPaused = false;
    speechUtterance = null;
    updateReadAloudUI('idle');
  }

  function pauseReadAloud() {
    if ('speechSynthesis' in window && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      isPaused = true;
      updateReadAloudUI('paused');
    }
  }

  function resumeReadAloud() {
    if ('speechSynthesis' in window && isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      isPaused = false;
      updateReadAloudUI('playing');
    }
  }

  function startReadAloud() {
    if (!('speechSynthesis' in window)) {
      showFeedbackToast('Speech synthesis not supported in this browser.', '⚠️');
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const book = BOOKS_DB[currentBookId];
    if (!book || !book.pages || !book.pages[currentPageIdx]) return;
    const page = book.pages[currentPageIdx];

    const textToRead = `${page.stage ? page.stage + '. ' : ''}${page.text || (page.p1 + ' ' + (page.p2 || ''))}`.trim();
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      isPaused = false;
      updateReadAloudUI('playing');
    };

    utterance.onend = () => {
      isSpeaking = false;
      isPaused = false;
      speechUtterance = null;
      updateReadAloudUI('idle');
    };

    utterance.onerror = () => {
      isSpeaking = false;
      isPaused = false;
      speechUtterance = null;
      updateReadAloudUI('idle');
    };

    speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  if (raPlayBtn) raPlayBtn.addEventListener('click', startReadAloud);
  if (raPauseBtn) raPauseBtn.addEventListener('click', pauseReadAloud);
  if (raResumeBtn) raResumeBtn.addEventListener('click', resumeReadAloud);
  if (raStopBtn) raStopBtn.addEventListener('click', stopReadAloud);

  /* --------------------------------------------------------------------------
     VIEWER NAVIGATION CONTROLLER
     -------------------------------------------------------------------------- */
  function openReader(bookId, pageIdx = 0) {
    stopReadAloud();
    const resolved = resolveBookId(bookId);
    currentBookId = resolved;
    currentPageIdx = pageIdx;
    updateViewerPage();
    if (viewerModal) {
      viewerModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  window.openReader = openReader;
  window.openStorybookReader = openReader;

  function closeReader() {
    stopReadAloud();
    if (document.fullscreenElement) {
      exitFullscreen();
    }
    if (viewerModal) {
      viewerModal.classList.add('hidden');
      viewerModal.classList.remove('is-fullscreen');
      document.body.style.overflow = '';
    }
  }

  function updateViewerPage() {
    // Automatically stop previous page speech
    stopReadAloud();

    const book = BOOKS_DB[currentBookId];
    if (!book) return;

    const totalPages = book.totalPages || (book.pages ? book.pages.length : 12);

    // Clamping
    if (currentPageIdx < 0) currentPageIdx = 0;
    if (currentPageIdx >= totalPages) currentPageIdx = totalPages - 1;

    const isFinalPage = (currentPageIdx === totalPages - 1);
    const isFirstPage = (currentPageIdx === 0);

    // 1. Update Project Title & Category
    if (viewerTitle) viewerTitle.textContent = book.title;
    if (viewerCategory) {
      const genreLabel = book.category === 'Christian & Faith' ? '🕊️ Christian & Faith' :
                         book.category === 'Bedtime Stories & Adventures' ? '🌙 Bedtime Stories & Adventures' :
                         '🏰 Fairytales & Fantasy';
      viewerCategory.textContent = genreLabel;
    }
    if (viewerStorySelect) viewerStorySelect.value = currentBookId;

    // 2. Dynamic Page Counter: Page X of Y
    if (viewerCounter) {
      viewerCounter.textContent = `Page ${currentPageIdx + 1} of ${totalPages}`;
    }

    // 3. Update Large Centered Illustration (Independent Scene Asset per Page)
    const pageObj = (book.pages && book.pages[currentPageIdx]) ? book.pages[currentPageIdx] : {};
    // Ensure we use the page's unique scene illustration (Data URI or direct asset path)
    const imageSrc = pageObj.image || `web_images/stories/${currentBookId}/page-${(currentPageIdx + 1).toString().padStart(2, '0')}.svg`;

    if (viewerMainImage) {
      viewerMainImage.style.opacity = '1';
      viewerMainImage.src = imageSrc;
      viewerMainImage.alt = `${book.title} - Page ${currentPageIdx + 1}: ${pageObj.stage || 'Scene'}`;
      
      // CRITICAL: Under NO circumstances overwrite viewer illustration with book.coverImage!
      viewerMainImage.onerror = () => {
        console.warn(`[Storybook Viewer] Notice on page ${(currentPageIdx + 1)} of ${currentBookId}: verifying asset load.`);
        // If relative file path had an issue, fallback to pageObj.dataUri (embedded SVG), NEVER coverImage!
        if (pageObj.dataUri && viewerMainImage.src !== pageObj.dataUri) {
          viewerMainImage.src = pageObj.dataUri;
        }
      };
      viewerMainImage.onload = () => {
        viewerMainImage.style.opacity = '1';
      };
    }

    // 4. Update Navigation Controls
    if (viewerPrevBtn) {
      viewerPrevBtn.disabled = isFirstPage;
    }
    if (viewerNextBtn) {
      if (isFinalPage) {
        viewerNextBtn.disabled = true;
        viewerNextBtn.title = 'Final Page Reached';
      } else {
        viewerNextBtn.disabled = false;
        viewerNextBtn.title = `Next Page (Page ${currentPageIdx + 2} of ${totalPages})`;
      }
    }

    // 5. Final Page Overlay Card
    if (viewerFinalCard) {
      if (isFinalPage) {
        viewerFinalCard.classList.remove('hidden');
        if (finalCardBookTitle) finalCardBookTitle.textContent = book.title;
      } else {
        viewerFinalCard.classList.add('hidden');
      }
    }

    // 6. Update Story Prose (Separate from Illustration)
    if (viewerStageTitle) {
      viewerStageTitle.textContent = `Stage ${(currentPageIdx + 1).toString().padStart(2, '0')}: ${pageObj.stage || 'Story Scene'}`;
    }
    if (viewerDropcap) {
      viewerDropcap.textContent = pageObj.dropcap || 'O';
    }
    if (viewerP1) {
      viewerP1.textContent = pageObj.p1 || pageObj.text || '';
    }
    if (viewerP2) {
      viewerP2.textContent = pageObj.p2 || '';
    }

    // 7. Render & Scroll Thumbnails Strip
    renderThumbnailsStrip(book, currentPageIdx, totalPages);
  }

  function turnNextPage() {
    const book = BOOKS_DB[currentBookId];
    if (!book) return;
    const totalPages = book.totalPages || (book.pages ? book.pages.length : 12);

    if (currentPageIdx < totalPages - 1) {
      currentPageIdx += 1;
      updateViewerPage();
    }
    // DO NOT allow Next to continue into another project when on final page!
  }

  function turnPrevPage() {
    if (currentPageIdx > 0) {
      currentPageIdx -= 1;
      updateViewerPage();
    }
  }

  function renderThumbnailsStrip(book, activeIdx, totalPages) {
    if (!viewerThumbnailsStrip) return;
    viewerThumbnailsStrip.innerHTML = '';

    const pages = book.pages || [];
    for (let idx = 0; idx < totalPages; idx++) {
      const p = pages[idx] || {};
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `viewer-thumb-btn ${idx === activeIdx ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === activeIdx ? 'true' : 'false');
      btn.title = `Jump to Page ${idx + 1} (${p.stage || ''})`;
      btn.innerHTML = `
        <span class="thumb-p-num">${idx + 1}</span>
        <span class="thumb-p-label">${p.stage ? p.stage.slice(0, 8) : `P${idx + 1}`}</span>
      `;
      btn.addEventListener('click', () => {
        currentPageIdx = idx;
        updateViewerPage();
      });
      viewerThumbnailsStrip.appendChild(btn);
    }

    const activeBtn = viewerThumbnailsStrip.querySelector('.viewer-thumb-btn.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Navigation Event Listeners
  if (viewerPrevBtn) viewerPrevBtn.addEventListener('click', turnPrevPage);
  if (viewerNextBtn) viewerNextBtn.addEventListener('click', turnNextPage);
  if (viewerCloseBtn) viewerCloseBtn.addEventListener('click', closeReader);

  if (viewerModal) {
    viewerModal.addEventListener('click', (e) => {
      if (e.target === viewerModal) closeReader();
    });
  }

  if (viewerStorySelect) {
    viewerStorySelect.addEventListener('change', (e) => {
      openReader(e.target.value, 0);
    });
  }

  // Final Page Actions
  if (finalBackBtn) {
    finalBackBtn.addEventListener('click', () => {
      closeReader();
      const gal = document.getElementById('gallery');
      if (gal) gal.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (finalExploreBtn) {
    finalExploreBtn.addEventListener('click', () => {
      const currentIdx = BOOK_IDS.indexOf(currentBookId);
      const nextIdx = (currentIdx + 1) % BOOK_IDS.length;
      openReader(BOOK_IDS[nextIdx], 0);
    });
  }

  /* --------------------------------------------------------------------------
     FULLSCREEN CONTROLLER
     -------------------------------------------------------------------------- */
  function enterFullscreen() {
    if (viewerModal) {
      if (viewerModal.requestFullscreen) {
        viewerModal.requestFullscreen();
      } else if (viewerModal.webkitRequestFullscreen) {
        viewerModal.webkitRequestFullscreen();
      }
      viewerModal.classList.add('is-fullscreen');
      if (viewerFullscreenBtn) {
        viewerFullscreenBtn.innerHTML = '<span>⛶ Exit Fullscreen</span>';
      }
    }
  }

  function exitFullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    if (viewerModal) {
      viewerModal.classList.remove('is-fullscreen');
    }
    if (viewerFullscreenBtn) {
      viewerFullscreenBtn.innerHTML = '<span>⛶ Fullscreen</span>';
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement && (!viewerModal || !viewerModal.classList.contains('is-fullscreen'))) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }

  if (viewerFullscreenBtn) {
    viewerFullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      if (viewerModal) viewerModal.classList.remove('is-fullscreen');
      if (viewerFullscreenBtn) viewerFullscreenBtn.innerHTML = '<span>⛶ Fullscreen</span>';
    } else {
      if (viewerModal) viewerModal.classList.add('is-fullscreen');
      if (viewerFullscreenBtn) viewerFullscreenBtn.innerHTML = '<span>⛶ Exit Fullscreen</span>';
    }
  });

  // Mobile Touch Gestures (Swipe Left = Next, Swipe Right = Previous)
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;

  if (viewerStageArea) {
    viewerStageArea.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    viewerStageArea.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          turnNextPage();
        } else {
          turnPrevPage();
        }
      }
    }, { passive: true });
  }

  // Desktop Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (viewerModal && !viewerModal.classList.contains('hidden')) {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        turnNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        turnPrevPage();
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement || (viewerModal && viewerModal.classList.contains('is-fullscreen'))) {
          exitFullscreen();
        } else {
          closeReader();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    }
  });


  /* ==========================================================================
     5B. STORYBOOK COVER DESIGN STUDIO (10 COVERS & SPEC INSPECTOR)
     ========================================================================== */
  const coversGrid = document.getElementById('covers-grid');
  const coverInspectModal = document.getElementById('cover-inspect-modal');
  const coverModalCloseBtn = document.getElementById('cover-modal-close-btn');
  const coverCloseBottomBtn = document.getElementById('cover-close-bottom-btn');

  const coverModalTitle = document.getElementById('cover-modal-title');
  const coverModalGenre = document.getElementById('cover-modal-genre');
  const coverModalImg = document.getElementById('cover-modal-img');
  const coverModalClient = document.getElementById('cover-modal-client');
  const coverSpecFormat = document.getElementById('cover-spec-format');
  const coverSpecTrim = document.getElementById('cover-spec-trim');
  const coverSpecSpine = document.getElementById('cover-spec-spine');
  const coverSpecFinish = document.getElementById('cover-spec-finish');
  const coverSpecAge = document.getElementById('cover-spec-age');
  const coverSpecIsbn = document.getElementById('cover-spec-isbn');
  const coverSpecSynopsis = document.getElementById('cover-spec-synopsis');
  const coverCommissionBtn = document.getElementById('cover-commission-btn');

  function renderCoversGrid(filter = 'all') {
    if (!coversGrid || typeof COVER_DESIGNS_LIBRARY === 'undefined') return;
    coversGrid.innerHTML = '';

    const list = COVER_DESIGNS_LIBRARY;
    list.forEach(cov => {
      const isFaith = cov.genre.toLowerCase().includes('faith') || cov.genre.toLowerCase().includes('christian');
      const isBedtime = cov.genre.toLowerCase().includes('bedtime');
      const isFantasy = cov.genre.toLowerCase().includes('fairytale') || cov.genre.toLowerCase().includes('fantasy');
      const isComic = cov.genre.toLowerCase().includes('graphic') || cov.genre.toLowerCase().includes('comic');

      const matches = (filter === 'all') ||
        (filter === 'faith' && isFaith) ||
        (filter === 'bedtime' && isBedtime) ||
        (filter === 'fairytales' && isFantasy) ||
        (filter === 'comic' && isComic);

      if (!matches) return;

      const card = document.createElement('article');
      card.className = 'cover-card';
      card.innerHTML = `
        <div class="cover-card-preview-wrap">
          <div class="cover-book-mockup protected-art-container">
            <img src="${cov.image}" alt="${cov.title} Storybook Cover" class="protected-art" draggable="false" loading="lazy">
            <div class="cover-spine-edge"></div>
            <div class="cover-foil-shimmer"></div>
            <div class="soft-watermark-overlay"><span class="wm-text">© EphraimArts • Cover Design</span></div>
            <div class="protection-shield"></div>
          </div>
        </div>
        <div class="cover-card-body">
          <div class="cover-badge-row">
            <span class="cover-format-pill">${cov.format}</span>
            <span class="cover-trim-pill">${cov.trimSize}</span>
          </div>
          <h3 class="cover-card-title">${cov.title}</h3>
          <p class="cover-card-synopsis">${cov.synopsis}</p>
          <div class="cover-card-finish-tag">
            <span>✨</span> <span>${cov.finish}</span>
          </div>
          <div class="cover-card-footer">
            <span class="cover-client-name">${cov.client}</span>
            <button class="btn btn-sm btn-outline inspect-cover-btn" data-open-cover="${cov.id}">
              <span>📐 Inspect Print Specs</span>
            </button>
          </div>
        </div>
      `;
      coversGrid.appendChild(card);
    });

    document.querySelectorAll('[data-open-cover]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const covId = btn.getAttribute('data-open-cover');
        openCoverInspector(covId);
      });
    });
  }

  function openCoverInspector(coverId) {

    if (typeof COVER_DESIGNS_LIBRARY === 'undefined') return;
    const cover = COVER_DESIGNS_LIBRARY.find(c => c.id === coverId) || COVER_DESIGNS_LIBRARY[0];
    if (!cover) return;

    if (coverModalTitle) coverModalTitle.textContent = cover.title;
    if (coverModalGenre) coverModalGenre.textContent = cover.genre;
    if (coverModalImg) {
      coverModalImg.src = cover.image;
      coverModalImg.alt = `${cover.title} Print Jacket Specification`;
    }
    if (coverModalClient) coverModalClient.textContent = `Client / Publisher: ${cover.client}`;
    if (coverSpecFormat) coverSpecFormat.textContent = cover.format;
    if (coverSpecTrim) coverSpecTrim.textContent = cover.trimSize;
    if (coverSpecSpine) coverSpecSpine.textContent = cover.spineWidth;
    if (coverSpecFinish) coverSpecFinish.textContent = cover.finish;
    if (coverSpecAge) coverSpecAge.textContent = 'Ages 3–8 • Picture Book / Early Reader';
    if (coverSpecIsbn) coverSpecIsbn.textContent = cover.isbn;
    if (coverSpecSynopsis) coverSpecSynopsis.textContent = cover.synopsis;

    if (coverCommissionBtn) {
      coverCommissionBtn.href = '#commissions';
      coverCommissionBtn.onclick = (e) => { e.preventDefault(); closeCoverInspector(); openCommissionModal('cover'); };
    }

    if (coverInspectModal) {
      coverInspectModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      playHarpChime();
    }
  }

  const openCoverModal = openCoverInspector;
window.openCoverModal = openCoverInspector;
window.openCoverInspector = openCoverInspector;

function closeCoverInspector() {
    if (coverInspectModal) {
      coverInspectModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (coverModalCloseBtn) coverModalCloseBtn.addEventListener('click', closeCoverInspector);
  if (coverCloseBottomBtn) coverCloseBottomBtn.addEventListener('click', closeCoverInspector);
  if (coverInspectModal) {
    coverInspectModal.addEventListener('click', (e) => {
      if (e.target === coverInspectModal) closeCoverInspector();
    });
  }

  document.querySelectorAll('.cover-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cover-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCoversGrid(btn.getAttribute('data-cover-filter'));
    });
  });

  
  /* ==========================================================================
     5D. COMIC BOOK & GRAPHIC NOVEL INSPECTOR (25 PROJECTS)
     ========================================================================== */
  const comicInspectModal = document.getElementById('comic-inspect-modal');
  const comicModalCloseBtn = document.getElementById('comic-modal-close-btn');
  const comicCloseBottomBtn = document.getElementById('comic-close-bottom-btn');
  const comicModalTitle = document.getElementById('comic-modal-title');
  const comicModalGenre = document.getElementById('comic-modal-genre');
  const comicModalImg = document.getElementById('comic-modal-img');
  const comicModalIssue = document.getElementById('comic-modal-issue');
  const comicModalLogline = document.getElementById('comic-modal-logline');
  const comicPanelsContainer = document.getElementById('comic-panels-container');
  const comicSpecStyle = document.getElementById('comic-spec-style');
  const comicSpecPanels = document.getElementById('comic-spec-panels');
  const comicCommissionBtn = document.getElementById('comic-commission-btn');

  function openComicModal(comicId) {
    if (typeof GRAPHIC_NOVELS_LIBRARY === 'undefined') return;
    const comic = GRAPHIC_NOVELS_LIBRARY.find(c => c.id === comicId) || GRAPHIC_NOVELS_LIBRARY[0];
    if (!comic) return;

    if (comicModalTitle) comicModalTitle.textContent = comic.title;
    if (comicModalGenre) comicModalGenre.textContent = comic.categoryLabel || comic.category;
    if (comicModalImg) {
      comicModalImg.src = comic.image;
      comicModalImg.alt = `${comic.title} Graphic Novel Spread`;
    }
    if (comicModalIssue) comicModalIssue.textContent = comic.issue;
    if (comicModalLogline) comicModalLogline.textContent = comic.logline;
    if (comicSpecStyle) comicSpecStyle.textContent = comic.style;
    if (comicSpecPanels) comicSpecPanels.textContent = `${comic.panelsCount} Sequential Panels • Early Reader / Middle Grade`;

    if (comicPanelsContainer) {
      comicPanelsContainer.innerHTML = '';
      (comic.samplePanels || []).forEach(p => {
        const pCard = document.createElement('div');
        pCard.className = 'comic-panel-card';
        pCard.innerHTML = `
          <div class="comic-panel-badge-row">
            <span class="comic-panel-num">Panel ${p.panelNum}</span>
            <span class="comic-panel-caption">${p.caption}</span>
          </div>
          <div class="comic-panel-dialogue">${p.dialogue}</div>
          <div class="comic-panel-focal"><strong>Scene Art:</strong> ${p.focal}</div>
        `;
        comicPanelsContainer.appendChild(pCard);
      });
    }

    if (comicCommissionBtn) {
      comicCommissionBtn.href = '#commissions';
      comicCommissionBtn.onclick = (e) => { e.preventDefault(); closeComicModal(); openCommissionModal('comic'); };
    }

    if (comicInspectModal) {
      comicInspectModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      playHarpChime();
    }
  }

  function closeComicModal() {
    if (comicInspectModal) {
      comicInspectModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  window.openComicModal = openComicModal;

  if (comicModalCloseBtn) comicModalCloseBtn.addEventListener('click', closeComicModal);
  if (comicCloseBottomBtn) comicCloseBottomBtn.addEventListener('click', closeComicModal);
  if (comicInspectModal) {
    comicInspectModal.addEventListener('click', (e) => {
      if (e.target === comicInspectModal) closeComicModal();
    });
  }


  /* ==========================================================================
     6. STORYBOOK TRAILER THEATER (3 TRAILER VIDEOS)
     ========================================================================== */
  const theaterTabs = document.querySelectorAll('.trailer-tab');
  const theaterScreen = document.getElementById('theater-screen');
  const theaterBgArt = document.getElementById('theater-bg-art');
  const theaterCaptionText = document.getElementById('theater-caption-text');
  const theaterPlayBtn = document.getElementById('theater-play-btn');
  const theaterPlayIcon = document.getElementById('theater-play-icon');
  const theaterTimeline = document.getElementById('theater-timeline');
  const theaterTimeDisplay = document.getElementById('theater-time-display');
  const theaterFullscreenBtn = document.getElementById('theater-fullscreen-btn');

  const theaterGenreBadge = document.getElementById('theater-genre-badge');
  const theaterTitle = document.getElementById('theater-title');
  const theaterLogline = document.getElementById('theater-logline');
  const theaterStatViews = document.getElementById('theater-stat-views');
  const theaterStatFunded = document.getElementById('theater-stat-funded');
  const theaterSoundtrackDesc = document.getElementById('theater-soundtrack-desc');
  const theaterScenesGrid = document.getElementById('theater-scenes-grid');
  const theaterCommissionBtn = document.getElementById('theater-commission-btn');

  let activeTrailerId = 'trailer-01';
  let trailerCurrentTime = 0;
  let trailerDuration = 45;
  let isTrailerPlaying = false;
  let isTrailerSoundOn = false;
  let trailerInterval = null;

  function loadTrailer(trailerId) {
    if (typeof TRAILER_VIDEOS_LIBRARY === 'undefined') return;
    const trailer = TRAILER_VIDEOS_LIBRARY.find(t => t.id === trailerId) || TRAILER_VIDEOS_LIBRARY[0];
    if (!trailer) return;

    activeTrailerId = trailer.id;
    const parts = trailer.duration.split(':');
    trailerDuration = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    trailerCurrentTime = 0;

    if (theaterBgArt) {
      theaterBgArt.src = trailer.coverImage || trailer.thumbnail || 'web_images/project_little_light.webp';
      theaterBgArt.alt = `${trailer.title} trailer frame`;
    }
    if (theaterGenreBadge) theaterGenreBadge.textContent = trailer.genre.toUpperCase();
    if (theaterTitle) theaterTitle.textContent = trailer.title;
    if (theaterLogline) theaterLogline.textContent = `“${trailer.logline}”`;
    if (theaterStatViews) theaterStatViews.textContent = trailer.stats?.views || trailer.videoStats?.views || '24K';
    if (theaterStatFunded) theaterStatFunded.textContent = trailer.stats?.completionRate || trailer.videoStats?.funded || '95%';
    if (theaterSoundtrackDesc) theaterSoundtrackDesc.textContent = trailer.soundtrack;

    if (theaterTimeline) {
      theaterTimeline.max = trailerDuration;
      theaterTimeline.value = 0;
    }

    renderTrailerScenes(trailer);
    updateTrailerTimeDisplay();
    updateTrailerCaption();

    isTrailerPlaying = true;
    if (theaterScreen) theaterScreen.classList.add('playing');
    if (theaterPlayIcon) theaterPlayIcon.textContent = '❚❚';
    restartTrailerTimer();
    playTrailerChime();
  }

  function renderTrailerScenes(trailer) {
    if (!theaterScenesGrid) return;
    theaterScenesGrid.innerHTML = '';
    const scenes = trailer.scenes || [];

    scenes.forEach((sc, idx) => {
      const card = document.createElement('div');
      card.className = `scene-card ${idx === 0 ? 'active' : ''}`;
      card.setAttribute('data-scene-idx', idx);
      card.innerHTML = `
        <span class="scene-timestamp">⏱️ ${sc.timestamp}</span>
        <span class="scene-visual-note">${sc.caption}</span>
      `;
      card.addEventListener('click', () => {
        const timeMatch = sc.timestamp.match(/^([0-9]+):([0-9]+)/);
        if (timeMatch) {
          trailerCurrentTime = parseInt(timeMatch[1], 10) * 60 + parseInt(timeMatch[2], 10);
          if (theaterTimeline) theaterTimeline.value = trailerCurrentTime;
          updateTrailerTimeDisplay();
          updateTrailerCaption();
          document.querySelectorAll('.scene-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        }
      });
      theaterScenesGrid.appendChild(card);
    });
  }

  function updateTrailerCaption() {
    if (!theaterCaptionText || typeof TRAILER_VIDEOS_LIBRARY === 'undefined') return;
    const trailer = TRAILER_VIDEOS_LIBRARY.find(t => t.id === activeTrailerId);
    if (!trailer) return;

    const scenes = trailer.scenes || [];
    let currentScene = scenes[0];

    scenes.forEach(sc => {
      const m = sc.timestamp.match(/^([0-9]+):([0-9]+)\s*-\s*([0-9]+):([0-9]+)/);
      if (m) {
        const start = parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
        const end = parseInt(m[3], 10) * 60 + parseInt(m[4], 10);
        if (trailerCurrentTime >= start && trailerCurrentTime <= end) {
          currentScene = sc;
        }
      }
    });

    if (currentScene && currentScene.caption) {
      theaterCaptionText.textContent = `“${currentScene.caption}”`;
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateTrailerTimeDisplay() {
    if (theaterTimeDisplay) {
      theaterTimeDisplay.textContent = `${formatTime(trailerCurrentTime)} / ${formatTime(trailerDuration)}`;
    }
  }

  function restartTrailerTimer() {
    if (trailerInterval) clearInterval(trailerInterval);
    trailerInterval = setInterval(() => {
      if (isTrailerPlaying) {
        trailerCurrentTime++;
        if (trailerCurrentTime > trailerDuration) {
          trailerCurrentTime = 0;
        }
        if (theaterTimeline) theaterTimeline.value = trailerCurrentTime;
        updateTrailerTimeDisplay();
        updateTrailerCaption();

        
      }
    }, 1000);
  }

  if (theaterPlayBtn) {
    theaterPlayBtn.addEventListener('click', () => {
      isTrailerPlaying = !isTrailerPlaying;
      if (isTrailerPlaying) {
        if (theaterScreen) theaterScreen.classList.add('playing');
        if (theaterPlayIcon) theaterPlayIcon.textContent = '❚❚';
      } else {
        if (theaterScreen) theaterScreen.classList.remove('playing');
        if (theaterPlayIcon) theaterPlayIcon.textContent = '▶';
      }
    });
  }

  if (theaterTimeline) {
    theaterTimeline.addEventListener('input', (e) => {
      trailerCurrentTime = parseInt(e.target.value, 10);
      updateTrailerTimeDisplay();
      updateTrailerCaption();
    });
  }

  if (theaterFullscreenBtn && theaterScreen) {
    theaterFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        theaterScreen.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  theaterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      theaterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const trailerId = tab.getAttribute('data-trailer-id');
      loadTrailer(trailerId);
    });
  });

  if (theaterCommissionBtn) {
    theaterCommissionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCommissionModal('trailer');
    });
  }

  if (trailerCloseBtn) trailerCloseBtn.addEventListener('click', closeOldTrailerModal);
  if (trailerModal) {
    trailerModal.addEventListener('click', (e) => {
      if (e.target === trailerModal) closeOldTrailerModal();
    });
  }

    /* ==========================================================================
     7. PORTFOLIO GALLERY CONTROLLER (43 VISIBLE PROJECTS & CATEGORY FILTERS)
     ========================================================================== */
  const galleryGrid = document.getElementById('gallery-grid');
  const searchInput = document.getElementById('gallery-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const galleryEmptyState = document.getElementById('gallery-empty');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const filterTabs = document.querySelectorAll('.filter-tab');

  let activeCategory = 'all';

  function attachGalleryCardListeners() {
    // Storybook open triggers
    document.querySelectorAll('[data-open-story]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const storyId = btn.getAttribute('data-open-story');
        openReader(storyId, 0);
      });
    });

    // Cover inspection triggers
    document.querySelectorAll('[data-open-cover]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const coverId = btn.getAttribute('data-open-cover');
        openCoverModal(coverId);
      });
    });

    // Trailer triggers
    document.querySelectorAll('[data-open-trailer]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const trailerId = btn.getAttribute('data-open-trailer');
        loadTrailer(trailerId);
        const trailerSection = document.getElementById('trailers');
        if (trailerSection) trailerSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Comic / Graphic Novel triggers
    document.querySelectorAll('[data-open-comic]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const comicId = btn.getAttribute('data-open-comic');
        openComicModal(comicId);
      });
    });

    // Shield click triggers
    document.querySelectorAll('.protection-shield').forEach(shield => {
      shield.addEventListener('click', (e) => {
        const container = shield.closest('[data-story-id]');
        if (container) {
          const type = container.getAttribute('data-project-type') || 'storybook';
          const id = container.getAttribute('data-story-id');
          if (type === 'cover') {
            openCoverModal(id);
          } else if (type === 'trailer') {
            loadTrailer(id);
            const trailerSection = document.getElementById('trailers');
            if (trailerSection) trailerSection.scrollIntoView({ behavior: 'smooth' });
          } else if (type === 'comic') {
            openComicModal(id);
          } else {
            openReader(id, 0);
          }
        }
      });
    });

    // Rate piece triggers
    document.querySelectorAll('.rate-piece-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pieceId = btn.getAttribute('data-piece-id') || 'christian-01';
        openReviewModal(pieceId);
      });
    });
  }

  function applyGalleryFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach(card => {
      const categoryStr = (card.getAttribute('data-category') || '').toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();

      let matchesCategory = false;
      const typeStr = (card.getAttribute('data-type') || card.getAttribute('data-project-type') || '').toLowerCase();
      
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'storybook' || activeCategory === 'storybooks') {
        matchesCategory = (typeStr === 'storybook');
      } else if (activeCategory === 'cover' || activeCategory === 'covers') {
        matchesCategory = (typeStr === 'cover');
      } else if (activeCategory === 'trailer' || activeCategory === 'trailers') {
        matchesCategory = (typeStr === 'trailer');
      } else if (activeCategory === 'comic' || activeCategory === 'comics') {
        matchesCategory = (typeStr === 'comic');
      } else if (activeCategory === 'christian' || activeCategory === 'faith') {
        matchesCategory = categoryStr.includes('christian') || categoryStr.includes('faith');
      } else if (activeCategory === 'bedtime') {
        matchesCategory = categoryStr.includes('bedtime');
      } else if (activeCategory === 'fairytale' || activeCategory === 'fairytales') {
        matchesCategory = categoryStr.includes('fairytale');
      } else {
        matchesCategory = categoryStr.includes(activeCategory) || typeStr.includes(activeCategory);
      }

      const matchesSearch = !query || 
        keywords.includes(query) || 
        title.includes(query) || 
        desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (galleryEmptyState) {
      galleryEmptyState.classList.toggle('hidden', visibleCount > 0);
    }

    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle('hidden', !query);
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-filter');
      applyGalleryFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyGalleryFilter);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      applyGalleryFilter();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCategory = 'all';
      if (searchInput) searchInput.value = '';
      filterTabs.forEach((t, i) => {
        t.classList.toggle('active', i === 0);
        t.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      });
      applyGalleryFilter();
    });
  }

  // Initialize card listeners and verify gallery visibility
  attachGalleryCardListeners();
  applyGalleryFilter();


  /* ==========================================================================
     8. PIGMENT EXPLORER (ABOUT SECTION)
     ========================================================================== */
  const pigmentBtns = document.querySelectorAll('.pigment-btn');
  const pigmentInfoBox = document.getElementById('pigment-info');

  pigmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-color-name');
      const hex = btn.getAttribute('data-color-hex');
      const desc = btn.getAttribute('data-color-desc');

      if (pigmentInfoBox) {
        pigmentInfoBox.innerHTML = `
          <strong>${name} (${hex}):</strong> ${desc}
        `;
        pigmentInfoBox.style.borderLeftColor = hex;
      }
      playHarpChime();
    });
  });

  /* ==========================================================================
     9. COMMISSION MODAL & INQUIRIES (4 SERVICE OFFERINGS)
     ========================================================================== */
  const commissionModal = document.getElementById('commission-modal');
  const commCloseBtn = document.getElementById('comm-close-btn');
  const commForm = document.getElementById('commission-form');
  const commTypeSelect = document.getElementById('comm-type-select');
  const commSpecializationSelect = document.getElementById('comm-specialization-select');
  const commPieces = document.getElementById('comm-pieces');

  function openCommissionModal(typeVal = 'illustration') {
    if (commTypeSelect) commTypeSelect.value = typeVal;
    if (commissionModal) {
      commissionModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCommissionModal() {
    if (commissionModal) {
      commissionModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-inquire').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-tier') || 'illustration';
      openCommissionModal(tier);
    });
  });

  const trailerInquireBtn = document.getElementById('trailer-inquire-btn');
  if (trailerInquireBtn) {
    trailerInquireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeTrailerModal();
      openCommissionModal('trailer');
    });
  }

  if (commCloseBtn) commCloseBtn.addEventListener('click', closeCommissionModal);
  if (commissionModal) {
    commissionModal.addEventListener('click', (e) => {
      if (e.target === commissionModal) closeCommissionModal();
    });
  }

  if (commForm) {
    commForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeCommissionModal();
      playHarpChime();
      showFeedbackToast('🕊️ Inquiry received! Ephraim will respond with warmth within 24–48 hours.', '💌');
      commForm.reset();
    });
  }

  /* ==========================================================================
     10. SHOP & ARCHIVE FILTERS (FINE ART PRINTS & RESOURCES)
     ========================================================================== */
  const shopFilterBtns = document.querySelectorAll('.shop-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  shopFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      shopFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-shop-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-shop-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     12. RATINGS & COMMUNITY REFLECTIONS SYSTEM
     ========================================================================== */
  const reviewModal = document.getElementById('review-modal');
  const reviewCloseBtn = document.getElementById('review-close-btn');
  const reviewForm = document.getElementById('review-form');
  const reviewArtworkSelect = document.getElementById('review-artwork-select');
  const starPicker = document.getElementById('star-picker');
  const ratingFeedbackLabel = document.getElementById('rating-feedback-label');
  const testimonialsGrid = document.getElementById('testimonials-grid');

  let selectedRating = 5;

  const RATING_PHRASES = {
    1: '1.0 — Need gentle revisions',
    2: '2.0 — Encouraging potential',
    3: '3.0 — Sweet & comforting',
    4: '4.0 — Wonderfully painted & tender',
    5: '5.0 — Heavenly & Wonder-filled!'
  };

  if (starPicker) {
    const starBtns = starPicker.querySelectorAll('.star-pick');
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'), 10);
        selectedRating = rating;
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= rating);
        });
        if (ratingFeedbackLabel) {
          ratingFeedbackLabel.textContent = RATING_PHRASES[rating] || '5.0 — Heavenly';
        }
      });
    });
  }

  function openReviewModal(artworkId = 'good-shepherd') {
    if (reviewArtworkSelect) reviewArtworkSelect.value = artworkId;
    if (reviewModal) {
      reviewModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReviewModal() {
    if (reviewModal) {
      reviewModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.open-review-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openReviewModal('good-shepherd'));
  });

  document.querySelectorAll('.rate-piece-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pieceId = btn.getAttribute('data-piece-id') || 'good-shepherd';
      openReviewModal(pieceId);
    });
  });

  if (reviewCloseBtn) reviewCloseBtn.addEventListener('click', closeReviewModal);
  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) closeReviewModal();
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('review-author-name')?.value || 'A Storybook Reader';
      const role = document.getElementById('review-author-role')?.value || 'Parent / Author';
      const text = document.getElementById('review-text')?.value || 'Beautiful!';
      const artSelect = reviewArtworkSelect?.options[reviewArtworkSelect.selectedIndex]?.text || '';

      if (testimonialsGrid) {
        const card = document.createElement('blockquote');
        card.className = 'testimonial-card';
        card.innerHTML = `
          <div class="testimonial-stars">
            ${'<svg class="rating-star-icon" viewBox="0 0 24 24"><use href="#icon-watercolor-star"/></svg>'.repeat(selectedRating)}
          </div>
          <p class="testimonial-quote">“${text}”</p>
          <footer class="testimonial-author">
            <span class="author-avatar">✨</span>
            <div class="author-details">
              <cite class="author-name">${author}</cite>
              <span class="author-role">${role} • Regarding “${artSelect}”</span>
              <span class="verified-tag">✓ Verified Community Reflection</span>
            </div>
          </footer>
        `;
        testimonialsGrid.prepend(card);
      }

      closeReviewModal();
      playHarpChime();
      showFeedbackToast('🌟 Thank you! Your reflection has been inscribed into the storybook.', '🕊️');
      reviewForm.reset();
    });
  }

  /* ==========================================================================
     13. CONTACT STUDIO & NEWSLETTER
     ========================================================================== */
  const contactForm = document.getElementById('studio-contact-form');
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterGiftBox = document.getElementById('newsletter-gift-box');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playHarpChime();
      showFeedbackToast('🕊️ Your letter has been sent to Ephraim\'s desk with care.', '💌');
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (newsletterGiftBox) newsletterGiftBox.classList.remove('hidden');
      playHarpChime();
      showFeedbackToast('🎉 Welcome to The Storybook Post! Your free coloring PDF is unlocked below.', '🎁');
    });
  }

  /* ==========================================================================
     14. MOBILE MENU & UTILITIES
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  const feedbackToast = document.getElementById('feedback-toast');
  const feedbackToastIcon = document.getElementById('feedback-toast-icon');
  const feedbackToastMsg = document.getElementById('feedback-toast-msg');

  function showFeedbackToast(msg, icon = '✨') {
    if (!feedbackToast) return;
    if (feedbackToastIcon) feedbackToastIcon.textContent = icon;
    if (feedbackToastMsg) feedbackToastMsg.textContent = msg;

    feedbackToast.classList.remove('hidden');
    if (window._fbToastTimer) clearTimeout(window._fbToastTimer);
    window._fbToastTimer = setTimeout(() => {
      feedbackToast.classList.add('hidden');
    }, 4000);
  }

  console.log('EphraimArts storybook platform initialized with 3 specializations & 4 core offerings.');
});
