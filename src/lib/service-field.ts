export type FieldMode = 'loop' | 'timeline' | 'corridor' | 'signals' | 'protocol' | 'ground';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  kind: number;
  along?: number;
  ring?: number;
};

type Palette = {
  e9: string;
  phosphor: string;
  paper: string;
  fog: string;
  ink: string;
};

type Star = { x: number; y: number; w: number };

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  return {
    e9: s.getPropertyValue('--e9').trim() || '#e92e0c',
    phosphor: s.getPropertyValue('--phosphor').trim() || '#c6e94a',
    paper: s.getPropertyValue('--paper').trim() || '#e8e1d4',
    fog: s.getPropertyValue('--fog').trim() || '#8c877b',
    ink: s.getPropertyValue('--ink').trim() || '#12110f',
  };
}

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function pinProgress(pin: HTMLElement) {
  const rect = pin.getBoundingClientRect();
  const total = Math.max(1, pin.offsetHeight - window.innerHeight);
  return clamp(-rect.top / total, 0, 1);
}

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Field = {
  mode: FieldMode;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pin: HTMLElement;
  beats: HTMLElement[];
  particles: Particle[];
  stars: Star[];
  labels: string[];
  w: number;
  h: number;
  dpr: number;
  time: number;
  progress: number;
  palette: Palette;
  running: boolean;
  raf: number;
};

function resize(field: Field) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = field.canvas.getBoundingClientRect();
  field.w = Math.max(1, rect.width);
  field.h = Math.max(1, rect.height);
  field.dpr = dpr;
  field.canvas.width = Math.round(field.w * dpr);
  field.canvas.height = Math.round(field.h * dpr);
  field.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function spawn(field: Field) {
  const rand = seedRand(field.mode.split('').reduce((a, c) => a + c.charCodeAt(0), 41));
  const count = field.w < 700 ? 90 : 180;
  field.particles = [];
  for (let i = 0; i < count; i++) {
    field.particles.push({
      x: rand() * field.w,
      y: rand() * field.h,
      vx: (rand() - 0.5) * 0.35,
      vy: (rand() - 0.5) * 0.35,
      life: rand(),
      size: 0.6 + rand() * 1.6,
      kind: i % 5,
      along: rand(),
      ring: 0.45 + rand() * 0.5,
    });
  }
  field.stars = [];
  if (field.mode === 'signals') {
    for (let i = 0; i < 28; i++) {
      field.stars.push({
        x: 0.12 + rand() * 0.76,
        y: 0.14 + rand() * 0.7,
        w: 0.6 + rand() * 1.8,
      });
    }
  }
}

function grid(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, alpha: number, step: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y <= h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawLoop(field: Field) {
  const { ctx, w, h, progress: p, time: t, palette, labels } = field;
  const cx = w * 0.58;
  const cy = h * 0.48;
  const r = Math.min(w, h) * 0.28;
  grid(ctx, w, h, palette.paper, 0.05, 56);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = palette.paper;
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, r * (0.45 + i * 0.28) * (0.65 + p * 0.35), 0, Math.PI * 2);
    ctx.stroke();
  }

  const rad = r * (0.72 + p * 0.08);
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.e9;
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.arc(0, 0, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.04, p));
  ctx.stroke();

  const sweep = t * 0.7;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
  grad.addColorStop(0, 'transparent');
  ctx.save();
  ctx.rotate(sweep);
  ctx.globalAlpha = 0.22 * p;
  ctx.fillStyle = palette.e9;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, rad, 0, Math.PI * 0.28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const nodes = [
    { a: -Math.PI / 2, label: labels[0] },
    { a: 0, label: labels[1] },
    { a: Math.PI / 2, label: labels[2] },
    { a: Math.PI, label: labels[3] },
  ];
  nodes.forEach((node, i) => {
    const on = p > 0.12 + i * 0.16;
    const x = Math.cos(node.a) * rad;
    const y = Math.sin(node.a) * rad;
    ctx.globalAlpha = on ? 1 : 0.25;
    ctx.fillStyle = on ? palette.phosphor : palette.fog;
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '500 10px "IBM Plex Mono", monospace';
    ctx.fillStyle = palette.fog;
    ctx.globalAlpha = on ? 0.9 : 0.35;
    ctx.textAlign = 'center';
    ctx.fillText(node.label, x, y + (y > 0 ? 22 : -14));
  });
  ctx.restore();
}

function drawTimeline(field: Field) {
  const { ctx, w, h, progress: p, palette } = field;
  grid(ctx, w, h, palette.paper, 0.04, 64);
  const y = h * 0.58;
  const x0 = w * 0.1;
  const x1 = w * 0.9;
  ctx.strokeStyle = palette.paper;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.stroke();

  const ticks = 7;
  for (let i = 0; i < ticks; i++) {
    const x = x0 + ((x1 - x0) * i) / (ticks - 1);
    const on = p > i / (ticks + 1);
    ctx.globalAlpha = on ? 0.9 : 0.2;
    ctx.strokeStyle = on ? palette.e9 : palette.fog;
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
  }

  const pts = [
    [0.08, 0.22],
    [0.22, -0.18],
    [0.38, 0.12],
    [0.52, -0.28],
    [0.68, 0.08],
    [0.84, -0.14],
  ];
  ctx.beginPath();
  pts.forEach((pt, i) => {
    const x = x0 + (x1 - x0) * pt[0];
    const yy = y + pt[1] * h * 0.35;
    if (i === 0) ctx.moveTo(x, yy);
    else ctx.lineTo(x, yy);
  });
  ctx.strokeStyle = palette.e9;
  ctx.lineWidth = 1.6;
  ctx.globalAlpha = 1;
  ctx.setLineDash([800, 800]);
  ctx.lineDashOffset = 800 - p * 800;
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawCorridor(field: Field) {
  const { ctx, w, h, progress: p, palette } = field;
  const vpX = w * 0.55;
  const vpY = h * 0.22;
  const baseY = h * 0.9;
  const half = w * (0.38 + p * 0.08);

  grid(ctx, w, h, palette.paper, 0.035, 70);
  ctx.strokeStyle = palette.paper;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 1;
  const ribs = 10;
  for (let i = 0; i <= ribs; i++) {
    const t = i / ribs;
    const y = vpY + (baseY - vpY) * Math.pow(t, 1.15);
    const spread = half * ((y - vpY) / (baseY - vpY));
    ctx.beginPath();
    ctx.moveTo(vpX - spread, y);
    ctx.lineTo(vpX + spread, y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = palette.e9;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(vpX - 28, vpY);
  ctx.lineTo(vpX - half, baseY);
  ctx.moveTo(vpX + 28, vpY);
  ctx.lineTo(vpX + half, baseY);
  ctx.stroke();

  ctx.strokeStyle = palette.phosphor;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(vpX, vpY + 8);
  const pathY = vpY + (baseY - vpY - 20) * Math.max(0.08, p);
  ctx.lineTo(vpX, pathY);
  ctx.stroke();

  ctx.font = '500 10px "IBM Plex Mono", monospace';
  ctx.fillStyle = palette.fog;
  ctx.globalAlpha = 0.8;
  ctx.textAlign = 'center';
  ctx.fillText('SCOPE', vpX, vpY - 14);
}

function drawSignals(field: Field) {
  const { ctx, w, h, progress: p, time: t, palette, stars } = field;
  grid(ctx, w, h, palette.paper, 0.03, 80);
  const pts = stars.map((s) => ({ x: s.x * w, y: s.y * h, w: s.w }));
  const links = Math.floor(pts.length * p * 0.9);
  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.e9;
  for (let i = 0; i < links; i++) {
    const a = pts[i];
    const b = pts[(i * 7 + 3) % pts.length];
    ctx.globalAlpha = 0.18 + 0.35 * p;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  pts.forEach((pt, i) => {
    const pulse = 0.45 + Math.sin(t * 2 + i) * 0.35;
    const on = p > i / (pts.length + 2);
    ctx.globalAlpha = on ? 0.4 + pulse * 0.6 : 0.12;
    ctx.fillStyle = on && i % 5 === 0 ? palette.e9 : palette.phosphor;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.w + (on ? pulse : 0), 0, Math.PI * 2);
    ctx.fill();
  });
}

function waveY(x: number, t: number, amp: number, mid: number, freq: number) {
  return mid + Math.sin(x * freq + t) * amp + Math.sin(x * freq * 0.45 + t * 0.7) * amp * 0.35;
}

function drawProtocol(field: Field) {
  const { ctx, w, h, progress: p, time: t, palette } = field;
  grid(ctx, w, h, palette.paper, 0.04, 60);
  const layers = [
    { mid: h * 0.32, amp: 22, color: palette.e9, delay: 0 },
    { mid: h * 0.5, amp: 16, color: palette.phosphor, delay: 0.18 },
    { mid: h * 0.68, amp: 12, color: palette.paper, delay: 0.36 },
  ];
  layers.forEach((layer, i) => {
    const vis = clamp((p - layer.delay) / 0.4, 0, 1);
    if (vis <= 0) return;
    ctx.beginPath();
    const x0 = w * 0.08;
    const x1 = w * 0.92;
    for (let x = x0; x <= x1; x += 4) {
      const yy = waveY(x * 0.018, t * (0.8 + i * 0.15), layer.amp, layer.mid, 1);
      if (x === x0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.strokeStyle = layer.color;
    ctx.globalAlpha = 0.35 + vis * 0.65;
    ctx.lineWidth = 1.3;
    ctx.stroke();
  });
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = palette.fog;
  ctx.font = '500 10px "IBM Plex Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SOFTWARE LAYER ONLY', w * 0.08, h * 0.16);
}

function drawGround(field: Field) {
  const { ctx, w, h, progress: p, palette } = field;
  const cols = 4;
  const rows = 3;
  const padX = w * 0.12;
  const padY = h * 0.2;
  const gap = 16;
  const cw = (w - padX * 2 - gap * (cols - 1)) / cols;
  const ch = (h - padY * 2 - gap * (rows - 1)) / rows;
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * (cw + gap);
      const y = padY + r * (ch + gap);
      const on = p > n / (cols * rows + 1);
      ctx.strokeStyle = on ? palette.e9 : palette.paper;
      ctx.globalAlpha = on ? 0.85 : 0.18;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cw, ch);
      ctx.font = '600 18px "IBM Plex Sans", sans-serif';
      ctx.fillStyle = on ? palette.e9 : palette.fog;
      ctx.globalAlpha = on ? 0.95 : 0.25;
      ctx.textAlign = 'left';
      ctx.fillText(String(n + 1).padStart(2, '0'), x + 14, y + 30);
      n += 1;
    }
  }
}

function drawMode(field: Field) {
  switch (field.mode) {
    case 'loop':
      drawLoop(field);
      break;
    case 'timeline':
      drawTimeline(field);
      break;
    case 'corridor':
      drawCorridor(field);
      break;
    case 'signals':
      drawSignals(field);
      break;
    case 'protocol':
      drawProtocol(field);
      break;
    case 'ground':
      drawGround(field);
      break;
  }
}

function stepParticles(field: Field) {
  const { ctx, w, h, progress: p, time: t, palette, mode, particles } = field;
  const cx = w * 0.58;
  const cy = h * 0.48;
  const rad = Math.min(w, h) * 0.28 * (0.72 + p * 0.08);

  for (const q of particles) {
    if (mode === 'loop') {
      q.along = (q.along ?? 0) + 0.002 + p * 0.003;
      const a = q.along * Math.PI * 2;
      const rr = rad * (q.ring ?? 1);
      q.x = cx + Math.cos(a) * rr;
      q.y = cy + Math.sin(a) * rr;
    } else if (mode === 'timeline') {
      q.y += 0.45 + q.size * 0.2;
      if (q.y > h * 0.58 - 2 && p > 0.12) {
        q.y = h * 0.58 - 2;
        q.x += q.vx * 0.2;
      } else if (q.y > h) {
        q.y = -4;
        q.x = Math.random() * w;
      } else {
        q.x += q.vx;
      }
    } else if (mode === 'corridor') {
      const vpX = w * 0.55;
      const vpY = h * 0.22;
      q.y += 0.7 + p;
      const span = ((q.y - vpY) / Math.max(1, h * 0.9 - vpY)) * w * 0.32;
      if (q.x < vpX - span || q.x > vpX + span || q.y > h * 0.9) {
        q.y = vpY + 10 + Math.random() * 40;
        q.x = vpX + (Math.random() - 0.5) * 20;
      } else {
        q.x += (vpX - q.x) * 0.002;
      }
    } else if (mode === 'protocol') {
      q.x += 0.9 + q.size * 0.4;
      const layer = q.kind % 3;
      const mid = h * (0.32 + layer * 0.18);
      q.y = waveY(q.x * 0.018, t * (0.8 + layer * 0.15), 22 - layer * 5, mid, 1);
      if (q.x > w * 0.92) q.x = w * 0.08;
    } else if (mode === 'ground') {
      q.x += q.vx;
      q.y += q.vy;
      if (q.x < 0 || q.x > w) q.vx *= -1;
      if (q.y < 0 || q.y > h) q.vy *= -1;
    } else {
      q.x += q.vx * 0.6;
      q.y += q.vy * 0.6;
      if (q.x < 0 || q.x > w) q.vx *= -1;
      if (q.y < 0 || q.y > h) q.vy *= -1;
    }

    const alpha = 0.15 + p * 0.55;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = q.kind === 0 ? palette.e9 : palette.paper;
    ctx.beginPath();
    ctx.arc(q.x, q.y, q.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function setBeats(field: Field) {
  const p = field.progress;
  field.beats.forEach((node, i) => {
    const start = i / field.beats.length;
    const end = (i + 1) / field.beats.length;
    const mid = (start + end) / 2;
    const on = p >= start - 0.02 && p < end + 0.04 || (i === field.beats.length - 1 && p >= start);
    node.classList.toggle('is-on', on || (p < 0.08 && i === 0));
    const dist = Math.abs(p - mid);
    node.style.opacity = on ? String(clamp(1 - dist * 1.3, 0.15, 1)) : '0';
  });
  if (p < 0.06 && field.beats[0]) {
    field.beats[0].classList.add('is-on');
    field.beats[0].style.opacity = '1';
  }
}

function frame(field: Field, now: number) {
  if (!field.running) return;
  field.time = now / 1000;
  field.progress = pinProgress(field.pin);
  field.pin.style.setProperty('--progress', String(field.progress));
  setBeats(field);
  const { ctx, w, h } = field;
  ctx.clearRect(0, 0, w, h);
  stepParticles(field);
  drawMode(field);
  field.raf = requestAnimationFrame((t) => frame(field, t));
}

let active: { stop: () => void } | null = null;

export function bindServiceField() {
  active?.stop();
  active = null;
  const root = document.querySelector<HTMLElement>('[data-service-field]');
  if (!root) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-static');
    return;
  }

  const canvas = root.querySelector('canvas');
  const pin = root.querySelector<HTMLElement>('[data-pin]');
  if (!canvas || !pin) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const field: Field = {
    mode: (root.dataset.mode as FieldMode) || 'loop',
    canvas,
    ctx,
    pin,
    beats: [...root.querySelectorAll<HTMLElement>('[data-beat]')],
    particles: [],
    stars: [],
    labels: (root.dataset.labels || '').split(',').map((s) => s.trim()).filter(Boolean),
    w: 0,
    h: 0,
    dpr: 1,
    time: 0,
    progress: 0,
    palette: readPalette(),
    running: true,
    raf: 0,
  };

  const onResize = () => {
    resize(field);
    spawn(field);
  };
  onResize();

  const theme = new MutationObserver(() => {
    field.palette = readPalette();
  });
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

  const onScroll = () => {
    field.progress = pinProgress(field.pin);
  };
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  field.raf = requestAnimationFrame((t) => frame(field, t));

  const stop = () => {
    field.running = false;
    cancelAnimationFrame(field.raf);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    theme.disconnect();
  };
  document.addEventListener('astro:before-swap', stop, { once: true });
  active = { stop };
}
