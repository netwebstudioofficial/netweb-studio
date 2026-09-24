import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCw, Globe as GlobeIcon, Sparkles } from "lucide-react";

// Convert Latitude and Longitude to 3D Cartesian coordinates on sphere
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

const GLOBAL_HUBS = [
  { name: "SF", lat: 37.77, lon: -122.42, label: "San Francisco" },
  { name: "NYC", lat: 40.71, lon: -74.0, label: "New York" },
  { name: "London", lat: 51.5, lon: -0.12, label: "London" },
  { name: "Frankfurt", lat: 50.11, lon: 8.68, label: "Frankfurt" },
  { name: "Tokyo", lat: 35.67, lon: 139.65, label: "Tokyo" },
  { name: "Singapore", lat: 1.35, lon: 103.82, label: "Singapore" },
  { name: "Sydney", lat: -33.86, lon: 151.2, label: "Sydney" },
  { name: "Dubai", lat: 25.2, lon: 55.27, label: "Dubai" },
  { name: "SaoPaulo", lat: -23.55, lon: -46.63, label: "São Paulo" },
  { name: "Zurich", lat: 47.37, lon: 8.54, label: "Zurich" },
];

const HUB_CONNECTIONS = [
  ["SF", "London"],
  ["London", "Frankfurt"],
  ["Frankfurt", "Dubai"],
  ["Dubai", "Singapore"],
  ["Singapore", "Tokyo"],
  ["Tokyo", "Sydney"],
  ["NYC", "London"],
  ["NYC", "Frankfurt"],
  ["SF", "Tokyo"],
  ["NYC", "SaoPaulo"],
  ["London", "Tokyo"],
  ["Dubai", "London"],
  ["Singapore", "Sydney"],
];

export const EarthLiveGlobe = () => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [arcsVisible, setArcsVisible] = useState(true);

  // References to communicate with Three.js render loop without re-renders
  const isPlayingRef = useRef(true);
  const arcsVisibleRef = useRef(true);
  isPlayingRef.current = isPlaying;
  arcsVisibleRef.current = arcsVisible;

  // Interaction tracking state
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Camera is elevated and looks across the curved Earth horizon
    camera.position.set(0, 2.5, 7.6);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Main directional sunlight casting over the horizon
    const sunLight = new THREE.DirectionalLight(0xa3ff12, 1.6);
    sunLight.position.set(-5, 6, 8);
    scene.add(sunLight);

    const backRimLight = new THREE.DirectionalLight(0x4ade80, 1.1);
    backRimLight.position.set(5, 4, -5);
    scene.add(backRimLight);

    // 5. Globe Group - Grand expansive scale matching luxury reference mockup
    const globeGroup = new THREE.Group();
    const globeRadius = 5.8;
    scene.add(globeGroup);

    // Initial tilt of Earth axis (approx 23.5 degrees)
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.z = -0.05;

    // Responsive scaling and positioning helper
    const updateResponsiveScaleAndPos = (w) => {
      if (w < 480) {
        // Very small mobile screens: 45-50% scale, positioned lower so hero text & buttons remain clean
        globeGroup.scale.setScalar(0.48);
        globeGroup.position.set(0, -1.85, 0);
      } else if (w < 768) {
        // Standard mobile screens: 55% scale
        globeGroup.scale.setScalar(0.55);
        globeGroup.position.set(0, -2.1, 0);
      } else if (w < 1024) {
        // Tablet screens: slightly reduced
        globeGroup.scale.setScalar(0.78);
        globeGroup.position.set(0, -2.7, 0);
      } else {
        // Desktop / Laptop: Exactly preserved at full 1.0 scale and original position
        globeGroup.scale.setScalar(1.0);
        globeGroup.position.set(0, -3.4, 0);
      }
    };
    updateResponsiveScaleAndPos(width);

    // 6. Base Dark Planet Sphere (occludes back-facing elements)
    const baseSphereGeo = new THREE.SphereGeometry(globeRadius * 0.995, 64, 64);
    const baseSphereMat = new THREE.MeshStandardMaterial({
      color: 0x050805,
      roughness: 0.85,
      metalness: 0.1,
    });
    const baseSphere = new THREE.Mesh(baseSphereGeo, baseSphereMat);
    globeGroup.add(baseSphere);

    // 7. Luminous Dotted Earth Landmass Sphere
    const textureLoader = new THREE.TextureLoader();
    const earthDotsTexture = textureLoader.load("/assets/earth_neon_dots.png");
    earthDotsTexture.generateMipmaps = true;
    earthDotsTexture.minFilter = THREE.LinearMipmapLinearFilter;
    earthDotsTexture.magFilter = THREE.LinearFilter;

    const dotsSphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const dotsSphereMat = new THREE.MeshStandardMaterial({
      map: earthDotsTexture,
      transparent: true,
      opacity: 0.95,
      roughness: 0.4,
      metalness: 0.2,
      emissive: new THREE.Color(0xa3ff12),
      emissiveMap: earthDotsTexture,
      emissiveIntensity: 0.6,
      blending: THREE.NormalBlending,
    });
    const dotsSphere = new THREE.Mesh(dotsSphereGeo, dotsSphereMat);
    globeGroup.add(dotsSphere);

    // 8. Atmospheric Glow Fresnel Horizon Rim - REMOVED thick white rim layer completely.
    // Preserving clean neon dotted Earth, beacon hubs, orbital arcs, stars, and meteors.

    // 9. Soft Outer Volumetric Glow Ring Behind Horizon - Strictly contained around Earth curvature
    const haloPlaneGeo = new THREE.PlaneGeometry(globeRadius * 2.3, globeRadius * 1.5);
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = 512;
    haloCanvas.height = 512;
    const hctx = haloCanvas.getContext("2d");
    if (hctx) {
      const grad = hctx.createRadialGradient(256, 256, 100, 256, 256, 256);
      grad.addColorStop(0, "rgba(163, 255, 18, 0.20)");
      grad.addColorStop(0.3, "rgba(74, 222, 128, 0.06)");
      grad.addColorStop(0.6, "rgba(163, 255, 18, 0.0)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      hctx.fillStyle = grad;
      hctx.fillRect(0, 0, 512, 512);
    }
    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.35,
    });
    const haloMesh = new THREE.Mesh(haloPlaneGeo, haloMat);
    haloMesh.scale.setScalar(globeGroup.scale.y);
    haloMesh.position.set(0, globeGroup.position.y + globeRadius * 0.42 * globeGroup.scale.y, -1.5);
    scene.add(haloMesh);

    // 10. Hubs and 3D Orbital Arcs
    const hubMap = new Map();
    GLOBAL_HUBS.forEach((h) => hubMap.set(h.name, h));

    // Hub Beacons & Pulsing Rings
    const beaconsGroup = new THREE.Group();
    globeGroup.add(beaconsGroup);

    const ringMeshes = [];
    const beaconDotGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const beaconDotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const ringGeo = new THREE.RingGeometry(0.05, 0.09, 32);

    GLOBAL_HUBS.forEach((hub, i) => {
      const pos = latLonToVector3(hub.lat, hub.lon, globeRadius * 1.002);

      // Core white beacon dot
      const dot = new THREE.Mesh(beaconDotGeo, beaconDotMat);
      dot.position.copy(pos);
      beaconsGroup.add(dot);

      // Expanding neon pulse ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xa3ff12,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      beaconsGroup.add(ring);

      ringMeshes.push({
        mesh: ring,
        scale: 1 + (i % 3) * 0.4,
        speed: 0.012 + (i % 4) * 0.003,
      });
    });

    // 3D Connecting Arcs
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const connections = [];
    const pulseGeo = new THREE.SphereGeometry(0.04, 12, 12);

    HUB_CONNECTIONS.forEach(([fromName, toName], idx) => {
      const fromHub = hubMap.get(fromName);
      const toHub = hubMap.get(toName);
      if (!fromHub || !toHub) return;

      const p1 = latLonToVector3(fromHub.lat, fromHub.lon, globeRadius * 1.002);
      const p2 = latLonToVector3(toHub.lat, toHub.lon, globeRadius * 1.002);

      // Calculate elevated 3D midpoint for graceful parabolic arc
      const distance = p1.distanceTo(p2);
      const elevation = globeRadius * (0.08 + Math.min(distance / globeRadius, 1.2) * 0.22);
      const mid = p1
        .clone()
        .add(p2)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(globeRadius + elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      // Gradient color/opacity along arc
      const colors = new Float32Array(curvePoints.length * 3);
      for (let i = 0; i < curvePoints.length; i++) {
        const t = i / (curvePoints.length - 1);
        const intensity = Math.sin(t * Math.PI); // brighter in the middle, soft at terminals
        colors[i * 3] = 0.639 * intensity;
        colors[i * 3 + 1] = 1.0 * intensity;
        colors[i * 3 + 2] = 0.07 * intensity;
      }
      curveGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        linewidth: 1.5,
      });
      const line = new THREE.Line(curveGeo, lineMat);
      arcsGroup.add(line);

      // Travelling luminous light pulse along the arc
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      arcsGroup.add(pulseMesh);

      connections.push({
        from: fromHub,
        to: toHub,
        curve,
        line,
        pulseMesh,
        pulseProgress: (idx * 0.13) % 1,
        pulseSpeed: 0.0035 + (idx % 3) * 0.0015,
      });
    });

    // 11. Dynamic Moving Star Dust Field
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 320;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starDrifts = [];

    for (let i = 0; i < starCount; i++) {
      const radius = 9 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.72; // upper cosmos above horizon

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 0.3;
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const isLimeStar = Math.random() > 0.72;
      starColors[i * 3] = isLimeStar ? 0.64 : 0.95;
      starColors[i * 3 + 1] = isLimeStar ? 1.0 : 0.98;
      starColors[i * 3 + 2] = isLimeStar ? 0.12 : 0.95;

      starDrifts.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.3) * 0.002,
        vz: (Math.random() - 0.5) * 0.002,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starsMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Dynamic Shooting Meteors
    const shootingStarCount = 2;
    const shootingStars = [];

    const shootingStarMat = new THREE.LineBasicMaterial({
      color: 0xa3ff12,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    for (let s = 0; s < shootingStarCount; s++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.6, -0.8, 0),
      ]);
      const line = new THREE.Line(geo, shootingStarMat.clone());
      scene.add(line);
      shootingStars.push({
        line,
        active: false,
        progress: 0,
        speed: 0.022,
        start: new THREE.Vector3(0, 0, 0),
        end: new THREE.Vector3(0, 0, 0),
        delay: s * 160 + 80,
      });
    }

    // 12. Interactive Pointer & Touch Controls
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
      velocityRef.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPositionRef.current.x;
      const deltaY = clientY - previousPointerPositionRef.current.y;

      const sensitivity = 0.005;
      globeGroup.rotation.y += deltaX * sensitivity;
      globeGroup.rotation.x = Math.max(-0.2, Math.min(0.65, globeGroup.rotation.x + deltaY * sensitivity * 0.4));

      velocityRef.current = {
        x: deltaX * sensitivity,
        y: deltaY * sensitivity * 0.4,
      };

      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    domEl.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // 13. Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Responsive adjustments
      updateResponsiveScaleAndPos(newWidth);
      haloMesh.scale.setScalar(globeGroup.scale.y);
      haloMesh.position.set(0, globeGroup.position.y + globeRadius * 0.42 * globeGroup.scale.y, -1.5);
    };
    window.addEventListener("resize", handleResize);

    // 14. Performance & Viewport Intersection Observer
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 15. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();

      // Continuous live rotation when active and not actively dragged
      if (isPlayingRef.current && !isDraggingRef.current) {
        globeGroup.rotation.y += 0.0018; // smooth, steady live spin
      }

      // Smooth deceleration after drag release
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current.x) > 0.0001) {
          globeGroup.rotation.y += velocityRef.current.x;
          velocityRef.current.x *= 0.94;
        }
        if (Math.abs(velocityRef.current.y) > 0.0001) {
          globeGroup.rotation.x = Math.max(-0.2, Math.min(0.65, globeGroup.rotation.x + velocityRef.current.y));
          velocityRef.current.y *= 0.94;
        }
      }

      // Toggle Arcs Visibility
      arcsGroup.visible = arcsVisibleRef.current;
      beaconsGroup.visible = arcsVisibleRef.current;

      // Animate Beacon Ripple Rings
      ringMeshes.forEach((item) => {
        item.scale += item.speed;
        if (item.scale > 2.8) {
          item.scale = 1.0;
        }
        item.mesh.scale.set(item.scale, item.scale, 1);
        const opacity = Math.max(0, 1.0 - (item.scale - 1.0) / 1.8);
        item.mesh.material.opacity = opacity * 0.8;
      });

      // Animate Light Pulses along the 3D Arcs
      if (arcsVisibleRef.current) {
        connections.forEach((conn) => {
          conn.pulseProgress += conn.pulseSpeed;
          if (conn.pulseProgress > 1) {
            conn.pulseProgress = 0;
          }
          const pt = conn.curve.getPoint(conn.pulseProgress);
          conn.pulseMesh.position.copy(pt);

          // Pulses glow brighter in mid-flight
          const midIntensity = Math.sin(conn.pulseProgress * Math.PI);
          conn.pulseMesh.scale.setScalar(0.7 + midIntensity * 0.8);
        });
      }

      // Moving stars drift and gentle cosmos rotation
      starField.rotation.y += 0.0002;
      starField.rotation.x += 0.00008;

      const posAttr = starsGeo.attributes.position;
      const posArr = posAttr.array;
      for (let i = 0; i < starCount; i++) {
        const drift = starDrifts[i];
        posArr[i * 3] += drift.vx;
        posArr[i * 3 + 1] += drift.vy;
        posArr[i * 3 + 2] += drift.vz;

        // Wrap boundaries
        if (posArr[i * 3 + 1] < 0.2) posArr[i * 3 + 1] = 12.0;
        if (posArr[i * 3 + 1] > 14) posArr[i * 3 + 1] = 0.5;
      }
      posAttr.needsUpdate = true;

      // Soft twinkling oscillation
      const time = clock.getElapsedTime();
      starsMat.opacity = 0.65 + Math.sin(time * 2.2) * 0.15;

      // Update Dynamic Shooting Meteors
      shootingStars.forEach((star) => {
        if (!star.active) {
          star.delay -= 1;
          if (star.delay <= 0) {
            star.active = true;
            star.progress = 0;
            const sx = (Math.random() - 0.2) * 14;
            const sy = 4.5 + Math.random() * 4.5;
            const sz = -1 - Math.random() * 4;
            star.start.set(sx, sy, sz);
            star.end.set(sx - 6 - Math.random() * 4, sy - 3.2 - Math.random() * 2, sz);
            star.speed = 0.02 + Math.random() * 0.015;
          }
        } else {
          star.progress += star.speed;
          if (star.progress >= 1) {
            star.active = false;
            star.delay = 140 + Math.random() * 200;
            star.line.material.opacity = 0;
          } else {
            const currentPos = star.start.clone().lerp(star.end, star.progress);
            star.line.position.copy(currentPos);
            const alpha = Math.sin(star.progress * Math.PI);
            star.line.material.opacity = alpha * 0.85;
          }
        }
      });

      // Subtle atmospheric breathing oscillation
      const baseHaloScale = globeGroup.scale.y;
      haloMesh.scale.setScalar(baseHaloScale * (1 + Math.sin(time * 0.8) * 0.02));

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // 16. Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      domEl.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      domEl.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }

      // Dispose Three.js resources
      baseSphereGeo.dispose();
      baseSphereMat.dispose();
      dotsSphereGeo.dispose();
      dotsSphereMat.dispose();
      earthDotsTexture.dispose();
      haloPlaneGeo.dispose();
      haloTexture.dispose();
      haloMat.dispose();
      beaconDotGeo.dispose();
      beaconDotMat.dispose();
      ringGeo.dispose();
      pulseGeo.dispose();
      starsGeo.dispose();
      starsMat.dispose();

      connections.forEach((conn) => {
        conn.line.geometry.dispose();
        conn.line.material.dispose();
        conn.pulseMesh.material.dispose();
      });

      shootingStars.forEach((star) => {
        star.line.geometry.dispose();
        star.line.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleArcs = useCallback(() => {
    setArcsVisible((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ touchAction: "none" }}
      aria-label="Interactive 3D Earth Live Rotation Background"
    >
      {/* Floating Interactive Live Badge & Controls (Bottom Right / Left Corner) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080A08]/85 border border-[#A3FF12]/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(163,255,18,0.15)] text-[11px] font-mono text-white select-none">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3FF12] opacity-75 ${
                !isPlaying && "hidden"
              }`}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3FF12]" />
          </span>
          <span className="text-[#A3FF12] font-semibold tracking-wider uppercase text-[10px] hidden sm:inline">
            EARTH LIVE ORBIT
          </span>
          <span className="text-[#A7ADA5]/50 text-[10px] hidden sm:inline">•</span>
          <span className="text-[#A7ADA5] text-[10px]">
            {isInteracting ? "ROTATING" : "12 HUBS"}
          </span>

          {/* Toggle Pause / Resume Live Rotation */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Earth Rotation" : "Resume Earth Rotation"}
            className="p-1 rounded-md text-[#A7ADA5] hover:text-[#A3FF12] hover:bg-white/[0.08] transition-colors ml-1"
            title={isPlaying ? "Pause Rotation" : "Resume Rotation"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#A3FF12]" />}
          </button>

          {/* Toggle Arcs */}
          <button
            type="button"
            onClick={toggleArcs}
            aria-label="Toggle Global Data Arcs"
            className={`p-1 rounded-md transition-colors ${
              arcsVisible ? "text-[#A3FF12]" : "text-[#A7ADA5]/60 hover:text-white"
            } hover:bg-white/[0.08]`}
            title={arcsVisible ? "Hide Connection Arcs" : "Show Connection Arcs"}
          >
            <GlobeIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Touch / Drag Helper Hint for Mobile & Desktop */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#080A08]/60 border border-white/[0.06] backdrop-blur-sm text-[10px] font-mono text-[#A7ADA5]/70 pointer-events-none select-none">
        <RotateCw className="w-2.5 h-2.5 text-[#A3FF12]/70 animate-spin" style={{ animationDuration: "12s" }} />
        <span>DRAG TO ROTATE 3D GLOBE</span>
      </div>

      {/* Bottom Gradient Fade Into Subsequent Page Sections */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080A08] via-[#080A08]/80 to-transparent pointer-events-none" />
    </div>
  );
};
