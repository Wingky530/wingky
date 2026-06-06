/**
 * ViewPortProject — Laravel-inspired two-column showcase for ViewPort
 * on Wingky's /projects page.
 *
 * Layout:
 *   Desktop: Left col (40%) static text | Right col (60%) pill tabs + browser chrome panel bleeding off right edge
 *   Mobile: Stacked — text first, then tabs + panel
 *
 * Illustrations (9 total, Anime.js v4):
 *   ResponsivePreview, CssInspector, ColorPicker, DomTree, Performance,
 *   ConsolePanel, NetworkWaterfall, AccessibilityAudit, Lighthouse
 *
 * Tab tiers:
 *   Active (1): full opacity, clickable
 *   Disabled (4): opacity-40, cursor-not-allowed
 *   Coming Soon (4): opacity-20, cursor-not-allowed, "Soon" badge
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { animate, createTimeline, stagger } from 'animejs';

/* ── Types ─────────────────────────────────────────────────── */

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  comingSoon: boolean;
  illustration: () => ReactNode;
}

/* ── Illustration Components ───────────────────────────────── */

function ResponsivePreviewIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const devices = el.querySelectorAll<HTMLElement>('.device');
    if (!devices.length) return;

    const tl = createTimeline()
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
      delay: 700,
      loop: true,
      ease: 'easeInOutSine',
    });

    return () => { tl.revert(); pulse.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-end justify-center gap-3 h-full py-6">
      <svg className="device opacity-0" viewBox="0 0 40 85" width="40" height="85">
        <rect x="2" y="1" width="36" height="83" rx="4" fill="var(--color-border)" />
        <rect x="5" y="4" width="30" height="70" rx="1.5" fill="var(--color-background)" />
        <rect x="17" y="77" width="6" height="2" rx="1" fill="var(--color-muted)" opacity="0.4" />
      </svg>
      <svg className="device opacity-0" viewBox="0 0 60 80" width="60" height="80">
        <rect x="2" y="1" width="56" height="78" rx="5" fill="var(--color-border)" />
        <rect x="6" y="4" width="46" height="65" rx="2" fill="var(--color-background)" />
        <rect x="27" y="72" width="6" height="2" rx="1" fill="var(--color-muted)" opacity="0.4" />
      </svg>
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

    const tl = createTimeline()
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

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 120" className="w-48 h-28" fill="none">
        <rect x="30" y="35" width="90" height="50" rx="4" fill="var(--color-border)" opacity="0.3" />
        <rect className="hl" x="30" y="35" width="90" height="50" rx="4"
          fill="#03a9f4" fillOpacity="0.12" stroke="#03a9f4" strokeWidth="1" opacity="0" />
        <rect className="hl" x="35" y="42" width="80" height="36" rx="2"
          fill="#22C55E" fillOpacity="0.08" stroke="#22C55E" strokeWidth="1" opacity="0" />
        <rect className="hl" x="40" y="48" width="70" height="24" rx="2"
          fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1" opacity="0" />
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

    const tl = createTimeline({ defaults: { ease: 'easeOutExpo' } })
      .add(cursor, { translateX: [0, 55], translateY: [0, 35], duration: 600 }, 0)
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
        <circle cx="55" cy="60" r="36" fill="url(#cg)" stroke="var(--color-border)" strokeWidth="1" />
        <g className="swatch" opacity="0" style={{ transformOrigin: '130px 50px' }}>
          <rect x="110" y="30" width="55" height="50" rx="6" fill="var(--color-background)"
            stroke="var(--color-border)" strokeWidth="1" />
          <rect x="118" y="38" width="18" height="18" rx="3" fill="#03a9f4" />
          <text x="142" y="49" fontSize="8" fill="var(--color-muted)" className="font-mono">HEX</text>
        </g>
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

    const tl = createTimeline()
      .add(nodes, {
        opacity: [0, 1],
        translateX: [-8, 0],
        duration: 350,
        delay: stagger(100),
        ease: 'easeOutQuad',
      }, 0);

    return () => { tl.revert(); };
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
    const arcs = el.querySelectorAll<HTMLElement>('.p-arc');
    if (!bars.length) return;

    const tl = createTimeline()
      .add(bars, {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(100),
        ease: 'easeOutExpo',
      }, 0);

    let arcAnim: ReturnType<typeof animate> | null = null;
    if (arcs.length) {
      arcAnim = animate(arcs, {
        strokeDashoffset: [300, 0],
        duration: 1200,
        delay: 600,
        ease: 'easeOutExpo',
      });
    }

    return () => { tl.revert(); arcAnim?.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 120" className="w-48 h-28" fill="none">
        <path className="p-arc"
          d="M30 80 A70 70 0 0 1 170 80"
          stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="300" strokeDashoffset="300" />
        <path className="p-arc"
          d="M30 80 A70 70 0 0 1 170 80"
          stroke="#03a9f4" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="180" strokeDashoffset="300" />
        <rect className="p-bar" x="40" y="60" width="22" height="44" rx="2"
          fill="#03a9f4" opacity="0" style={{ transformOrigin: '51px 104px' }} />
        <rect className="p-bar" x="68" y="72" width="22" height="32" rx="2"
          fill="#03a9f4" fillOpacity="0.6" opacity="0" style={{ transformOrigin: '79px 104px' }} />
        <rect className="p-bar" x="96" y="66" width="22" height="38" rx="2"
          fill="#03a9f4" fillOpacity="0.4" opacity="0" style={{ transformOrigin: '107px 104px' }} />
        <rect className="p-bar" x="124" y="52" width="22" height="52" rx="2"
          fill="#03a9f4" fillOpacity="0.8" opacity="0" style={{ transformOrigin: '135px 104px' }} />
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

    const tl = createTimeline()
      .add(lines, {
        opacity: [0, 1],
        translateX: [-4, 0],
        duration: 300,
        delay: stagger(250),
        ease: 'easeOutQuad',
      }, 0);

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 100" className="w-48 h-24" fill="none">
        <rect x="10" y="4" width="180" height="92" rx="4" fill="var(--color-background)"
          stroke="var(--color-border)" strokeWidth="1" />
        <rect x="10" y="4" width="180" height="18" rx="4" fill="var(--color-border)" />
        <circle cx="22" cy="13" r="3" fill="#EF4444" />
        <circle cx="32" cy="13" r="3" fill="#F59E0B" />
        <circle cx="42" cy="13" r="3" fill="#22C55E" />
        <text x="90" y="16" fontSize="7" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Console</text>
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

    const tl = createTimeline()
      .add(bars, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(180),
        ease: 'easeOutExpo',
      }, 0);

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 110" className="w-48 h-26" fill="none">
        <text x="12" y="18" fontSize="6" fill="var(--color-muted)" className="font-mono">index.html</text>
        <rect className="n-bar" x="60" y="10" width="50" height="10" rx="2"
          fill="#3B82F6" opacity="0" style={{ transformOrigin: 'left center' }} />
        <text x="12" y="36" fontSize="6" fill="var(--color-muted)" className="font-mono">style.css</text>
        <rect className="n-bar" x="60" y="28" width="72" height="10" rx="2"
          fill="#8B5CF6" opacity="0" style={{ transformOrigin: 'left center' }} />
        <text x="12" y="54" fontSize="6" fill="var(--color-muted)" className="font-mono">app.js</text>
        <rect className="n-bar" x="60" y="46" width="95" height="10" rx="2"
          fill="#22C55E" opacity="0" style={{ transformOrigin: 'left center' }} />
        <text x="12" y="72" fontSize="6" fill="var(--color-muted)" className="font-mono">api/data</text>
        <rect className="n-bar" x="60" y="64" width="80" height="10" rx="2"
          fill="#F59E0B" opacity="0" style={{ transformOrigin: 'left center' }} />
        <text x="12" y="90" fontSize="6" fill="var(--color-muted)" className="font-mono">logo.png</text>
        <rect className="n-bar" x="60" y="82" width="35" height="10" rx="2"
          fill="#03a9f4" opacity="0" style={{ transformOrigin: 'left center' }} />
        <line x1="60" y1="4" x2="200" y2="4" stroke="var(--color-border)" strokeWidth="0.5" />
        <text x="100" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">50ms</text>
        <text x="150" y="3" fontSize="5" fill="var(--color-muted)" textAnchor="middle">100ms</text>
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

    const tl = createTimeline()
      .add(items, {
        opacity: [0, 1],
        translateX: [-6, 0],
        duration: 300,
        delay: stagger(150),
        ease: 'easeOutQuad',
      }, 0);

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 180 110" className="w-44 h-26" fill="none">
        <path d="M90 8 L140 28 L140 52 C140 78 115 98 90 105 C65 98 40 78 40 52 L40 28 Z"
          fill="var(--color-background)" stroke="#22C55E" strokeWidth="1.5" opacity="0.7" />
        <text x="90" y="56" fontSize="10" fill="#22C55E" textAnchor="middle" fontWeight="bold">82</text>
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

    const tl = createTimeline()
      .add(arcs, {
        strokeDashoffset: [120, 0],
        duration: 800,
        delay: stagger(300),
        ease: 'easeOutExpo',
      }, 0);

    return () => { tl.revert(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center h-full py-6">
      <svg viewBox="0 0 200 100" className="w-48 h-24" fill="none">
        <circle cx="45" cy="52" r="28" stroke="var(--color-border)" strokeWidth="4" />
        <circle className="l-arc" cx="45" cy="52" r="28"
          stroke="#22C55E" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="88" strokeDashoffset="120" transform="rotate(-90 45 52)" />
        <text x="45" y="56" fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="bold">92</text>
        <text x="45" y="88" fontSize="6" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Perf</text>

        <circle cx="100" cy="52" r="28" stroke="var(--color-border)" strokeWidth="4" />
        <circle className="l-arc" cx="100" cy="52" r="28"
          stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"
          strokeDasharray="72" strokeDashoffset="120" transform="rotate(-90 100 52)" />
        <text x="100" y="56" fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="bold">78</text>
        <text x="100" y="88" fontSize="6" fill="var(--color-muted)" textAnchor="middle" className="font-mono">Access</text>

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
  { id: 'responsive', name: 'Responsive Preview', enabled: true, comingSoon: false, illustration: () => <ResponsivePreviewIllustration /> },
  { id: 'css-inspector', name: 'CSS Inspector', enabled: false, comingSoon: false, illustration: () => <CssInspectorIllustration /> },
  { id: 'color-picker', name: 'Color Picker', enabled: false, comingSoon: false, illustration: () => <ColorPickerIllustration /> },
  { id: 'dom-tree', name: 'DOM Tree', enabled: false, comingSoon: false, illustration: () => <DomTreeIllustration /> },
  { id: 'performance', name: 'Performance Monitor', enabled: false, comingSoon: false, illustration: () => <PerformanceIllustration /> },
  { id: 'console', name: 'Console Panel', enabled: false, comingSoon: true, illustration: () => <ConsolePanelIllustration /> },
  { id: 'network', name: 'Network Waterfall', enabled: false, comingSoon: true, illustration: () => <NetworkWaterfallIllustration /> },
  { id: 'accessibility', name: 'Accessibility Audit', enabled: false, comingSoon: true, illustration: () => <AccessibilityAuditIllustration /> },
  { id: 'lighthouse', name: 'Lighthouse', enabled: false, comingSoon: true, illustration: () => <LighthouseIllustration /> },
];

/* ── Main Component ────────────────────────────────────────── */

export default function ViewPortProject() {
  const [activeIdx, setActiveIdx] = useState(0);
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

  return (
    <section className="relative py-20 px-4 md:px-8 overflow-x-clip">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:gap-12">

        {/* Left Column — static text */}
        <div className="md:w-[40%] shrink-0 mb-10 md:mb-0">
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-accent">
            Open Source Project
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black italic text-primary leading-tight tracking-tight">
            A toolkit built for developers<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 text-sm text-muted leading-relaxed max-w-sm">
            ViewPort is a free, open-source web developer toolkit. Inspect, debug, and preview your work — all in one place, without switching tabs.
          </p>

          <ul className="mt-6 space-y-2.5">
            {[
              'Preview any URL across devices',
              'Inspect CSS, DOM, and layouts',
              'Monitor performance in real time',
              'Audit accessibility and Lighthouse scores',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" weight="fill" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Wingky530/viewport"
              className="inline-flex items-center px-4 py-2.5 text-sm font-semibold
                border border-border text-muted rounded-lg
                hover:text-primary hover:border-primary/20 transition-colors duration-200"
            >
              View on GitHub &rarr;
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2.5 text-sm font-semibold
                bg-accent text-background rounded-lg
                hover:bg-accent-muted transition-colors duration-200"
            >
              Try ViewPort &rarr;
            </a>
          </div>
        </div>

        {/* Right Column — tabs + browser panel */}
        <div className="md:w-[60%] min-w-0 mr-0 md:mr-[-4rem]">

          {/* Pill Tab Bar */}
          <div
            ref={scrollRef}
            className="flex gap-1.5 overflow-x-auto pb-3 mb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {features.map((f, i) => {
              const isActive = activeIdx === i;
              const isDisabled = !f.enabled && !f.comingSoon;
              const isSoon = f.comingSoon;

              return (
                <button
                  key={f.id}
                  onClick={f.enabled ? () => setActiveIdx(i) : undefined}
                  disabled={!f.enabled}
                  className={`relative shrink-0 rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-background'
                      : isDisabled
                      ? 'text-muted opacity-40 cursor-not-allowed'
                      : isSoon
                      ? 'text-muted opacity-20 cursor-not-allowed'
                      : 'text-muted hover:text-primary cursor-pointer'
                  }`}
                >
                  {f.name}
                  {isSoon && (
                    <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-border/50 text-muted">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Browser Chrome Panel */}
          <div className="rounded-xl md:rounded-r-none border border-border md:border-r-0 bg-background overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span className="ml-3 text-[11px] font-mono text-muted/60 truncate select-none">
                viewport.app/{active.id}
              </span>
            </div>
            {/* Illustration */}
            <div key={activeIdx} ref={contentRef} className="min-h-[220px] flex items-center justify-center p-4">
              {active.illustration()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
