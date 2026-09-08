/**
 * DC Miranda — WebGL experience layer.
 *
 * This is not a decorative background: the camera moves through a
 * sequence of 3D "installations" as the page scrolls (one per major
 * chapter — capabilities, the AI/automation node network, the
 * GoHighLevel flow pipeline, the work gallery). DOM content overlays
 * this layer; the layer itself carries the spatial narrative.
 *
 * Exposed as window.DCScene:
 *   init()                      - build the scene, return false if WebGL unavailable
 *   frame(now, scrollY)         - advance the camera/objects one frame (called from the shared loop in main.js)
 *   highlightNode(chapter, key) - light up one node in the ai-automation / ghl-flow network (chapter: 'ai'|'ghl')
 *   clearHighlight(chapter)
 *   focusMarker(index)          - nudge the camera/lookAt toward one work-gallery marker
 *   clearFocus()
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CHAPTERS = [
    { id: "home", camPos: [0, 0, 7.5], camLook: [0, 0, 0], camFov: 45 },
    { id: "capabilities", camPos: [3.2, 0.7, 8.5], camLook: [1.6, 0.1, -2.5], camFov: 50 },
    { id: "workflow", camPos: [1, -0.3, 7], camLook: [0.6, 0, -2], camFov: 48 },
    { id: "ai-automation", camPos: [-2.8, 0.5, 7], camLook: [-1.1, 0.5, -4.5], camFov: 44 },
    { id: "ghl-flow", camPos: [2.2, -0.7, 7.5], camLook: [0.4, -0.3, -5.5], camFov: 46 },
    { id: "work", camPos: [0, 0.9, 10.5], camLook: [0, 0, -8], camFov: 54 },
    { id: "process", camPos: [-1.6, 0.4, 6.8], camLook: [0, 0, -1.5], camFov: 46 },
    { id: "origin", camPos: [1.6, 0.2, 6.5], camLook: [0, 0, -1], camFov: 44 },
    { id: "difference", camPos: [-1, 0.3, 6.5], camLook: [0, 0, -1], camFov: 44 },
    { id: "vow", camPos: [1, 0.3, 6.5], camLook: [0, 0, -1], camFov: 44 },
    { id: "contact", camPos: [0, 0.4, 6.2], camLook: [0, 0, 0], camFov: 42 },
  ];

  var scene, camera, renderer, canvas, wrap;
  var homeGroup, capsGroup, aiGroup, ghlGroup, workGroup, starPoints;
  var waypoints = [];
  var px = 0, py = 0;
  var idle = 0;
  var startTime = 0;
  var focus = { strength: 0, index: -1 };
  var readout = null;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(v) { return Math.min(Math.max(v, 0), 1); }

  function makeEdges(geo, color, opacity) {
    var mat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity });
    var mesh = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
    mesh.userData.baseOpacity = opacity;
    return mesh;
  }

  function makeLine(points, color, opacity) {
    var geo = new THREE.BufferGeometry().setFromPoints(points);
    var mat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: opacity });
    var line = new THREE.Line(geo, mat);
    line.userData.baseOpacity = opacity;
    return line;
  }

  function buildHomeGroup() {
    var g = new THREE.Group();
    var outer = makeEdges(new THREE.IcosahedronGeometry(2.2, 1), 0x9fb4ff, 0.55);
    var inner = makeEdges(new THREE.IcosahedronGeometry(1.15, 0), 0xff5a2b, 0.55);
    var drift = makeEdges(new THREE.TorusGeometry(1.4, 0.02, 6, 40), 0xb06bff, 0.28);
    drift.position.set(-2.6, 1.4, -2.5);
    drift.rotation.x = Math.PI / 3;
    g.add(outer, inner, drift);
    g.userData = { outer: outer, inner: inner, drift: drift };
    return g;
  }

  // "What I Do" — six small tilted plane-frames, one per discipline, each in its own accent color.
  function buildCapsGroup() {
    var g = new THREE.Group();
    var colors = [0x5ec8ff, 0xb06bff, 0x49ffb4, 0xffd166, 0xff5c8a, 0x8b8bff];
    var cards = [];
    for (var i = 0; i < 6; i++) {
      var geo = new THREE.PlaneGeometry(0.9, 1.15);
      var card = makeEdges(geo, colors[i], 0.6);
      var angle = (i / 6) * Math.PI * 2;
      card.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.0, Math.sin(angle * 2) * 0.6);
      card.rotation.y = angle;
      cards.push(card);
      g.add(card);
    }
    g.position.set(1.6, 0.1, -2.5);
    g.userData = { cards: cards };
    return g;
  }

  // AI + Automation — a small node tree: AI -> {DATA, LOGIC} -> {CRM, WORKFLOW} -> RESULT.
  function buildAiGroup() {
    var g = new THREE.Group();
    var layout = {
      ai: [0, 1.3, 0],
      data: [0.95, 0.35, 0.2],
      logic: [-0.95, 0.35, -0.2],
      crm: [0.95, -0.65, 0.1],
      workflow: [-0.95, -0.65, -0.1],
      result: [0, -1.55, 0],
    };
    var edges = [["ai", "data"], ["ai", "logic"], ["data", "crm"], ["logic", "workflow"], ["crm", "result"], ["workflow", "result"]];
    var nodes = {};
    Object.keys(layout).forEach(function (key) {
      var geo = new THREE.IcosahedronGeometry(0.13, 0);
      var mat = new THREE.LineBasicMaterial({ color: 0x49ffb4, transparent: true, opacity: 0.65 });
      var mesh = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      mesh.position.set(layout[key][0], layout[key][1], layout[key][2]);
      mesh.userData.baseOpacity = 0.65;
      mesh.userData.baseScale = 1;
      nodes[key] = mesh;
      g.add(mesh);
    });
    edges.forEach(function (pair) {
      var a = nodes[pair[0]].position, b = nodes[pair[1]].position;
      g.add(makeLine([a, b], 0x49ffb4, 0.3));
    });
    g.position.set(-1.1, 0.5, -4.5);
    g.userData = { nodes: nodes };
    return g;
  }

  // GoHighLevel — a 9-stop pipeline along a curve, with small particles animating along it.
  function buildGhlGroup() {
    var g = new THREE.Group();
    var stops = ["leads", "crm", "pipeline", "followup", "appointment", "client"];
    var pts = [];
    for (var i = 0; i < stops.length; i++) {
      var t = i / (stops.length - 1);
      pts.push(new THREE.Vector3(lerp(-2.4, 2.4, t), Math.sin(t * Math.PI * 2) * 0.4, Math.cos(t * Math.PI) * 0.5));
    }
    var curve = new THREE.CatmullRomCurve3(pts);
    var curvePoints = curve.getPoints(80);
    g.add(makeLine(curvePoints, 0xffd166, 0.35));

    var nodes = {};
    stops.forEach(function (key, i) {
      var geo = new THREE.IcosahedronGeometry(0.11, 0);
      var mat = new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.7 });
      var mesh = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      mesh.position.copy(pts[i]);
      mesh.userData.baseOpacity = 0.7;
      mesh.userData.baseScale = 1;
      nodes[key] = mesh;
      g.add(mesh);
    });

    var particles = [];
    for (var p = 0; p < 3; p++) {
      var particleGeo = new THREE.IcosahedronGeometry(0.045, 0);
      var particleMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      var particle = new THREE.LineSegments(new THREE.EdgesGeometry(particleGeo), particleMat);
      particles.push({ mesh: particle, offset: p / 3 });
      g.add(particle);
    }

    g.position.set(0.4, -0.3, -6.2);
    g.userData = { pathPoints: pts, particles: particles, nodes: nodes };
    return g;
  }

  // Manual polyline interpolation for the traveling particles — avoids
  // relying on CatmullRomCurve3.getPoint() in the hot per-frame path,
  // where this Three.js build throws on repeated calls after getPoints()
  // has already been used once to build the static curve line.
  function pointOnPath(points, t) {
    var n = points.length;
    var scaled = clamp01(t) * (n - 1);
    var i = Math.min(Math.floor(scaled), n - 2);
    var frac = scaled - i;
    var a = points[i], b = points[i + 1];
    return new THREE.Vector3(
      lerp(a.x, b.x, frac),
      lerp(a.y, b.y, frac),
      lerp(a.z, b.z, frac)
    );
  }

  // Selected Work — project markers spaced along an arc; camera can focus on one.
  function buildWorkGroup(count) {
    var g = new THREE.Group();
    var markers = [];
    var n = Math.max(count, 1);
    for (var i = 0; i < n; i++) {
      var t = n === 1 ? 0.5 : i / (n - 1);
      var x = lerp(-4.2, 4.2, t);
      var z = -Math.sin(t * Math.PI) * 2.2;
      var geo = new THREE.PlaneGeometry(0.72, 0.98);
      var mesh = makeEdges(geo, 0xff8fd6, 0.4);
      mesh.position.set(x, 0, z);
      mesh.rotation.y = (t - 0.5) * 0.6;
      mesh.userData.baseOpacity = 0.4;
      mesh.userData.baseScale = 1;
      markers.push(mesh);
      g.add(mesh);
    }
    g.position.set(0, 0, -8);
    g.userData = { markers: markers };
    return g;
  }

  function buildStarfield() {
    var count = 700;
    var positions = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var radius = 14 + Math.random() * 26;
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    var mat = new THREE.PointsMaterial({ color: 0xeef0ff, size: 0.045, transparent: true, opacity: 0.55, sizeAttenuation: true });
    return new THREE.Points(geo, mat);
  }

  function computeWaypoints() {
    waypoints = [];
    CHAPTERS.forEach(function (ch, i) {
      var el = document.getElementById(ch.id);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var center = rect.top + window.scrollY + rect.height / 2;
      waypoints.push({ chapter: ch, index: i, center: center });
    });
  }

  function currentGlobalIndex(scrollY) {
    if (!waypoints.length) return 0;
    if (scrollY <= waypoints[0].center) return waypoints[0].index;
    for (var i = 0; i < waypoints.length - 1; i++) {
      var a = waypoints[i], b = waypoints[i + 1];
      if (scrollY >= a.center && scrollY <= b.center) {
        var t = (scrollY - a.center) / (b.center - a.center || 1);
        return lerp(a.index, b.index, t);
      }
    }
    return waypoints[waypoints.length - 1].index;
  }

  function chapterAt(globalIndex) {
    var lo = Math.floor(globalIndex);
    var hi = Math.min(lo + 1, CHAPTERS.length - 1);
    var t = globalIndex - lo;
    return { a: CHAPTERS[lo], b: CHAPTERS[hi], t: t };
  }

  function setGroupActivation(group, activation) {
    group.visible = activation > 0.015;
    group.traverse(function (obj) {
      if (obj.material && typeof obj.userData.baseOpacity === "number") {
        obj.material.opacity = obj.userData.baseOpacity * activation;
      }
    });
  }

  function triangularActivation(globalIndex, chapterIndex, width) {
    return Math.max(0, 1 - Math.abs(globalIndex - chapterIndex) / width);
  }

  function init() {
    canvas = document.getElementById("webgl-canvas");
    wrap = document.querySelector(".webgl-backdrop");
    if (!canvas || !wrap || reduceMotion || typeof THREE === "undefined") {
      if (wrap) wrap.style.display = "none";
      return false;
    }

    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
    } catch (e) {
      wrap.style.display = "none";
      return false;
    }
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(1);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    starPoints = buildStarfield();
    scene.add(starPoints);

    homeGroup = buildHomeGroup();
    capsGroup = buildCapsGroup();
    aiGroup = buildAiGroup();
    ghlGroup = buildGhlGroup();

    var markerCount = document.querySelectorAll("#work-listing [data-tags]").length || 6;
    workGroup = buildWorkGroup(markerCount);

    scene.add(homeGroup, capsGroup, aiGroup, ghlGroup, workGroup);

    readout = document.getElementById("gallery-readout");

    window.addEventListener("mousemove", function (e) {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    var resizePending = false;
    function onResize() {
      w = window.innerWidth; h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      computeWaypoints();
      resizePending = false;
    }
    window.addEventListener("resize", function () {
      if (!resizePending) { resizePending = true; requestAnimationFrame(onResize); }
    });

    computeWaypoints();
    window.addEventListener("load", computeWaypoints);
    startTime = performance.now();
    return true;
  }

  function opacityForGlobalIndex(globalIndex) {
    // Bright at the very start and very end (hero + contact bookend),
    // otherwise a steady ambient level so DOM content stays readable.
    var last = CHAPTERS.length - 1;
    var edge = Math.min(globalIndex, last - globalIndex);
    if (edge < 0.6) return lerp(0.85, 0.4, edge / 0.6);
    return 0.4;
  }

  function frame(now, scrollY) {
    if (!renderer || !scene || !camera) return;
    var elapsed = now - startTime;
    idle += 0.0032;

    var globalIndex = currentGlobalIndex(scrollY);
    var seg = chapterAt(globalIndex);
    var camPos = [
      lerp(seg.a.camPos[0], seg.b.camPos[0], seg.t),
      lerp(seg.a.camPos[1], seg.b.camPos[1], seg.t),
      lerp(seg.a.camPos[2], seg.b.camPos[2], seg.t),
    ];
    var camLook = [
      lerp(seg.a.camLook[0], seg.b.camLook[0], seg.t),
      lerp(seg.a.camLook[1], seg.b.camLook[1], seg.t),
      lerp(seg.a.camLook[2], seg.b.camLook[2], seg.t),
    ];
    var camFov = lerp(seg.a.camFov, seg.b.camFov, seg.t);

    // Mouse parallax, additive.
    camera.position.x = camPos[0] + px * 0.35;
    camera.position.y = camPos[1] - py * 0.25;
    camera.position.z = camPos[2];

    // Work-gallery focus: blend the look target toward the focused marker.
    var workActivation = triangularActivation(globalIndex, 5, 1.1); // chapter index 5 = "work"
    if (focus.strength > 0.01 && workGroup.userData.markers[focus.index]) {
      var mp = workGroup.userData.markers[focus.index].position;
      var worldMp = mp.clone().add(workGroup.position);
      camLook[0] = lerp(camLook[0], worldMp.x, focus.strength);
      camLook[1] = lerp(camLook[1], worldMp.y, focus.strength);
      camLook[2] = lerp(camLook[2], worldMp.z, focus.strength);
    }
    if (workActivation < 0.25 && focus.strength > 0) {
      focus.strength = Math.max(0, focus.strength - 0.03);
    }

    camera.lookAt(camLook[0], camLook[1], camLook[2]);
    if (Math.abs(camera.fov - camFov) > 0.01) {
      camera.fov = camFov;
      camera.updateProjectionMatrix();
    }

    wrap.style.opacity = opacityForGlobalIndex(globalIndex).toFixed(3);

    // Idle motion per group.
    homeGroup.userData.outer.rotation.y = idle + globalIndex * 0.15;
    homeGroup.userData.outer.rotation.x = idle * 0.4;
    homeGroup.userData.inner.rotation.y -= idle * 0.6;
    homeGroup.userData.drift.rotation.z += 0.0012;
    var breathe = 1 + Math.sin(elapsed * 0.0006) * 0.05;
    homeGroup.scale.setScalar(breathe);

    capsGroup.userData.cards.forEach(function (card, i) {
      card.rotation.z = Math.sin(elapsed * 0.0004 + i) * 0.15;
    });

    ghlGroup.userData.particles.forEach(function (p) {
      var t = ((elapsed * 0.00012) + p.offset) % 1;
      var pos = pointOnPath(ghlGroup.userData.pathPoints, t);
      p.mesh.position.copy(pos);
    });

    Object.keys(aiGroup.userData.nodes).forEach(function (key) {
      var mesh = aiGroup.userData.nodes[key];
      var targetScale = mesh.userData.highlighted ? 1.7 : 1;
      mesh.scale.setScalar(lerp(mesh.scale.x, targetScale, 0.15));
      mesh.material.opacity = lerp(mesh.material.opacity, mesh.userData.highlighted ? 1 : mesh.userData.baseOpacity, 0.15);
    });
    Object.keys(ghlGroup.userData.nodes).forEach(function (key) {
      var mesh = ghlGroup.userData.nodes[key];
      var targetScale = mesh.userData.highlighted ? 1.7 : 1;
      mesh.scale.setScalar(lerp(mesh.scale.x, targetScale, 0.15));
      mesh.material.opacity = lerp(mesh.material.opacity, mesh.userData.highlighted ? 1 : mesh.userData.baseOpacity, 0.15);
    });
    workGroup.userData.markers.forEach(function (mesh, i) {
      var targetScale = i === focus.index ? 1 + focus.strength * 0.5 : 1;
      mesh.scale.setScalar(lerp(mesh.scale.x, targetScale, 0.15));
      var targetOpacity = i === focus.index ? mesh.userData.baseOpacity + focus.strength * 0.5 : mesh.userData.baseOpacity;
      mesh.material.opacity = lerp(mesh.material.opacity, targetOpacity, 0.15);
    });

    setGroupActivation(capsGroup, triangularActivation(globalIndex, 1, 1.3));
    setGroupActivation(aiGroup, triangularActivation(globalIndex, 3, 1.2));
    setGroupActivation(ghlGroup, triangularActivation(globalIndex, 4, 1.2));
    setGroupActivation(workGroup, Math.max(workActivation, focus.strength * 0.6));
    setGroupActivation(homeGroup, Math.max(triangularActivation(globalIndex, 0, 1.3), triangularActivation(globalIndex, 10, 1.3)));

    starPoints.rotation.y += 0.0002;

    renderer.render(scene, camera);
  }

  function highlightNode(chapter, key) {
    var group = chapter === "ai" ? aiGroup : ghlGroup;
    if (!group) return;
    Object.keys(group.userData.nodes).forEach(function (k) {
      group.userData.nodes[k].userData.highlighted = k === key;
    });
  }
  function clearHighlight(chapter) {
    var group = chapter === "ai" ? aiGroup : ghlGroup;
    if (!group) return;
    Object.keys(group.userData.nodes).forEach(function (k) {
      group.userData.nodes[k].userData.highlighted = false;
    });
  }

  function focusMarker(index, label) {
    focus.index = index;
    if (typeof gsap !== "undefined") {
      gsap.to(focus, { strength: 1, duration: 0.9, ease: "power2.out" });
    } else {
      focus.strength = 1;
    }
    if (readout && label) readout.textContent = label;
  }
  function clearFocus() {
    if (typeof gsap !== "undefined") {
      gsap.to(focus, { strength: 0, duration: 0.6, ease: "power2.out" });
    } else {
      focus.strength = 0;
    }
  }

  window.DCScene = {
    init: init,
    frame: frame,
    highlightNode: highlightNode,
    clearHighlight: clearHighlight,
    focusMarker: focusMarker,
    clearFocus: clearFocus,
  };
})();
