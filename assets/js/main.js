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

  /* ---------------- Smooth-scroll layer (Lenis) ---------------- */
  var lenis = null;
  if (!reduceMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.05,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true,
    });
    if (hasGSAP) {
      lenis.on("scroll", function () { if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update(); });
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(time) { lenis.raf(time); requestAnimationFrame(raf); });
    }
  }

  function scrollToTarget(top, opts) {
    opts = opts || {};
    if (lenis) {
      lenis.scrollTo(top, { offset: 0, duration: opts.duration || 1.0 });
    } else {
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  /* ---------------- HUD scrolled state ---------------- */
  var hud = document.querySelector(".hud");
  function updateHud() {
    if (hud) hud.style.borderBottomColor = window.scrollY > 20 ? "var(--line-strong)" : "var(--line)";
  }

  /* ---------------- Scroll progress (single source of truth, sampled per frame) ---------------- */
  var scrollProgress = 0;
  function readScrollProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    updateHud();
    requestAnimationFrame(readScrollProgress);
  }
  requestAnimationFrame(readScrollProgress);

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

  /* ---------------- Reticle cursor (states: default / hover) ---------------- */
  if (!isCoarsePointer && !reduceMotion) {
    document.documentElement.classList.add("has-reticle");
    var dot = document.createElement("div");
    dot.className = "reticle-dot";
    var box = document.createElement("div");
    box.className = "reticle-box";
    document.body.appendChild(dot);
    document.body.appendChild(box);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var bx = mx, by = my;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
    });
    function raf() {
      bx += (mx - bx) * 0.2;
      by += (my - by) * 0.2;
      box.style.transform = "translate3d(" + bx + "px," + by + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, [data-cursor-hover]")) box.classList.add("is-active");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, button, [data-cursor-hover]")) box.classList.remove("is-active");
    });
  }

  /* ---------------- Persistent scroll-reactive WebGL backdrop ---------------- */
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
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) {
      wrap.style.display = "none";
      return;
    }
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

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

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener("resize", resize);

    var idle = 0;
    var start = performance.now();

    function opacityForProgress(p) {
      // bright in the hero, dims through the middle, lifts again near the close
      if (p < 0.12) return 0.85 - (p / 0.12) * 0.55;
      if (p < 0.82) return 0.3;
      return 0.3 + ((p - 0.82) / 0.18) * 0.4;
    }

    function tick(now) {
      idle += 0.0032;
      var elapsed = now - start;
      var opacity = opacityForProgress(scrollProgress);
      wrap.style.opacity = opacity.toFixed(3);

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
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Panel tilt-on-hover ---------------- */
  function initTilt() {
    if (isCoarsePointer || reduceMotion) return;
    var targets = document.querySelectorAll(".panel, .module-card");
    targets.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 6).toFixed(2) + "deg) translateZ(0)";
        el.classList.add("is-tilting");
      });
      el.addEventListener("mouseleave", function () {
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

  /* ---------------- Rebuild / origin gate ---------------- */
  var rebuildBtns = document.querySelectorAll("[data-rebuild]");
  rebuildBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLoop(loopCount + 1);
      scrollToTarget(0, { duration: 0.9 });
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
      scrollToTarget(top, { duration: 1.0 });
    });
  });

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
