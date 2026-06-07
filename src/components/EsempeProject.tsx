/**
 * EsempeProject.tsx
 *
 * Centered, mobile-first showcase for the ESEMPE Minecraft hosting marketing site.
 * Layout is intentionally distinct from ViewPortProject:
 *   - No 2-column split — content-first centered stack
 *   - Pill tabs (not Chrome tabs) for feature switching
 *   - No accent bleed — clean, contained panel with border definition
 *
 * Design system: DESIGN.md / PRODUCT.md
 *   - Arc Blue (#03a9f4) for accent: title dot, CTA button, divider squares
 *   - Pill tab active: primary bg / background text (not Arc Blue)
 *   - Flat surfaces only — no shadows, no gradients
 *   - Single font family (Wingky), no second typeface
 */
import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';

/* ── CSS Keyframes ─────────────────────────────────────────── */

const CSS = `
@keyframes es-lineGrow{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
@keyframes es-slideIn{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes es-cycle{0%{opacity:0}5%{opacity:1}90%{opacity:1}100%{opacity:0}}
@keyframes es-fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes es-fadeUpMore{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes es-fadeUpLess{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes es-scaleIn{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}

@media (prefers-reduced-motion: reduce) {
  [data-es-anim="mockup"] svg * { animation: none !important }
}

@media (prefers-reduced-motion: no-preference) {
  [data-es-anim="label"]  { animation: es-fadeUpMore 800ms ease-out 100ms  both }
  [data-es-anim="title"]  { animation: es-fadeUpMore 800ms ease-out 200ms  both }
  [data-es-anim="desc"]   { animation: es-fadeUpLess 800ms ease-out 320ms  both }
  [data-es-anim="list"] > li { animation: es-fadeUp 600ms ease-out both }
  [data-es-anim="list"] > li:nth-child(1) { animation-delay: 440ms }
  [data-es-anim="list"] > li:nth-child(2) { animation-delay: 510ms }
  [data-es-anim="list"] > li:nth-child(3) { animation-delay: 580ms }
  [data-es-anim="list"] > li:nth-child(4) { animation-delay: 650ms }
  [data-es-anim="cta"] > * { animation: es-fadeUp 600ms ease-out both }
  [data-es-anim="cta"] > :nth-child(1) { animation-delay: 560ms }
  [data-es-anim="cta"] > :nth-child(2) { animation-delay: 650ms }
  [data-es-anim="mockup"] { animation: es-fadeUpLess 700ms ease-out 480ms both }
  [data-es-anim="divider"]{ animation: es-scaleIn 600ms ease-out 720ms both; transform-origin: left }
}
`;

/* ── Illustrations ─────────────────────────────────────────── */

function TpsGraphIllustration() {
  return (
    <div className="flex items-center justify-center h-full w-full py-4">
      <svg viewBox="0 0 260 140" className="w-full max-w-[240px]" fill="none">
        <g style={{ animation: 'es-cycle 4.5s ease-in-out infinite' }}>
          {/* Legend */}
          <line x1="30" y1="18" x2="48" y2="18" stroke="var(--color-accent)" strokeWidth="1.5" />
          <text x="52" y="22" fontSize="7" fill="var(--color-muted)">ESEMPE</text>
          <line x1="96" y1="18" x2="114" y2="18" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="118" y="22" fontSize="7" fill="var(--color-muted)">Competitor</text>
          {/* Grid */}
          {[40, 60, 80, 100].map(y => (
            <line key={y} x1="30" y1={y} x2="230" y2={y} stroke="var(--color-border)" strokeWidth="0.5" opacity="0.35" />
          ))}
          {/* Y-axis labels */}
          <text x="8"  y="44" fontSize="7" fill="var(--color-muted)" fontFamily="monospace">20</text>
          <text x="14" y="104" fontSize="7" fill="var(--color-muted)" fontFamily="monospace">0</text>
          {/* Competitor (dashed, flat-ish) */}
          <path
            d="M30 88 C60 85, 90 82, 120 86 S170 90, 200 84 L230 82"
            stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"
          />
          {/* ESEMPE line */}
          <path
            d="M30 95 C55 88, 65 52, 85 44 S115 38, 140 36 S170 34, 190 38 L230 34"
            stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray="300"
            style={{ animation: 'es-lineGrow 3.5s ease-in-out infinite' }}
          />
          {/* Dots */}
          {[[85,44],[140,36],[190,38],[230,34]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--color-accent)" opacity="0.9" />
          ))}
          {/* Footnote */}
          <text x="30" y="130" fontSize="6" fill="var(--color-muted)" opacity="0.7">* Approximate TPS simulation based on typical server workloads.</text>
        </g>
      </svg>
    </div>
  );
}

function PricingIllustration() {
  const tiers = [
    { color: '#CD7F32', name: 'Copper',     price: '$2' },
    { color: '#C0C0C0', name: 'Iron',       price: '$5' },
    { color: '#F59E0B', name: 'Gold',       price: '$9' },
    { color: '#22C55E', name: 'Emerald',    price: '$15' },
    { color: '#38BDF8', name: 'Diamond',    price: '$24' },
    { color: '#7C3AED', name: 'Netherite',  price: '$40' },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full py-4">
      <svg viewBox="0 0 300 130" className="w-full max-w-[280px]" fill="none">
        <g style={{ animation: 'es-cycle 5s ease-in-out infinite' }}>
          {tiers.map((tier, i) => {
            const x = 10 + i * 48;
            const y = 20;
            return (
              <g key={tier.name}>
                {/* Pixelated card corners (clip-path effect via path) */}
                <path
                  d={`M${x+4} ${y} L${x+38} ${y} L${x+42} ${y+4} L${x+42} ${y+86} L${x+38} ${y+90} L${x+4} ${y+90} L${x} ${y+86} L${x} ${y+4} Z`}
                  fill="var(--color-background)" stroke="var(--color-border)" strokeWidth="1"
                />
                {/* Ore color block */}
                <rect x={x+13} y={y+10} width="16" height="16" rx="2" fill={tier.color} />
                {/* Plan name */}
                <text x={x+21} y={y+44} fontSize="7" fill="var(--color-muted)" textAnchor="middle" fontWeight="500">{tier.name}</text>
                {/* Price */}
                <text x={x+21} y={y+62} fontSize="12" fill="var(--color-primary)" textAnchor="middle" fontWeight="700">{tier.price}</text>
                {/* Divider */}
                <line x1={x+6} y1={y+70} x2={x+36} y2={y+70} stroke="var(--color-border)" strokeWidth="0.5" />
                {/* /mo label */}
                <text x={x+21} y={y+82} fontSize="6" fill="var(--color-muted)" textAnchor="middle">/mo</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function CurtainMenuIllustration() {
  return (
    <div className="flex items-center justify-center h-full w-full py-4">
      <svg viewBox="0 0 260 140" className="w-full max-w-[240px]" fill="none">
        <g style={{ animation: 'es-cycle 5s ease-in-out infinite' }}>
          {/* Page background */}
          <rect x="20" y="10" width="220" height="120" rx="4" fill="var(--color-border)" opacity="0.15" />
          {/* Page nav bar */}
          <rect x="20" y="10" width="220" height="18" rx="4" fill="var(--color-border)" opacity="0.25" />
          <text x="32" y="22" fontSize="8" fill="var(--color-primary)" fontWeight="700">ESEMPE.</text>
          <text x="168" y="22" fontSize="7" fill="var(--color-muted)">FEATURES</text>
          <text x="200" y="22" fontSize="7" fill="var(--color-muted)">PRICING</text>
          <text x="228" y="22" fontSize="7" fill="var(--color-muted)">PANEL</text>
          {/* Page content skeleton */}
          <rect x="32" y="36" width="70" height="8" rx="2" fill="var(--color-muted)" opacity="0.2" />
          <rect x="32" y="50" width="110" height="5" rx="1" fill="var(--color-muted)" opacity="0.12" />
          <rect x="32" y="60" width="90" height="5" rx="1" fill="var(--color-muted)" opacity="0.12" />
          {/* Curtain panel sliding in from left */}
          <g style={{ animation: 'es-slideIn 3.5s ease-in-out infinite' }}>
            <rect x="20" y="10" width="110" height="120" rx="4" fill="var(--color-accent)" />
            {/* Menu items */}
            {['HOME', 'FEATURES', 'PRICING', 'PANEL', 'DISCORD'].map((label, i) => (
              <g key={label}>
                <rect x="32" y={30 + i * 18} width={i === 0 ? 52 : 66 - i * 4} height="5" rx="2"
                  fill="var(--color-background)" opacity={i === 0 ? 1 : 0.6} />
              </g>
            ))}
            {/* Hamburger → X */}
            <line x1="98" y1="18" x2="108" y2="28" stroke="var(--color-background)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="108" y1="18" x2="98" y2="28" stroke="var(--color-background)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ── Tab Data ──────────────────────────────────────────────── */

const tabs = [
  { name: 'TPS Graph',    illustration: () => <TpsGraphIllustration /> },
  { name: 'Pricing',      illustration: () => <PricingIllustration /> },
  { name: 'Curtain Menu', illustration: () => <CurtainMenuIllustration /> },
] as const;

/* ── Main Component ────────────────────────────────────────── */

export default function EsempeProject() {
  const [activeIdx, setActiveIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const anim = animate(el, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 240,
      ease: 'easeOutQuad',
    });
    return () => { anim.revert(); };
  }, [activeIdx]);

  return (
    <section className="relative overflow-visible">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="pt-16 pb-10 px-5 mx-auto max-w-[680px]">

        {/* Kicker label — one deliberate use, not per-section scaffold */}
        <span
          data-es-anim="label"
          className="text-[10px] font-medium tracking-[0.22em] uppercase text-muted"
        >
          UI/UX Design
        </span>

        <h2
          data-es-anim="title"
          className="mt-3 text-5xl md:text-6xl font-black italic text-primary leading-none tracking-tight [-webkit-text-stroke:1.5px_currentColor]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          ESEMPE<span className="text-accent not-italic">.</span>
        </h2>

        <p
          data-es-anim="desc"
          className="mt-4 text-sm text-muted leading-relaxed max-w-[65ch]"
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          Marketing site for a Minecraft server hosting platform. Designed with a pixelated
          aesthetic that mirrors the game's block language while keeping the experience fast
          and readable for a broad player audience.
        </p>

        <ul data-es-anim="list" className="mt-6 space-y-2.5">
          {[
            'Animated TPS graph with real-time competitive comparison',
            'Six-tier Minecraft ore pricing carousel with pixel-corner cards',
            'Curtain menu with randomised entrance direction per open',
            'Pixel dot patterns and clip-path frame shapes throughout',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-muted"
            >
              {/* Dash marker — avoids the generic circle-check "AI grammar" */}
              <span className="shrink-0 mt-[3px] text-muted select-none" aria-hidden>–</span>
              {item}
            </li>
          ))}
        </ul>

        <div data-es-anim="cta" className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://esempe.id"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-accent text-background rounded-md hover:bg-[#0369a1] transition-colors duration-200"
          >
            Visit Site ↗
          </a>
        </div>
      </div>

      {/* ── Feature Mockup ───────────────────────────────────── */}
      <div
        data-es-anim="mockup"
        className="px-5 pb-16 mx-auto max-w-[680px]"
      >
        {/* Pill tabs — design system component, distinguishes from ViewPort's Chrome tabs */}
        <div
          className="flex items-center gap-1 p-1 w-fit border border-border rounded-full mb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                activeIdx === i
                  ? 'bg-primary text-background'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Feature panel — border-defined, flat, no shadow */}
        <div className="border border-border rounded-md overflow-hidden">
          <div
            ref={contentRef}
            className="bg-background flex items-center justify-center min-h-[180px] md:min-h-[220px]"
          >
            {tabs[activeIdx].illustration()}
          </div>
        </div>
      </div>

      {/* ── Section divider ──────────────────────────────────── */}
      <div className="relative z-[2]">
        <div
          data-es-anim="divider"
          className="relative h-px bg-muted/30"
        >
          <div className="absolute left-0  w-2 h-2 bg-accent -top-[3px]" />
          <div className="absolute right-0 w-2 h-2 bg-accent -top-[3px]" />
        </div>
        <div className="h-[3.75rem] bg-background" />
      </div>
    </section>
  );
}
