// ============================================
// INTRO — types out the line letter by letter, then opens the site
// ============================================

// Edit this line to change what gets typed on the blank first screen.
const INTRO_TEXT = "Hey My beautiful Sudha, this one is for YOU";

const introEl = document.getElementById("intro");
const typedEl = document.getElementById("typed");
const cursorEl = document.getElementById("cursor");

document.body.classList.add("intro-active");

function typeIntro() {
  let i = 0;
  function typeNext() {
    if (i < INTRO_TEXT.length) {
      typedEl.textContent += INTRO_TEXT[i];
      i++;
      // slight natural variation in typing speed
      const delay = 45 + Math.random() * 55;
      setTimeout(typeNext, delay);
    } else {
      cursorEl.classList.add("cursor-done");
      setTimeout(openSite, 1100);
    }
  }
  typeNext();
}

function openSite() {
  introEl.classList.add("intro-hidden");
  document.body.classList.remove("intro-active");
  setTimeout(() => { introEl.style.display = "none"; }, 1000);
}

// Let an impatient click/tap skip straight to the site
introEl.addEventListener("click", () => {
  typedEl.textContent = INTRO_TEXT;
  openSite();
});

typeIntro();

// ============================================
// HEADER QUOTE
// ============================================
document.getElementById("hero-quote").textContent = `\u201C${HEADER_QUOTE}\u201D`;

// ============================================
// ALTERNATING PHOTO / QUOTE FRAMES
// frame-1 uses PHOTOS[0], QUOTES[0], PHOTOS[1], QUOTES[1]
// frame-2 uses PHOTOS[2], QUOTES[2], PHOTOS[3], QUOTES[3]
// (cycles back to the start if you have fewer than 4 of either)
// ============================================
function buildFrame(elementId, photoOffset, quoteOffset, startDelay) {
  const frame = document.getElementById(elementId);
  if (!frame || PHOTOS.length === 0) return;

  const sequence = [
    { type: "photo", value: PHOTOS[photoOffset % PHOTOS.length] },
    { type: "quote", value: QUOTES[quoteOffset % QUOTES.length] },
    { type: "photo", value: PHOTOS[(photoOffset + 1) % PHOTOS.length] },
    { type: "quote", value: QUOTES[(quoteOffset + 1) % QUOTES.length] },
  ];

  sequence.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "frame-item" + (i === 0 ? " active" : "");

    if (item.type === "photo") {
      const img = document.createElement("img");
      img.src = item.value;
      img.alt = "A photo of Sudha";
      img.onerror = () => {
        el.removeChild(img);
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder";
        placeholder.textContent = `Add "${item.value}" to the photos folder`;
        el.appendChild(placeholder);
      };
      el.appendChild(img);
    } else {
      el.classList.add("quote-item");
      const mark = document.createElement("span");
      mark.className = "frame-quote-mark";
      mark.textContent = "\u201C";
      const text = document.createElement("p");
      text.className = "frame-quote-text";
      text.textContent = item.value;
      el.appendChild(mark);
      el.appendChild(text);
    }

    frame.appendChild(el);
  });

  let current = 0;
  setTimeout(() => {
    setInterval(() => {
      const items = frame.querySelectorAll(".frame-item");
      items[current].classList.remove("active");
      current = (current + 1) % items.length;
      items[current].classList.add("active");
    }, 2000);
  }, startDelay);
}

buildFrame("frame-1", 0, 0, 0);
buildFrame("frame-2", 2, 2, 1000);

// ============================================
// BACKGROUND MUSIC — tap the corner button to play/pause
// (browsers block audio from starting on its own, so a tap
// is required the first time — this is normal)
// ============================================
const audioEl = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
const noteIcon = document.getElementById("music-icon-note");
const pauseIcon = document.getElementById("music-icon-pause");

audioEl.src = MUSIC_FILE;

musicBtn.addEventListener("click", () => {
  if (audioEl.paused) {
    audioEl.play().catch(() => {
      // file missing or blocked — button just stays in "paused" state
    });
  } else {
    audioEl.pause();
  }
});

audioEl.addEventListener("play", () => {
  musicBtn.classList.add("playing");
  musicBtn.setAttribute("aria-pressed", "true");
  musicBtn.setAttribute("aria-label", "Pause music");
  noteIcon.hidden = true;
  pauseIcon.hidden = false;
});

audioEl.addEventListener("pause", () => {
  musicBtn.classList.remove("playing");
  musicBtn.setAttribute("aria-pressed", "false");
  musicBtn.setAttribute("aria-label", "Play music");
  noteIcon.hidden = false;
  pauseIcon.hidden = true;
});
