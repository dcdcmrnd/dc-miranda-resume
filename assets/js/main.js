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

  /* ---------------- Persistent scroll-reactive WebGL backdrop ---------------- */
  var webglTick = null; // set once initWebGLBackdrop() finishes setting up; called from the shared frame loop
  function initWebGLBackdrop() {
    var canvas = document.getElementById("webgl-canvas");
    var wrap = document.querySelector(".webgl-backdrop");
    if (!canvas || !wrap || reduceMotion || typeof THREE === "undefined") {
      if (wrap) wrap.style.display = "none";
      return;
    }
    var w = window.innerWidth, h = window.innerHeight;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
    } catch (e) {
      wrap.style.display = "none";
      return;
    }
    renderer.setSize(w, h, false);
    // Capped at 1 rather than devicePixelRatio: on a 2x/3x display this
    // is the single biggest lever on fill-rate cost for a full-viewport
    // transparent canvas sitting under several backdrop-filter panels.
    renderer.setPixelRatio(1);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6.5;

    var group = new THREE.Group();
    scene.add(group);

    var outerGeo = new THREE.IcosahedronGeometry(2.2, 1);
    var outerMat = new THREE.LineBasicMaterial({ color: 0x262523, transparent: true, opacity: 0.5 });
    var outer = new THREE.LineSegments(new THREE.EdgesGeometry(outerGeo), outerMat);
    group.add(outer);

    var innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
    var innerMat = new THREE.LineBasicMaterial({ color: 0xff5a2b, transparent: true, opacity: 0.45 });
    var inner = new THREE.LineSegments(new THREE.EdgesGeometry(innerGeo), innerMat);
    group.add(inner);

    // A second, independently drifting shape for extra depth/parallax
    var driftGeo = new THREE.TorusGeometry(1.4, 0.02, 6, 40);
    var driftMat = new THREE.LineBasicMaterial({ color: 0x262523, transparent: true, opacity: 0.22 });
    var drift = new THREE.LineSegments(new THREE.EdgesGeometry(driftGeo), driftMat);
    drift.position.set(-2.6, 1.4, -2.5);
    drift.rotation.x = Math.PI / 3;
    scene.add(drift);

    var px = 0, py = 0;
    window.addEventListener("mousemove", function (e) {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    var resizePending = false;
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      resizePending = false;
    }
    window.addEventListener("resize", function () {
      if (!resizePending) { resizePending = true; requestAnimationFrame(resize); }
    });

    var idle = 0;
    var start = performance.now();

    function opacityForProgress(p) {
      // bright in the hero, dims through the middle, lifts again near the close
      if (p < 0.12) return 0.85 - (p / 0.12) * 0.55;
      if (p < 0.82) return 0.3;
      return 0.3 + ((p - 0.82) / 0.18) * 0.4;
    }

    var lastOpacity = -1;
    webglTick = function (now, scrollProgress) {
      idle += 0.0032;
      var elapsed = now - start;
      var opacity = opacityForProgress(scrollProgress);
      if (Math.abs(opacity - lastOpacity) > 0.004) {
        wrap.style.opacity = opacity.toFixed(3);
        lastOpacity = opacity;
      }

      group.rotation.y = idle + scrollProgress * Math.PI * 5.2;
      group.rotation.x = idle * 0.4 + scrollProgress * Math.PI * 1.6;
      var breathe = 1 + Math.sin(elapsed * 0.0006) * 0.05;
      group.scale.setScalar(breathe + scrollProgress * 0.35);

      drift.rotation.z += 0.0012;
      drift.rotation.y -= 0.0009;
      drift.position.y = 1.4 - scrollProgress * 3.2;

      camera.position.x += (px * 0.7 - camera.position.x) * 0.025;
      camera.position.y += (-py * 0.5 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
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
    updateCursor();
    if (webglTick) webglTick(now, scrollProgress);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------- Boot ---------------- */
  initTilt();
  initRevealText();
  initParallax();
  initImageReveal();
  window.addEventListener("load", function () {
    setTimeout(playHeroGlitch, 150);
    initWebGLBackdrop();
    if (hasGSAP && typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
})();
