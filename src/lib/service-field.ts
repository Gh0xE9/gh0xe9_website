import type { FieldMode } from './service-scenes';

type Palette = {
  ink: string;
  paper: string;
  fog: string;
  e9: string;
  ph: string;
};

type RGB = { r: number; g: number; b: number };

let teardown: (() => void) | null = null;

function parseColor(input: string): RGB {
  const s = input.trim();
  if (s.startsWith('#')) {
    const h = s.slice(1);
    if (h.length === 3) {
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16),
      };
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const m = s.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return { r: 239, g: 230, b: 214 };
}

function rgba(color: string, a: number): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function readPalette(el: Element): Palette {
  const s = getComputedStyle(el);
  return {
    ink: s.getPropertyValue('--ink').trim() || '#001028',
    paper: s.getPropertyValue('--paper').trim() || '#efe6d6',
    fog: s.getPropertyValue('--fog').trim() || '#8a93a0',
    e9: s.getPropertyValue('--e9').trim() || '#f80010',
    ph: s.getPropertyValue('--phosphor').trim() || '#2ee6a6',
  };
}

function headerPx(): number {
  const header = document.querySelector('.site-header');
  if (header) {
    const h = header.getBoundingClientRect().height;
    if (h > 0) return h;
  }
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header').trim();
  const n = parseFloat(raw);
  if (raw.endsWith('rem') && Number.isFinite(n)) {
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return n * fs;
  }
  return Number.isFinite(n) && n > 24 ? n : 68;
}

function pinProgress(pin: HTMLElement): number {
  const header = headerPx();
  const stickyH = window.innerHeight - header;
  const travel = pin.offsetHeight - stickyH;
  if (travel <= 0) return 0;
  return Math.min(1, Math.max(0, (header - pin.getBoundingClientRect().top) / travel));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

function isLight(color: string): boolean {
  const { r, g, b } = parseColor(color);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function mix(a: string, b: string, t: number, alpha = 1): string {
  const A = parseColor(a);
  const B = parseColor(b);
  const r = Math.round(A.r + (B.r - A.r) * t);
  const g = Math.round(A.g + (B.g - A.g) * t);
  const bl = Math.round(A.b + (B.b - A.b) * t);
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

function volume(pal: Palette, amount = 0.26, alpha = 0.94): string {
  return mix(pal.ink, pal.paper, amount, alpha);
}

function phaseIndex(p: number, n = 4): number {
  const t = Math.min(0.999, clamp01(p) / 0.86);
  return Math.min(n - 1, Math.floor(t * n));
}

function phaseTarget(i: number, n: number): number {
  if (n <= 0) return 0;
  return clamp01(((i + 0.2) / n) * 0.86);
}

function scrollToProgress(pin: HTMLElement, p: number, instant: boolean) {
  const header = headerPx();
  const stickyH = window.innerHeight - header;
  const travel = pin.offsetHeight - stickyH;
  if (travel <= 0) return false;
  const top = pin.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top - header + travel * clamp01(p), behavior: instant ? 'auto' : 'smooth' });
  return true;
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size = 11) {
  ctx.save();
  ctx.font = `500 ${size}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function veil(ctx: CanvasRenderingContext2D, w: number, h: number, ink: string, fade: number) {
  const zoneW = Math.min(w * 0.68, 740);
  const zoneY = h * 0.52;
  const g = ctx.createLinearGradient(0, zoneY, 0, h);
  g.addColorStop(0, rgba(ink, 0));
  g.addColorStop(0.4, rgba(ink, 0.55 * fade));
  g.addColorStop(1, rgba(ink, 0.92 * fade));
  ctx.fillStyle = g;
  ctx.fillRect(0, zoneY, zoneW, h - zoneY);
  const side = ctx.createLinearGradient(0, 0, zoneW, 0);
  side.addColorStop(0, rgba(ink, 0.18 * fade));
  side.addColorStop(1, rgba(ink, 0));
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, zoneW * 0.45, h);
}

function grid(ctx: CanvasRenderingContext2D, w: number, h: number, paper: string, alpha: number) {
  const step = 56;
  ctx.save();
  ctx.strokeStyle = rgba(paper, alpha);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0.5; x <= w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0.5; y <= h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* --------------- scenes --------------- */

type Iso = {
  sx: (x: number, y: number, z?: number) => number;
  sy: (x: number, y: number, z?: number) => number;
};

function makeIso(cx: number, cy: number, s: number): Iso {
  return {
    sx: (x, y, z = 0) => cx + (x - y) * 0.86 * s,
    sy: (x, y, z = 0) => cy + (x + y) * 0.42 * s - z * s,
  };
}

function isoBox(
  ctx: CanvasRenderingContext2D,
  iso: Iso,
  x: number,
  y: number,
  w: number,
  d: number,
  h: number,
  fill: string,
  stroke: string,
  lw = 1.5,
) {
  const pt = (X: number, Y: number, Z: number) => ({ x: iso.sx(X, Y, Z), y: iso.sy(X, Y, Z) });
  const A = pt(x, y, 0);
  const B = pt(x + w, y, 0);
  const C = pt(x + w, y + d, 0);
  const D = pt(x, y + d, 0);
  const A2 = pt(x, y, h);
  const B2 = pt(x + w, y, h);
  const C2 = pt(x + w, y + d, h);
  const D2 = pt(x, y + d, h);
  const light = isLight(fill);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.lineTo(C2.x, C2.y);
  ctx.lineTo(B2.x, B2.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = light ? 'rgba(0, 0, 0, 0.28)' : 'rgba(0, 0, 0, 0.4)';
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(D.x, D.y);
  ctx.lineTo(D2.x, D2.y);
  ctx.lineTo(A2.x, A2.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = light ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.18)';
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(A2.x, A2.y);
  ctx.lineTo(B2.x, B2.y);
  ctx.lineTo(C2.x, C2.y);
  ctx.lineTo(D2.x, D2.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = light ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.1)';
  ctx.fill();
  ctx.stroke();
}

function isoGrid(ctx: CanvasRenderingContext2D, iso: Iso, n: number, paper: string, alpha: number) {
  ctx.save();
  ctx.strokeStyle = rgba(paper, alpha);
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -n; i <= n; i++) {
    ctx.moveTo(iso.sx(-n, i, 0), iso.sy(-n, i, 0));
    ctx.lineTo(iso.sx(n, i, 0), iso.sy(n, i, 0));
    ctx.moveTo(iso.sx(i, -n, 0), iso.sy(i, -n, 0));
    ctx.lineTo(iso.sx(i, n, 0), iso.sy(i, n, 0));
  }
  ctx.stroke();
  ctx.restore();
}

function along(path: [number, number][], u: number): [number, number] {
  const n = path.length - 1;
  const s = clamp01(u) * n;
  const i = Math.min(n - 1, Math.floor(s));
  const f = s - i;
  return [lerp(path[i][0], path[i + 1][0], f), lerp(path[i][1], path[i + 1][1], f)];
}

function hudPlate(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  title: string,
  lines: string[],
  pal: Palette,
  on = false,
) {
  const h = 22 + lines.length * 16;
  ctx.save();
  rounded(ctx, x, y, w, h, 2);
  ctx.fillStyle = rgba(pal.ink, 0.86);
  ctx.fill();
  ctx.strokeStyle = rgba(on ? pal.e9 : pal.paper, on ? 0.9 : 0.45);
  ctx.lineWidth = on ? 1.6 : 1;
  ctx.stroke();
  ctx.font = `600 9px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(on ? pal.e9 : pal.ph, 0.95);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, x + 10, y + 12);
  ctx.font = `500 10px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(pal.paper, 0.88);
  lines.forEach((line, i) => ctx.fillText(line, x + 10, y + 28 + i * 16));
  ctx.restore();
}

function backdrop(ctx: CanvasRenderingContext2D, w: number, h: number, pal: Palette) {
  const g = ctx.createRadialGradient(w * 0.64, h * 0.4, 10, w * 0.64, h * 0.4, Math.max(w, h) * 0.62);
  g.addColorStop(0, rgba(pal.e9, 0.16));
  g.addColorStop(0.35, rgba(pal.paper, 0.05));
  g.addColorStop(1, rgba(pal.ink, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawLoop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const names = labels.length >= 4 ? labels.slice(0, 4) : ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'];
  const phase = phaseIndex(p);
  const iso = makeIso(w * 0.6, h * 0.5, Math.min(w, h) * 0.042);
  ctx.save();
  isoGrid(ctx, iso, 11, pal.paper, 0.16);

  // raised platform
  const slab = 7.2;
  isoBox(ctx, iso, -slab, -slab, slab * 2, slab * 2, 0.28, rgba(pal.paper, 0.05), rgba(pal.paper, 0.35), 1.1);

  const halls: { name: string; x: number; y: number; w: number; d: number; h: number }[] = [
    { name: names[0], x: -1.3, y: -7.6, w: 3.4, d: 2.6, h: 2.1 },
    { name: names[1], x: 5.2, y: -1.4, w: 2.8, d: 3.5, h: 1.7 },
    { name: names[2], x: -1.6, y: 5.1, w: 3.6, d: 2.5, h: 1.9 },
    { name: names[3], x: -7.8, y: -1.6, w: 2.7, d: 3.4, h: 2.3 },
  ];

  const loop: [number, number][] = [
    [0, -5.2],
    [5.2, 0],
    [0, 5.2],
    [-5.2, 0],
    [0, -5.2],
  ];
  ctx.strokeStyle = rgba(pal.paper, 0.55);
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  loop.forEach(([x, y], i) => {
    const X = iso.sx(x, y, 0.12);
    const Y = iso.sy(x, y, 0.12);
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  ctx.stroke();
  ctx.strokeStyle = rgba(pal.ph, 0.55 + 0.3 * p);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const packetN = 10 + phase * 3;
  for (let i = 0; i < packetN; i++) {
    const u = (t * 0.08 + i / packetN) % 1;
    const [x, y] = along(loop, u);
    const X = iso.sx(x, y, 0.28);
    const Y = iso.sy(x, y, 0.28);
    const [x2, y2] = along(loop, (u + 0.018) % 1);
    ctx.strokeStyle = rgba(i % 3 === 0 ? pal.e9 : pal.ph, 0.95);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(iso.sx(x2, y2, 0.28), iso.sy(x2, y2, 0.28));
    ctx.stroke();
  }

  // command plate
  isoBox(ctx, iso, -1.5, -1.5, 3, 3, 1.15, volume(pal, 0.34, 0.96), rgba(phase >= 2 ? pal.e9 : pal.paper, 0.95), 1.7);
  ctx.textAlign = 'center';
  ctx.font = `600 10px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(pal.paper, 0.95);
  ctx.fillText('OPS', iso.sx(0, 0, 1.4), iso.sy(0, 0, 1.4));
  if (phase >= 2) {
    ctx.strokeStyle = rgba(pal.ph, 0.8);
    ctx.lineWidth = 1.4;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(iso.sx(0, 0, 1.8), iso.sy(0, 0, 1.8), 22 + phase * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = rgba(pal.ph, 0.9);
    ctx.font = `500 9px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillText('CLOSED LOOP', iso.sx(0, 0, 2.4), iso.sy(0, 0, 2.4) - 8);
  }

  halls.forEach((hall, i) => {
    const hunt = phase >= 1 && Math.floor((t * 0.45 + p) % 4) === i;
    isoBox(
      ctx,
      iso,
      hall.x,
      hall.y,
      hall.w,
      hall.d,
      hall.h,
      volume(pal, hunt ? 0.4 : 0.3, 0.96),
      rgba(hunt || phase >= 2 ? pal.e9 : pal.paper, hunt ? 0.95 : 0.78),
      hunt ? 2 : 1.4,
    );
    const lx = iso.sx(hall.x + hall.w / 2, hall.y + hall.d / 2, hall.h + 0.35);
    const ly = iso.sy(hall.x + hall.w / 2, hall.y + hall.d / 2, hall.h + 0.35);
    ctx.font = `600 10px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(pal.paper, 0.95);
    ctx.textAlign = 'center';
    ctx.fillText(hall.name, lx, ly);
    if (hunt) {
      ctx.strokeStyle = rgba(pal.e9, 0.55);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(lx, ly + 4, 22 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  ctx.restore();
}

function drawTimeline(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const x0 = w * 0.18;
  const x1 = w * 0.86;
  const y = h * 0.4;
  const names = labels.length ? labels : ['EVENT', 'TRACE', 'SCOPE'];
  const phase = phaseIndex(p);
  ctx.save();

  ctx.strokeStyle = rgba(pal.paper, 0.75);
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.stroke();
  ctx.fillStyle = rgba(pal.paper, 0.75);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x1 - 12, y - 5);
  ctx.lineTo(x1 - 12, y + 5);
  ctx.closePath();
  ctx.fill();
  ctx.textAlign = 'left';
  label(ctx, 'T + 0', x0, y + 22, rgba(pal.fog, 0.9), 10);
  label(ctx, 'T + n', x1 - 28, y + 22, rgba(pal.fog, 0.9), 10);

  const events = [
    { at: 0.08, kind: 'log', h: -70 },
    { at: 0.22, kind: 'alert', h: 80 },
    { at: 0.38, kind: 'trace', h: -110 },
    { at: 0.51, kind: 'log', h: 60 },
    { at: 0.67, kind: 'scope', h: -80 },
    { at: 0.82, kind: 'trace', h: 95 },
  ];
  const appear = 0.08 + p * 0.9;
  let visible = 0;
  events.forEach((ev, i) => {
    const x = lerp(x0, x1 - 20, ev.at);
    const vis = clamp01((appear - ev.at) / 0.12);
    if (vis <= 0) return;
    visible += 1;
    ctx.globalAlpha = vis;
    ctx.strokeStyle = rgba(ev.kind === 'alert' ? pal.e9 : pal.ph, 0.9);
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + ev.h);
    ctx.stroke();
    ctx.fillStyle = rgba(ev.kind === 'alert' ? pal.e9 : pal.paper, 0.95);
    ctx.beginPath();
    ctx.arc(x, y, 4.6, 0, Math.PI * 2);
    ctx.fill();
    const cardW = 112;
    const cardH = 36;
    const top = ev.h < 0 ? y + ev.h - 8 - cardH : y + ev.h + 8;
    rounded(ctx, x - cardW / 2, top, cardW, cardH, 3);
    ctx.fillStyle = rgba(pal.ink, 0.92);
    ctx.fill();
    ctx.strokeStyle = rgba(ev.kind === 'alert' ? pal.e9 : pal.paper, 0.85);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.font = `500 10px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(pal.paper, 0.95);
    ctx.fillText(ev.kind.toUpperCase(), x, top + 14);
    ctx.fillStyle = rgba(pal.fog, 0.95);
    ctx.fillText(`#${String(i + 1).padStart(2, '0')}  reconstructed`, x, top + 26);
    ctx.globalAlpha = 1;
  });

  const head = lerp(x0, x1, 0.12 + p * 0.75);
  ctx.strokeStyle = rgba(pal.e9, 0.95);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(head, y - 136);
  ctx.lineTo(head, y + 136);
  ctx.stroke();
  ctx.fillStyle = rgba(pal.e9, 1);
  ctx.beginPath();
  ctx.moveTo(head, y - 138);
  ctx.lineTo(head - 6, y - 150);
  ctx.lineTo(head + 6, y - 150);
  ctx.closePath();
  ctx.fill();
  ctx.textAlign = 'left';
  label(ctx, 'PLAYHEAD', head + 8, y - 154, rgba(pal.e9, 0.95), 10);

  const mid = lerp(x0, x1, 0.45);
  const span = lerp(40, (x1 - x0) * 0.55, p);
  ctx.strokeStyle = rgba(pal.ph, 0.9);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mid - span, y + 150);
  ctx.lineTo(mid - span, y + 164);
  ctx.lineTo(mid + span, y + 164);
  ctx.lineTo(mid + span, y + 150);
  ctx.stroke();
  ctx.textAlign = 'center';
  label(ctx, names[2] ?? 'SCOPE', mid, y + 180, rgba(pal.ph, 0.95), 11);

  hudPlate(ctx, w * 0.72, h * 0.12, 168, names[0] ?? 'EVENT', [`RECONSTRUCTED  ${String(visible).padStart(2, '0')}`, `PHASE  ${String(phase + 1).padStart(2, '0')} / 04`], pal, phase >= 1);
  hudPlate(ctx, w * 0.72, h * 0.12 + 74, 168, names[1] ?? 'TRACE', [`SPAN  ${Math.round(span)}`, 'CLOCK  LIVE'], pal, phase >= 2);
  ctx.restore();
}

function drawCorridor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const box = { x: w * 0.22, y: h * 0.16, w: w * 0.68, h: h * 0.6 };
  const phase = phaseIndex(p);
  ctx.save();
  ctx.strokeStyle = rgba(pal.e9, 0.95);
  ctx.lineWidth = 2.4;
  ctx.setLineDash([10, 6]);
  ctx.lineDashOffset = -t * 16;
  rounded(ctx, box.x, box.y, box.w, box.h, 6);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = volume(pal, 0.06, 0.2);
  ctx.fill();

  const stamp = 'AUTHORIZED SCOPE';
  ctx.font = `600 12px "IBM Plex Mono", ui-monospace, monospace`;
  const tw = ctx.measureText(stamp).width;
  ctx.fillStyle = rgba(pal.ink, 0.92);
  ctx.fillRect(box.x + 16, box.y - 10, tw + 16, 20);
  ctx.fillStyle = rgba(pal.e9, 1);
  ctx.textBaseline = 'middle';
  ctx.fillText(stamp, box.x + 24, box.y);

  type Node = { id: string; x: number; y: number };
  const nodes: Node[] = [
    { id: 'START', x: box.x + box.w * 0.12, y: box.y + box.h * 0.72 },
    { id: 'EDGE', x: box.x + box.w * 0.32, y: box.y + box.h * 0.3 },
    { id: 'APP', x: box.x + box.w * 0.52, y: box.y + box.h * 0.58 },
    { id: 'CORE', x: box.x + box.w * 0.72, y: box.y + box.h * 0.28 },
    { id: 'SIEM', x: box.x + box.w * 0.86, y: box.y + box.h * 0.7 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
  ];
  const path = [0, 1, 3, 4];

  ctx.strokeStyle = rgba(pal.paper, 0.4);
  ctx.lineWidth = 1.5;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });

  if (phase >= 1) {
    [0, 1, 2].forEach((i) => {
      const pulse = 0.5 + 0.5 * Math.sin(t * 3 + i);
      ctx.strokeStyle = rgba(pal.ph, 0.4 + 0.4 * pulse);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 26 + pulse * 6, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (phase >= 2) {
    ctx.strokeStyle = rgba(pal.e9, 0.95);
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    path.forEach((idx, i) => {
      const n = nodes[idx];
      if (i === 0) ctx.moveTo(n.x, n.y);
      else ctx.lineTo(n.x, n.y);
    });
    ctx.stroke();
    const segs = path.length - 1;
    const u = (t * 0.25 + p) % 1;
    const s = u * segs;
    const i = Math.min(segs - 1, Math.floor(s));
    const f = s - i;
    const a = nodes[path[i]];
    const b = nodes[path[i + 1]];
    const px = lerp(a.x, b.x, f);
    const py = lerp(a.y, b.y, f);
    ctx.fillStyle = rgba(pal.e9, 1);
    ctx.shadowColor = rgba(pal.e9, 0.85);
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(px, py, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    label(ctx, 'PATH VALIDATION', px + 12, py - 12, rgba(pal.e9, 0.95), 10);
  }

  if (phase >= 3) {
    const siem = nodes[4];
    const pulse = 0.5 + 0.5 * Math.sin(t * 4);
    ctx.strokeStyle = rgba(pal.ph, 0.9);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(siem.x, siem.y, 36 + pulse * 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = rgba(pal.ph, 0.14 + 0.08 * pulse);
    ctx.fill();
    const u = (t * 0.35) % 1;
    const rev = [...path].reverse();
    const segs = rev.length - 1;
    const s = u * segs;
    const i = Math.min(segs - 1, Math.floor(s));
    const f = s - i;
    const a = nodes[rev[i]];
    const b = nodes[rev[i + 1]];
    ctx.fillStyle = rgba(pal.ph, 1);
    ctx.beginPath();
    ctx.arc(lerp(a.x, b.x, f), lerp(a.y, b.y, f), 5, 0, Math.PI * 2);
    ctx.fill();
    label(ctx, 'DETECTION / RESPONSE', siem.x - 70, siem.y + 52, rgba(pal.ph, 0.95), 10);
  }

  nodes.forEach((n, i) => {
    const focus = (phase >= 2 && path.includes(i)) || (phase >= 3 && i === 4) || (phase >= 1 && i <= 2);
    ctx.fillStyle = volume(pal, 0.2, 0.96);
    ctx.strokeStyle = rgba(focus ? pal.e9 : pal.paper, focus ? 0.95 : 0.8);
    ctx.lineWidth = focus ? 2.2 : 1.6;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.font = `600 9px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(pal.paper, 0.95);
    ctx.fillText(n.id, n.x, n.y + 28);
  });
  ctx.restore();
  void labels;
}

function drawSignals(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const cx = w * 0.6;
  const cy = h * 0.42;
  const phase = phaseIndex(p);
  ctx.save();

  // perspective orbital rings — not a cube galaxy
  for (let r = 0; r < 4; r++) {
    const rx = 70 + r * 58;
    const ry = 22 + r * 16;
    ctx.strokeStyle = rgba(pal.paper, 0.28 + r * 0.07);
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, -0.08, 0, Math.PI * 2);
    ctx.stroke();
  }

  const count = 110;
  const confirmed = Math.floor(22 + p * 50);
  const pts: { x: number; y: number; z: number; key: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    const ring = 1 + (i % 4);
    const a = i * 0.47 + t * (0.07 + ring * 0.015);
    const rx = 70 + ring * 58;
    const ry = 22 + ring * 16;
    const x = cx + Math.cos(a) * rx;
    const y = cy + Math.sin(a) * ry;
    pts.push({ x, y, z: Math.sin(a), key: i % 9 === 0 });
  }

  pts.forEach((pt, i) => {
    const lit = i < confirmed;
    const depth = 0.35 + 0.65 * (0.5 + 0.5 * pt.z);
    ctx.fillStyle = rgba(lit ? (pt.key ? pal.e9 : pal.paper) : pal.fog, lit ? depth : 0.42 * depth);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, lit ? 3 + depth : 2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.lineWidth = 1.2;
  for (let i = 0; i < confirmed; i++) {
    for (let j = i + 1; j < confirmed; j++) {
      const a = pts[i];
      const b = pts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 120) continue;
      const strong = a.key || b.key;
      ctx.strokeStyle = rgba(strong ? pal.e9 : pal.ph, strong ? 0.45 : 0.22);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  const coreR = 26 + p * 10;
  ctx.shadowColor = rgba(pal.e9, 0.55);
  ctx.shadowBlur = 28;
  ctx.fillStyle = rgba(pal.ink, 0.92);
  ctx.strokeStyle = rgba(pal.e9, 0.95);
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6 + t * 0.08;
    const x = cx + Math.cos(a) * coreR;
    const y = cy + Math.sin(a) * coreR * 0.72;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.textAlign = 'center';
  ctx.font = `600 11px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(pal.paper, 0.95);
  ctx.fillText(labels[2] ?? 'QUERY', cx, cy);
  ctx.fillStyle = rgba(pal.ph, 0.95);
  ctx.font = `500 10px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillText(phase >= 3 ? 'VERIFIED' : 'GATHERING', cx, cy + 36);
  ctx.restore();
}

function brainPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(0, -1.05);
  ctx.bezierCurveTo(0.2, -1.2, 1.15, -1.15, 1.28, -0.25);
  ctx.bezierCurveTo(1.36, 0.35, 1.1, 0.95, 0.35, 1.12);
  ctx.bezierCurveTo(0.12, 0.55, 0.08, -0.1, 0, -1.05);
  ctx.moveTo(0, -1.05);
  ctx.bezierCurveTo(-0.2, -1.2, -1.15, -1.15, -1.28, -0.25);
  ctx.bezierCurveTo(-1.36, 0.35, -1.1, 0.95, -0.35, 1.12);
  ctx.bezierCurveTo(-0.12, 0.55, -0.08, -0.1, 0, -1.05);
}

function drawBrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const cx = w * 0.64;
  const cy = h * 0.4;
  const s = Math.min(w, h) * 0.23;
  const phase = phaseIndex(p);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.shadowColor = rgba(pal.ph, 0.25);
  ctx.shadowBlur = 18 / s;
  ctx.fillStyle = volume(pal, 0.18, 0.9);
  ctx.strokeStyle = rgba(pal.paper, 0.95);
  ctx.lineWidth = 2.3 / s;
  brainPath(ctx);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = rgba(pal.paper, 0.55);
  ctx.lineWidth = 1.2 / s;
  const folds: [number, number, number, number, number, number, number, number][] = [
    [0.15, -0.7, 0.55, -0.6, 0.75, -0.15, 0.55, 0.2],
    [0.2, -0.2, 0.7, 0.0, 0.85, 0.35, 0.5, 0.65],
    [0.12, 0.25, 0.45, 0.45, 0.55, 0.75, 0.22, 0.9],
    [-0.15, -0.7, -0.55, -0.6, -0.75, -0.15, -0.55, 0.2],
    [-0.2, -0.2, -0.7, 0.0, -0.85, 0.35, -0.5, 0.65],
    [-0.12, 0.25, -0.45, 0.45, -0.55, 0.75, -0.22, 0.9],
  ];
  folds.forEach((f) => {
    ctx.beginPath();
    ctx.moveTo(f[0], f[1]);
    ctx.bezierCurveTo(f[2], f[3], f[4], f[5], f[6], f[7]);
    ctx.stroke();
  });

  ctx.strokeStyle = rgba(pal.ph, 0.95);
  ctx.lineWidth = 3.4 / s;
  ctx.beginPath();
  ctx.ellipse(0, -0.15, 1.22, 0.42, 0, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, -0.15, 1.22, 0.42, 0, Math.PI + 0.15, Math.PI * 2 - 0.15);
  ctx.stroke();

  const pads: [number, number][] = [
    [-0.7, -0.55],
    [-0.25, -0.78],
    [0.25, -0.78],
    [0.7, -0.55],
    [0.95, -0.1],
    [-0.95, -0.1],
  ];
  pads.forEach(([x, y], i) => {
    const on = (Math.sin(t * 4 + i) + 1) / 2;
    ctx.fillStyle = rgba(pal.ph, 0.45 + 0.5 * on);
    ctx.strokeStyle = rgba(pal.paper, 0.9);
    ctx.lineWidth = 1.4 / s;
    ctx.beginPath();
    ctx.arc(x, y, 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();

  const stackX = w * 0.16;
  const stackY = h * 0.2;
  const rows = [labels[0] ?? 'PROTOCOL', labels[1] ?? 'DATAFLOW', 'SIMULATION', labels[2] ?? 'SOFTWARE ONLY'];
  rows.forEach((name, i) => {
    const y = stackY + i * 54;
    const active = phase === i || (i === 3 && p > 0.7);
    rounded(ctx, stackX, y, 204, 42, 3);
    ctx.fillStyle = rgba(pal.ink, 0.9);
    ctx.fill();
    ctx.strokeStyle = rgba(active ? pal.ph : pal.paper, active ? 0.95 : 0.65);
    ctx.lineWidth = active ? 2 : 1.4;
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.font = `600 11px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(pal.paper, 0.95);
    ctx.fillText(`${String(i + 1).padStart(2, '0')}  ${name}`, stackX + 12, y + 24);
  });

  pads.forEach((_, i) => {
    const u = (t * 0.3 + i * 0.14) % 1;
    const sx = cx + pads[i][0] * s;
    const sy = cy + pads[i][1] * s;
    const ex = stackX + 204;
    const ey = stackY + 21 + (i % 4) * 54;
    const mx = lerp(sx, ex, 0.5);
    const my = Math.min(sy, ey) - 40;
    const px = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * mx + u * u * ex;
    const py = (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * my + u * u * ey;
    ctx.fillStyle = rgba(pal.ph, 0.95);
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = rgba(pal.ph, 0.3);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(mx, my, ex, ey);
    ctx.stroke();
  });

  ctx.textAlign = 'left';
  ctx.font = `600 12px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(pal.ph, 0.95);
  ctx.fillText('SOFTWARE LAYER  ·  NON-INVASIVE', stackX, stackY - 16);

  const wx0 = stackX;
  const wy = stackY + 4 * 54 + 18;
  ctx.strokeStyle = rgba(pal.e9, 0.9);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let x = 0; x <= 204; x++) {
    const yy = wy + Math.sin(x * 0.18 + t * 6) * 8 + Math.sin(x * 0.07 + t * 2.2) * 5;
    if (x === 0) ctx.moveTo(wx0 + x, yy);
    else ctx.lineTo(wx0 + x, yy);
  }
  ctx.stroke();
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
) {
  const cats = ['PWN', 'WEB', 'CRYPTO', 'REV', 'MISC', 'FORENSICS', 'IOT', 'AI'];
  const cols = 4;
  const rows = 2;
  const gridW = Math.min(w * 0.7, 900);
  const gridH = Math.min(h * 0.48, 340);
  const x0 = w * 0.2;
  const y0 = h * 0.2;
  const gap = 14;
  const cw = (gridW - gap * (cols - 1)) / cols;
  const ch = (gridH - gap * (rows - 1)) / rows;
  const solved = Math.floor(1 + p * 6);
  const phase = phaseIndex(p);
  ctx.save();

  // arena floor
  ctx.fillStyle = rgba(pal.e9, 0.04);
  rounded(ctx, x0 - 18, y0 - 70, gridW + 36, gridH + 150, 8);
  ctx.fill();
  ctx.strokeStyle = rgba(pal.paper, 0.2);
  ctx.stroke();

  rounded(ctx, x0, y0 - 56, 230, 34, 3);
  ctx.fillStyle = rgba(pal.e9, 0.95);
  ctx.fill();
  ctx.textAlign = 'left';
  ctx.font = `700 12px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = rgba(pal.paper, 1);
  const blink = Math.sin(t * 6) > 0 ? '● LIVE' : '●  LIVE';
  ctx.fillText(`${blink}   CONTEST`, x0 + 14, y0 - 39);

  const clock = Math.max(0, 90 - Math.floor(p * 48 + t * 0.4));
  ctx.fillStyle = rgba(pal.paper, 0.95);
  ctx.fillText(`T-${String(clock).padStart(2, '0')}:00`, x0 + gridW - 90, y0 - 39);

  cats.forEach((cat, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = x0 + c * (cw + gap);
    const y = y0 + r * (ch + gap);
    const on = i < solved;
    rounded(ctx, x, y, cw, ch, 4);
    ctx.fillStyle = rgba(pal.ink, 0.9);
    ctx.fill();
    ctx.strokeStyle = rgba(on ? pal.e9 : pal.paper, on ? 0.98 : 0.55);
    ctx.lineWidth = on ? 2.3 : 1.4;
    ctx.stroke();
    if (on) {
      ctx.fillStyle = rgba(pal.e9, 0.14);
      ctx.fill();
    }
    ctx.textAlign = 'left';
    ctx.font = `600 14px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(pal.paper, 0.95);
    ctx.fillText(cat, x + 14, y + 28);
    ctx.font = `500 10px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.fillStyle = rgba(on ? pal.ph : pal.fog, 0.95);
    ctx.fillText(on ? 'SOLVED' : 'OPEN', x + 14, y + 48);
    ctx.fillStyle = rgba(pal.fog, 0.9);
    ctx.fillText(`${100 + i * 50}`, x + cw - 52, y + 28);
  });

  const barY = y0 + gridH + 38;
  ctx.fillStyle = rgba(pal.paper, 0.85);
  ctx.font = `500 11px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.textAlign = 'left';
  ctx.fillText((labels[0] ?? 'HOST') + '  ·  ' + (labels[1] ?? 'DESIGN') + '  ·  ' + (labels[2] ?? 'REVIEW'), x0, barY);
  for (let i = 0; i < 14; i++) {
    const lit = (t * 2 + i) % 14 < solved + 2 || (phase >= 3 && i < 10);
    ctx.fillStyle = rgba(lit ? pal.e9 : pal.paper, lit ? 0.95 : 0.22);
    ctx.fillRect(x0 + i * 18, barY + 16, 12, 8);
  }
  ctx.restore();
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mode: FieldMode,
  labels: string[],
  p: number,
  t: number,
  pal: Palette,
  reduced: boolean,
) {
  ctx.clearRect(0, 0, w, h);
  const leave = clamp01((p - 0.88) / 0.12);
  ctx.save();
  ctx.globalAlpha = 1 - leave * 0.85;
  backdrop(ctx, w, h, pal);
  if (mode !== 'loop') grid(ctx, w, h, pal.paper, 0.1);
  const time = reduced ? p * 4 : t;
  switch (mode) {
    case 'loop':
      drawLoop(ctx, w, h, labels, p, time, pal);
      break;
    case 'timeline':
      drawTimeline(ctx, w, h, labels, p, time, pal);
      break;
    case 'corridor':
      drawCorridor(ctx, w, h, labels, p, time, pal);
      break;
    case 'signals':
      drawSignals(ctx, w, h, labels, p, time, pal);
      break;
    case 'protocol':
      drawBrain(ctx, w, h, labels, p, time, pal);
      break;
    case 'ground':
      drawGround(ctx, w, h, labels, p, time, pal);
      break;
  }
  ctx.restore();
  veil(ctx, w, h, pal.ink, 1);
}


export function bindServiceField() {
  teardown?.();
  teardown = null;

  const root = document.querySelector<HTMLElement>('[data-service-field]');
  if (!root) return;

  const canvas2d = root.querySelector<HTMLCanvasElement>('canvas[data-view="2d"]');
  const canvas3d = root.querySelector<HTMLCanvasElement>('canvas[data-view="3d"]');
  const pin = root.querySelector<HTMLElement>('[data-pin]');
  const copy = root.querySelector<HTMLElement>('.sh-pin__copy');
  const beats = [...root.querySelectorAll<HTMLElement>('[data-beat]')];
  const phases = [...root.querySelectorAll<HTMLElement>('[data-phase]')];
  const toggle = root.querySelector<HTMLElement>('[data-mode-toggle]');
  if (!canvas2d || !pin) return;

  const ctx = canvas2d.getContext('2d', { alpha: true });
  if (!ctx) return;

  const mode = (root.dataset.mode ?? 'loop') as FieldMode;
  const labels = (root.dataset.labels ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeEl = document.documentElement;

  let view: '2d' | '3d' = '2d';
  let raf = 0;
  let running = false;
  let time = 0;
  let last = performance.now();
  let field3d: {
    start: () => void;
    stop: () => void;
    resize: () => void;
    setProgress: (p: number, t: number) => void;
    setColors: (pal: Palette) => void;
    dispose: () => void;
  } | null = null;
  let loading3d = false;

  const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-step]')];
  const rail = root.querySelector<HTMLElement>('[data-rail]');
  const stepCount = steps.length || phases.length || 4;

  const setBeats = (p: number) => {
    const leaving = p >= 0.88;
    copy?.classList.toggle('is-leaving', leaving);
    const n = beats.length || 1;
    const i = Math.min(n - 1, Math.floor(Math.min(0.999, p / 0.86) * n));
    beats.forEach((el, k) => el.classList.toggle('is-on', !leaving && k === i));
    const pi = phaseIndex(p, stepCount);
    if (phases.length) {
      phases.forEach((el, k) => el.classList.toggle('is-on', k === pi));
    }
    steps.forEach((el, k) => {
      const on = k === pi;
      if (on) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    root.style.setProperty('--step', String(pi));
  };

  const seekToStep = (i: number) => {
    const n = stepCount;
    const idx = Math.max(0, Math.min(n - 1, i));
    if (reduced) {
      const mark = phases[idx] ?? steps[idx];
      mark?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setBeats(phaseTarget(idx, n));
      return;
    }
    scrollToProgress(pin, phaseTarget(idx, n), false);
  };

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rec = canvas2d.getBoundingClientRect();
    canvas2d.width = Math.max(1, Math.floor(rec.width * dpr));
    canvas2d.height = Math.max(1, Math.floor(rec.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    field3d?.resize();
  };

  const paint = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!reduced) time += dt;
    const p = pinProgress(pin);
    root.style.setProperty('--progress', String(p));
    setBeats(p);
    const pal = readPalette(themeEl);
    if (view === '2d') {
      const rec = canvas2d.getBoundingClientRect();
      drawScene(ctx, rec.width, rec.height, mode, labels, p, time, pal, reduced);
    } else {
      field3d?.setColors(pal);
      field3d?.setProgress(p, time);
    }
    if (running) raf = requestAnimationFrame(paint);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(paint);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const syncToggle = () => {
    toggle?.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((btn) => {
      const on = btn.dataset.view === view;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };

  const setView = async (next: '2d' | '3d') => {
    if (next === view) return;
    if (next === '3d') {
      if (reduced || !canvas3d) return;
      if (!field3d) {
        if (loading3d) return;
        loading3d = true;
        try {
          const mod = await import('./service-field-3d');
          field3d = await mod.createServiceField3D(canvas3d, {
            mode,
            labels,
            getColors: () => readPalette(themeEl),
          });
        } catch {
          loading3d = false;
          return;
        }
        loading3d = false;
      }
      if (!field3d) return;
      canvas2d.hidden = true;
      canvas3d.hidden = false;
      field3d.resize();
      field3d.start();
      view = '3d';
    } else {
      field3d?.stop();
      if (canvas3d) canvas3d.hidden = true;
      canvas2d.hidden = false;
      view = '2d';
    }
    syncToggle();
  };

  const onToggle = (ev: Event) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('[data-view]');
    if (!btn?.dataset.view) return;
    ev.preventDefault();
    void setView(btn.dataset.view === '3d' ? '3d' : '2d');
  };

  const onScroll = () => {
    /* progress is sampled in rAF */
  };

  const themeObs = new MutationObserver(() => {
    /* colors reread each frame */
  });
  themeObs.observe(themeEl, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  const ro = new ResizeObserver(resize);
  ro.observe(pin.querySelector('.sh-pin__sticky') ?? canvas2d);

  const onRail = (ev: Event) => {
    const btn = (ev.target as HTMLElement).closest<HTMLElement>('button');
    if (!btn || !rail?.contains(btn)) return;
    ev.preventDefault();
    const pi = phaseIndex(pinProgress(pin), stepCount);
    if (btn.hasAttribute('data-rail-prev')) {
      seekToStep(pi - 1);
      return;
    }
    if (btn.hasAttribute('data-rail-next')) {
      seekToStep(pi + 1);
      return;
    }
    if (btn.dataset.step != null) seekToStep(Number(btn.dataset.step));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  toggle?.addEventListener('click', onToggle);
  rail?.addEventListener('click', onRail);
  document.addEventListener('astro:before-swap', stopOnce, { once: true });

  function stopOnce() {
    teardown?.();
  }

  resize();
  const first = pinProgress(pin);
  setBeats(first);
  drawScene(
    ctx,
    canvas2d.getBoundingClientRect().width,
    canvas2d.getBoundingClientRect().height,
    mode,
    labels,
    first,
    0,
    readPalette(themeEl),
    reduced,
  );
  if (!reduced) start();
  else {
    /* static frame already painted */
  }

  teardown = () => {
    stop();
    field3d?.dispose();
    field3d = null;
    ro.disconnect();
    themeObs.disconnect();
    window.removeEventListener('scroll', onScroll);
    toggle?.removeEventListener('click', onToggle);
    rail?.removeEventListener('click', onRail);
  };
}
