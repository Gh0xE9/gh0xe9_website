import type { FieldMode } from './service-scenes';
import type * as ThreeNS from 'three';

type Palette = {
  ink: string;
  paper: string;
  fog: string;
  e9: string;
  ph: string;
};

type Handle = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  setProgress: (p: number, t: number) => void;
  setColors: (pal: Palette) => void;
  dispose: () => void;
};

function hex(color: string): number {
  const s = color.trim();
  if (s[0] === '#' && s.length >= 7) return parseInt(s.slice(1, 7), 16);
  if (s[0] === '#' && s.length === 4) {
    return parseInt(s[1] + s[1] + s[2] + s[2] + s[3] + s[3], 16);
  }
  const m = s.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/);
  if (m) {
    const r = +m[1],
      g = +m[2],
      b = +m[3];
    return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
  }
  return 0xefe6d6;
}

function makeBrainGeometry(THREE: typeof ThreeNS) {
  const geo = new THREE.SphereGeometry(1.2, 72, 54);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const { x, y, z } = v;
    const fissure = 1 - 0.2 * Math.exp(-((x / 0.14) ** 2));
    const gyri =
      1 +
      0.07 * Math.sin(6 * Math.atan2(z, x) + y * 3.2) * Math.sin(5 * y + 2 * z) +
      0.045 * Math.sin(10 * y) * Math.cos(8 * z);
    const flatten = y < -0.75 ? 1 - 0.18 * ((-0.75 - y) / 0.5) : 1;
    v.multiplyScalar(fissure * gyri * flatten);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export async function createServiceField3D(
  canvas: HTMLCanvasElement,
  opts: {
    mode: FieldMode;
    labels: string[];
    getColors: () => Palette;
  },
): Promise<Handle> {
  const THREE = await import('three');
  const pal0 = opts.getColors();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.set(0, 0.4, 7.2);

  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(hex(pal0.paper), 1.1);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(hex(pal0.e9), 0.55);
  rim.position.set(-5, 2, -3);
  scene.add(rim);
  const fill = new THREE.PointLight(hex(pal0.ph), 0.7, 20);
  fill.position.set(0, -1, 4);
  scene.add(fill);

  const root = new THREE.Group();
  scene.add(root);

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(obj: T): T => {
    disposables.push(obj);
    return obj;
  };

  const matLine = (color: string, opacity = 0.9) =>
    track(
      new THREE.LineBasicMaterial({
        color: hex(color),
        transparent: true,
        opacity,
      }),
    );

  const matStd = (color: string, emissive: string, em = 0.25, opacity = 1) =>
    track(
      new THREE.MeshStandardMaterial({
        color: hex(color),
        emissive: hex(emissive),
        emissiveIntensity: em,
        roughness: 0.42,
        metalness: 0.18,
        transparent: opacity < 1,
        opacity,
      }),
    );

  function gridHelper(color: string) {
    const g = new THREE.GridHelper(12, 16, hex(color), hex(color));
    const mat = g.material as ThreeNS.Material | ThreeNS.Material[];
    const apply = (m: ThreeNS.Material) => {
      m.transparent = true;
      (m as ThreeNS.LineBasicMaterial).opacity = 0.22;
    };
    if (Array.isArray(mat)) mat.forEach(apply);
    else apply(mat);
    g.position.y = -1.8;
    return g;
  }

  let grid = gridHelper(pal0.paper);
  root.add(grid);

  const mode = opts.mode;
  const pulseObjects: Array<(p: number, t: number, pal: Palette) => void> = [];

  if (mode === 'loop') {
    const torus = new THREE.Mesh(
      track(new THREE.TorusGeometry(1.8, 0.045, 16, 96)),
      matStd(pal0.paper, pal0.ph, 0.35),
    );
    torus.rotation.x = Math.PI / 2.15;
    root.add(torus);
    const inner = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.85, 0.02, 12, 64)),
      matStd(pal0.paper, pal0.e9, 0.4, 0.85),
    );
    inner.rotation.x = Math.PI / 2.15;
    root.add(inner);
    const nodes = ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'].map((_, i) => {
      const mesh = new THREE.Mesh(track(new THREE.OctahedronGeometry(0.22)), matStd(pal0.ink, pal0.e9, 0.5));
      const a = -Math.PI / 2 + i * (Math.PI / 2);
      mesh.position.set(Math.cos(a) * 1.8, 0.05, Math.sin(a) * 1.8);
      root.add(mesh);
      return mesh;
    });
    const sweep = new THREE.Mesh(
      track(new THREE.ConeGeometry(0.08, 1.9, 8, 1, true)),
      matStd(pal0.e9, pal0.e9, 0.8, 0.45),
    );
    sweep.geometry.translate(0, 0.95, 0);
    root.add(sweep);
    const dots = new THREE.Points(
      (() => {
        const geo = track(new THREE.BufferGeometry());
        const arr = new Float32Array(80 * 3);
        for (let i = 0; i < 80; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = 2.2 + Math.random() * 2.4;
          arr[i * 3] = Math.cos(a) * r;
          arr[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
          arr[i * 3 + 2] = Math.sin(a) * r;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return geo;
      })(),
      track(new THREE.PointsMaterial({ color: hex(pal0.ph), size: 0.05, transparent: true, opacity: 0.85 })),
    );
    root.add(dots);
    pulseObjects.push((p, t) => {
      sweep.rotation.y = t * 0.7 + p * Math.PI * 2;
      nodes.forEach((n, i) => {
        const on = Math.floor((t * 0.4 + p) % 4) === i;
        n.scale.setScalar(on ? 1.25 : 1);
      });
      dots.rotation.y = t * 0.08;
    });
  } else if (mode === 'timeline') {
    const axis = new THREE.Mesh(
      track(new THREE.BoxGeometry(6.4, 0.03, 0.03)),
      matStd(pal0.paper, pal0.paper, 0.2),
    );
    root.add(axis);
    const boxes: ThreeNS.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const box = new THREE.Mesh(
        track(new THREE.BoxGeometry(0.7, 0.4, 0.12)),
        matStd(pal0.ink, i === 1 ? pal0.e9 : pal0.ph, 0.45),
      );
      box.position.set(-2.4 + i * 1.0, i % 2 === 0 ? 0.9 : -0.9, 0);
      root.add(box);
      const stem = new THREE.Mesh(track(new THREE.BoxGeometry(0.02, 0.7, 0.02)), matStd(pal0.paper, pal0.ph, 0.2));
      stem.position.set(box.position.x, box.position.y > 0 ? 0.35 : -0.35, 0);
      root.add(stem);
      boxes.push(box);
    }
    const head = new THREE.Mesh(track(new THREE.BoxGeometry(0.05, 2.2, 0.05)), matStd(pal0.e9, pal0.e9, 0.9));
    root.add(head);
    pulseObjects.push((p, t) => {
      const x = -3.1 + (0.1 + p * 0.85) * 6.2 + Math.sin(t) * 0.02;
      head.position.x = x;
      boxes.forEach((b, i) => {
        const appear = Math.min(1, Math.max(0, p * 1.4 - i * 0.12));
        b.scale.setScalar(0.2 + 0.8 * appear);
        b.rotation.y = (1 - appear) * 0.6;
      });
    });
  } else if (mode === 'corridor') {
    const frame = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(new THREE.BoxGeometry(5.2, 3.2, 3.6))),
      matLine(pal0.e9, 0.95),
    );
    root.add(frame);
    const nodePos = [
      new THREE.Vector3(-1.8, -0.7, 0.8),
      new THREE.Vector3(-0.6, 0.7, -0.4),
      new THREE.Vector3(0.3, -0.3, 0.6),
      new THREE.Vector3(1.3, 0.6, -0.6),
      new THREE.Vector3(2.0, -0.6, 0.4),
    ];
    const nodeMeshes = nodePos.map((v, i) => {
      const m = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.16, 20, 16)),
        matStd(pal0.ink, i === 4 ? pal0.ph : pal0.e9, 0.55),
      );
      m.position.copy(v);
      root.add(m);
      return m;
    });
    const lineGeo = track(new THREE.BufferGeometry());
    const segs = [0, 1, 0, 2, 1, 2, 1, 3, 2, 3, 2, 4, 3, 4];
    const pos = new Float32Array(segs.length * 3);
    segs.forEach((idx, i) => {
      const v = nodePos[idx];
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
    });
    lineGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    root.add(new THREE.LineSegments(lineGeo, matLine(pal0.paper, 0.45)));
    const pathIdx = [0, 1, 3, 4];
    const marker = new THREE.Mesh(track(new THREE.SphereGeometry(0.1, 16, 12)), matStd(pal0.e9, pal0.e9, 1));
    root.add(marker);
    const resp = new THREE.Mesh(track(new THREE.SphereGeometry(0.08, 16, 12)), matStd(pal0.ph, pal0.ph, 1));
    root.add(resp);
    pulseObjects.push((p, t) => {
      const phase = Math.min(3, Math.floor(p * 3.999));
      frame.rotation.y = Math.sin(t * 0.15) * 0.06;
      const u = (t * 0.2 + p) % 1;
      const s = u * (pathIdx.length - 1);
      const i = Math.min(pathIdx.length - 2, Math.floor(s));
      const f = s - i;
      const a = nodePos[pathIdx[i]];
      const b = nodePos[pathIdx[i + 1]];
      marker.visible = phase >= 2;
      marker.position.lerpVectors(a, b, f);
      resp.visible = phase >= 3;
      const ru = (t * 0.3) % 1;
      const rs = (1 - ru) * (pathIdx.length - 1);
      const ri = Math.min(pathIdx.length - 2, Math.floor(rs));
      const rf = rs - ri;
      resp.position.lerpVectors(nodePos[pathIdx[pathIdx.length - 1 - ri]], nodePos[pathIdx[pathIdx.length - 2 - ri]], rf);
      nodeMeshes.forEach((m, idx) => {
        const on = (phase >= 1 && idx <= 2) || (phase >= 2 && pathIdx.includes(idx));
        m.scale.setScalar(on ? 1.2 : 1);
      });
    });
  } else if (mode === 'signals') {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.45) * 5.5;
      positions[i * 3 + 1] = (Math.random() - 0.45) * 3.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    const pts = new THREE.Points(
      track(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3))),
      track(new THREE.PointsMaterial({ color: hex(pal0.paper), size: 0.06, transparent: true, opacity: 0.85 })),
    );
    root.add(pts);
    const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(0.45, 0)), matStd(pal0.ink, pal0.e9, 0.7));
    root.add(core);
    const coreEdge = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.46, 0))),
      matLine(pal0.e9, 0.95),
    );
    root.add(coreEdge);
    const linkMat = matLine(pal0.ph, 0.55);
    const linkGeo = track(new THREE.BufferGeometry());
    const linkPos = new Float32Array(60 * 2 * 3);
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3));
    const links = new THREE.LineSegments(linkGeo, linkMat);
    root.add(links);
    pulseObjects.push((p, t) => {
      core.rotation.y = t * 0.3;
      coreEdge.rotation.y = t * 0.3;
      pts.rotation.y = t * 0.05;
      const confirmed = Math.floor(8 + p * 24);
      let w = 0;
      for (let i = 0; i < confirmed && w < 60; i++) {
        for (let j = i + 1; j < confirmed && w < 60; j++) {
          const ax = positions[i * 3],
            ay = positions[i * 3 + 1],
            az = positions[i * 3 + 2];
          const bx = positions[j * 3],
            by = positions[j * 3 + 1],
            bz = positions[j * 3 + 2];
          const d = Math.hypot(ax - bx, ay - by, az - bz);
          if (d > 1.8) continue;
          linkPos[w * 6] = ax;
          linkPos[w * 6 + 1] = ay;
          linkPos[w * 6 + 2] = az;
          linkPos[w * 6 + 3] = bx;
          linkPos[w * 6 + 4] = by;
          linkPos[w * 6 + 5] = bz;
          w++;
        }
      }
      for (let k = w * 6; k < linkPos.length; k++) linkPos[k] = 0;
      linkGeo.attributes.position.needsUpdate = true;
    });
  } else if (mode === 'protocol') {
    const brainMat = matStd(pal0.paper, pal0.ph, 0.18);
    brainMat.roughness = 0.55;
    brainMat.metalness = 0.08;
    const brain = new THREE.Mesh(track(makeBrainGeometry(THREE)), brainMat);
    brain.scale.setScalar(1.15);
    brain.position.set(0.85, 0.1, 0);
    root.add(brain);
    const wire = new THREE.LineSegments(
      track(new THREE.WireframeGeometry(makeBrainGeometry(THREE))),
      matLine(pal0.ink, 0.18),
    );
    wire.scale.copy(brain.scale);
    wire.position.copy(brain.position);
    root.add(wire);
    const band = new THREE.Mesh(
      track(new THREE.TorusGeometry(1.22, 0.035, 10, 80)),
      matStd(pal0.ph, pal0.ph, 0.8),
    );
    band.rotation.x = Math.PI / 2.4;
    band.position.copy(brain.position);
    band.position.y += 0.15;
    root.add(band);
    const sensors: ThreeNS.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const s = new THREE.Mesh(track(new THREE.SphereGeometry(0.07, 12, 10)), matStd(pal0.ph, pal0.ph, 1));
      s.position.set(brain.position.x + Math.cos(a) * 1.05, brain.position.y + 0.55, brain.position.z + Math.sin(a) * 0.7);
      root.add(s);
      sensors.push(s);
    }
    const plates: ThreeNS.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const plate = new THREE.Mesh(
        track(new THREE.BoxGeometry(1.6, 0.12, 0.7)),
        matStd(pal0.ink, pal0.ph, 0.4),
      );
      plate.position.set(-2.3, 1.1 - i * 0.42, 0.2);
      root.add(plate);
      const edge = new THREE.LineSegments(track(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.62, 0.14, 0.72))), matLine(pal0.ph, 0.9));
      edge.position.copy(plate.position);
      root.add(edge);
      plates.push(plate);
    }
    pulseObjects.push((p, t) => {
      brain.rotation.y = Math.sin(t * 0.2) * 0.15 + 0.25;
      wire.rotation.copy(brain.rotation);
      band.rotation.z = Math.sin(t * 0.4) * 0.05;
      sensors.forEach((s, i) => {
        const on = 0.85 + 0.25 * Math.sin(t * 4 + i);
        s.scale.setScalar(on);
      });
      plates.forEach((pl, i) => {
        const on = Math.floor(p * 4) === i;
        pl.scale.setScalar(on ? 1.06 : 1);
      });
    });
  } else {
    // ground / CTF
    const boards: ThreeNS.Mesh[] = [];
    const cats = 8;
    for (let i = 0; i < cats; i++) {
      const c = i % 4;
      const r = Math.floor(i / 4);
      const board = new THREE.Mesh(
        track(new THREE.BoxGeometry(1.3, 0.8, 0.08)),
        matStd(pal0.ink, pal0.e9, 0.2),
      );
      board.position.set(-2.1 + c * 1.5, 0.7 - r * 1.15, 0);
      root.add(board);
      const edge = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.32, 0.82, 0.1))),
        matLine(pal0.paper, 0.7),
      );
      edge.position.copy(board.position);
      root.add(edge);
      boards.push(board);
    }
    pulseObjects.push((p, t) => {
      const solved = Math.floor(1 + p * 6);
      boards.forEach((b, i) => {
        const on = i < solved;
        b.position.z = on ? 0.15 + Math.sin(t * 2 + i) * 0.04 : 0;
        const mat = b.material as ThreeNS.MeshStandardMaterial;
        mat.emissiveIntensity = on ? 0.7 : 0.15;
      });
    });
  }

  root.rotation.x = -0.12;

  let running = false;
  let raf = 0;
  let progress = 0;
  let elapsed = 0;
  let palette = pal0;

  const resize = () => {
    const rec = canvas.getBoundingClientRect();
    const w = Math.max(1, rec.width);
    const h = Math.max(1, rec.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const render = () => {
    pulseObjects.forEach((fn) => fn(progress, elapsed, palette));
    const leave = Math.min(1, Math.max(0, (progress - 0.88) / 0.12));
    root.position.y = -leave * 0.4;
    camera.position.z = 7.2 + leave * 1.2;
    renderer.render(scene, camera);
  };

  const loop = () => {
    if (!running) return;
    render();
    raf = requestAnimationFrame(loop);
  };

  resize();
  render();

  return {
    start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    resize,
    setProgress(p: number, t: number) {
      progress = p;
      elapsed = t;
      if (!running) render();
    },
    setColors(pal: Palette) {
      palette = pal;
      key.color.setHex(hex(pal.paper));
      rim.color.setHex(hex(pal.e9));
      fill.color.setHex(hex(pal.ph));
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      scene.clear();
    },
  };
}
