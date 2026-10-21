import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import './Hero.css';

const CODE_SNIPPETS = [
  { text: 'const itsa = new Community();', type: 'js' },
  { text: 'function buildFuture() {}', type: 'js' },
  { text: 'import { creativity } from "technology";', type: 'js' },
  { text: 'while (learning) { create(); }', type: 'js' },
  { text: 'class Developer extends Student {}', type: 'js' },
  { text: 'git commit -m "build something great"', type: 'terminal', hasCursor: true },
  { text: 'npm run dev', type: 'terminal', hasCursor: true },
  { text: 'const ideas = await buildSomething();', type: 'js' },
  {
    text: '<section class="innovation">\n  <h1>Build the future</h1>\n</section>',
    type: 'html',
    lines: ['<section class="innovation">', '  <h1>Build the future</h1>', '</section>']
  },
  {
    text: '.developer {\n  creativity: infinite;\n  color: #C8861A;\n}',
    type: 'css',
    lines: ['.developer {', '  creativity: infinite;', '  color: #C8861A;', '}']
  },
  { text: 'docker compose up -d', type: 'terminal' },
  { text: 'git push origin main', type: 'terminal' },
  { text: 'cargo build --release', type: 'terminal' },
  { text: 'pnpm add ambition', type: 'terminal' },
  { text: 'tail -f /var/log/itsa/ambition.log', type: 'terminal', hasCursor: true },
  { text: 'echo "MAKE IT HAPPEN"', type: 'terminal', hasCursor: true },
  { text: 'chmod +x deploy_future.sh', type: 'terminal' },
  { text: 'python -m itsa.hackathon --start', type: 'terminal' },
  { text: 'systemctl start itsa-core', type: 'terminal' },
  { text: 'curl -X POST api.slrtce.in/itsa', type: 'terminal' },
  { text: 'git checkout -b feature/infinite', type: 'terminal' },
  { text: 'interface Future<T> extends Innovation<T>', type: 'ts' },
  { text: 'const [impact, setImpact] = useState(Infinity);', type: 'js' },
  { text: 'export const LEADERS = ["code", "create"];', type: 'js' },
  { text: 'await Promise.all([dream(), code(), ship()]);', type: 'js' },
  { text: 'type Result<T> = Success<T> | Lesson;', type: 'ts' },
  { text: 'const slrtce = { it: "Excellence", year: 2026 };', type: 'js' },
  { text: 'export default defineCommunity({ name: "ITSA" });', type: 'js' },
  { text: 'const isReady = true; if (isReady) execute();', type: 'js' },
  { text: 'console.log("Welcome to ITSA SLRTCE");', type: 'js' },
  { text: 'const latency = 0; // zero hesitation', type: 'js' },
  { text: 'import { leadership } from "@/itsa";', type: 'js' },
  { text: 'const vision = new Vision({ slrtce: true });', type: 'js' },
  { text: 'while (curious) { explore(); }', type: 'js' },
  { text: 'const stack = ["TypeScript", "Rust", "Python"];', type: 'js' },
  { text: 'export async function bootstrap() {}', type: 'js' },
  { text: 'const status = "ONLINE_AND_BUILDING";', type: 'js' },
  { text: 'Object.freeze({ limits: null });', type: 'js' },
  { text: 'window.ITSA_DISPATCH("IGNITE");', type: 'js' },
  { text: 'const roadmap = new Set(["Learn", "Build"]);', type: 'js' },
  { text: 'go func() { listenAndServe() }();', type: 'go' },
  { text: 'def build_tomorrow(students):', type: 'python' },
  { text: 'SELECT * FROM minds WHERE curiosity = true;', type: 'sql' },
  { text: 'kubectl apply -f cluster-prod.yaml', type: 'terminal' },
  { text: 'terraform apply -auto-approve', type: 'terminal' },
  { text: 'const socket = new WebSocket("wss://itsa/live");', type: 'js' },
  { text: 'let buffer = Vec::with_capacity(4096);', type: 'rust' },
  { text: 'model = NeuralNetwork(layers=[128, 64]);', type: 'python' },
  { text: 'const entropy = computeSystemEntropy(stream);', type: 'js' },
  { text: 'export const ARCHITECTS = new Set(["SLRTCE"]);', type: 'js' },
  { text: 'fetch("/api/hackathon/register").then(submit);', type: 'js' },
  { text: 'fn solve_problem<T: Logic>(input: T) -> Solution', type: 'rust' },
  { text: 'const pipeline = createStreamPipeline();', type: 'js' },
  { text: 'pragma solidity ^0.8.20;', type: 'solidity' },
  { text: 'app.use(cors({ origin: "itsa.slrtce.in" }));', type: 'js' },
  { text: 'optimizer.zero_grad(); loss.backward();', type: 'python' },
  { text: 'new Promise((resolve) => craft(resolve));', type: 'js' },
  { text: 'git remote add upstream github.com/itsa', type: 'terminal' },
  { text: 'gh pr merge --auto --squash', type: 'terminal' },
  { text: 'npx create-next-app@latest itsa-hub', type: 'terminal' },
  { text: '// 62 glassmorphic syntax nodes', type: 'comment' }
];

const OCHRE_KEYWORD = '#FFA31A';
const OCHRE_STRING = '#FFC97A';
const WHITE_TEXT = '#FFFFFF';
const MUTED_TEXT = '#C8C8C8';

function createCodeTexture(snippet, showCursor = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const fontSize = 16;
  const paddingX = 22;
  const paddingY = 16;
  const lineHeight = 24;

  const fontString = `500 ${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
  ctx.font = fontString;

  const lines = snippet.lines || [snippet.text];
  let maxLineWidth = 0;
  lines.forEach(l => {
    const w = ctx.measureText(l + (snippet.hasCursor ? ' _' : '')).width;
    if (w > maxLineWidth) maxLineWidth = w;
  });

  const width = Math.ceil(maxLineWidth + paddingX * 2);
  const height = Math.ceil(lines.length * lineHeight + paddingY * 2);

  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  ctx.scale(dpr, dpr);

  const radius = 6;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, radius);
  ctx.clip();

  // Glassmorphic translucent frosted background
  ctx.fillStyle = 'rgba(12, 12, 12, 0.48)';
  ctx.fillRect(0, 0, width, height);

  // Frosted diagonal sheen gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // Specular border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0.5, 0.5, width - 1, height - 1, radius);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Left ochre accent stripe
  ctx.fillStyle = '#E59B24';
  ctx.fillRect(0, 0, 2.5, height);
  ctx.restore();

  // Monospace text rendering
  ctx.font = fontString;
  ctx.textBaseline = 'top';

  lines.forEach((lineText, lineIdx) => {
    let currentX = paddingX;
    const currentY = paddingY + lineIdx * lineHeight;

    if (snippet.type === 'terminal') {
      ctx.fillStyle = OCHRE_KEYWORD;
      ctx.fillText('$', currentX, currentY);
      currentX += ctx.measureText('$ ').width;
      ctx.fillStyle = WHITE_TEXT;
      ctx.fillText(lineText, currentX, currentY);
      if (snippet.hasCursor && showCursor && lineIdx === lines.length - 1) {
        const textW = ctx.measureText(lineText).width;
        ctx.fillStyle = OCHRE_KEYWORD;
        ctx.fillRect(currentX + textW + 2, currentY + 3, 8, 16);
      }
    } else {
      const tokens = lineText.split(/(\s+|[{}()[\];,."'])/);
      tokens.forEach(tok => {
        if (!tok) return;
        if (/^(const|let|var|function|class|extends|while|if|else|import|export|from|await|async|type|interface|return|new|def|pub|fn|pragma|contract)$/.test(tok)) {
          ctx.fillStyle = OCHRE_KEYWORD;
        } else if (/^(['"`].*['"`]|true|false|null|undefined|\d+)$/.test(tok)) {
          ctx.fillStyle = OCHRE_STRING;
        } else if (/^(\/\/.*)$/.test(tok)) {
          ctx.fillStyle = MUTED_TEXT;
        } else if (/^[{}()[\];,."']$/.test(tok)) {
          ctx.fillStyle = MUTED_TEXT;
        } else {
          ctx.fillStyle = WHITE_TEXT;
        }
        ctx.fillText(tok, currentX, currentY);
        currentX += ctx.measureText(tok).width;
      });
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return { texture, canvas, width, height, dpr };
}

export default function Hero() {
  const canvasRef = useRef(null);
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0A);
    scene.fog = new THREE.FogExp2(0x0A0A0A, 0.0016);

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 1, 1200);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const fragmentGroup = new THREE.Group();
    scene.add(fragmentGroup);

    // --- SPAWN CODE CARDS (62 DESKTOP, 38 TABLET, 24 MOBILE) ---
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const totalCount = isMobile ? 24 : (isTablet ? 38 : CODE_SNIPPETS.length);

    const codeFragments = [];
    const cursorFragments = [];

    for (let i = 0; i < totalCount; i++) {
      const snippet = CODE_SNIPPETS[i % CODE_SNIPPETS.length];
      const texData = createCodeTexture(snippet, false);

      // Plane geometry sized at 0.24x for crisp readability in 3D
      const planeWidth = texData.width * 0.24;
      const planeHeight = texData.height * 0.24;
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

      const depthTier = i % 3;
      let zPos = 0;
      let initialOpacity = 0.85;

      if (depthTier === 0) {
        zPos = 30 + Math.random() * 60;
        initialOpacity = 0.90 + Math.random() * 0.08;
      } else if (depthTier === 1) {
        zPos = -60 + Math.random() * 90;
        initialOpacity = 0.78 + Math.random() * 0.12;
      } else {
        zPos = -190 + Math.random() * 130;
        initialOpacity = 0.65 + Math.random() * 0.15;
      }

      const distFromCam = 200 - zPos;
      const scaleCompensation = 0.96 + (distFromCam / 260) * 0.22;
      const scaleMul = scaleCompensation * (0.92 + Math.random() * 0.14);

      let xPos = (Math.random() - 0.5) * 580;
      let yPos = (Math.random() - 0.5) * 330;

      // Generous negative space around the centered hero headline
      if (zPos > -80) {
        const inCenterX = Math.abs(xPos) < 170;
        const inCenterY = Math.abs(yPos) < 70;
        if (inCenterX && inCenterY) {
          if (Math.random() > 0.5) {
            xPos = (xPos >= 0 ? 1 : -1) * (180 + Math.random() * 115);
          } else {
            yPos = (yPos >= 0 ? 1 : -1) * (85 + Math.random() * 85);
          }
        }
      }

      const material = new THREE.MeshBasicMaterial({
        map: texData.texture,
        transparent: true,
        opacity: initialOpacity,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(xPos, yPos, zPos);
      mesh.scale.set(scaleMul, scaleMul, 1);

      const hasRotation = Math.random() < 0.25;
      mesh.userData = {
        baseX: xPos,
        baseY: yPos,
        baseZ: zPos,
        driftSpeedX: 0.15 + Math.random() * 0.24,
        driftSpeedY: 0.12 + Math.random() * 0.20,
        driftAmpX: 5 + Math.random() * 10,
        driftAmpY: 4 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
        rotSpeedZ: hasRotation ? (Math.random() - 0.5) * 0.06 : 0,
        baseRotZ: hasRotation ? (Math.random() - 0.5) * 0.04 : 0,
        baseOpacity: initialOpacity,
        snippet,
        texData
      };

      if (hasRotation) {
        mesh.rotation.z = mesh.userData.baseRotZ;
      }

      fragmentGroup.add(mesh);
      codeFragments.push(mesh);

      if (snippet.hasCursor) {
        cursorFragments.push({ mesh, snippet, texData, cursorVisible: false });
      }
    }

    // Cursor blink interval
    let cursorInterval = null;
    if (!prefersReducedMotion && cursorFragments.length > 0) {
      cursorInterval = setInterval(() => {
        cursorFragments.forEach(item => {
          item.cursorVisible = !item.cursorVisible;
          const updated = createCodeTexture(item.snippet, item.cursorVisible);
          if (item.mesh.material.map) item.mesh.material.map.dispose();
          item.mesh.material.map = updated.texture;
          item.mesh.material.needsUpdate = true;
          item.texData = updated;
        });
      }, 530);
    }

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const cameraDrift = { z: 200 };

    const handleMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (window.innerWidth > 768 && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Scroll camera pullback
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (window.innerHeight || 800), 1);
      cameraDrift.z = 200 + progress * 150;
      const opacityFactor = Math.max(0.18, 1 - progress * 0.78);
      codeFragments.forEach(m => {
        m.material.opacity = m.userData.baseOpacity * opacityFactor;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    const clock = new THREE.Clock();
    let animId = null;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      camera.position.x = mouse.x * 24;
      camera.position.y = mouse.y * 15;
      camera.position.z = cameraDrift.z;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        for (let i = 0; i < codeFragments.length; i++) {
          const m = codeFragments[i];
          const u = m.userData;
          m.position.x = u.baseX + Math.sin(elapsedTime * u.driftSpeedX + u.phase) * u.driftAmpX;
          m.position.y = u.baseY + Math.cos(elapsedTime * u.driftSpeedY + u.phase) * u.driftAmpY;
          if (u.rotSpeedZ !== 0) {
            m.rotation.z = u.baseRotZ + Math.sin(elapsedTime * u.rotSpeedZ + u.phase) * 0.05;
          }
        }
      }

      renderer.render(scene, camera);
    };

    clock.start();
    renderLoop();

    // --- 4-WAY COLLISION HEADLINE ENTRANCE ANIMATION ---
    const wordInfo = heroWrapperRef.current?.querySelector('.word-information');
    const wordTech = heroWrapperRef.current?.querySelector('.word-technology');
    const wordStudent = heroWrapperRef.current?.querySelector('.word-student');
    const wordAssoc = heroWrapperRef.current?.querySelector('.word-association');
    const mottoEl = heroWrapperRef.current?.querySelector('.hero-motto');
    const ctaWrap = heroWrapperRef.current?.querySelector('.hero-cta-wrap');

    let tl = null;
    if (prefersReducedMotion) {
      [wordInfo, wordTech, wordStudent, wordAssoc].forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      if (mottoEl) { mottoEl.style.opacity = '1'; mottoEl.style.transform = 'none'; }
      if (ctaWrap) { ctaWrap.style.opacity = '1'; ctaWrap.style.transform = 'none'; }
    } else {
      tl = gsap.timeline();

      if (wordInfo) gsap.set(wordInfo, { y: -170, opacity: 0, scale: 0.95 });
      if (wordTech) gsap.set(wordTech, { x: -280, opacity: 0, scale: 0.95 });
      if (wordStudent) gsap.set(wordStudent, { x: 280, opacity: 0, scale: 0.95 });
      if (wordAssoc) gsap.set(wordAssoc, { y: 170, opacity: 0, scale: 0.95 });

      // Phase 1: Fast inward rush to collision point
      tl.to(wordInfo, { y: 4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.1);
      tl.to(wordAssoc, { y: -4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.1);
      tl.to(wordTech, { x: 4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.1);
      tl.to(wordStudent, { x: -4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.1);

      // Phase 2: Instant elastic recoil away from each other
      tl.to(wordTech, {
        keyframes: [
          { x: -16, duration: 0.16, ease: 'power2.out' },
          { x: 3, duration: 0.14, ease: 'power2.inOut' },
          { x: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.56);

      tl.to(wordStudent, {
        keyframes: [
          { x: 16, duration: 0.16, ease: 'power2.out' },
          { x: -3, duration: 0.14, ease: 'power2.inOut' },
          { x: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.56);

      tl.to(wordInfo, {
        keyframes: [
          { y: -12, duration: 0.16, ease: 'power2.out' },
          { y: 2, duration: 0.14, ease: 'power2.inOut' },
          { y: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.56);

      tl.to(wordAssoc, {
        keyframes: [
          { y: 12, duration: 0.16, ease: 'power2.out' },
          { y: -2, duration: 0.14, ease: 'power2.inOut' },
          { y: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.56);

      // Impact vibration
      tl.to('.hero-headline', {
        keyframes: [
          { scale: 1.03, duration: 0.08, ease: 'power1.out' },
          { scale: 0.99, duration: 0.1, ease: 'power1.inOut' },
          { scale: 1, duration: 0.12, ease: 'power2.out' }
        ]
      }, 0.56);

      // Motto: Make it happen
      if (mottoEl) {
        tl.to(mottoEl, { opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.2');
      }

      // Explore CTA
      if (ctaWrap) {
        tl.to(ctaWrap, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      }
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (cursorInterval) clearInterval(cursorInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (tl) tl.kill();

      codeFragments.forEach(m => {
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          if (m.material.map) m.material.map.dispose();
          m.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero-container" id="hero" ref={heroWrapperRef}>
      {/* Three.js Viewport */}
      <canvas id="three-viewport" ref={canvasRef} aria-hidden="true" />

      {/* Decorative Grid Overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="hero-content">
        {/* Headline: INFORMATION TECHNOLOGY STUDENT ASSOCIATION */}
        <div className="hero-headline-wrap">
          <h1 className="hero-headline" id="hero-headline" aria-label="Information Technology Student Association">
            <span className="headline-line line-top">
              <span className="headline-word word-information">INFORMATION</span>
            </span>
            <span className="headline-line line-middle">
              <span className="headline-word word-technology">TECHNOLOGY</span>
              <span className="headline-word word-student">STUDENT</span>
            </span>
            <span className="headline-line line-bottom">
              <span className="headline-word word-association">ASSOCIATION</span>
            </span>
          </h1>
        </div>

        {/* Subtitle: Make it happen */}
        <div className="hero-motto" id="hero-motto">
          <span>Make it happen</span>
        </div>

        {/* CTA: Explore */}
        <div className="hero-cta-wrap" id="hero-cta">
          <a href="#make-it-happen" className="hero-cta-btn" id="cta-button" aria-label="Explore ITSA overview section">
            <span>Explore</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
