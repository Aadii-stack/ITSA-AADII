import React, { useEffect, useState, useRef } from 'react';
import './PreLoader.css';
import logo from '../../assets/itsa-logo.png';

const CODE_LINES = [
  'const itsa = new Association({ year: 2024 });',
  'import { Event, Tech, Community } from "@itsa/core";',
  'function organizeHackathon(team) {',
  '  return team.map(member => member.innovate());',
  '}',
  'git commit -m "init: ITSA v2 launch"',
  'npm run build -- --production',
  'SELECT * FROM events WHERE type = "tech";',
  'class Student extends Member {',
  '  constructor(name, branch) {',
  '    super(name); this.branch = branch;',
  '  }',
  '}',
  'docker compose up --build',
  'const theme = { primary: "#ffffff", highlight: "#B793D2", dark: "#050505" };',
  'export default function App() {',
  '  return <ITSA loading={true} />;',
  '}',
  'git push origin main',
  'await fetch("/api/events").then(r => r.json());',
  'interface Member { name: string; role: Role; }',
  'yarn add @itsa/components framer-motion',
  'const [events, setEvents] = useState([]);',
  'useEffect(() => { loadEvents(); }, []);',
  '.container { display: grid; gap: 1.5rem; }',
  'console.log("ITSA — powering tech culture");',
  'npm install && npm run dev',
  'type EventKind = "workshop" | "hackathon" | "summit";',
  'const router = createBrowserRouter(routes);',
  'tailwind.config = { theme: { extend: {} } };',
  'pnpm dlx shadcn-ui@latest init',
  'git checkout -b feature/registration-portal',
  'SELECT COUNT(*) FROM registrations WHERE paid = true;',
  'const api = axios.create({ baseURL: "/api/v2" });',
  '@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }',
  'module.exports = { plugins: [tailwindcss] };',
  'const ctx = canvas.getContext("2d");',
  'async function register(user) { await db.insert(user); }',
];

const COLUMN_COUNT = 5;

const CodeScrollColumn = ({ lines, delay, duration }) => (
  <div className="code-scroll-column" style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}>
    {[...lines, ...lines].map((line, i) => (
      <div key={i} className="code-scroll-line">{line}</div>
    ))}
  </div>
);

const PreLoader = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => {
    const start = Math.floor((i / COLUMN_COUNT) * CODE_LINES.length);
    const slice = [...CODE_LINES.slice(start), ...CODE_LINES.slice(0, start)];
    return { lines: slice, delay: -(i * 2.3), duration: 18 + i * 2.5 };
  });

  return (
    <div className={`intro-preloader-overlay ${isFading ? 'fade-exit' : ''}`}>
      <div className="code-bg">
        {columns.map((col, i) => (
          <CodeScrollColumn key={i} {...col} />
        ))}
      </div>
      <div className="code-blur-layer" />

      <div className="intro-container">
        <div className="logo-ring-wrapper">
          <svg className="ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="ring-path" />
          </svg>
          <img src={logo} alt="ITSA Logo" className="intro-logo" />
        </div>

        <div className="divider-line"></div>

        <div className="intro-text-box">
          <h2 className="intro-title">ITSA</h2>
          <p className="intro-sub">INFORMATION TECHNOLOGY STUDENT ASSOCIATION</p>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;