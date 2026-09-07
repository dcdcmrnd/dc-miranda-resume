(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

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

  /* ---------------- HUD scrolled state ---------------- */
  var hud = document.querySelector(".hud");
  function updateHud() {
    if (hud) hud.style.borderBottomColor = window.scrollY > 20 ? "var(--line-strong)" : "var(--line)";
  }

  /* ---------------- Generic scroll-linked parallax ---------------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  function updateParallax() {
    if (!parallaxEls.length || reduceMotion) return;
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      var rect = el.getBoundingClientRect();
      var progress = (vh - rect.top) / (vh + rect.height); // 0 entering -> 1 leaving
      var offset = (progress - 0.5) * speed * 200;
      el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
    });
  }

  var scrollProgress = 0;
  function getScrollProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        updateHud();
        updateParallax();
        scrollProgress = getScrollProgress();
        ticking = false;
      });
    }
  }, { passive: true });
  updateHud();
  updateParallax();
  scrollProgress = getScrollProgress();

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var menuLinks = document.querySelectorAll(".mobile-menu a");
  if (menuBtn) menuBtn.addEventListener("click", function () { document.body.classList.toggle("menu-open"); });
  menuLinks.forEach(function (a) { a.addEventListener("click", function () { document.body.classList.remove("menu-open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.body.classList.remove("menu-open"); });

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          var glitchTarget = entry.target.querySelector("[data-glitch-on-reveal]");
          if (glitchTarget && !glitchTarget.hasAttribute("data-glitched")) {
            glitchTarget.setAttribute("data-glitched", "1");
            glitchReveal(glitchTarget, { duration: 700 });
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Reticle cursor ---------------- */
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
    });
  });

  /* ---------------- Rebuild / origin gate ---------------- */
  var rebuildBtns = document.querySelectorAll("[data-rebuild]");
  rebuildBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLoop(loopCount + 1);
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(playHeroGlitch, reduceMotion ? 0 : 500);
    });
  });

  /* ---------------- Smooth anchor scroll with HUD offset ---------------- */
  document.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------------- Boot ---------------- */
  initTilt();
  window.addEventListener("load", function () {
    setTimeout(playHeroGlitch, 150);
    initWebGLBackdrop();
  });
})();
