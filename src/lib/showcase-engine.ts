import type { FieldMode } from './service-scenes';

/* ============================================================
   Gh0xE9 service deck — "paper instrument" showcase engine
   A wheel/keyboard/touch driven fullscreen deck over a
   per-service instrument. The instrument ACTS OUT the business
   stage you are reading: scopes get drawn, packets move,
   evidence gets marked — driven by stage activations.
   ============================================================ */

type RGB = { r: number; g: number; b: number };
type Palette = { ink: string; paper: string; fog: string; e9: string; ph: string };
/** per-stage activation levels, 0..1, one per stage scene */
type Acts = number[];

function parseColor(input: string): RGB {
  const s = input.trim();
  if (s.startsWith('#')) {
    const h = s.slice(1);
    if (h.length === 3) {
      return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16) };
    }
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  const m = s.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return { r: 36, g: 39, b: 45 };
}

function rgba(color: string, a: number): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* palette is read from the deck element: .dk carries its own
   paper palette regardless of the site theme */
function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  return {
    ink: s.getPropertyValue('--ink').trim() || '#edeae2',
    paper: s.getPropertyValue('--paper').trim() || '#24272d',
    fog: s.getPropertyValue('--fog').trim() || '#8b8778',
    e9: s.getPropertyValue('--e9').trim() || '#df382a',
    ph: s.getPropertyValue('--phosphor').trim() || '#35897f',
  };
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const TAU = Math.PI * 2;
const A = (acts: Acts, i: number) => acts[i] ?? 0;

/* deterministic pseudo-random from an index — stable per frame */
function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ---------------- shared ink helpers ---------------- */

function ink(ctx: CanvasRenderingContext2D, pal: Palette, a: number, w = 1) {
  ctx.strokeStyle = rgba(pal.paper, a);
  ctx.lineWidth = w;
}

function label(
  ctx: CanvasRenderingContext2D,
  pal: Palette,
  x: number,
  y: number,
  text: string,
  a = 0.55,
  color?: string,
) {
  ctx.save();
  ctx.font = '9px "IBM Plex Mono", monospace';
  ctx.fillStyle = rgba(color ?? pal.paper, a);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function sq(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, a: number) {
  ctx.fillStyle = rgba(color, a);
  ctx.fillRect(x - s / 2, y - s / 2, s, s);
}

function ring(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, a: number, w = 1) {
  if (a <= 0 || r <= 0) return;
  ctx.strokeStyle = rgba(color, a);
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.stroke();
}

/** radial tick marks around a circle — the dial signature */
function ticks(
  ctx: CanvasRenderingContext2D,
  pal: Palette,
  cx: number,
  cy: number,
  r: number,
  len: number,
  a: number,
  every = 6,
) {
  ctx.save();
  for (let i = 0; i < every * 12; i++) {
    const ang = (i / (every * 12)) * TAU - Math.PI / 2;
    const major = i % every === 0;
    const l = major ? len * 1.9 : len;
    ink(ctx, pal, major ? a * 1.8 : a, major ? 1.3 : 1);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
    ctx.lineTo(cx + Math.cos(ang) * (r + l), cy + Math.sin(ang) * (r + l));
    ctx.stroke();
  }
  ctx.restore();
}

/** small outlined instrument tag */
function chip(
  ctx: CanvasRenderingContext2D,
  pal: Palette,
  x: number,
  y: number,
  text: string,
  a = 0.7,
  color?: string,
) {
  ctx.save();
  ctx.font = '9px "IBM Plex Mono", monospace';
  const tw = ctx.measureText(text).width;
  ctx.strokeStyle = rgba(color ?? pal.paper, a * 0.75);
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y - 10, tw + 10, 15);
  ctx.fillStyle = rgba(color ?? pal.paper, a);
  ctx.fillText(text, x + 5, y + 1);
  ctx.restore();
}

/** framed horizontal meter */
function hbar(
  ctx: CanvasRenderingContext2D,
  pal: Palette,
  x: number,
  y: number,
  bw: number,
  frac: number,
  color: string,
  a: number,
) {
  ctx.strokeStyle = rgba(pal.paper, a * 0.55);
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, bw, 5);
  ctx.fillStyle = rgba(color, a);
  ctx.fillRect(x + 1, y + 1, (bw - 2) * clamp01(frac), 3);
}

/* ============================================================
   01 NETWORK DEFENSE — sentry dial
   监测: the sweep patrols. 狩猎: contacts surface faster.
   闭环: the needle intercepts contacts, they die teal.
   沉淀: interceptions stay as permanent teal marks on the ring.
   ============================================================ */
function ambientLoop(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  const hunt = A(acts, 1);
  const closure = A(acts, 2);
  const settle = A(acts, 3);

  const cx = w * 0.635;
  const cy = h * 0.52;
  const R = Math.min(w, h) * 0.38;

  ctx.save();

  /* sweep needle angle — computed up front: sectors light as it crosses */
  const sweep = t * (0.32 + hunt * 0.65);

  /* dial furniture */
  ring(ctx, cx, cy, R, pal.paper, 0.22, 1.2);
  ring(ctx, cx, cy, R * 0.72, pal.paper, 0.16);
  ring(ctx, cx, cy, R * 0.46, pal.paper, 0.12);
  ticks(ctx, pal, cx, cy, R, 9, 0.32, 6);
  ticks(ctx, pal, cx, cy, R * 0.72, 5, 0.2, 12);

  /* perimeter sectors — the network under watch; each lights as
     the sweep crosses it */
  const sectors = ['DMZ', 'OPS', 'DB', 'DEV'];
  sectors.forEach((name, i) => {
    const a0 = -Math.PI / 2 + (i * TAU) / 4 + 0.12;
    const a1 = a0 + TAU / 4 - 0.24;
    const rel = ((sweep - a0) % TAU + TAU) % TAU;
    const hot = rel < a1 - a0 ? 1 : 0;
    ctx.strokeStyle = rgba(hot ? pal.e9 : pal.paper, 0.3 + hot * 0.45);
    ctx.lineWidth = hot ? 2 : 1.1;
    ctx.beginPath();
    ctx.arc(cx, cy, R + 19, a0, a1);
    ctx.stroke();
    const mid = (a0 + a1) / 2;
    label(
      ctx, pal,
      cx + Math.cos(mid) * (R + 36) - 8,
      cy + Math.sin(mid) * (R + 36) + 3,
      name, 0.5 + hot * 0.4, hot ? pal.e9 : undefined,
    );
  });
  label(ctx, pal, cx - 4, cy - R - 16, 'N', 0.5);

  /* ---- top telemetry: 24h traffic sparkline + live counters ---- */
  if (w > 900) {
    const sx0 = cx - R * 0.98;
    const sx1 = cx + R * 0.98;
    const sy = Math.max(82, cy - R - 52);
    label(ctx, pal, sx0, sy - 8, 'NET FLOW / 24H', 0.5);
    const alerts = Math.floor(hash(Math.floor(t * 0.8) * 1.7) * 4 + hunt * 5);
    const eps = (9.2 + hash(Math.floor(t * 2) * 3.3) * 6).toFixed(1);
    label(ctx, pal, sx1 - 122, sy - 8, `EPS ${eps}K \u00b7 ALR ${alerts}`, 0.6, alerts > 4 ? pal.e9 : undefined);
    ink(ctx, pal, 0.3);
    ctx.strokeRect(sx0, sy, sx1 - sx0, 24);
    ctx.beginPath();
    for (let i = 0; i <= 96; i++) {
      const u = i / 96;
      const v =
        Math.sin(u * 8 + t * 1.4) * 0.32 +
        Math.sin(u * 21 - t * 2.2) * 0.18 +
        (hash(i * 3.1 + Math.floor(t * 2) * 7.7) - 0.5) * (0.55 + hunt * 0.5);
      const y = sy + 12 - v * 9;
      if (i === 0) ctx.moveTo(sx0 + u * (sx1 - sx0), y);
      else ctx.lineTo(sx0 + u * (sx1 - sx0), y);
    }
    ctx.strokeStyle = rgba(pal.paper, 0.55);
    ctx.lineWidth = 1;
    ctx.stroke();
    /* anomaly spikes on the flow line — hunting flags them */
    for (let i = 0; i < 5; i++) {
      const slot = Math.floor(t / 5) * 5 + i * 7;
      const u = 0.08 + hash(slot * 13.7) * 0.84;
      const x = sx0 + u * (sx1 - sx0);
      const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i * 2.1));
      ctx.fillStyle = rgba(pal.e9, pulse * (0.35 + hunt * 0.5));
      ctx.fillRect(x, sy + 4, 1.6, 16);
      if (hunt > 0.3 && i === 1) label(ctx, pal, x + 5, sy + 12, 'ANOM', hunt * 0.8, pal.e9);
    }
  }

  /* ---- bottom event feed: rolling log lines ---- */
  if (w > 900) {
    const feed: [string, string, string][] = [
      ['ALLOW', '10.0.4.12 \u2192 443/tcp', pal.paper],
      ['DENY', '185.36.x.x \u2192 22/tcp', pal.e9],
      ['HUNT', 'hypothesis: beacon-443', pal.ph],
      ['BLOCK', 'ioc 44d88612fea8', pal.e9],
      ['ALLOW', '10.0.7.3 \u2192 53/udp', pal.paper],
      ['ALERT', 'sev-2 \u00b7 ssh brute force', pal.e9],
      ['HUNT', 'hypothesis: dns tunnel', pal.ph],
      ['CONTAIN', 'ws-fin-17 isolated', pal.ph],
    ];
    const fx0 = cx - R * 0.98;
    const fy0 = Math.min(h - 70, cy + R + 30);
    label(ctx, pal, fx0, fy0 - 8, 'EVENT LOG', 0.5);
    for (let i = 0; i < 3; i++) {
      const slot = Math.floor(t * 1.1) - i;
      const [tag, msg, col] = feed[((slot % feed.length) + feed.length) % feed.length];
      const y = fy0 + i * 17;
      const fresh = i === 0 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 5)) : 0;
      const a = (1 - i * 0.3) * 0.75;
      sq(ctx, fx0 + 3, y - 3.5, 3.4, col, a * 0.8 + fresh * 0.3);
      label(ctx, pal, fx0 + 13, y, `${tag.padEnd(7)} ${msg}`, a, col);
    }
  }

  /* 能力沉淀 — permanent teal marks accumulate on the outer ring */
  if (settle > 0.02) {
    const marks = Math.floor(Math.min(36, t * 2.2) * settle);
    for (let i = 0; i < marks; i++) {
      const ang = hash(i * 3.7) * TAU;
      ink(ctx, pal, 0);
      ctx.strokeStyle = rgba(pal.ph, 0.65 * settle);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (R - 4), cy + Math.sin(ang) * (R - 4));
      ctx.lineTo(cx + Math.cos(ang) * (R + 12), cy + Math.sin(ang) * (R + 12));
      ctx.stroke();
    }
    label(ctx, pal, cx + R * 0.5, cy - R * 0.72, `RULES +${marks}`, 0.7 * settle, pal.ph);
  }

  /* rotating dashed guard ring */
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(t * 0.11);
  ctx.strokeStyle = rgba(pal.paper, 0.34);
  ctx.lineWidth = 1.2;
  ctx.setLineDash([2, 9]);
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.86, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  /* 威胁狩猎: a dashed hypothesis zone gets probed */
  if (hunt > 0.02) {
    const slot = Math.floor(t / 4.4);
    const hx = cx + (hash(slot * 13.3) - 0.5) * R * 1.1;
    const hy = cy + (hash(slot * 7.9) - 0.5) * R * 1.1;
    const age = (t % 4.4) / 4.4;
    ctx.save();
    ctx.translate(hx, hy);
    ctx.rotate(hash(slot * 3.1) * 1.2 - 0.6);
    ctx.strokeStyle = rgba(pal.e9, hunt * (1 - age * 0.6) * 0.6);
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(0, 0, 26 + age * 10, 16 + age * 6, 0, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    if (age < 0.5)
      label(ctx, pal, hx + 30, hy - 14, `HYP-${String(Math.floor(hash(slot * 5.7) * 90) + 10)}`, hunt * (1 - age * 2) * 0.9, pal.e9);
  }

  /* sweep needle — hunts faster during 威胁狩猎 */
  const wake = ctx.createConicGradient ? ctx.createConicGradient(sweep, cx, cy) : null;
  if (wake) {
    wake.addColorStop(0, rgba(pal.paper, 0.1 + hunt * 0.05));
    wake.addColorStop(0.14, rgba(pal.paper, 0));
    wake.addColorStop(1, rgba(pal.paper, 0));
    ctx.fillStyle = wake;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R * 0.98, sweep, sweep + 0.9);
    ctx.closePath();
    ctx.fill();
  }
  ink(ctx, pal, 0.7, 1.2);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweep) * R * 0.96, cy + Math.sin(sweep) * R * 0.96);
  ctx.stroke();
  sq(ctx, cx + Math.cos(sweep) * R * 0.96, cy + Math.sin(sweep) * R * 0.96, 5, pal.paper, 0.8);

  /* contacts — surface faster while hunting; intercepted while closing the loop */
  const contacts = 4 + Math.round(hunt * 4);
  for (let i = 0; i < contacts; i++) {
    const period = 3.4 - hunt * 1.4;
    const slot = Math.floor(t / period + i * 2.13);
    const bearing = hash(slot * 3 + i * 17) * TAU;
    const dist = R * (0.2 + hash(slot * 11 + i) * 0.7);
    const age = (t / period + i * 2.13) % 1;
    const x = cx + Math.cos(bearing) * dist;
    const y = cy + Math.sin(bearing) * dist;
    /* has the needle swept past this contact? then it gets intercepted */
    const needleDelta = (sweep - bearing) % TAU;
    const passed = needleDelta > 0 && needleDelta < 1.2 ? closure : 0;
    const fade = Math.pow(1 - age, 1 + passed * 2);
    const col = passed > 0.15 ? pal.ph : pal.e9;
    ctx.fillStyle = rgba(col, fade * 0.85);
    ctx.beginPath();
    ctx.arc(x, y, 2.4 + (i % 2), 0, TAU);
    ctx.fill();
    ring(ctx, x, y, 4 + age * 26, col, fade * 0.4);
    if (passed > 0.15) label(ctx, pal, x + 9, y - 7, 'CONTAINED', fade * passed, pal.ph);
    else if (age < 0.45 && i === 0) {
      label(ctx, pal, x + 9, y - 7, `CT-${String(Math.floor(hash(slot * 7 + i * 131) * 90) + 10)}`, fade, pal.e9);
      label(ctx, pal, x + 9, y + 14, `BRG ${String(Math.floor((bearing / TAU) * 360)).padStart(3, '0')}\u00b0`, fade * 0.7, pal.e9);
    }
  }

  /* crosshair + core */
  ink(ctx, pal, 0.35);
  ctx.beginPath();
  ctx.moveTo(cx - 16, cy);
  ctx.lineTo(cx + 16, cy);
  ctx.moveTo(cx, cy - 16);
  ctx.lineTo(cx, cy + 16);
  ctx.stroke();
  ctx.fillStyle = rgba(pal.e9, 0.92);
  ctx.beginPath();
  ctx.arc(cx, cy, 5.5, 0, TAU);
  ctx.fill();
  ring(ctx, cx, cy, 12 + Math.sin(t * 2) * 1.5, pal.e9, 0.35);
  label(ctx, pal, cx + 20, cy + 22, 'CORE', 0.5);

  ctx.restore();
}

/* ============================================================
   02 INCIDENT RESPONSE — event recorder (PDCERF)
   检测: alerts burst at the playhead. 抑制: a hatched quarantine
   block freezes the affected span. 取证根除: the head scrubs back,
   evidence gets ringed, a red polyline reconnects the path to its
   ROOT. 恢复: the zone turns CLEAN and a rule lane is written.
   ============================================================ */
function ambientTimeline(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  /* PDCERF: 检测 → 抑制 → 取证根除 → 恢复跟进 */
  const detect = A(acts, 0);
  const contain = A(acts, 1);
  const forensics = A(acts, 2) * (1 - A(acts, 3) * 0.85);
  const recover = A(acts, 3);

  const hostNames = ['SRV-WEB-01', 'DB-CORE-02', 'AD-DC-01', 'WS-FIN-17', 'GW-EDGE-02', 'LOG-SINK'];
  const lanes = 6;
  const top = h * 0.15;
  const bot = h * 0.78;
  /* 取证根除: the playhead scrubs back over the evidence */
  const px = w * 0.62 - forensics * w * 0.16 * (0.5 + 0.5 * Math.sin(t * 0.7));
  /* 抑制: quarantine zone to the right of the playhead */
  const qx1 = px + w * 0.11;

  ctx.save();

  /* top ruler with a time scale */
  ink(ctx, pal, 0.4);
  ctx.beginPath();
  ctx.moveTo(0, top - 18);
  ctx.lineTo(w, top - 18);
  ctx.stroke();
  for (let x = 0; x < w; x += 24) {
    const major = x % 120 === 0;
    ink(ctx, pal, major ? 0.5 : 0.24);
    ctx.beginPath();
    ctx.moveTo(x + 0.5, top - 18);
    ctx.lineTo(x + 0.5, top - 18 - (major ? 8 : 4));
    ctx.stroke();
    if (major && w > 900 && x < w * 0.68)
      label(ctx, pal, x + 4, top - 32, `T+${String((x / 120) * 15).padStart(3, '0')}M`, 0.4);
  }

  /* glyph legend: bar = process, dot = network, diamond = auth */
  if (w > 900) {
    const gx0 = w * 0.72;
    ctx.fillStyle = rgba(pal.paper, 0.5);
    ctx.fillRect(gx0, top - 36, 2, 8);
    label(ctx, pal, gx0 + 7, top - 29, 'PROC', 0.5);
    ctx.beginPath();
    ctx.arc(gx0 + 48, top - 32, 1.8, 0, TAU);
    ctx.fill();
    label(ctx, pal, gx0 + 55, top - 29, 'NET', 0.5);
    ctx.save();
    ctx.translate(gx0 + 96, top - 32);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-1.6, -1.6, 3.2, 3.2);
    ctx.restore();
    label(ctx, pal, gx0 + 104, top - 29, 'AUTH', 0.5);
  }

  const keyEvents: [number, number][] = [];
  for (let l = 0; l < lanes; l++) {
    const y = top + ((bot - top) * (l + 0.5)) / lanes;
    ink(ctx, pal, 0.14);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
    label(ctx, pal, 8, y - 6, hostNames[l], 0.48);

    /* scrolling telemetry — glyph encodes the event type;
       检测: alerts burst near the head;
       抑制: events inside the quarantine zone freeze and dim */
    const speed = 0.024 + l * 0.006;
    const n = 26;
    for (let i = 0; i < n; i++) {
      const u = (i / n + hash(i * 13 + l * 71) * 0.03 + t * speed) % 1;
      const x = u * w;
      const inZone = contain > 0.02 && x > px && x < qx1;
      const frozen = inZone ? Math.min(1, contain) : 0;
      const nearHead = Math.abs(x - px) < w * 0.08;
      const alert = hash(i * 31 + l * 7 + Math.floor(t * speed * (1 - frozen))) > 0.93 - detect * (nearHead ? 0.3 : 0);
      const tall = alert ? 13 : 5 + hash(i + l) * 3;
      const past = x < px;
      const alpha = alert ? 0.85 : inZone ? 0.14 : past ? 0.4 : 0.22;
      const col = alert ? pal.e9 : pal.paper;
      const kind = hash(i * 7 + l * 3);
      if (alert || kind < 0.55) {
        ctx.fillStyle = rgba(col, alpha);
        ctx.fillRect(x, y - tall / 2, alert ? 2 : 1.2, tall);
      } else if (kind < 0.82) {
        ctx.fillStyle = rgba(col, alpha * 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, TAU);
        ctx.fill();
      } else {
        ctx.fillStyle = rgba(col, alpha * 0.9);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-1.6, -1.6, 3.2, 3.2);
        ctx.restore();
      }
      /* 取证: evidence near the head gets ringed */
      if (forensics > 0.05 && past && x > px - 90 && hash(i * 3 + l) > 0.6) {
        ring(ctx, x + 1, y, 6, pal.e9, forensics * 0.6);
      }
    }
    /* key events for the reconstruction polyline */
    keyEvents.push([w * (0.14 + l * 0.075 + hash(l * 5) * 0.03), y]);
  }

  /* 检测确认: labeled alert callouts riding the playhead */
  if (detect > 0.3) {
    const flash = 0.6 + 0.4 * Math.sin(t * 6);
    const calls: [number, string][] = [[1, 'SEV-1 \u00b7 C2 BEACON'], [4, 'SEV-2 \u00b7 BRUTE FORCE']];
    calls.forEach(([lane, txt], k) => {
      const y = top + ((bot - top) * (lane + 0.5)) / lanes;
      const x = px - w * (0.1 + k * 0.06);
      chip(ctx, pal, x - 96, y - 32, txt, detect * flash * 0.9, pal.e9);
      ctx.strokeStyle = rgba(pal.e9, detect * flash * 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y - 16);
      ctx.lineTo(px, y);
      ctx.stroke();
    });
  }

  /* 抑制: hatched quarantine block isolates the affected span */
  if (contain > 0.02) {
    const col = recover > 0.5 ? pal.ph : pal.e9;
    ctx.fillStyle = rgba(col, 0.05 * contain);
    ctx.fillRect(px, top - 18, qx1 - px, bot - top + 18);
    ctx.strokeStyle = rgba(col, 0.7 * contain);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(px + 2, top - 14, qx1 - px - 4, bot - top + 10);
    ctx.setLineDash([]);
    label(ctx, pal, px + 8, top + 4, recover > 0.5 ? 'CLEAN' : 'ISOLATED', 0.85 * contain, col);
    label(ctx, pal, px + 8, top + 18, 'VLAN-9 \u00b7 HOSTS 3/24', 0.6 * contain, col);
  }

  /* 取证根除: reconnect the attack path across lanes, mark the root */
  if (forensics > 0.02) {
    ctx.strokeStyle = rgba(pal.e9, forensics * 0.75);
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 5]);
    ctx.lineDashOffset = -t * 26;
    ctx.beginPath();
    keyEvents.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.setLineDash([]);
    const evid = ['ENTRY', 'MEM', 'DISK', 'LOG', '', 'ROOT'];
    keyEvents.forEach(([x, y], i) => {
      ring(ctx, x, y, 5, pal.e9, forensics * 0.8, 1.4);
      const tag = evid[i] ?? '';
      if (tag === 'ENTRY') label(ctx, pal, x - 12, y - 12, tag, forensics, pal.e9);
      else if (tag === 'ROOT') label(ctx, pal, x - 12, y + 18, tag, forensics, pal.e9);
      else if (tag) label(ctx, pal, x - 10, y - 12, tag, forensics * 0.75, pal.e9);
    });
  }

  /* 恢复跟进: healed rule lane written below the chart */
  if (recover > 0.02) {
    const ry = bot + 26;
    label(ctx, pal, 8, ry + 3, 'RULES', 0.75 * recover, pal.ph);
    const count = Math.floor(Math.min(56, t * 7) * recover);
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = rgba(pal.ph, 0.7 * recover);
      ctx.fillRect(60 + i * 9, ry - 4, 2, 8);
    }
    if (count > 0) label(ctx, pal, 68 + count * 9, ry + 3, `+${count}`, 0.7 * recover, pal.ph);
    if (w > 900) chip(ctx, pal, w * 0.72, ry + 6, 'MTTR 2H 41M', 0.75 * recover, pal.ph);
  }

  /* PDCERF chain — six phases as a state strip below the chart */
  if (w > 900) {
    const later = Math.max(contain, forensics, recover);
    const phases: [string, number][] = [
      ['PREP', 2],
      ['DETECT', later > 0.25 ? 2 : detect > 0.25 ? 1 : 0],
      ['CONTAIN', Math.max(forensics, recover) > 0.25 ? 2 : contain > 0.25 ? 1 : 0],
      ['ERADICATE', recover > 0.25 ? 2 : forensics > 0.25 ? 1 : 0],
      ['RECOVER', recover > 0.85 ? 2 : recover > 0.25 ? 1 : 0],
      ['FOLLOW-UP', recover > 0.6 ? 1 : 0],
    ];
    const py = bot + 54;
    const px0 = w * 0.07;
    const gap = Math.min(150, (w * 0.62) / 5);
    ink(ctx, pal, 0.25);
    ctx.beginPath();
    ctx.moveTo(px0, py - 2);
    ctx.lineTo(px0 + gap * 5, py - 2);
    ctx.stroke();
    phases.forEach(([name, st], i) => {
      const x = px0 + i * gap;
      const col = st === 2 ? pal.ph : st === 1 ? pal.e9 : pal.paper;
      if (st > 0) sq(ctx, x, py - 2, 5, col, (st === 1 ? 0.6 + 0.4 * Math.sin(t * 5) : 1) * 0.9);
      else ring(ctx, x, py - 2, 2.5, pal.paper, 0.35);
      label(ctx, pal, x + 9, py + 1, name, st === 0 ? 0.35 : 0.75, st === 0 ? undefined : col);
    });
  }

  /* playhead */
  ctx.fillStyle = rgba(pal.e9, 0.05 + detect * 0.05);
  ctx.fillRect(px, top - 18, w - px, bot - top + 18);
  ctx.strokeStyle = rgba(recover > 0.5 ? pal.ph : pal.e9, 0.85);
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(px, top - 26);
  ctx.lineTo(px, bot + 8);
  ctx.stroke();
  sq(ctx, px, top - 30, 6, recover > 0.5 ? pal.ph : pal.e9, 0.95);
  label(
    ctx, pal, px + 8, top - 28,
    forensics > 0.4 ? 'REVIEW' : recover > 0.4 ? 'RESTORED' : 'NOW',
    0.9, recover > 0.5 ? pal.ph : pal.e9,
  );

  /* incident bracket annotation */
  const slot = Math.floor(t / 5);
  const bx = hash(slot * 3) * w * 0.5 + w * 0.06;
  const by = top + hash(slot * 9) * (bot - top);
  const age = (t % 5) / 5;
  if (age < 0.7) {
    const a = ((0.7 - age) / 0.7) * (0.5 + detect * 0.5);
    ctx.strokeStyle = rgba(pal.e9, a * 0.8);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(bx - 14, by - 14, 28, 28);
    label(ctx, pal, bx + 20, by - 8, `INC-${String(100 + Math.floor(hash(slot) * 899))}`, a, pal.e9);
    ctx.strokeStyle = rgba(pal.e9, a * 0.4);
    ctx.beginPath();
    ctx.moveTo(bx + 14, by - 14);
    ctx.lineTo(px, top - 18);
    ctx.stroke();
  }

  ctx.restore();
}

/* ============================================================
   03 RED TEAM — PCB breach map
   授权: a dashed scope rectangle closes around the target.
   搜集: scan rings from RED-0 light the blocks as they pass.
   打点: blocks get marked one by one. 横向: red packets ride the
   traces into the CORE. 检测: teal defenders push back.
   ============================================================ */

type IsoBox = { x: number; y: number; w: number; d: number; hgt: number; tag: string };

function drawIsoBox(
  ctx: CanvasRenderingContext2D,
  pal: Palette,
  b: IsoBox,
  s: number,
  glow: number,
  flash: number,
  marked: number,
) {
  const { x, y } = b;
  const hw = (b.w * s) / 2;
  const hd = (b.d * s) / 2;
  const hh = b.hgt * s;
  /* iso projection: x→(1,.5), y→(-1,.5), z→(0,-1) */
  const P = (ix: number, iy: number, iz: number): [number, number] => [
    x + (ix - iy) * hw * 0.9,
    y + (ix + iy) * hd * 0.55 - iz * hh,
  ];
  const pts: [number, number][] = [
    P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0),
    P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1),
  ];
  const faces: [number[], number][] = [
    [[4, 5, 6, 7], 0.5],  /* top */
    [[1, 2, 6, 5], 0.38], /* right */
    [[2, 3, 7, 6], 0.28], /* front */
  ];
  for (const [idx, a] of faces) {
    ctx.beginPath();
    idx.forEach((p, i) => (i ? ctx.lineTo(pts[p][0], pts[p][1]) : ctx.moveTo(pts[p][0], pts[p][1])));
    ctx.closePath();
    if (glow > 0) {
      ctx.fillStyle = rgba(pal.e9, glow * 0.14);
      ctx.fill();
    }
    if (flash > 0) {
      ctx.fillStyle = rgba(pal.paper, flash * 0.12);
      ctx.fill();
    }
    ctx.strokeStyle = rgba(flash > 0.3 ? pal.e9 : pal.paper, Math.min(1, a + flash * 0.5));
    ctx.lineWidth = flash > 0.3 ? 1.5 : 1;
    ctx.stroke();
  }
  /* pin stubs on the front face */
  for (let i = 0; i < 4; i++) {
    const u = (i + 0.5) / 4;
    const bx = lerp(pts[3][0], pts[2][0], u);
    const by = lerp(pts[3][1], pts[2][1], u);
    ink(ctx, pal, 0.4);
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + 6);
    ctx.stroke();
  }
  const tagY = y - hh - hd * 0.55 - 8;
  label(ctx, pal, x - b.tag.length * 2.4, tagY, b.tag, 0.4 + marked * 0.5, marked > 0.5 ? pal.e9 : undefined);
  /* 打点: a red marker square on the roof once the asset is mapped */
  if (marked > 0.05) {
    const ty = tagY - 16;
    ctx.strokeStyle = rgba(pal.e9, marked * 0.9);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x - 5, ty - 5, 10, 10);
    sq(ctx, x, ty, 4, pal.e9, marked);
  }
}

function ambientCorridor(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  const scope = A(acts, 0);
  const recon = A(acts, 1);
  const mapping = A(acts, 2);
  const lateral = A(acts, 3);
  const detect = A(acts, 4);

  const s = Math.min(w, h) * 0.062;
  const boxes: IsoBox[] = [
    { x: w * 0.55, y: h * 0.3, w: 1.6, d: 1.6, hgt: 0.9, tag: 'GATE' },
    { x: w * 0.78, y: h * 0.42, w: 1.2, d: 1.2, hgt: 1.3, tag: 'SRV-02' },
    { x: w * 0.6, y: h * 0.66, w: 2, d: 2, hgt: 0.7, tag: 'CORE' },
    { x: w * 0.88, y: h * 0.72, w: 1, d: 1, hgt: 0.8, tag: 'DB-1' },
    { x: w * 0.42, y: h * 0.52, w: 0.9, d: 0.9, hgt: 0.55, tag: 'EDGE' },
  ];
  const portList = ['443 \u00b7 8443', '445 \u00b7 139', '3389 \u00b7 5985', '1433', '22 \u00b7 80'];

  const routes: [number, number][] = [
    [4, 0], [0, 1], [0, 2], [1, 3], [2, 3], [4, 2],
  ];
  const tracePts = ([a, b]: [number, number]): [number, number][] => {
    const A2 = boxes[a];
    const B = boxes[b];
    const midX = (A2.x + B.x) / 2;
    return [
      [A2.x, A2.y],
      [midX, A2.y],
      [midX, B.y],
      [B.x, B.y],
    ];
  };
  const pointAt = (pts: [number, number][], u: number): [number, number] => {
    const segs = pts.length - 1;
    const f = clamp01(u) * segs;
    const k = Math.min(segs - 1, Math.floor(f));
    const fr = f - k;
    return [lerp(pts[k][0], pts[k + 1][0], fr), lerp(pts[k][1], pts[k + 1][1], fr)];
  };

  ctx.save();

  /* 授权范围: the scope rectangle closes around the target map */
  if (scope > 0.02) {
    const pad = 26;
    const x0 = Math.min(...boxes.map((b) => b.x)) - pad * 2.4;
    const x1 = Math.max(...boxes.map((b) => b.x)) + pad * 2.4;
    const y0 = Math.min(...boxes.map((b) => b.y)) - pad * 3.2;
    const y1 = Math.max(...boxes.map((b) => b.y)) + pad * 1.8;
    const inset = (1 - scope) * 60;
    ctx.strokeStyle = rgba(pal.e9, scope * 0.75);
    ctx.lineWidth = 1.3;
    ctx.setLineDash([7, 5]);
    ctx.lineDashOffset = -t * 12;
    ctx.strokeRect(x0 + inset, y0 + inset, x1 - x0 - inset * 2, y1 - y0 - inset * 2);
    ctx.setLineDash([]);
    label(ctx, pal, x0 + inset + 4, y0 + inset - 8, 'AUTHORIZED SCOPE', scope, pal.e9);
    if (scope > 0.5) chip(ctx, pal, x1 - inset - 106, y0 + inset - 2, 'ROE SIGNED', scope * 0.8, pal.e9);
  }

  routes.forEach((r, i) => {
    const pts = tracePts(r);
    ink(ctx, pal, 0.3);
    ctx.beginPath();
    pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    pts.forEach(([x, y], k) => {
      if (k > 0 && k < pts.length - 1) sq(ctx, x, y, 3, pal.paper, 0.5);
    });

    /* idle reconnaissance traffic — gray */
    for (let p = 0; p < 2; p++) {
      const u = (t * 0.12 + p * 0.5 + i * 0.19) % 1;
      const [x, y] = pointAt(pts, u);
      sq(ctx, x, y, 3, pal.paper, 0.4);
    }

    /* 内网横向: hostile packets pour along EDGE→GATE→CORE */
    if (lateral > 0.02 && (i === 0 || i === 2 || i === 5)) {
      for (let p = 0; p < 4; p++) {
        const u = (t * 0.3 + p * 0.25 + i * 0.11) % 1;
        const [x, y] = pointAt(pts, u);
        sq(ctx, x, y, 4, pal.e9, lateral * 0.95);
        ctx.fillStyle = rgba(pal.e9, lateral * 0.14);
        ctx.fillRect(x - 6, y - 6, 12, 12);
      }
      /* protocol tags ride the busy traces */
      if (lateral > 0.4) {
        const proto = ['SMB', 'KRB', 'WinRM'][i === 0 ? 0 : i === 2 ? 1 : 2];
        const [x, y] = pointAt(pts, 0.5);
        label(ctx, pal, x + 8, y - 8, proto, lateral * 0.65, pal.e9);
      }
    }

    /* 检测响应: teal defenders push back along the same traces */
    if (detect > 0.02 && (i === 0 || i === 2 || i === 4)) {
      for (let p = 0; p < 3; p++) {
        const u = (t * 0.26 + p * 0.33 + i * 0.07) % 1;
        const [x, y] = pointAt(pts, 1 - u);
        sq(ctx, x, y, 4, pal.ph, detect * 0.9);
      }
      /* blocked marker on the CORE route */
      const [bx, by] = pointAt(pts, 0.55);
      ctx.strokeStyle = rgba(pal.ph, detect * 0.8);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(bx - 5, by - 5);
      ctx.lineTo(bx + 5, by + 5);
      ctx.moveTo(bx + 5, by - 5);
      ctx.lineTo(bx - 5, by + 5);
      ctx.stroke();
    }
  });

  /* 信息搜集: scan rings from RED-0 light the blocks as they pass */
  const ox = w * 0.3;
  const oy = h * 0.24;
  let ringR = 0;
  if (recon > 0.02) {
    const maxR = Math.hypot(w * 0.62, h * 0.5);
    ringR = ((t * 170) % (maxR + 80)) * 1;
    ring(ctx, ox, oy, ringR, pal.e9, recon * 0.4 * (1 - ringR / (maxR + 80)), 1.2);
    if (recon > 0.3 && w > 900) {
      const np = Math.floor(20 + hash(Math.floor(t * 1.4) * 3.7) * 14);
      label(ctx, pal, ox + 20, oy - 18, `PROBE ${np}/32 HOSTS`, recon * 0.75, pal.e9);
    }
  }

  const breach = lateral * (0.4 + 0.6 * (Math.sin(t * 1.4) * 0.5 + 0.5));
  boxes.forEach((b, i) => {
    /* blocks flash when the recon ring crosses them */
    const d = Math.hypot(b.x - ox, b.y - oy);
    const flash = recon > 0.02 ? clamp01(1 - Math.abs(d - ringR) / 30) * recon : 0;
    /* 打点: marks land one by one */
    const marked = clamp01((mapping - i * 0.17) * 3.2);
    drawIsoBox(ctx, pal, b, s, b.tag === 'CORE' ? breach : 0, flash, marked);
    /* recon + mapping reveal the service surface of each asset */
    const rev = Math.max(flash, marked);
    if (rev > 0.25) {
      const hd = (b.d * s) / 2;
      label(ctx, pal, b.x - 14, b.y + hd * 1.1 + 20, portList[i], rev * 0.75, marked > 0.5 ? pal.e9 : undefined);
    }
  });

  /* 打点突破: harvested credentials marked above the first foothold */
  if (mapping > 0.55) {
    const b = boxes[1];
    const a = clamp01((mapping - 0.55) * 4);
    const kx = b.x + 30;
    const ky = b.y - b.hgt * s - 26;
    ctx.strokeStyle = rgba(pal.e9, a * 0.9);
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(kx, ky, 3, 0, TAU);
    ctx.moveTo(kx + 3, ky);
    ctx.lineTo(kx + 10, ky);
    ctx.moveTo(kx + 7, ky);
    ctx.lineTo(kx + 7, ky + 3);
    ctx.moveTo(kx + 10, ky);
    ctx.lineTo(kx + 10, ky + 3);
    ctx.stroke();
    label(ctx, pal, kx + 14, ky + 3, 'CREDS', a * 0.9, pal.e9);
  }

  /* 目标达成: data rides back out to RED-0 — until detection cuts it */
  const core = boxes[2];
  const coreTop = core.y - core.hgt * s - 6;
  const exfilA = lateral * (1 - detect * 0.9);
  if (exfilA > 0.03) {
    ctx.strokeStyle = rgba(pal.e9, exfilA * 0.4);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 5]);
    ctx.beginPath();
    ctx.moveTo(core.x, coreTop);
    ctx.lineTo(ox, oy);
    ctx.stroke();
    ctx.setLineDash([]);
    for (let p = 0; p < 3; p++) {
      const u = (t * 0.24 + p * 0.33) % 1;
      const x = lerp(core.x, ox, u);
      const y = lerp(coreTop, oy, u);
      sq(ctx, x, y, 3.4, pal.e9, exfilA * (1 - u * 0.4));
    }
    if (lateral > 0.4) label(ctx, pal, (core.x + ox) / 2 + 10, (coreTop + oy) / 2, 'EXFIL', exfilA, pal.e9);
  }
  /* 检测复盘: the exfil channel gets cut */
  if (detect > 0.3 && lateral > 0.15) {
    const mxp = (core.x + ox) / 2;
    const myp = (coreTop + oy) / 2;
    ctx.strokeStyle = rgba(pal.ph, detect * 0.9);
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(mxp - 6, myp - 6);
    ctx.lineTo(mxp + 6, myp + 6);
    ctx.moveTo(mxp + 6, myp - 6);
    ctx.lineTo(mxp - 6, myp + 6);
    ctx.stroke();
    label(ctx, pal, mxp + 12, myp - 8, 'EXFIL CUT \u00b7 T+4M', detect * 0.9, pal.ph);
  }

  /* attack origin marker */
  ring(ctx, ox, oy, 8, pal.e9, 0.8, 1.4);
  ring(ctx, ox, oy, 16 + Math.sin(t * 2.4) * 3, pal.e9, 0.3);
  sq(ctx, ox, oy, 3.4, pal.e9, 0.95);
  label(ctx, pal, ox + 14, oy + 3, 'RED-0', 0.85, pal.e9);
  ink(ctx, pal, 0.24);
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.moveTo(ox + 8, oy + 8);
  ctx.lineTo(boxes[4].x, boxes[4].y - 10);
  ctx.stroke();
  ctx.setLineDash([]);

  /* kill-chain progress strip */
  if (w > 900) {
    const chain: [string, number][] = [
      ['SCOPE', scope],
      ['RECON', recon],
      ['ACCESS', mapping],
      ['LATERAL', lateral],
      ['REPORT', detect],
    ];
    const cy2 = h - 46;
    const cx0 = w * 0.3;
    const gap = Math.min(120, (w * 0.5) / 4);
    ink(ctx, pal, 0.25);
    ctx.beginPath();
    ctx.moveTo(cx0, cy2);
    ctx.lineTo(cx0 + gap * 4, cy2);
    ctx.stroke();
    chain.forEach(([name, v], i) => {
      const x = cx0 + i * gap;
      const st = v > 0.5 ? 2 : v > 0.08 ? 1 : 0;
      const col = i === 4 ? pal.ph : pal.e9;
      if (st > 0) sq(ctx, x, cy2, 5, col, (st === 1 ? 0.6 + 0.4 * Math.sin(t * 5) : 1) * 0.9);
      else ring(ctx, x, cy2, 2.5, pal.paper, 0.35);
      label(ctx, pal, x + 10, cy2 + 3, name, st ? 0.8 : 0.35, st ? col : undefined);
    });
  }

  ctx.restore();
}

/* ============================================================
   04 THREAT INTEL — orbital signal swarm (CTI lifecycle)
   收集: raw clues pulse and get tagged. 处理: the noise dims and
   the weak signals worth keeping get circled. 分析: markers
   cross-link. 分发: verified intel gets boxed and filed.
   ============================================================ */
function ambientSignals(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  const collect = A(acts, 0);
  const process = A(acts, 1);
  const verify = A(acts, 2);
  const decision = A(acts, 3);

  const cx = w * 0.62;
  const cy = h * 0.52;
  const R = Math.min(w, h);

  ctx.save();

  const wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
  wash.addColorStop(0, rgba(pal.e9, 0.045));
  wash.addColorStop(1, rgba(pal.e9, 0));
  ctx.fillStyle = wash;
  ctx.fillRect(cx - R * 0.6, cy - R * 0.6, R * 1.2, R * 1.2);

  const tilt = -0.32;
  const orbits = [0.16, 0.24, 0.33, 0.43];
  orbits.forEach((or, i) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    ctx.strokeStyle = rgba(pal.paper, 0.2 - i * 0.02);
    ctx.lineWidth = 1;
    ctx.setLineDash(i % 2 ? [2, 6] : []);
    ctx.beginPath();
    ctx.ellipse(0, 0, R * or, R * or * 0.36, 0, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  });

  const project = (a: number, or: number, jitter = 0): [number, number] => {
    const ex = Math.cos(a) * (or + jitter);
    const ey = Math.sin(a) * (or + jitter) * 0.36;
    return [cx + ex * Math.cos(tilt) - ey * Math.sin(tilt), cy + ex * Math.sin(tilt) + ey * Math.cos(tilt)];
  };

  /* contacts on the orbits — red raw clues, teal feed signals */
  const rot = t * 0.055;
  const iocTypes = ['IP', 'DOM', 'HASH', 'URL', 'CERT'];
  let keptShown = 0;
  for (let i = 0; i < 130; i++) {
    const oi = i % orbits.length;
    const or = R * orbits[oi];
    const a = hash(i * 3) * TAU + rot * (oi % 2 ? -1 : 1) * (1 + oi * 0.3);
    const jitter = (hash(i * 7) - 0.5) * 12;
    const [x, y] = project(a, or, jitter);
    const depth = 0.5 + 0.5 * Math.sin(a);
    const teal = hash(i * 13) > 0.88;
    const kept = !teal && hash(i * 29) > 0.86;
    const size = (teal ? 2 : 1.6 + hash(i * 5) * 2) * (0.6 + depth * 0.6);
    /* 处理: noise dims out, kept weak signals stay bright */
    const noiseFade = 1 - process * (teal || kept ? 0 : 0.55);
    sq(ctx, x, y, size, teal ? pal.ph : pal.e9, (teal ? 0.6 : 0.32 + depth * 0.5) * noiseFade);
    /* 处理: the weak signals worth keeping get circled and typed */
    if (process > 0.05 && kept) {
      ring(ctx, x, y, 4.5, pal.paper, process * 0.5);
      if (keptShown < 5 && process > 0.4 && depth > 0.5) {
        label(ctx, pal, x + 8, y + 10, iocTypes[keptShown % 5], process * 0.65, pal.paper);
        keptShown++;
      }
    }
  }

  /* survey markers */
  const markers: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    const a = t * (0.08 + i * 0.013) + (i * TAU) / 4;
    const or = R * orbits[(i + 1) % orbits.length];
    const [x, y] = project(a, or);
    markers.push([x, y]);
    ring(ctx, x, y, 6, pal.paper, 0.6, 1.2);
    sq(ctx, x, y, 3, pal.paper, 0.85);
    label(ctx, pal, x + 10, y - 8, `SIG-${['A', 'B', 'C', 'D'][i]}${i}`, 0.6);
    ink(ctx, pal, 0.16);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(cx, cy);
    ctx.stroke();
  }

  /* 交叉验证: markers cross-link, confidence meters fill */
  if (verify > 0.02) {
    ctx.strokeStyle = rgba(pal.e9, verify * 0.6);
    ctx.lineWidth = 1.1;
    ctx.setLineDash([4, 5]);
    ctx.lineDashOffset = -t * 20;
    const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 3]];
    links.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(markers[a][0], markers[a][1]);
      ctx.lineTo(markers[b][0], markers[b][1]);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    label(ctx, pal, (markers[0][0] + markers[2][0]) / 2, (markers[0][1] + markers[2][1]) / 2 - 10, 'CROSS-CHECK', verify * 0.9, pal.e9);
    markers.forEach(([x, y], i) => {
      const conf = 0.62 + hash(i * 7.3) * 0.34;
      hbar(ctx, pal, x - 15, y - 26, 30, conf * verify, pal.e9, verify * 0.9);
      label(ctx, pal, x + 20, y - 20, `${Math.round(conf * 100)}%`, verify * 0.8, pal.e9);
    });
  }

  /* 防御决策: verified intel gets boxed and filed under a TLP tag */
  if (decision > 0.02) {
    markers.forEach(([x, y], i) => {
      ctx.strokeStyle = rgba(pal.ph, decision * 0.9);
      ctx.lineWidth = 1.3;
      ctx.strokeRect(x - 11, y - 11, 22, 22);
      label(ctx, pal, x + 14, y + 16, `FILED #${4100 + i * 37}`, decision, pal.ph);
    });
    chip(ctx, pal, cx + R * 0.22, Math.max(92, cy - R * 0.42), 'TLP:AMBER', decision * 0.9, pal.ph);
  }

  /* 收集: a raw clue pulses and gets tagged */
  if (collect > 0.02) {
    const slot = Math.floor(t / 2.6);
    const i = Math.floor(hash(slot * 7) * 120);
    const oi = i % orbits.length;
    const a = hash(i * 3) * TAU + rot * (oi % 2 ? -1 : 1) * (1 + oi * 0.3);
    const [x, y] = project(a, R * orbits[oi]);
    const age = (t % 2.6) / 2.6;
    ring(ctx, x, y, 5 + age * 16, pal.e9, collect * (1 - age) * 0.8, 1.4);
    sq(ctx, x, y, 4, pal.e9, collect * 0.95);
    if (age < 0.6) label(ctx, pal, x + 10, y - 9, `CLU-${String(Math.floor(hash(slot) * 90) + 10)}`, collect * (1 - age * 0.8), pal.e9);
  }

  /* legend */
  if (w > 900) {
    const lx0 = cx - R * 0.55;
    const ly0 = cy + R * 0.3;
    sq(ctx, lx0, ly0 - 3, 4, pal.e9, 0.6);
    label(ctx, pal, lx0 + 8, ly0, 'RAW', 0.55);
    sq(ctx, lx0 + 48, ly0 - 3, 4, pal.ph, 0.6);
    label(ctx, pal, lx0 + 56, ly0, 'FEED', 0.55);
    ring(ctx, lx0 + 106, ly0 - 3, 3.4, pal.paper, 0.6);
    label(ctx, pal, lx0 + 114, ly0, 'KEPT', 0.55);
  }

  /* pipeline funnel — what survives each stage of the lifecycle */
  if (w > 900) {
    const fy = h - 58;
    const fx0 = w * 0.3;
    const collected = Math.min(128, Math.floor(36 + t * 5 * (0.4 + collect)));
    const keptN = Math.floor(17 * process);
    const verN = Math.floor(4 * verify);
    const filedN = Math.floor(4 * decision);
    const rowsF: [string, number, number, string][] = [
      ['COLLECTED', collected, collected / 128, pal.e9],
      ['KEPT', keptN, keptN / 128, pal.paper],
      ['VERIFIED', verN, verN / 128, pal.e9],
      ['FILED', filedN, filedN / 128, pal.ph],
    ];
    rowsF.forEach(([name, n, frac, col], i) => {
      const x = fx0 + i * 128;
      label(ctx, pal, x, fy - 18, name, 0.55);
      hbar(ctx, pal, x, fy - 10, 84, Math.max(frac, n > 0 ? 0.03 : 0), col, 0.75);
      label(ctx, pal, x + 92, fy - 5, String(n), 0.7, col);
    });
  }

  /* center cross */
  ink(ctx, pal, 0.5);
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy);
  ctx.lineTo(cx + 14, cy);
  ctx.moveTo(cx, cy - 14);
  ctx.lineTo(cx, cy + 14);
  ctx.stroke();
  ring(ctx, cx, cy, 5, pal.paper, 0.6);
  label(ctx, pal, cx + 18, cy + 20, 'COLLECTION', 0.5);

  ctx.restore();
}

/* ============================================================
   05 BCI — neural plotter, the real processing chain
   采集: channels identify in sequence, traces raw and noisy.
   预处理: the noise washes out as filtering engages.
   解码: the evoked feature spikes and gets classified.
   输出: montage leads light up, command ticks emit — inside a
   dashed teal boundary: software simulation only.
   ============================================================ */
function ambientProtocol(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  const acquire = A(acts, 0);
  const output = A(acts, 3);
  /* the chain is cumulative: once filtered the signal stays clean,
     once decoding runs the feature channel keeps running */
  const preproc = Math.max(A(acts, 1), A(acts, 2), output);
  const decode = Math.max(A(acts, 2), output);

  const chNames = ['Fp1', 'F3', 'C3', 'P3', 'O1'];
  const rows = 5;
  const top = h * 0.2;
  const bot = h * 0.82;
  const chartW = w * 0.72;

  ctx.save();

  /* 输出: the working boundary — software simulation only */
  if (output > 0.02) {
    ctx.strokeStyle = rgba(pal.ph, output * 0.8);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([6, 5]);
    ctx.lineDashOffset = -t * 10;
    ctx.strokeRect(-10 + (1 - output) * 30, top - 30, chartW + 20, bot - top + 46);
    ctx.setLineDash([]);
    label(ctx, pal, 8, top - 38, 'BOUNDARY — SOFTWARE SIMULATION ONLY', output, pal.ph);
  }

  /* chart frame + ruler + acquisition parameters */
  ink(ctx, pal, 0.24);
  ctx.strokeRect(0.5, top - 14.5, chartW, bot - top + 28);
  for (let x = 0; x < chartW; x += 20) {
    const major = x % 100 === 0;
    ink(ctx, pal, major ? 0.4 + acquire * 0.2 : 0.18);
    ctx.beginPath();
    ctx.moveTo(x + 0.5, top - 14);
    ctx.lineTo(x + 0.5, top - 14 + (major ? 7 : 3.5));
    ctx.stroke();
    if (major && w > 900) label(ctx, pal, x + 4, bot + 26, `T${x / 100}s`, 0.35);
  }
  if (w > 900) label(ctx, pal, chartW - 172, top - 22, '\u00b150\u00b5V \u00b7 fs 250Hz \u00b7 BP 0.5-45Hz', 0.5);

  /* 预处理: a filter sweep line washes across the chart */
  if (preproc > 0.02 && preproc < 0.98) {
    const fx = ((t * 0.35) % 1.2 - 0.1) * chartW;
    ctx.strokeStyle = rgba(pal.ph, preproc * 0.55);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fx, top - 14);
    ctx.lineTo(fx, bot + 14);
    ctx.stroke();
    label(ctx, pal, fx + 6, bot + 8, 'FILTER', preproc * 0.8, pal.ph);
  }

  /* 解码: classified intent readout with confidence */
  if (decode > 0.3) {
    const slotD = Math.floor(t / 2.8);
    const cls = slotD % 2 ? 'R-HAND' : 'L-HAND';
    const confV = 84 + Math.floor(hash(slotD * 7.1) * 13);
    chip(ctx, pal, chartW * 0.4, top - 34, `CLASS \u2190 ${cls} \u00b7 ${confV}%`, decode * 0.9, pal.e9);
  }

  /* traveling evoked spike — pronounced during 特征与解码 */
  const spikeSpeed = 0.05 + decode * 0.16;
  const spikeX = ((t * spikeSpeed) % 1.3 - 0.15) * chartW;
  const spikeAmp = (26 + decode * 30) * (1 - output * 0.4);
  const noiseLvl = (1 - preproc * 0.85) * (0.55 + acquire * 0.45);

  for (let r = 0; r < rows; r++) {
    const yBase = top + ((bot - top) * (r + 0.5)) / rows;
    const amp = 8 + r * 3 + decode * 8;
    const hot = r === 2;
    /* 采集: channels identify one by one */
    const idPulse = acquire * clamp01(1.6 - Math.abs(((t * 1.4) % (rows + 2)) - 1 - r));
    label(ctx, pal, 8, yBase + 3, chNames[r], 0.45 + idPulse * 0.5, hot || idPulse > 0.4 ? pal.e9 : undefined);

    ctx.strokeStyle = rgba(hot ? pal.e9 : pal.paper, hot ? 0.75 : 0.42 + idPulse * 0.2);
    ctx.lineWidth = hot ? 1.3 : 1;
    ctx.beginPath();
    for (let x = 0; x <= chartW; x += 4) {
      const dist = Math.abs(x - spikeX);
      const spike = Math.exp(-dist * dist / 900) * spikeAmp * (hot ? 1.6 : 1);
      /* raw acquisition carries visible jitter; preprocessing removes it */
      const jitter = (hash(x * 7.3 + r * 31.7 + Math.floor(t * 14) * 97.1) - 0.5) * amp * noiseLvl;
      const y =
        yBase +
        Math.sin(x * 0.02 + t * (1.3 + r * 0.22) + r * 2.1) * amp * 0.5 +
        Math.sin(x * 0.052 + t * 0.8 + r) * amp * 0.28 +
        Math.sin(x * 0.11 + t * 2.6) * amp * 0.1 * noiseLvl +
        jitter -
        spike;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  if (spikeX > 0 && spikeX < chartW) {
    sq(ctx, spikeX, top - 18, 5, pal.e9, 0.9);
    label(ctx, pal, spikeX + 8, top - 17, decode > 0.4 ? 'FEATURE' : 'EVOKED', 0.5 + decode * 0.4, pal.e9);
  }

  /* electrode montage — 输出 lights the leads one by one */
  const mx = w * 0.84;
  const my = h * 0.4;
  const mr = Math.min(w, h) * 0.1;
  ring(ctx, mx, my, mr, pal.paper, 0.35);
  ticks(ctx, pal, mx, my, mr, 5, 0.4, 4);
  ring(ctx, mx, my, mr * 0.55, pal.paper, 0.2);
  const n = 8;
  const litSeq = Math.floor(t * 3) % n;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + t * 0.07;
    const lit = output > 0.05 && i === litSeq ? 1 : 0;
    const on = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 1.3);
    const x = mx + Math.cos(a) * mr;
    const y = my + Math.sin(a) * mr;
    ctx.fillStyle = rgba(lit ? pal.e9 : i === 3 ? pal.e9 : pal.paper, 0.3 + on * 0.4 + lit * 0.4);
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + lit * 1.4, 0, TAU);
    ctx.fill();
    if (lit) ring(ctx, x, y, 7, pal.e9, 0.7);
    const ly = top + ((bot - top) * ((i % rows) + 0.5)) / rows;
    ink(ctx, pal, 0.1 + on * 0.1 + lit * 0.35 * output);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - mr, y, chartW + 30, ly, chartW, ly);
    ctx.stroke();
  }
  label(ctx, pal, mx - 20, my + mr + 18, 'MONTAGE-8', 0.55);

  /* 采集: electrode impedance check before the chain trusts the signal */
  if (acquire > 0.15 && preproc < 0.6) {
    const impOk = Math.min(8, Math.floor(((t * 2) % 9) * Math.max(0.2, acquire)));
    label(ctx, pal, mx - 48, my + mr + 34, `IMPEDANCE ${impOk}/8 OK`, 0.5 + acquire * 0.3, impOk === 8 ? pal.ph : undefined);
  }

  /* band power panel — δ θ α β γ respond to the chain state */
  if (w > 1000) {
    const bx0 = mx - mr - 12;
    const by0 = my + mr + 52;
    label(ctx, pal, bx0 - 10, by0 - 8, 'BAND POWER', 0.55);
    const bands: [string, number][] = [
      ['\u03b4', 0.3],
      ['\u03b8', 0.42],
      ['\u03b1', 0.55],
      ['\u03b2', 0.48],
      ['\u03b3', 0.24],
    ];
    bands.forEach(([name, base], i) => {
      const noiseJ = (hash(i * 7.7 + Math.floor(t * 3)) - 0.5) * 0.3 * (1 - preproc * 0.75);
      let frac = base + Math.sin(t * (0.9 + i * 0.3) + i) * 0.12 + noiseJ;
      const isBeta = i === 3;
      /* motor imagery intent rides the β band */
      if (isBeta) frac += decode * 0.38;
      const col = isBeta && decode > 0.3 ? pal.e9 : pal.paper;
      const y = by0 + i * 15;
      label(ctx, pal, bx0 - 10, y + 5, name, 0.6, isBeta && decode > 0.3 ? pal.e9 : undefined);
      hbar(ctx, pal, bx0 + 8, y, 46, clamp01(frac), col, 0.8);
    });
  }

  /* 输出: command ticks emitted from the montage */
  if (output > 0.05) {
    const cmds = ['FWD', 'LEFT', 'RIGHT', 'STOP', 'GRASP'];
    for (let i = 0; i < 5; i++) {
      const u = ((t * 0.5 + i / 5) % 1);
      const y = my - mr + (i + 0.5) * ((mr * 2) / 5);
      const x = mx + mr + 10 + u * (w - mx - mr - 30);
      ctx.fillStyle = rgba(pal.ph, (1 - u) * 0.8 * output);
      ctx.fillRect(x, y - 4, 2, 8);
      if (u < 0.22) label(ctx, pal, x + 5, y - 8, cmds[i], (0.22 - u) * 4 * output * 0.9, pal.ph);
    }
    label(ctx, pal, mx + mr + 14, my + mr + 34, 'CMD OUT', 0.7 * output, pal.ph);
  }

  ctx.restore();
}

/* ============================================================
   06 CTF — isometric arena
   赛制: the grid builds in from the center. 赛题: challenge
   islands glow with category + points. 平台: flags plant and
   hold, anti-cheat sweeps, the scoreboard runs. 复盘: taken
   cells stay filed in teal with writeups published.
   ============================================================ */
function ambientGround(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, acts: Acts, pal: Palette) {
  const hosting = A(acts, 0);
  const challenges = A(acts, 1);
  const env = A(acts, 2);
  const review = A(acts, 3);

  const cx = w * 0.6;
  const cy = h * 0.56;
  const s = Math.min(w, h) * 0.052;
  const N = 7;

  const iso = (gx: number, gz: number, y = 0): [number, number] => [
    cx + (gx - gz) * s * 0.92,
    cy + (gx + gz) * s * 0.5 - y,
  ];

  ctx.save();

  const cats = ['WEB', 'PWN', 'REV', 'CRYPTO', 'MISC'];
  const ptsV = [100, 200, 300, 400, 500];

  for (let gx = -N; gx <= N; gx++) {
    for (let gz = -N; gz <= N; gz++) {
      const distN = Math.hypot(gx, gz) / (N * 1.4);
      /* 承办: cells stand up from the center outward */
      const built = 0.45 + 0.55 * clamp01((0.25 + hosting * 1.6) - distN * 1.6);
      const wave = Math.sin(t * 0.8 + (gx + gz) * 0.5 + hash(gx * 31 + gz * 17) * 4) * 0.5 + 0.5;
      /* 命题: challenge islands glow in clusters */
      const island = challenges > 0.03 && hash(gx * 7 + gz * 3 + Math.floor(t * 0.2) * 11) > 0.955;
      const hot = hash(gx * 13 + gz * 41 + Math.floor(t * 0.24) * 7) > 0.972;
      /* 复盘: taken cells stay filed */
      const filed = review > 0.05 && hash(gx * 17 + gz * 23) > 0.93;

      const p1 = iso(gx - 0.5, gz - 0.5);
      const p2 = iso(gx + 0.5, gz - 0.5);
      const p3 = iso(gx + 0.5, gz + 0.5);
      const p4 = iso(gx - 0.5, gz + 0.5);
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.lineTo(p4[0], p4[1]);
      ctx.closePath();

      if (island) {
        ctx.fillStyle = rgba(pal.e9, challenges * (0.1 + wave * 0.14));
        ctx.fill();
        ctx.strokeStyle = rgba(pal.e9, challenges * 0.5);
      } else if (hot) {
        ctx.fillStyle = rgba(pal.e9, 0.06 + wave * 0.08);
        ctx.fill();
        ctx.strokeStyle = rgba(pal.e9, 0.3);
      } else {
        if (wave > 0.88) {
          ctx.fillStyle = rgba(pal.ph, 0.05);
          ctx.fill();
        }
        ctx.strokeStyle = rgba(pal.paper, (0.1 + wave * 0.05) * built);
      }
      ctx.lineWidth = 1;
      ctx.stroke();

      /* 赛题: category + point value rides each island */
      if (island && s > 26) {
        const ci = Math.floor(hash(gx * 29 + gz * 53 + Math.floor(t * 0.2) * 3) * 5);
        const [tx, ty] = iso(gx, gz);
        label(ctx, pal, tx - 18, ty + 3, `${cats[ci]}-${ptsV[ci]}`, challenges * (0.35 + wave * 0.5), pal.e9);
      }

      if (filed) {
        const [fx, fy] = iso(gx, gz);
        sq(ctx, fx, fy, 4, pal.ph, review * 0.7);
        if (s > 26 && review > 0.5 && hash(gx * 23 + gz * 5) > 0.6)
          label(ctx, pal, fx - 17, fy - 10, 'WRITEUP', review * 0.6, pal.ph);
      }
    }
  }

  /* flags — 环境保障 plants more of them and they hold; 复盘 lowers them */
  const flags = 3 + Math.round(env * 5);
  const lower = 1 - review * 0.55;
  for (let i = 0; i < flags; i++) {
    const slot = Math.floor(t / 4 + i * 1.61);
    const gx = Math.floor(hash(slot * 5 + i * 3) * 11) - 5;
    const gz = Math.floor(hash(slot * 11 + i * 7) * 11) - 5;
    const age = (t / 4 + i * 1.61) % 1;
    const pop = age < 0.12 ? age / 0.12 : 1;
    const fade = (age > 0.8 ? (1 - age) / 0.2 : 1) * (0.35 + env * 0.65);
    const [x, y] = iso(gx, gz);
    const poleH = 30 * pop * lower;
    const red = i % 3 !== 1;
    ctx.strokeStyle = rgba(pal.paper, 0.6 * fade);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - poleH);
    ctx.stroke();
    ctx.fillStyle = rgba(red ? pal.e9 : pal.ph, 0.85 * fade);
    ctx.beginPath();
    ctx.moveTo(x, y - poleH);
    ctx.lineTo(x + 11 * pop, y - poleH + 4);
    ctx.lineTo(x, y - poleH + 8);
    ctx.closePath();
    ctx.fill();
    ring(ctx, x, y, 5 + (1 - pop) * 8, red ? pal.e9 : pal.ph, 0.3 * fade);
    /* a fresh capture pops the points… */
    if (age < 0.5 && s > 20) {
      const gain = 100 + Math.floor(hash(slot * 7.7) * 4) * 100;
      label(ctx, pal, x + 12, y - poleH - 12 - age * 26, `+${gain}`, ((0.5 - age) / 0.5) * fade * 0.9, red ? pal.e9 : pal.ph);
    }
    /* …and the platform serves a fresh dynamic flag */
    if (age < 0.35 && env > 0.4 && s > 26) {
      const fh = Math.floor(hash(slot * 3.3) * 0xffff).toString(16).padStart(4, '0');
      label(ctx, pal, x + 12, y - poleH - 2, `flag{${fh}\u2026}`, ((0.35 - age) / 0.35) * env * 0.65, pal.paper);
    }
  }

  /* 平台保障: anti-cheat sweep crosses the arena */
  if (env > 0.05) {
    const g = ((t * 0.22) % 1.3 - 0.15) * 2 * N - N;
    const [ax, ay] = iso(g, -N);
    const [bx2, by2] = iso(g, N);
    ctx.strokeStyle = rgba(pal.ph, env * 0.35);
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx2, by2);
    ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, pal, (ax + bx2) / 2 + 8, (ay + by2) / 2, 'AC-SCAN', env * 0.55, pal.ph);
  }

  /* live scoreboard + countdown */
  if (w > 1100) {
    const teams = ['GH0ST', 'NULLPTR', 'PWNIE', '0DAY'];
    const bx0 = Math.min(w - 262, w * 0.8);
    const by0 = h * 0.15;
    const remain = Math.max(0, 7 * 3600 + 41 * 60 + 22 - Math.floor(t * 37));
    const hh = String(Math.floor(remain / 3600)).padStart(2, '0');
    const mm = String(Math.floor((remain % 3600) / 60)).padStart(2, '0');
    const ss = String(remain % 60).padStart(2, '0');
    chip(ctx, pal, bx0, by0, `T-${hh}:${mm}:${ss}`, 0.75, pal.e9);
    label(ctx, pal, bx0, by0 + 28, review > 0.4 ? 'SCOREBOARD / FINAL' : 'SCOREBOARD / LIVE', 0.55, review > 0.4 ? pal.ph : undefined);
    const scores = teams.map((_, i) =>
      Math.floor(hash(i * 7.7) * 500 + 600 + t * (5 + i * 3.2) + review * (200 + hash(i * 3.1) * 150)),
    );
    const maxS = Math.max(...scores);
    teams.forEach((name, i) => {
      const y = by0 + 46 + i * 20;
      const lead = scores[i] === maxS;
      label(ctx, pal, bx0, y + 4, name, lead ? 0.85 : 0.5, lead ? pal.e9 : undefined);
      hbar(ctx, pal, bx0 + 56, y, 48, scores[i] / maxS, lead ? pal.e9 : pal.paper, lead ? 0.85 : 0.5);
      label(ctx, pal, bx0 + 110, y + 4, String(scores[i]), lead ? 0.85 : 0.5, lead ? pal.e9 : undefined);
    });
  }

  label(ctx, pal, cx - 30, cy + N * s + 26, review > 0.4 ? 'ARENA / REVIEW' : 'ARENA / LIVE', 0.55, review > 0.4 ? pal.ph : undefined);
  if (review > 0.3)
    label(ctx, pal, cx - 30, cy + N * s + 44, 'SOLVES 312 \u00b7 TEAMS 86 \u00b7 24 CHALLENGES OPEN-SOURCED', review * 0.65, pal.ph);

  ctx.restore();
}

/* ---------------- engine ---------------- */

export function initShowcase() {
  const root = document.querySelector<HTMLElement>('[data-deck]');
  if (!root) return;
  if (root.dataset.bound === '1') return;
  root.dataset.bound = '1';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const bg = root.querySelector<HTMLCanvasElement>('[data-bg]');
  const scenes = [...root.querySelectorAll<HTMLElement>('.dk-scene')];
  const railBtns = [...root.querySelectorAll<HTMLButtonElement>('[data-goto]')];
  const counterCur = root.querySelector<HTMLElement>('[data-counter-cur]');
  const counterName = root.querySelector<HTMLElement>('[data-counter-name]');
  const progressBar = root.querySelector<HTMLElement>('[data-progress]');
  const jmp = root.querySelector<HTMLElement>('[data-jmp]');
  const jmpText = root.querySelector<HTMLElement>('[data-jmp-text]');
  const playBtn = root.querySelector<HTMLButtonElement>('[data-play]');
  const hint = root.querySelector<HTMLElement>('[data-hint]');

  if (reduced || !stage || !bg) {
    root.classList.add('is-static');
    return;
  }

  root.classList.add('is-live-deck');
  document.body.classList.add('dk-lock');

  const mode = (root.dataset.mode ?? 'loop') as FieldMode;
  const n = scenes.length;

  /* stage activations: which business stage is on screen drives
     what the instrument does */
  const stageIdxs = scenes.map((s, i) => (s.dataset.kind === 'stage' ? i : -1)).filter((i) => i >= 0);
  const firstStage = stageIdxs[0] ?? 1;
  const stageCount = Math.max(1, stageIdxs.length);

  let pal = readPalette(root);
  let target = 0;
  let pos = 0;
  let current = -1;
  let playing = false;
  let settledAt = performance.now();
  let time = 0;
  let last = performance.now();
  let raf = 0;
  let dead = false;

  // pointer parallax
  let mx = 0;
  let my = 0;
  let smx = 0;
  let smy = 0;

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const rec = bg.getBoundingClientRect();
    bg.width = Math.max(1, Math.floor(rec.width * dpr));
    bg.height = Math.max(1, Math.floor(rec.height * dpr));
    const ctx = bg.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const layout = () => {
    for (let i = 0; i < n; i++) {
      const el = scenes[i];
      const d = i - pos;
      if (Math.abs(d) > 2.4) {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        continue;
      }
      let ty: number, tz: number, op: number, rot: number;
      if (d >= 0) {
        // upcoming: stacked below, receding into depth
        ty = d * 46;
        tz = -d * 560;
        rot = d * -4;
        op = clamp01(1 - Math.max(0, d - 0.5) / 1.5);
      } else {
        // past: flying up toward and past the camera
        ty = d * 58;
        tz = -d * 720;
        rot = d * 6;
        op = clamp01(1 + (d + 0.1) / 0.95);
      }
      el.style.visibility = 'visible';
      el.style.opacity = String(op);
      el.style.transform = `translate3d(0, ${ty}vh, ${tz}px) rotateX(${rot}deg)`;
      el.style.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none';
      el.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      el.setAttribute('aria-hidden', Math.abs(d) < 0.5 ? 'false' : 'true');
    }
    if (progressBar) progressBar.style.transform = `scaleX(${n > 1 ? pos / (n - 1) : 0})`;
    if (smx || smy) {
      stage.style.transform = `rotateY(${smx * 1.6}deg) rotateX(${-smy * 1.2}deg)`;
    }
  };

  const activate = (i: number, jump: boolean) => {
    current = i;
    scenes.forEach((el, k) => el.classList.toggle('is-live', k === i));
    railBtns.forEach((b, k) => {
      b.classList.toggle('is-on', k === i);
      if (k === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    if (counterCur) counterCur.textContent = String(i + 1).padStart(2, '0');
    if (counterName) counterName.textContent = scenes[i].dataset.name ?? '';
    root.dataset.scene = scenes[i].dataset.kind ?? '';
    root.style.setProperty('--scene-i', String(i));
    if (hint) hint.classList.toggle('is-off', i !== 0);
    if (jump && jmp && jmpText) {
      jmpText.textContent = `JMP 0xE9 → SCN ${String(i + 1).padStart(2, '0')} :: ${(scenes[i].dataset.name ?? '').toUpperCase()}`;
      jmp.classList.remove('is-fire');
      void jmp.offsetWidth;
      jmp.classList.add('is-fire');
      root.classList.remove('is-jumping');
      void root.offsetWidth;
      root.classList.add('is-jumping');
    }
  };

  const goto = (i: number) => {
    const next = Math.max(0, Math.min(n - 1, i));
    if (next === target) return;
    target = next;
    settledAt = performance.now();
  };

  const step = (d: number) => goto(target + d);

  // wheel: accumulate, one scene per gesture
  let wheelAcc = 0;
  let wheelLock = 0;
  const onWheel = (ev: WheelEvent) => {
    if (document.body.classList.contains('nav-open')) return;
    if (!(ev.target as HTMLElement | null)?.closest?.('[data-deck]')) return;
    ev.preventDefault();
    const now = performance.now();
    if (now - wheelLock > 420) wheelAcc = 0;
    wheelAcc += ev.deltaY;
    if (Math.abs(wheelAcc) > 46) {
      step(wheelAcc > 0 ? 1 : -1);
      wheelAcc = 0;
      wheelLock = now;
      playing = false;
      syncPlay();
    }
  };

  let touchY: number | null = null;
  const onTouchStart = (ev: TouchEvent) => {
    touchY = ev.touches[0]?.clientY ?? null;
  };
  const onTouchMove = (ev: TouchEvent) => {
    if (touchY == null) return;
    if (document.body.classList.contains('nav-open')) return;
    if (!(ev.target as HTMLElement | null)?.closest?.('[data-deck]')) return;
    ev.preventDefault();
    const y = ev.touches[0]?.clientY ?? touchY;
    const dy = touchY - y;
    if (Math.abs(dy) > 52) {
      step(dy > 0 ? 1 : -1);
      touchY = y;
      playing = false;
      syncPlay();
    }
  };

  const onKey = (ev: KeyboardEvent) => {
    const tag = (ev.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (document.body.classList.contains('nav-open')) return;
    switch (ev.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        ev.preventDefault();
        playing = false;
        syncPlay();
        step(1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        ev.preventDefault();
        playing = false;
        syncPlay();
        step(-1);
        break;
      case 'Home':
        ev.preventDefault();
        goto(0);
        break;
      case 'End':
        ev.preventDefault();
        goto(n - 1);
        break;
    }
  };

  const onPointer = (ev: PointerEvent) => {
    mx = (ev.clientX / window.innerWidth) * 2 - 1;
    my = (ev.clientY / window.innerHeight) * 2 - 1;
  };

  const syncPlay = () => {
    if (playBtn) {
      playBtn.classList.toggle('is-on', playing);
      playBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      const label = playing ? playBtn.dataset.pauseLabel : playBtn.dataset.playLabel;
      const span = playBtn.querySelector('span');
      if (label && span) span.textContent = label;
    }
  };

  const onPlay = () => {
    if (!playing && target >= n - 1 && Math.abs(pos - (n - 1)) < 0.1) {
      goto(0);
    }
    playing = !playing;
    settledAt = performance.now();
    syncPlay();
  };

  const onRail = (ev: Event) => {
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('[data-goto]');
    if (!btn) return;
    playing = false;
    syncPlay();
    goto(Number(btn.dataset.goto));
  };

  const themeObs = new MutationObserver(() => {
    pal = readPalette(root);
  });
  themeObs.observe(root, { attributes: true, attributeFilter: ['class'] });

  const ro = new ResizeObserver(resize);
  ro.observe(bg);

  const frame = (now: number) => {
    if (dead) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;

    // critically-damped-ish smoothing
    const k = 1 - Math.exp(-dt * 5.4);
    pos += (target - pos) * k;
    if (Math.abs(target - pos) < 0.0012) pos = target;

    smx += (mx - smx) * (1 - Math.exp(-dt * 4));
    smy += (my - smy) * (1 - Math.exp(-dt * 4));

    const rounded = Math.round(pos);
    if (rounded !== current) activate(rounded, current !== -1);

    // autoplay
    if (playing && Math.abs(target - pos) < 0.02) {
      if (now - settledAt > 4300) {
        if (target >= n - 1) {
          playing = false;
          syncPlay();
        } else {
          step(1);
        }
      }
    } else if (!playing) {
      settledAt = now;
    }

    /* stage-space position: 0.5 at the first stage scene, 1.5 at
       the second… activations ramp smoothly during transitions */
    const sp = pos - (firstStage - 0.5);
    const acts: Acts = stageIdxs.map((_, k) => clamp01(1 - Math.abs(sp - (k + 0.5)) * 1.5));

    const ctx = bg.getContext('2d');
    if (ctx) {
      const rec = bg.getBoundingClientRect();
      const w = rec.width;
      const h = rec.height;
      ctx.clearRect(0, 0, w, h);
      switch (mode) {
        case 'loop':
          ambientLoop(ctx, w, h, time, acts, pal);
          break;
        case 'timeline':
          ambientTimeline(ctx, w, h, time, acts, pal);
          break;
        case 'corridor':
          ambientCorridor(ctx, w, h, time, acts, pal);
          break;
        case 'signals':
          ambientSignals(ctx, w, h, time, acts, pal);
          break;
        case 'protocol':
          ambientProtocol(ctx, w, h, time, acts, pal);
          break;
        case 'ground':
          ambientGround(ctx, w, h, time, acts, pal);
          break;
      }
    }

    layout();
    raf = requestAnimationFrame(frame);
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('pointermove', onPointer, { passive: true });
  playBtn?.addEventListener('click', onPlay);
  root.querySelector('[data-rail]')?.addEventListener('click', onRail);

  resize();
  syncPlay();
  activate(0, false);
  raf = requestAnimationFrame(frame);

  const teardown = () => {
    dead = true;
    cancelAnimationFrame(raf);
    themeObs.disconnect();
    ro.disconnect();
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('pointermove', onPointer);
    root.classList.remove('is-live-deck');
    document.body.classList.remove('dk-lock');
    root.dataset.bound = '0';
  };

  document.addEventListener(
    'astro:before-swap',
    () => {
      teardown();
    },
    { once: true },
  );
}
