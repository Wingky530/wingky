/**
 * FeaturesShowcase — Tab-based feature showcase for ViewPort,
 * rendered on Wingky's /projects page.
 *
 * Layout: Tab bar → Content panel (illustration on top for mobile,
 * side-by-side on md+).  3 tab tiers: active, disabled, coming-soon.
 *
 * Illustration components (9 total):
 *   ResponsivePreview  — phone / tablet / monitor SVG outlines
 *   CssInspector       — DOM highlight overlay + tooltip
 *   ColorPicker        — cursor click + swatch pop
 *   DomTree            — indented HTML tree with branches
 *   Performance        — gradient bar chart + gauge arc
 *   ConsolePanel       — terminal window with log lines
 *   NetworkWaterfall   — request bars like Chrome DevTools
 *   AccessibilityAudit — shield + checklist (✓ / ✗)
 *   LighthouseScore    — 3 circular score meters
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { createTimeline } from 'animejs/timeline';
import { stagger } from 'animejs/utils';
import { animate } from 'animejs';

/* ── Types ─────────────────────────────────────────────────── */

interface SubFeature {
  icon: typeof CheckCircle;
  label: string;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  subFeatures: SubFeature[];
  enabled: boolean;
  comingSoon: boolean;
  illustration: ReactNode;
}

/* ── Illustration Components ───────────────────────────────── */

function ResponsivePreviewIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const devices = el.querySelectorAll<HTMLElement>('.device');
    if (!devices.length) return;

    createTimeline()
      .add(devices, {
        scale: [0.3, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(180),
        ease: 'easeOutExpo',
      }, 0);

    const pulse = animate(devices, {
      scale: [1, 1.04, 1],
      duration: 2400,
      loop: true,
      ease: 'easeInOutSine',
    });

    return () => { pulse.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-end justify-center gap-2 h-full py-6">
      {/* Phone */}
      <svg className="device opacity-0" viewBox="0 0 40 85" width="40" height="85">
        <rect x="2" y="1" width="36" height="83" rx="4" fill="var(--color-border)" />
        <rect x="5" y="4" width="30" height="70" rx="1.5" fill="var(--color-background)" />
        <rect x="17" y="77" width="6" height="2" rx="1" fill="var(--color-muted)" opacity="0.4" />
      </svg>
      {/* Tablet */}
      <svg className="device opacity-0" viewBox="0 0 60 80" width="60" height="80">
        <rect x="2" y="1" width="56" height="78" rx="5" fill="var(--color-border)" />
        <rect x="6" y="4" width="46" height="65" rx="2" fill="var(--color-background)" />
        <rect x="27" y="72" width="6" height="2" rx="1" fill="var(--color-muted)" opacity="0.4" />
      </svg>
      {/* Monitor */}
      <svg className="device opacity-0" viewBox="0 0 80 70" width="80" height="70">
        <rect x="2" y="2" width="76" height="52" rx="3" fill="var(--color-border)" />
        <rect x="5" y="5" width="70" height="46" rx="1.5" fill="var(--color-background)" />
        <rect x="35" y="54" width="10" height="8" fill="var(--color-border)" />
        <rect x="28" y="62" width="24" height="4" rx="2" fill="var(--color-muted)" opacity="0.3" />
      </svg>
    </div>
  );
}

function CssInspectorIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const overlays = el.querySelectorAll<HTMLElement>('.hl');
    const tooltip = el.querySelector<HTMLElement>('.tip');
    if (!overlays.length || !tooltip) return;

    createTimeline()
      .add(overlays, {
        opacity: [0, 1],
        duration: 350,
        delay: stagger(200),
        ease: 'easeOutQuad',
      }, 0)
      .add(tooltip, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 300,
        ease: 'easeOutExpo',
      }, overlays.length * 200 + 100);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 120" className="w-48 h-28" fill="none">
        {/* Element being inspected */}
        <rect x="30" y="35" width="90" height="50" rx="4" fill="var(--color-border)" opacity="0.3" />
        {/* Highlight overlays */}
        <rect className="hl" x="30" y="35" width="90" height="50" rx="4"
          fill="#03a9f4" fillOpacity="0.12" stroke="#03a9f4" strokeWidth="1" opacity="0" />
        <rect className="hl" x="35" y="42" width="80" height="36" rx="2"
          fill="#22C55E" fillOpacity="0.08" stroke="#22C55E" strokeWidth="1" opacity="0" />
        <rect className="hl" x="40" y="48" width="70" height="24" rx="2"
          fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1" opacity="0" />
        {/* Tooltip */}
        <g className="tip" opacity="0">
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
      </svg>
    </div>
  );
}

function ColorPickerIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cursor = el.querySelector<HTMLElement>('.cursor');
    const swatch = el.querySelector<HTMLElement>('.swatch');
    const label = el.querySelector<HTMLElement>('.hex-label');
    if (!cursor || !swatch || !label) return;

    const tl = createTimeline({ defaults: { ease: 'easeOutExpo' } });
    tl.add(cursor, { x: [0, 55], y: [0, 35], duration: 600 }, 0)
      .add(cursor, { scale: [1, 0.8, 1], duration: 200 }, 600)
      .add(swatch, { scale: [0, 1], opacity: [0, 1], duration: 400 }, 800)
      .add(label, { opacity: [0, 1], translateY: [6, 0], duration: 250 }, 1000);

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6 relative">
      <svg viewBox="0 0 180 120" className="w-44 h-28" fill="none">
        <defs>
          <radialGradient id="cg" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="30%" stopColor="#03a9f4" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#1E3A5F" />
          </radialGradient>
        </defs>
        {/* Target circle */}
        <circle cx="55" cy="60" r="36" fill="url(#cg)" stroke="var(--color-border)" strokeWidth="1" />
        {/* Color swatch */}
        <g className="swatch" opacity="0" style={{ transformOrigin: '130px 50px' }}>
          <rect x="110" y="30" width="55" height="50" rx="6" fill="var(--color-background)"
            stroke="var(--color-border)" strokeWidth="1" />
          <rect x="118" y="38" width="18" height="18" rx="3" fill="#03a9f4" />
          <text x="142" y="49" fontSize="8" fill="var(--color-muted)" className="font-mono">HEX</text>
        </g>
        {/* Cursor */}
        <g className="cursor" transform="translate(0,0)">
          <path d="M0 0 L10 18 L5 20 L9 30 L5 32 L2 22 L0 26 Z"
            fill="var(--color-primary)" opacity="0.7" />
        </g>
      </svg>
      <span className="hex-label absolute bottom-7 right-10 text-[10px] font-mono
        text-muted bg-background px-2 py-0.5 rounded border border-border opacity-0">
        #03a9f4
      </span>
    </div>
  );
}

function DomTreeIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>('.t-node');
    if (!nodes.length) return;

    createTimeline()
      .add(nodes, {
        opacity: [0, 1],
        translateX: [-8, 0],
        duration: 350,
        delay: stagger(100),
        ease: 'easeOutQuad',
      }, 0);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 180 120" className="w-44 h-28" fill="none">
        <g className="t-node" opacity="0">
          <text x="8" y="16" fontSize="8" fill="var(--color-accent)" className="font-mono">&lt;html&gt;</text>
        </g>
        <g className="t-node" opacity="0">
          <text x="20" y="32" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;head&gt;</text>
          <text x="32" y="44" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;meta /&gt;</text>
          <text x="32" y="54" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;title&gt;</text>
          <text x="20" y="66" fontSize="7" fill="var(--color-muted)" className="font-mono">&lt;/head&gt;</text>
        </g>
        <g className="t-node" opacity="0">
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>('.p-bar');
    const arc = el.querySelector<HTMLElement>('.p-arc');
    if (!bars.length) return;

    createTimeline()
      .add(bars, {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(100),
        ease: 'easeOutExpo',
        transformOrigin: 'bottom',
      }, 0);

    if (arc) {
      animate(arc, {
        strokeDashoffset: [300, 0],
        duration: 1200,
        delay: 600,
        ease: 'easeOutExpo',
      });
    }

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 120" className="w-48 h-28" fill="none">
        {/* Gauge arc */}
        <path className="p-arc"
          d="M30 80 A70 70 0 0 1 170 80"
          stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="300" strokeDashoffset="300" />
        <path className="p-arc"
          d="M30 80 A70 70 0 0 1 170 80"
          stroke="#03a9f4" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="180" strokeDashoffset="300" />
        {/* Bars */}
        <g transform="translate(0,0)">
          <rect className="p-bar" x="40" y="60" width="22" height="44" rx="2"
            fill="#03a9f4" opacity="0" style={{ transformOrigin: '40px 104px' }} />
          <rect className="p-bar" x="68" y="72" width="22" height="32" rx="2"
            fill="#03a9f4" fillOpacity="0.6" opacity="0" style={{ transformOrigin: '68px 104px' }} />
          <rect className="p-bar" x="96" y="66" width="22" height="38" rx="2"
            fill="#03a9f4" fillOpacity="0.4" opacity="0" style={{ transformOrigin: '96px 104px' }} />
          <rect className="p-bar" x="124" y="52" width="22" height="52" rx="2"
            fill="#03a9f4" fillOpacity="0.8" opacity="0" style={{ transformOrigin: '124px 104px' }} />
        </g>
        {/* Labels */}
        <text x="42" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">FCP</text>
        <text x="70" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">LCP</text>
        <text x="98" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">CLS</text>
        <text x="125" y="116" fontSize="6" fill="var(--color-muted)" className="font-mono">FPS</text>
      </svg>
    </div>
  );
}

function ConsolePanelIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>('.c-line');
    if (!lines.length) return;

    createTimeline()
      .add(lines, {
        opacity: [0, 1],
        translateX: [-4, 0],
        duration: 300,
        delay: stagger(250),
        ease: 'easeOutQuad',
      }, 0);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 100" className="w-48 h-24" fill="none">
        {/* Terminal window */}
        <rect x="10" y="4" width="180" height="92" rx="4" fill="var(--color-background)"
          stroke="var(--color-border)" strokeWidth="1" />
        {/* Title bar */}
        <rect x="10" y="4" width="180" height="18" rx="4" fill="var(--color-border)" />
        <circle cx="22" cy="13" r="3" fill="#EF4444" />
        <circle cx="32" cy="13" r="3" fill="#F59E0B" />
        <circle cx="42" cy="13" r="3" fill="#22C55E" />
        <text x="90" y="16" fontSize="7" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Console</text>
        {/* Log lines */}
        <text className="c-line font-mono" x="18" y="38" fontSize="7" fill="#22C55E" opacity="0">$ npm run dev</text>
        <text className="c-line font-mono" x="18" y="50" fontSize="7" fill="var(--color-muted)" opacity="0">&gt; viewport@0.0.1 dev</text>
        <text className="c-line font-mono" x="18" y="62" fontSize="7" fill="var(--color-muted)" opacity="0">  Local: http://localhost:1234</text>
        <text className="c-line font-mono" x="18" y="74" fontSize="7" fill="var(--color-muted)" opacity="0">  Network: 192.168.1.5:1234</text>
        <text className="c-line font-mono" x="18" y="88" fontSize="7" fill="#22C55E" opacity="0">$ ready in 342ms</text>
      </svg>
    </div>
  );
}

function NetworkWaterfallIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>('.n-bar');
    if (!bars.length) return;

    createTimeline()
      .add(bars, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(180),
        ease: 'easeOutExpo',
        transformOrigin: 'left',
      }, 0);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 110" className="w-48 h-26" fill="none">
        {/* Waterfall bars */}
        <g transform="translate(0,0)">
          <text x="12" y="18" fontSize="6" fill="var(--color-muted)" className="font-mono">index.html</text>
          <rect className="n-bar" x="60" y="10" width="50" height="10" rx="2"
            fill="#3B82F6" opacity="0" style={{ transformOrigin: '60px 10px' }} />
          <circle cx="118" cy="15" r="3" fill="var(--color-muted)" opacity="0.3" />

          <text x="12" y="36" fontSize="6" fill="var(--color-muted)" className="font-mono">style.css</text>
          <rect className="n-bar" x="60" y="28" width="72" height="10" rx="2"
            fill="#8B5CF6" opacity="0" style={{ transformOrigin: '60px 28px' }} />

          <text x="12" y="54" fontSize="6" fill="var(--color-muted)" className="font-mono">app.js</text>
          <rect className="n-bar" x="60" y="46" width="95" height="10" rx="2"
            fill="#22C55E" opacity="0" style={{ transformOrigin: '60px 46px' }} />

          <text x="12" y="72" fontSize="6" fill="var(--color-muted)" className="font-mono">api/data</text>
          <rect className="n-bar" x="60" y="64" width="80" height="10" rx="2"
            fill="#F59E0B" opacity="0" style={{ transformOrigin: '60px 64px' }} />

          <text x="12" y="90" fontSize="6" fill="var(--color-muted)" className="font-mono">logo.png</text>
          <rect className="n-bar" x="60" y="82" width="35" height="10" rx="2"
            fill="#03a9f4" opacity="0" style={{ transformOrigin: '60px 82px' }} />

          {/* Time axis */}
          <line x1="60" y1="4" x2="200" y2="4" stroke="var(--color-border)" strokeWidth="0.5" />
          <text x="100" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">50ms</text>
          <text x="150" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">100ms</text>
          <text x="200" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">150ms</text>
        </g>
      </svg>
    </div>
  );
}

function AccessibilityAuditIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.a-item');
    if (!items.length) return;

    createTimeline()
      .add(items, {
        opacity: [0, 1],
        translateX: [-6, 0],
        duration: 300,
        delay: stagger(150),
        ease: 'easeOutQuad',
      }, 0);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 180 110" className="w-44 h-26" fill="none">
        {/* Shield icon */}
        <path d="M90 8 L140 28 L140 52 C140 78 115 98 90 105 C65 98 40 78 40 52 L40 28 Z"
          fill="var(--color-background)" stroke="#22C55E" strokeWidth="1.5" opacity="0.7" />
        <text x="90" y="56" fontSize="10" fill="#22C55E" textAnchor="middle" fontWeight="bold">82</text>

        {/* Checklist items */}
        <g className="a-item" opacity="0">
          <text x="14" y="36" fontSize="8" fill="#22C55E">✓</text>
          <text x="26" y="36" fontSize="7" fill="var(--color-muted)" className="font-mono">Heading structure</text>
        </g>
        <g className="a-item" opacity="0">
          <text x="14" y="50" fontSize="8" fill="#22C55E">✓</text>
          <text x="26" y="50" fontSize="7" fill="var(--color-muted)" className="font-mono">Alt text present</text>
        </g>
        <g className="a-item" opacity="0">
          <text x="14" y="64" fontSize="8" fill="#EF4444">✗</text>
          <text x="26" y="64" fontSize="7" fill="var(--color-muted)" className="font-mono">Color contrast</text>
        </g>
        <g className="a-item" opacity="0">
          <text x="14" y="78" fontSize="8" fill="#22C55E">✓</text>
          <text x="26" y="78" fontSize="7" fill="var(--color-muted)" className="font-mono">ARIA labels</text>
        </g>
        <g className="a-item" opacity="0">
          <text x="14" y="92" fontSize="8" fill="#22C55E">✓</text>
          <text x="26" y="92" fontSize="7" fill="var(--color-muted)" className="font-mono">Keyboard nav</text>
        </g>
      </svg>
    </div>
  );
}

function LighthouseIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const arcs = el.querySelectorAll<HTMLElement>('.l-arc');
    if (!arcs.length) return;

    createTimeline()
      .add(arcs, {
        strokeDashoffset: [120, 0],
        duration: 800,
        delay: stagger(300),
        ease: 'easeOutExpo',
      }, 0);

    return () => { };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 100" className="w-48 h-24" fill="none">
        {/* Score 1: Performance */}
        <circle cx="45" cy="52" r="28" stroke="var(--color-border)" strokeWidth="4" />
        <circle className="l-arc" cx="45" cy="52" r="28"
          stroke="#22C55E" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="88" strokeDashoffset="120" transform="rotate(-90 45 52)" />
        <text x="45" y="56" fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="bold">92</text>
        <text x="45" y="88" fontSize="6" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Perf</text>

        {/* Score 2: Accessibility */}
        <circle cx="100" cy="52" r="28" stroke="var(--color-border)" strokeWidth="4" />
        <circle className="l-arc" cx="100" cy="52" r="28"
          stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="72" strokeDashoffset="120" transform="rotate(-90 100 52)" />
        <text x="100" y="56" fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="bold">78</text>
        <text x="100" y="88" fontSize="6" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Access</text>

        {/* Score 3: Best Practices */}
        <circle cx="155" cy="52" r="28" stroke="var(--color-border)" strokeWidth="4" />
        <circle className="l-arc" cx="155" cy="52" r="28"
          stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="96" strokeDashoffset="120" transform="rotate(-90 155 52)" />
        <text x="155" y="56" fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="bold">100</text>
        <text x="155" y="88" fontSize="6" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Best P.</text>
      </svg>
    </div>
  );
}

/* ── Feature Data ──────────────────────────────────────────── */

const features: Feature[] = [
  {
    id: 'responsive',
    name: 'Responsive Preview',
    description: 'Preview any URL across devices — mobile, tablet, desktop, and TV. Sandboxed iframe with device presets, zoom, rotate, and a local URL proxy for localhost preview.',
    subFeatures: [
      { icon: CheckCircle, label: 'Sandboxed iframe with local URL proxy' },
      { icon: CheckCircle, label: 'Device presets with realistic bezels' },
      { icon: CheckCircle, label: 'Freely resize with drag handles' },
      { icon: CheckCircle, label: 'Flip portrait / landscape' },
      { icon: CheckCircle, label: 'Recent URLs from local storage' },
    ],
    enabled: true,
    comingSoon: false,
    illustration: <ResponsivePreviewIllustration />,
  },
  {
    id: 'css-inspector',
    name: 'CSS Inspector',
    description: 'Hover to highlight elements, click to inspect. View computed styles, box model, and live editing with instant visual feedback.',
    subFeatures: [
      { icon: CheckCircle, label: 'Hover to highlight, click to inspect' },
      { icon: CheckCircle, label: 'Computed CSS properties' },
      { icon: CheckCircle, label: 'Box model visualization' },
      { icon: CheckCircle, label: 'Flexbox & Grid debug overlays' },
      { icon: CheckCircle, label: 'Live style editing' },
    ],
    enabled: false,
    comingSoon: false,
    illustration: <CssInspectorIllustration />,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Extract colors from any element. View in HEX, RGB, or HSL with one-click copy. Auto-extract dominant colors from the page.',
    subFeatures: [
      { icon: CheckCircle, label: 'Click any element to extract color' },
      { icon: CheckCircle, label: 'HEX / RGB / HSL formats' },
      { icon: CheckCircle, label: 'Dominant color palette generator' },
      { icon: CheckCircle, label: 'One-click copy' },
    ],
    enabled: false,
    comingSoon: false,
    illustration: <ColorPickerIllustration />,
  },
  {
    id: 'dom-tree',
    name: 'DOM Tree',
    description: 'Interactive DOM tree with attribute editing, event listeners, and element search. Navigate the full hierarchy with ease.',
    subFeatures: [
      { icon: CheckCircle, label: 'Expand / collapse tree interactively' },
      { icon: CheckCircle, label: 'Edit HTML attributes live' },
      { icon: CheckCircle, label: 'View attached event handlers' },
      { icon: CheckCircle, label: 'Find by tag, class, or ID' },
    ],
    enabled: false,
    comingSoon: false,
    illustration: <DomTreeIllustration />,
  },
  {
    id: 'performance',
    name: 'Performance Monitor',
    description: 'Real-time Core Web Vitals, FPS counter, network timeline, and memory usage. Identify bottlenecks and optimize your site.',
    subFeatures: [
      { icon: CheckCircle, label: 'FCP, LCP, and CLS in real-time' },
      { icon: CheckCircle, label: 'FPS counter & rendering monitor' },
      { icon: CheckCircle, label: 'Request waterfall with latencies' },
      { icon: CheckCircle, label: 'Heap size & GC cycles' },
    ],
    enabled: false,
    comingSoon: false,
    illustration: <PerformanceIllustration />,
  },
  {
    id: 'console',
    name: 'Console Panel',
    description: 'Execute JavaScript in the iframe context. View logs, warnings, errors, and network info with syntax-highlighted output.',
    subFeatures: [
      { icon: CheckCircle, label: 'Run JS in iframe context' },
      { icon: CheckCircle, label: 'Logs, warnings & errors' },
      { icon: CheckCircle, label: 'Syntax-highlighted output' },
      { icon: CheckCircle, label: 'Runtime error catching' },
    ],
    enabled: false,
    comingSoon: true,
    illustration: <ConsolePanelIllustration />,
  },
  {
    id: 'network',
    name: 'Network Waterfall',
    description: 'Visualize all network requests with precise timing. View headers, response body, status codes, and identify slow bottlenecks.',
    subFeatures: [
      { icon: CheckCircle, label: 'Visual request waterfall' },
      { icon: CheckCircle, label: 'Headers & response body' },
      { icon: CheckCircle, label: 'Status codes & sizes' },
      { icon: CheckCircle, label: 'Filter and search requests' },
    ],
    enabled: false,
    comingSoon: true,
    illustration: <NetworkWaterfallIllustration />,
  },
  {
    id: 'accessibility',
    name: 'Accessibility Audit',
    description: 'Check for WCAG 2.1 violations, verify text contrast ratios, detect missing ARIA attributes, and generate detailed reports.',
    subFeatures: [
      { icon: CheckCircle, label: 'WCAG 2.1 violation detection' },
      { icon: CheckCircle, label: 'Text contrast ratio checker' },
      { icon: CheckCircle, label: 'ARIA attribute validation' },
      { icon: CheckCircle, label: 'Detailed audit reports' },
    ],
    enabled: false,
    comingSoon: true,
    illustration: <AccessibilityAuditIllustration />,
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse Integration',
    description: 'Get Google Lighthouse performance metrics, SEO checks, best practices, and accessibility scores for both mobile and desktop.',
    subFeatures: [
      { icon: CheckCircle, label: 'Performance & SEO metrics' },
      { icon: CheckCircle, label: 'Best practices analysis' },
      { icon: CheckCircle, label: 'Mobile vs desktop audits' },
      { icon: CheckCircle, label: 'Actionable recommendations' },
    ],
    enabled: false,
    comingSoon: true,
    illustration: <LighthouseIllustration />,
  },
];

/* ── Tab Button ────────────────────────────────────────────── */

function TabButton({
  label,
  active,
  enabled,
  comingSoon,
  onClick,
  refCallback,
}: {
  label: string;
  active: boolean;
  enabled: boolean;
  comingSoon: boolean;
  onClick: () => void;
  refCallback: (el: HTMLButtonElement | null) => void;
}) {
  if (active) {
    return (
      <button ref={refCallback} onClick={onClick}
        className="relative shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap text-primary transition-colors duration-200"
      >
        {label}
      </button>
    );
  }

  if (enabled) {
    return (
      <button ref={refCallback} onClick={onClick}
        className="relative shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap text-muted
          transition-colors duration-200 cursor-pointer"
      >
        {label}
      </button>
    );
  }

  if (comingSoon) {
    return (
      <button ref={refCallback}
        className="relative shrink-0 px-4 py-2 text-xs font-medium whitespace-nowrap
          text-muted opacity-25 cursor-not-allowed transition-colors duration-200"
      >
        {label}
      </button>
    );
  }

  return (
    <button ref={refCallback}
      className="relative shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap
        text-muted opacity-40 cursor-not-allowed transition-colors duration-200"
    >
      {label}
    </button>
  );
}

/* ── Main Component ────────────────────────────────────────── */

export default function FeaturesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = features[activeIdx];

  useEffect(() => {
    const indicator = indicatorRef.current;
    const tab = tabRefs.current[activeIdx];
    if (!indicator || !tab) return;

    const scroll = scrollRef.current;
    const scrollLeft = scroll ? scroll.scrollLeft : 0;
    const left = tab.offsetLeft - scrollLeft;
    const w = tab.offsetWidth;

    animate(indicator, {
      left,
      width: w,
      duration: 300,
      ease: 'easeOutExpo',
    });
  }, [activeIdx]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    animate(el, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 250,
      ease: 'easeOutQuad',
    });
  }, [activeIdx]);

  const setTabRef = (i: number) => (el: HTMLButtonElement | null) => {
    tabRefs.current[i] = el;
  };

  return (
    <section id="features-showcase" className="relative bg-background py-20 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-accent">
            Features
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-black italic text-primary leading-tight tracking-tight">
            Everything you need<span className="text-accent">.</span>
          </h2>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            A growing toolkit for web developers. Tap any tab to explore.
          </p>
        </div>

        {/* Tab bar */}
        <div
          ref={scrollRef}
          className="relative flex overflow-x-auto border-b border-border mb-8 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {features.map((f, i) => (
            <TabButton
              key={f.id}
              label={f.name}
              active={activeIdx === i}
              enabled={f.enabled}
              comingSoon={f.comingSoon}
              onClick={() => setActiveIdx(i)}
              refCallback={setTabRef(i)}
            />
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-accent pointer-events-none"
            style={{ left: 0, width: 0 }}
          />
        </div>

        {/* Content panel — key forces remount on tab switch */}
        <div key={activeIdx} ref={contentRef} className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Illustration — first on mobile, right on md+ */}
          <div className="order-first md:order-last md:w-1/2">
            <div className="rounded-2xl border border-border bg-background overflow-hidden min-h-[180px] flex items-center justify-center">
              {active.illustration}
            </div>
          </div>

          {/* Text panel — left on md+ */}
          <div className="md:w-1/2 flex flex-col justify-center">
            {/* Heading + Coming Soon badge */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h3 className="text-2xl font-black italic text-primary leading-tight">
                {active.name}
              </h3>
              {!active.enabled && (
                <span className="text-[10px] px-2 py-0.5 rounded-full
                  border border-muted/20 text-muted bg-background font-medium">
                  Coming Soon
                </span>
              )}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-6">
              {active.description}
            </p>

            {/* Sub-feature list */}
            <ul className="space-y-2 mb-8">
              {active.subFeatures.map((sf, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                  <sf.icon
                    size={16}
                    className="text-accent shrink-0 mt-0.5"
                    weight="fill"
                  />
                  {sf.label}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              {active.enabled ? (
                <a href="/projects/viewport"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold italic
                    border border-border text-muted rounded-lg
                    hover:text-primary hover:border-primary/20 transition-colors duration-200"
                >
                  Explore Feature
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold italic
                    border border-border text-muted opacity-30 rounded-lg cursor-not-allowed"
                  onClick={(e) => e.preventDefault()}
                >
                  Explore Feature
                </span>
              )}
              {active.enabled ? (
                <a href="#"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold italic
                    bg-accent text-background rounded-lg
                    hover:bg-accent-muted transition-colors duration-200"
                >
                  Try ViewPort &rarr;
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold italic
                    bg-accent/20 text-muted opacity-30 rounded-lg cursor-not-allowed"
                  onClick={(e) => e.preventDefault()}
                >
                  Try ViewPort &rarr;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
