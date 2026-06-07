/**
 * ViewPortProject.tsx
 *
 * React island (client:load) showcasing the ViewPort project with tabbed SVG
 * illustrations. Each tab demonstrates a dev-tool feature (responsive preview,
 * CSS inspector, color picker, DOM tree, performance, console, etc.).
 *
 * ── Features ──
 * - Tabbed UI         9 feature tabs with animated SVG illustrations per tab
 * - Tab switch anim   Anime.js v4 fade transition on content change
 * - CSS keyframes     Inline <style> with looping illustration animations
 * - Entry animation   Staggered fadeUp/slideRight on first mount (CSS-driven)
 * - GitHub stars      Displays live star count passed via props
 */
import { useState, useEffect, useRef, type ReactNode } from 'react';
import { animate } from 'animejs';

/* ── CSS Keyframes ─────────────────────────────────────────── */

const CSS = `
@keyframes vp-fadeIn{from{opacity:0}to{opacity:1}}
@keyframes vp-toastIn{from{opacity:0;translate:0 6px}to{opacity:1;translate:0 0}}
@keyframes vp-tabActivate{from{opacity:0.6}to{opacity:1}}

/* tab 1 - responsive preview */
@keyframes vp-handMove{0%,8%{translate:0 0}12%,52%{translate:0 0}56%,92%{translate:36px 0}96%,100%{translate:36px 0}}
@keyframes vp-browserWidth{0%,12%{width:70px}56%,92%{width:110px}96%,100%{width:110px}}
@keyframes vp-handSwap{0%,8%{opacity:1}9%,100%{opacity:0}}
@keyframes vp-grabSwap{0%,8%{opacity:0}9%,92%{opacity:1}93%,100%{opacity:0}}
@keyframes vp-openSwap{0%,92%{opacity:0}93%,100%{opacity:1}}

/* shared — re-run wrapper + staggered reveals */
@keyframes vp-cycle{0%{opacity:0}5%{opacity:1}90%{opacity:1}100%{opacity:0}}
@keyframes vp-r1{0%,3%{opacity:0;transform:translateX(-5px)}13%,100%{opacity:1;transform:translateX(0)}}
@keyframes vp-r2{0%,13%{opacity:0;transform:translateX(-5px)}23%,100%{opacity:1;transform:translateX(0)}}
@keyframes vp-r3{0%,23%{opacity:0;transform:translateX(-5px)}33%,100%{opacity:1;transform:translateX(0)}}
@keyframes vp-r4{0%,33%{opacity:0;transform:translateX(-5px)}43%,100%{opacity:1;transform:translateX(0)}}
@keyframes vp-r5{0%,43%{opacity:0;transform:translateX(-5px)}53%,100%{opacity:1;transform:translateX(0)}}
@keyframes vp-g1{0%,3%{transform:scaleX(0)}13%,100%{transform:scaleX(1)}}
@keyframes vp-g2{0%,13%{transform:scaleX(0)}23%,100%{transform:scaleX(1)}}
@keyframes vp-g3{0%,23%{transform:scaleX(0)}33%,100%{transform:scaleX(1)}}
@keyframes vp-g4{0%,33%{transform:scaleX(0)}43%,100%{transform:scaleX(1)}}
@keyframes vp-g5{0%,43%{transform:scaleX(0)}53%,100%{transform:scaleX(1)}}
@keyframes vp-p1{0%,4%{opacity:0;transform:scale(0.3)}14%,100%{opacity:1;transform:scale(1)}}
@keyframes vp-p2{0%,20%{opacity:0;transform:scale(0.3)}30%,100%{opacity:1;transform:scale(1)}}
@keyframes vp-p3{0%,36%{opacity:0;transform:scale(0.3)}46%,100%{opacity:1;transform:scale(1)}}

/* tab 2 — css inspector */
@keyframes vp-scanY{0%{transform:translateY(0);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateY(26px);opacity:0}}
@keyframes vp-breathe{0%,100%{opacity:0.4}50%{opacity:0.95}}
@keyframes vp-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,5px)}}

/* tab 3 — color picker */
@keyframes vp-dropSweep{0%,5%{transform:translate(0,0)}33%{transform:translate(18px,-12px)}63%{transform:translate(34px,-22px)}92%,100%{transform:translate(0,0)}}

/* tab 4 — dom tree */
@keyframes vp-treeSweep{0%,12%{transform:translateY(0)}25%,37%{transform:translateY(18px)}50%,62%{transform:translateY(62px)}75%,87%{transform:translateY(90px)}100%{transform:translateY(0)}}

/* tab 5 — performance */
@keyframes vp-graphScroll{from{transform:translateX(0)}to{transform:translateX(-100px)}}
@keyframes vp-fpsBlink{0%,100%{opacity:1}50%{opacity:0.55}}

/* tab 6 — console */
@keyframes vp-caret{0%,49%{opacity:1}50%,100%{opacity:0}}

/* entry animation — CSS keyframes for sequential reveal */
@keyframes vp-fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes vp-fadeUpMore{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes vp-fadeUpLess{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes vp-slideRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes vp-scaleIn{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}

@media (prefers-reduced-motion: no-preference) {
  [data-anim="label"],[data-anim="title"]{animation:vp-fadeUpMore 800ms ease-out 150ms forwards}
  [data-anim="desc"]{animation:vp-fadeUpLess 800ms ease-out 300ms forwards}
  [data-anim="right"]{animation:vp-slideRight 800ms ease-out 600ms forwards}
  [data-anim="divider"]{animation:vp-scaleIn 600ms ease-out 700ms forwards;transform-origin:left}
  [data-anim="list"]>li{animation:vp-fadeUp 600ms ease-out forwards}
  [data-anim="list"]>li:nth-child(1){animation-delay:450ms}
  [data-anim="list"]>li:nth-child(2){animation-delay:530ms}
  [data-anim="list"]>li:nth-child(3){animation-delay:610ms}
  [data-anim="list"]>li:nth-child(4){animation-delay:690ms}
  [data-anim="cta"]>*{animation:vp-fadeUp 600ms ease-out forwards}
  [data-anim="cta"]>:nth-child(1){animation-delay:550ms}
  [data-anim="cta"]>:nth-child(2){animation-delay:650ms}
}

/* tab 8 — accessibility ring / tab 9 — lighthouse arcs */
@keyframes vp-ring{0%,8%{stroke-dashoffset:151}55%,100%{stroke-dashoffset:27}}
@keyframes vp-arcA{0%,4%{stroke-dashoffset:163}42%,100%{stroke-dashoffset:13}}
@keyframes vp-arcB{0%,12%{stroke-dashoffset:163}50%,100%{stroke-dashoffset:36}}
@keyframes vp-arcC{0%,20%{stroke-dashoffset:163}58%,100%{stroke-dashoffset:0}}
`;

/* semantic status hues (intentionally theme-independent) */
const HUE = {
  ok: '#22C55E',
  warn: '#F59E0B',
  bad: '#EF4444',
  info: '#6366F1',
  purple: '#8B5CF6',
};

/* ── Illustrations ─────────────────────────────────────────── */

function ResponsivePreviewIllustration() {
  const dur = '4s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3 relative overflow-visible">
      <div className="relative" style={{ height: 60, animation: `vp-browserWidth ${dur} ${timing} infinite` }}>
        <svg viewBox="0 0 140 80" width="100%" height="100%" preserveAspectRatio="none" fill="none">
          <rect x="1" y="1" width="138" height="78" rx="3" fill="var(--color-background)" stroke="var(--color-border)" strokeWidth="1.5" />
          <rect x="1" y="1" width="138" height="12" rx="3" fill="var(--color-border)" />
          <circle cx="8" cy="7" r="1.5" fill="var(--color-accent)" opacity="0.6" />
          <circle cx="14" cy="7" r="1.5" fill="var(--color-muted)" opacity="0.4" />
          <circle cx="20" cy="7" r="1.5" fill="var(--color-muted)" opacity="0.4" />
          <rect x="30" y="3.5" width="60" height="7" rx="2" fill="var(--color-background)" opacity="0.3" />
          <rect x="6" y="18" width="45" height="3.5" rx="1" fill="var(--color-muted)" opacity="0.2" />
          <rect x="6" y="25" width="70" height="2.5" rx="1" fill="var(--color-muted)" opacity="0.15" />
          <rect x="6" y="30" width="55" height="2.5" rx="1" fill="var(--color-muted)" opacity="0.15" />
          <rect x="6" y="38" width="28" height="16" rx="2" fill="var(--color-muted)" opacity="0.1" />
          <rect x="38" y="38" width="28" height="16" rx="2" fill="var(--color-muted)" opacity="0.1" />
          <rect x="70" y="38" width="28" height="16" rx="2" fill="var(--color-muted)" opacity="0.1" />
          <rect x="6" y="60" width="80" height="2.5" rx="1" fill="var(--color-muted)" opacity="0.12" />
          <rect x="6" y="66" width="50" height="2.5" rx="1" fill="var(--color-muted)" opacity="0.12" />
        </svg>
        <div className="absolute z-10" style={{ top: '50%', right: -7, transform: 'translateY(-50%)', animation: `vp-handMove ${dur} ${timing} infinite` }}>
          <svg width="14" height="14" viewBox="0 0 256 256" fill="var(--color-primary)" style={{ position: 'absolute', top: 0, left: 0, animation: `vp-handSwap ${dur} ${timing} infinite, vp-openSwap ${dur} ${timing} infinite` }}>
            <path d="M224,104v50.93c0,46.2-36.85,84.55-83,85.06A83.71,83.71,0,0,1,80.6,215.4C58.79,192.33,34.15,136,34.15,136a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,96,151.74V32a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V104a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V88a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V112a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,224,104Z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 256 256" fill="var(--color-primary)" style={{ opacity: 0, animation: `vp-grabSwap ${dur} ${timing} infinite` }}>
            <path d="M216,104v48a88,88,0,0,1-176,0V136a16,16,0,0,1,32,0v8a8,8,0,0,0,16,0V88a16,16,0,0,1,32,0v16a8,8,0,0,0,16,0V88a16,16,0,0,1,32,0v16a8,8,0,0,0,16,0,16,16,0,0,1,32,0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CssInspectorIllustration() {
  const dur = '3s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3 relative overflow-visible">
      <svg viewBox="0 0 200 120" className="w-full max-w-[180px]" fill="none">
        <g style={{ animation: `vp-cycle ${dur} ${timing} infinite` }}>
          <rect x="30" y="35" width="90" height="50" rx="4" fill="var(--color-border)" opacity="0.3" />
          <rect x="30" y="35" width="90" height="50" rx="4"
            fill="#03a9f4" fillOpacity="0.12" stroke="#03a9f4" strokeWidth="1" />
          <rect x="35" y="42" width="80" height="36" rx="2"
            fill="#22C55E" fillOpacity="0.08" stroke="#22C55E" strokeWidth="1" />
          <rect x="40" y="48" width="70" height="24" rx="2"
            fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1" />
          <g>
            <rect x="130" y="12" width="62" height="42" rx="4" fill="var(--color-background)"
              stroke="var(--color-border)" strokeWidth="1" />
            <text x="136" y="28" fontSize="7" fill="var(--color-accent)" className="font-mono">div.container</text>
            <rect x="136" y="33" width="8" height="3" rx="1" fill="#F59E0B" />
            <text x="147" y="36" fontSize="6" fill="var(--color-muted)" className="font-mono">margin</text>
            <rect x="136" y="39" width="8" height="3" rx="1" fill="#03a9f4" />
            <text x="147" y="42" fontSize="6" fill="var(--color-muted)" className="font-mono">padding</text>
            <rect x="136" y="45" width="8" height="3" rx="1" fill="#22C55E" />
            <text x="147" y="48" fontSize="6" fill="var(--color-muted)" className="font-mono">content</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function ColorPickerIllustration() {
  const dur = '3s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3 relative">
      <svg viewBox="0 0 180 120" className="w-full max-w-[160px]" fill="none">
        <defs>
          <radialGradient id="cg" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="30%" stopColor="#03a9f4" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </radialGradient>
        </defs>
        <g style={{ animation: `vp-cycle ${dur} ${timing} infinite` }}>
          <circle cx="55" cy="60" r="36" fill="url(#cg)" stroke="var(--color-border)" strokeWidth="1" />
          <g style={{ transformOrigin: '130px 50px' }}>
            <rect x="110" y="30" width="55" height="50" rx="6" fill="var(--color-background)"
              stroke="var(--color-border)" strokeWidth="1" />
            <rect x="118" y="38" width="18" height="18" rx="3" fill="#03a9f4" />
            <text x="142" y="49" fontSize="8" fill="var(--color-muted)" className="font-mono">HEX</text>
          </g>
          <g transform="translate(0,0)">
            <path d="M0 0 L10 18 L5 20 L9 30 L5 32 L2 22 L0 26 Z"
              fill="var(--color-primary)" opacity="0.7" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function DomTreeIllustration() {
  return (
    <div className="flex items-center justify-center h-full py-3">
      <svg viewBox="0 0 180 120" className="w-full max-w-[160px]" fill="none">
        <g>
          <text x="8" y="16" fontSize="8" fill="var(--color-accent)" className="font-mono">&lt;html&gt;</text>
        </g>
        <g>
          <text x="20" y="32" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;head&gt;</text>
          <text x="32" y="44" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;meta /&gt;</text>
          <text x="32" y="54" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;title&gt;</text>
          <text x="20" y="66" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;/head&gt;</text>
        </g>
        <g>
          <text x="20" y="80" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;body&gt;</text>
          <text x="32" y="92" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;header&gt;</text>
          <text x="32" y="102" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;main&gt;</text>
          <text x="44" y="112" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;section&gt;</text>
        </g>
      </svg>
    </div>
  );
}

function PerformanceIllustration() {
  const dur = '3s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3">
      <svg viewBox="0 0 200 120" className="w-full max-w-[180px]" fill="none">
        <g style={{ animation: `vp-cycle ${dur} ${timing} infinite` }}>
          <path d="M30 80 A70 70 0 0 1 170 80"
            stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 80 A70 70 0 0 1 170 80"
            stroke="#03a9f4" strokeWidth="4" strokeLinecap="round"
            strokeDasharray="180" strokeDashoffset="300" />
          <rect x="40" y="60" width="22" height="44" rx="2"
            fill="#03a9f4" style={{ transformOrigin: '51px 104px' }} />
          <rect x="68" y="72" width="22" height="32" rx="2"
            fill="#03a9f4" fillOpacity="0.6" style={{ transformOrigin: '79px 104px' }} />
          <rect x="96" y="66" width="22" height="38" rx="2"
            fill="#03a9f4" fillOpacity="0.4" style={{ transformOrigin: '107px 104px' }} />
          <rect x="124" y="52" width="22" height="52" rx="2"
            fill="#03a9f4" fillOpacity="0.8" style={{ transformOrigin: '135px 104px' }} />
          <text x="42" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">FCP</text>
          <text x="70" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">LCP</text>
          <text x="98" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">CLS</text>
          <text x="125" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">FPS</text>
        </g>
      </svg>
    </div>
  );
}

function ConsolePanelIllustration() {
  const dur = '3s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3">
      <svg viewBox="0 0 200 100" className="w-full max-w-[180px]" fill="none">
        <g style={{ animation: `vp-cycle ${dur} ${timing} infinite` }}>
          <rect x="10" y="4" width="180" height="92" rx="4" fill="var(--color-background)"
            stroke="var(--color-border)" strokeWidth="1" />
          <rect x="10" y="4" width="180" height="18" rx="4" fill="var(--color-border)" />
          <circle cx="22" cy="13" r="3" fill="#EF4444" />
          <circle cx="32" cy="13" r="3" fill="#F59E0B" />
          <circle cx="42" cy="13" r="3" fill="#22C55E" />
          <text x="90" y="16" fontSize="7" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Console</text>
          <text className="font-mono" x="18" y="38" fontSize="7" fill="#22C55E">$ npm run dev</text>
          <text className="font-mono" x="18" y="50" fontSize="7" fill="var(--color-muted)">&gt; viewport@0.0.1 dev</text>
          <text className="font-mono" x="18" y="62" fontSize="7" fill="var(--color-muted)">  Local: http://localhost:1234</text>
          <text className="font-mono" x="18" y="74" fontSize="7" fill="var(--color-muted)">  Network: 192.168.1.5:1234</text>
          <text className="font-mono" x="18" y="88" fontSize="7" fill="#22C55E">$ ready in 342ms</text>
        </g>
      </svg>
    </div>
  );
}

function NetworkWaterfallIllustration() {
  const dur = '3s';
  const timing = 'cubic-bezier(0.4,0,0.2,1)';
  return (
    <div className="flex items-center justify-center h-full py-3">
      <svg viewBox="0 0 200 110" className="w-full max-w-[180px]" fill="none">
        <g style={{ animation: `vp-cycle ${dur} ${timing} infinite` }}>
          <text x="12" y="18" fontSize="6" fill="var(--color-muted)" className="font-mono">index.html</text>
          <rect x="60" y="10" width="50" height="10" rx="2" fill="#3B82F6" style={{ transformOrigin: 'left center' }} />
          <text x="12" y="36" fontSize="6" fill="var(--color-muted)" className="font-mono">style.css</text>
          <rect x="60" y="28" width="72" height="10" rx="2" fill="#8B5CF6" style={{ transformOrigin: 'left center' }} />
          <text x="12" y="54" fontSize="6" fill="var(--color-muted)" className="font-mono">app.js</text>
          <rect x="60" y="46" width="95" height="10" rx="2" fill="#22C55E" style={{ transformOrigin: 'left center' }} />
          <text x="12" y="72" fontSize="6" fill="var(--color-muted)" className="font-mono">api/data</text>
          <rect x="60" y="64" width="80" height="10" rx="2" fill="#F59E0B" style={{ transformOrigin: 'left center' }} />
          <text x="12" y="90" fontSize="6" fill="var(--color-muted)" className="font-mono">logo.png</text>
          <rect x="60" y="82" width="35" height="10" rx="2" fill="#03a9f4" style={{ transformOrigin: 'left center' }} />
          <line x1="60" y1="4" x2="200" y2="4" stroke="var(--color-border)" strokeWidth="0.5" />
          <text x="100" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">50ms</text>
          <text x="150" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">100ms</text>
        </g>
      </svg>
    </div>
  );
}

function AccessibilityAuditIllustration() {
  const dur = '4s';
  const items = [
    { label: 'Heading structure', ok: true },
    { label: 'Alt text present', ok: true },
    { label: 'Color contrast', ok: false },
    { label: 'ARIA labels', ok: true },
    { label: 'Keyboard nav', ok: true },
  ];
  return (
    <div className="flex items-center justify-center h-full py-3">
      <svg viewBox="0 0 180 110" className="w-full max-w-[160px]" fill="none">
        <g style={{ animation: `vp-cycle ${dur} ease-in-out infinite` }}>
          <path d="M90 8 L140 28 L140 52 C140 78 115 98 90 105 C65 98 40 78 40 52 L40 28 Z"
            fill="var(--color-background)" stroke="#22C55E" strokeWidth="1.5" opacity="0.7" />
          <text x="90" y="56" fontSize="10" fill="#22C55E" textAnchor="middle" fontWeight="bold">82</text>
          {items.map((item, i) => (
            <g key={i} style={{ animation: `vp-r${i+1} ${dur} ease-in-out infinite` }}>
              <text x="14" y={36 + i * 14} fontSize="8" fill={item.ok ? '#22C55E' : '#EF4444'}>{item.ok ? '✓' : '✗'}</text>
              <text x="26" y={36 + i * 14} fontSize="7" fill="var(--color-muted)" className="font-mono">{item.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function LighthouseIllustration() {
  const dur = '4s';
  const gauges = [
    { cx: 46, s: '92', c: HUE.ok, a: 'vp-arcA', off: 13, label: 'Perf' },
    { cx: 105, s: '78', c: HUE.warn, a: 'vp-arcB', off: 36, label: 'A11y' },
    { cx: 164, s: '100', c: HUE.ok, a: 'vp-arcC', off: 0, label: 'Best' },
  ];
  const ARC = 163;
  return (
    <div className="flex items-center justify-center h-full w-full py-3">
      <svg viewBox="0 0 210 104" className="w-full max-w-[200px]" fill="none" fontFamily="monospace">
        <g style={{ animation: `vp-cycle ${dur} ease-in-out infinite` }}>
          {gauges.map((g, i) => (
            <g key={i}>
              <circle cx={g.cx} cy="46" r="26" stroke="var(--color-border)" strokeOpacity="0.4" strokeWidth="5" />
              <circle cx={g.cx} cy="46" r="26" stroke={g.c} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={ARC} strokeDashoffset={g.off} transform={`rotate(-90 ${g.cx} 46)`}
                style={{ animation: `${g.a} ${dur} cubic-bezier(0.4,0,0.2,1) infinite` }} />
              <text x={g.cx} y="50" fontSize="14" fill="var(--color-primary)" textAnchor="middle" fontWeight="700">{g.s}</text>
              <text x={g.cx} y="86" fontSize="7" fill="var(--color-muted)" textAnchor="middle">{g.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ── Feature Data ──────────────────────────────────────────── */

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  comingSoon: boolean;
  illustration: () => ReactNode;
  keyPoints: string[];
}

const features: Feature[] = [
  {
    id: 'responsive',
    name: 'Responsive Preview',
    enabled: true,
    comingSoon: false,
    keyPoints: [
      'Test any URL inside a sandboxed iframe',
      'Switch between phone, tablet, and desktop',
      'Rotate orientation in one tap',
    ],
    illustration: () => <ResponsivePreviewIllustration />,
  },
  {
    id: 'css-inspector',
    name: 'CSS Inspector',
    enabled: false,
    comingSoon: false,
    keyPoints: [
      'Hover to inspect any element',
      'View computed styles and layout',
      'Copy CSS rules instantly',
    ],
    illustration: () => <CssInspectorIllustration />,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    enabled: false,
    comingSoon: false,
    keyPoints: [
      'Pick colors from any page element',
      'Copy HEX, RGB, and HSL values',
      'Check contrast ratios in real time',
    ],
    illustration: () => <ColorPickerIllustration />,
  },
  {
    id: 'dom-tree',
    name: 'DOM Tree',
    enabled: false,
    comingSoon: false,
    keyPoints: [
      'Browse the full document tree',
      'Search and filter nodes',
      'Edit attributes live',
    ],
    illustration: () => <DomTreeIllustration />,
  },
  {
    id: 'performance',
    name: 'Performance Monitor',
    enabled: false,
    comingSoon: false,
    keyPoints: [
      'Track FCP, LCP, CLS, and FPS',
      'Record and compare runs',
      'Export reports as JSON',
    ],
    illustration: () => <PerformanceIllustration />,
  },
  {
    id: 'console',
    name: 'Console Panel',
    enabled: false,
    comingSoon: true,
    keyPoints: [
      'Full JavaScript REPL',
      'Filter by log, warn, and error',
      'Persist history across sessions',
    ],
    illustration: () => <ConsolePanelIllustration />,
  },
  {
    id: 'network',
    name: 'Network Waterfall',
    enabled: false,
    comingSoon: true,
    keyPoints: [
      'See every request with timing',
      'Filter by type and status',
      'Inspect headers and payloads',
    ],
    illustration: () => <NetworkWaterfallIllustration />,
  },
  {
    id: 'accessibility',
    name: 'Accessibility Audit',
    enabled: false,
    comingSoon: true,
    keyPoints: [
      'Run WCAG 2.2 checks',
      'Get actionable fix suggestions',
      'Track scores over time',
    ],
    illustration: () => <AccessibilityAuditIllustration />,
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    enabled: false,
    comingSoon: true,
    keyPoints: [
      'Generate full Lighthouse reports',
      'Compare before and after',
      'Set performance budgets',
    ],
    illustration: () => <LighthouseIllustration />,
  },
];

/* ── Toast Component ───────────────────────────────────────── */

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute -top-2 right-0 z-50 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20 shadow-sm"
      style={{ animation: 'vp-toastIn 300ms ease-out' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
      {message}
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */

export default function ViewPortProject({ stars }: { stars: number | null }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = features[activeIdx];

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const anim = animate(el, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 250,
      ease: 'easeOutQuad',
    });
    return () => { anim.revert(); };
  }, [activeIdx]);

  function handleToolCTA(f: Feature) {
    if (!f.isAvailable) {
      setToast(f.name + ': unreleased');
    }
  }

  return (
    <section className="relative overflow-visible">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pt-8 pb-8 pl-5 pr-4 md:pl-[calc((100%-680px)/2)] md:pr-0 max-w-none flex flex-col md:flex-row md:items-start md:gap-12">

        {/* ── LEFT COLUMN: Project Overview ── */}
        <div className="md:w-[40%] shrink-0 mb-12 md:-mb-16 md:sticky md:top-24 md:-mt-3 md:self-stretch pr-5 md:pr-0">
          <div data-anim="label" className="flex items-center gap-2">
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-accent">
              Open Source Project
            </span>
            <a href="https://github.com/Wingky530/viewport" target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-muted hover:text-primary transition-colors no-underline">
              {stars !== null ? `★ ${stars}` : 'GitHub'}
            </a>
          </div>
          <h2 data-anim="title" className="mt-3 text-5xl md:text-6xl font-black italic text-primary leading-tight tracking-tight [-webkit-text-stroke:1.5px_currentColor]">
            ViewPort<span className="text-accent not-italic">.</span>
          </h2>
          <p data-anim="desc" className="mt-4 text-sm text-muted leading-relaxed max-w-sm">
            A free, open-source web developer toolkit. Inspect, debug, and preview your work, all in one place, without switching tabs.
          </p>
          <ul data-anim="list" className="mt-6 space-y-2.5">
            {[
              'Preview any URL across devices',
              'Inspect CSS, DOM, and layouts',
              'Monitor performance in real time',
              'Audit accessibility and Lighthouse scores',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l3 3 5-5"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div data-anim="cta" className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Wingky530/viewport"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border border-border text-muted rounded-md hover:text-primary hover:border-primary/20 transition-colors duration-200"
            >
              View on GitHub &rarr;
            </a>
            <a
              href="https://github.com/Wingky530/viewport"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-accent text-background rounded-md hover:bg-accent-muted transition-colors duration-200"
            >
              Try ViewPort  ↗
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Browser Mockup ── */}
        <div data-anim="right" className="md:w-[60%] min-w-0 ml-2 md:ml-0 -mr-4 md:-mr-8 -mb-12 md:-mb-16 relative h-auto">
          {/* Accent background bleed */}
          <div className="absolute -top-2 -bottom-2 -left-2 right-0 md:-inset-3 md:-bottom-1 bg-accent rounded-l-md" style={{ zIndex: 0 }} />
          {/* Tab Bar */}
          <div
            className="relative z-10 flex items-stretch overflow-x-auto overflow-y-hidden rounded-tl-md [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-border) 12%, transparent)' }}
          >
            {features.map((f, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveIdx(i)}
                  className={`relative px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-primary bg-background' +
                        (i > 0 ? ' border-l border-border' : '') +
                        (i < features.length - 1 ? ' border-r border-border' : '')
                      : 'text-muted/50 hover:text-muted border-b border-border' +
                        (i < features.length - 1 ? ' border-r border-border/30' : '')
                  }`}
                  style={isActive
                    ? { animation: 'vp-tabActivate 300ms ease-out' }
                    : { backgroundColor: 'color-mix(in srgb, var(--color-background) 92%, var(--color-border) 8%)' }}
                >
                  {f.name}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="relative z-10 bg-background pb-24 overflow-hidden">
            <div ref={contentRef} className="flex flex-col p-4 md:p-5 gap-4">
              {/* Top: SVG Illustration */}
              <div className="flex items-center justify-center bg-border/5 rounded-md min-h-[120px] w-full">
                {active.illustration()}
              </div>

              {/* Bottom: Key Points + CTA */}
              <div className="relative pb-6">
                {toast && <Toast message={toast} onDone={() => setToast(null)} />}

                <h3 className="text-base font-bold italic text-primary leading-tight mb-3">
                  {active.name}
                </h3>

                <ul className="space-y-2 mb-4">
                  {active.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12l3 3 5-5"/>
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>

                {active.isAvailable ? (
                  <a
                    href="https://github.com/Wingky530/viewport"
                    className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-accent text-background rounded-md hover:bg-accent-muted transition-colors duration-200"
                  >
                    Open Responsive Preview
                  </a>
                ) : (
                  <button
                    onClick={() => handleToolCTA(active)}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-semibold border border-border text-muted rounded-md hover:text-primary hover:border-primary/20 transition-colors duration-200 cursor-pointer"
                  >
                    Coming soon
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider + mask: accent squares as top-border of mask */}
      <div className="relative z-[2]">
        <div className="relative h-px bg-muted/30">
          <div className="absolute left-0 w-2 h-2 bg-accent -top-[3px]" />
          <div className="absolute right-0 w-2 h-2 bg-accent -top-[3px]" />
        </div>
        <div className="h-[3.75rem] bg-background" />
      </div>
    </section>
  );
}
