(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  var M = window.MOTION || {
    duration: { fast: 0.3, normal: 0.6, slow: 0.9, hero: 1.1 },
    ease: { standard: "power2.out", inOut: "power2.inOut", expressive: "expo.out" },
    stagger: { tight: 0.035, normal: 0.06, loose: 0.12 },
    distance: { sm: 14, md: 26, lg: 46 },
    scrollTrigger: { start: "top 88%", once: true },
  };
  var hasGSAP = typeof gsap !== "undefined";
  if (hasGSAP && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Glitch text reveal ---------------- */
  var GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function glitchReveal(el, opts) {
    opts = opts || {};
    var final = el.getAttribute("data-glitch") || el.textContent;
    var duration = opts.duration || 900;
    var stepMs = 32;
    var steps = Math.ceil(duration / stepMs);

    if (reduceMotion) {
      el.textContent = final;
      return;
    }

    var frame = 0;
    el.setAttribute("aria-label", final);
    var timer = setInterval(function () {
      frame++;
      var lockCount = Math.floor((frame / steps) * final.length);
      var out = "";
      for (var i = 0; i < final.length; i++) {
        var ch = final[i];
        if (ch === " " || ch === "\n") { out += ch; continue; }
        out += i < lockCount ? ch : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      el.textContent = out;
      if (frame >= steps) {
        clearInterval(timer);
        el.textContent = final;
      }
    }, stepMs);
  }

  function playHeroGlitch() {
    document.querySelectorAll("[data-glitch-hero]").forEach(function (el) {
      glitchReveal(el, { duration: 1100 });
    });
  }

  /* ---------------- HUD loop counter ---------------- */
  var loopCount = 0;
  var loopLabel = document.querySelector("[data-loop]");
  function setLoop(n) {
    loopCount = n;
    if (loopLabel) loopLabel.textContent = String(n).padStart(2, "0");
  }
  setLoop(0);

  /* ---------------- Scrolling ----------------
     Wheel/touch scrolling is native throughout — a Lenis smooth-scroll
     layer was tried here and pulled back out: re-smoothing input the
     OS already smooths is what reads as "delay when I scroll," and
     its .scrollTo() proved unreliable for nav-link jumps once wheel
     smoothing was disabled. ScrollTrigger works directly off native
     scroll by default, so nothing else depends on this. */
  function scrollToTarget(top) {
    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* ---------------- HUD scrolled state (write only on threshold crossing) ---------------- */
  var hud = document.querySelector(".hud");
  var hudScrolled = false;
  function updateHud() {
    var scrolled = window.scrollY > 20;
    if (scrolled !== hudScrolled) {
      hudScrolled = scrolled;
      if (hud) hud.style.borderBottomColor = scrolled ? "var(--line-strong)" : "var(--line)";
    }
  }

  /* ---------------- Scroll progress bar ---------------- */
  var progressBar = document.querySelector(".scroll-progress");
  function updateProgressBar(p) {
    if (progressBar) progressBar.style.width = (p * 100).toFixed(2) + "%";
  }

  /* ---------------- Capability word-reveal (DESIGN / BUILD / AUTOMATE / CREATE) ---------------- */
  function initWordReveal() {
    var words = document.querySelectorAll(".wr-word");
    var panels = document.querySelectorAll(".wr-panel");
    function activate(key) {
      words.forEach(function (w) {
        var active = w.getAttribute("data-reveal-word") === key;
        w.classList.toggle("is-active", active);
        w.setAttribute("aria-selected", active ? "true" : "false");
      });
      panels.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-word-panel") === key); });
    }
    words.forEach(function (w) {
      w.addEventListener("click", function () { activate(w.getAttribute("data-reveal-word")); });
      if (!isCoarsePointer) {
        w.addEventListener("mouseenter", function () { activate(w.getAttribute("data-reveal-word")); });
      }
    });
  }

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var menuLinks = document.querySelectorAll(".mobile-menu a");
  if (menuBtn) menuBtn.addEventListener("click", function () { document.body.classList.toggle("menu-open"); });
  menuLinks.forEach(function (a) { a.addEventListener("click", function () { document.body.classList.remove("menu-open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.body.classList.remove("menu-open"); });

  /* ---------------- Reveal on scroll (GSAP + ScrollTrigger, MOTION tokens) ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !hasGSAP) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    revealEls.forEach(function (el) {
      var delay = parseFloat((el.style.getPropertyValue("--d") || "0").replace("ms", "")) / 1000 || 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: M.distance.md },
        {
          opacity: 1, y: 0, duration: M.duration.normal, delay: delay, ease: M.ease.standard,
          scrollTrigger: { trigger: el, start: M.scrollTrigger.start, once: true },
        }
      );
      var glitchTarget = el.querySelector("[data-glitch-on-reveal]");
      if (glitchTarget) {
        ScrollTrigger.create({
          trigger: el, start: M.scrollTrigger.start, once: true,
          onEnter: function () { glitchReveal(glitchTarget, { duration: 700 }); },
        });
      }
    });
  }

  /* ---------------- RevealText: word-level split reveal for headings ---------------- */
  function initRevealText() {
    if (reduceMotion || !hasGSAP) return;
    document.querySelectorAll("[data-reveal-text]").forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map(function (w) { return '<span class="rt-word"><span class="rt-word-inner">' + w + "</span></span>"; })
        .join(" ");
      gsap.from(el.querySelectorAll(".rt-word-inner"), {
        yPercent: 110, opacity: 0, duration: M.duration.normal, ease: M.ease.standard, stagger: M.stagger.normal,
        scrollTrigger: { trigger: el, start: M.scrollTrigger.start, once: true },
      });
    });
  }

  /* ---------------- Scroll-linked parallax (ScrollTrigger scrub) ---------------- */
  function initParallax() {
    if (reduceMotion || !hasGSAP) return;
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      gsap.to(el, {
        yPercent: speed * 40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
    });
  }

  /* ---------------- Image clip-path reveal (featured work media) ---------------- */
  function initImageReveal() {
    var frames = document.querySelectorAll(".work-featured-media");
    if (reduceMotion || !hasGSAP) {
      frames.forEach(function (f) { f.style.clipPath = "inset(0 0 0 0)"; });
      return;
    }
    frames.forEach(function (frame) {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)", duration: M.duration.slow, ease: M.ease.expressive,
          scrollTrigger: { trigger: frame, start: M.scrollTrigger.start, once: true },
        }
      );
    });
  }

  /* ---------------- Reticle cursor (position applied once per frame, not per event) ---------------- */
  var cursor = null;
  if (!isCoarsePointer && !reduceMotion) {
    document.documentElement.classList.add("has-reticle");
    var dot = document.createElement("div");
    dot.className = "reticle-dot";
    var box = document.createElement("div");
    box.className = "reticle-box";
    document.body.appendChild(dot);
    document.body.appendChild(box);

    cursor = { dot: dot, box: box, mx: window.innerWidth / 2, my: window.innerHeight / 2, bx: 0, by: 0 };
    cursor.bx = cursor.mx; cursor.by = cursor.my;

    window.addEventListener("mousemove", function (e) {
      cursor.mx = e.clientX; cursor.my = e.clientY;
    }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, [data-cursor-hover]")) box.classList.add("is-active");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, button, [data-cursor-hover]")) box.classList.remove("is-active");
    });
  }
  function updateCursor() {
    if (!cursor) return;
    cursor.dot.style.transform = "translate3d(" + cursor.mx + "px," + cursor.my + "px,0) translate(-50%,-50%)";
    cursor.bx += (cursor.mx - cursor.bx) * 0.2;
    cursor.by += (cursor.my - cursor.by) * 0.2;
    cursor.box.style.transform = "translate3d(" + cursor.bx + "px," + cursor.by + "px,0) translate(-50%,-50%)";
  }

  /* ---------------- WebGL experience layer (assets/js/scene.js) ----------------
     The camera-rig / node-network / flow-pipeline / gallery-marker scene
     lives in scene.js so the two concerns (DOM interaction, 3D world)
     stay separable. This file only initializes it, ticks it from the
     shared frame loop, and wires DOM hover/click into its API. */
  var sceneReady = false;
  function initScene() {
    if (window.DCScene) sceneReady = window.DCScene.init();
    hideBootOverlay();
  }

  /* ---------------- Boot overlay ---------------- */
  var bootOverlay = document.getElementById("boot-overlay");
  var bootHidden = false;
  function hideBootOverlay() {
    if (bootHidden || !bootOverlay) return;
    bootHidden = true;
    bootOverlay.classList.add("is-hidden");
  }
  // Never let the overlay block content indefinitely if the scene fails
  // to initialize for any reason (slow network, no WebGL, etc.).
  setTimeout(hideBootOverlay, reduceMotion ? 0 : 1400);

  /* Hovering a flow-node in the AI/Automation or GoHighLevel diagrams
     highlights the matching 3D node in that chapter's node network. */
  function initNodeHighlighting() {
    if (isCoarsePointer) return;
    document.querySelectorAll("#ai-automation [data-node]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        if (sceneReady) window.DCScene.highlightNode("ai", el.getAttribute("data-node"));
      });
      el.addEventListener("mouseleave", function () {
        if (sceneReady) window.DCScene.clearHighlight("ai");
      });
    });
    document.querySelectorAll("#ghl-flow [data-node]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        if (sceneReady) window.DCScene.highlightNode("ghl", el.getAttribute("data-node"));
      });
      el.addEventListener("mouseleave", function () {
        if (sceneReady) window.DCScene.clearHighlight("ghl");
      });
    });
  }

  /* Clicking a project row moves the camera's look-target toward that
     project's marker in the 3D work gallery, and updates the readout. */
  function initGalleryFocus() {
    var rows = document.querySelectorAll("#work-listing [data-marker-index]");
    rows.forEach(function (row) {
      row.addEventListener("click", function () {
        if (!sceneReady) return;
        var idx = parseInt(row.getAttribute("data-marker-index"), 10);
        var name = row.querySelector(".name");
        window.DCScene.focusMarker(idx, name ? name.textContent : "");
      });
    });
  }

  /* Hovering a published video row shows an inline Drive preview instead
     of requiring a click-through — click still opens Drive directly as a
     fallback for touch/keyboard users, who can't hover. */
  function driveEmbedUrl(viewUrl) {
    var m = viewUrl && viewUrl.match(/\/file\/d\/([^/]+)/);
    return m ? "https://drive.google.com/file/d/" + m[1] + "/preview" : null;
  }
  function initVideoPreview() {
    if (isCoarsePointer) return;
    var rows = document.querySelectorAll("#work-listing a.dir-row[href*='drive.google.com']");
    if (!rows.length) return;

    var preview = document.createElement("div");
    preview.className = "video-preview";
    preview.setAttribute("aria-hidden", "true");
    var frame = document.createElement("iframe");
    frame.setAttribute("allow", "autoplay");
    frame.setAttribute("frameborder", "0");
    preview.appendChild(frame);
    document.body.appendChild(preview);

    var showTimer = null;
    var activeRow = null;

    function position(row) {
      var rect = row.getBoundingClientRect();
      var top = Math.max(12, Math.min(rect.top, window.innerHeight - 200));
      var left = rect.right + 16;
      if (left + 320 > window.innerWidth) left = Math.max(12, rect.left - 336);
      preview.style.top = top + "px";
      preview.style.left = left + "px";
    }

    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        var embed = driveEmbedUrl(row.getAttribute("href"));
        if (!embed) return;
        activeRow = row;
        clearTimeout(showTimer);
        showTimer = setTimeout(function () {
          if (activeRow !== row) return;
          frame.src = embed;
          position(row);
          preview.classList.add("is-visible");
        }, 220);
      });
      row.addEventListener("mouseleave", function () {
        if (activeRow === row) activeRow = null;
        clearTimeout(showTimer);
        preview.classList.remove("is-visible");
        frame.src = "";
      });
    });
  }

  /* ---------------- Panel tilt-on-hover (rect cached, applied once per frame) ---------------- */
  function initTilt() {
    if (isCoarsePointer || reduceMotion) return;
    var targets = document.querySelectorAll(".panel, .module-card");
    targets.forEach(function (el) {
      var rect = null;
      var pendingX = 0, pendingY = 0;
      var raf = null;
      function apply() {
        raf = null;
        el.style.transform = "perspective(900px) rotateX(" + (-pendingY * 5).toFixed(2) + "deg) rotateY(" + (pendingX * 6).toFixed(2) + "deg) translateZ(0)";
      }
      el.addEventListener("mouseenter", function () {
        rect = el.getBoundingClientRect();
        el.classList.add("is-tilting");
      });
      el.addEventListener("mousemove", function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        pendingX = (e.clientX - rect.left) / rect.width - 0.5;
        pendingY = (e.clientY - rect.top) / rect.height - 0.5;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener("mouseleave", function () {
        rect = null;
        el.style.transform = "";
        el.classList.remove("is-tilting");
      });
    });
  }

  /* ---------------- Work filters ---------------- */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var workRows = document.querySelectorAll("[data-tags]");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      workRows.forEach(function (row) {
        var tags = (row.getAttribute("data-tags") || "").split(",");
        row.style.display = (f === "all" || tags.indexOf(f) !== -1) ? "" : "none";
      });
      if (hasGSAP && typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  });

  /* ---------------- "View Projects" (per Selected Work category) ---------------- */
  document.querySelectorAll("[data-view-projects]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-view-projects");
      var filterBtn = document.querySelector('[data-filter="' + f + '"]');
      if (filterBtn) filterBtn.click();
      var listing = document.getElementById("work-listing");
      if (listing) {
        var top = listing.getBoundingClientRect().top + window.scrollY - 90;
        scrollToTarget(top);
      }
    });
  });

  /* ---------------- Rebuild / origin gate ---------------- */
  var rebuildBtns = document.querySelectorAll("[data-rebuild]");
  rebuildBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLoop(loopCount + 1);
      scrollToTarget(0);
      setTimeout(playHeroGlitch, reduceMotion ? 0 : 500);
    });
  });

  /* ---------------- Anchor scroll with HUD offset ---------------- */
  document.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 50;
      scrollToTarget(top);
    });
  });

  /* ---------------- Single shared frame loop ----------------
     One requestAnimationFrame driving scroll-progress sampling, the
     HUD border check, the cursor, and the WebGL scene — rather than
     three independent loops each doing their own work. */
  var scrollProgress = 0;
  function frame(now) {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    updateHud();
    updateProgressBar(scrollProgress);
    updateCursor();
    if (sceneReady) window.DCScene.frame(now, window.scrollY);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------- Boot ---------------- */
  initTilt();
  initRevealText();
  initParallax();
  initImageReveal();
  initWordReveal();
  initNodeHighlighting();
  initGalleryFocus();
  initVideoPreview();
  window.addEventListener("load", function () {
    setTimeout(playHeroGlitch, 150);
    initScene();
    if (hasGSAP && typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
})();
