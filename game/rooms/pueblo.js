import {
  VW, VH, box, pixel, vGrad, ellipse, poly, dither, blotch, rng, withAlpha, glow, mix,
} from '../pixel';
import { dust } from '../fx';
import { pueblerino } from '../figures';

const GROUND = 152;

function sky(c) {
  vGrad(c, 0, 0, VW, GROUND + 6, [
    [0, '#5d7a94'], [0.42, '#8ba3ad'], [0.74, '#bfc1a8'], [1, '#e2d6b6'],
  ]);
  // cables del tendido eléctrico, sin luz
  for (let i = 0; i < 3; i++) {
    const y0 = 15 + i * 6;
    for (let x = 0; x < VW; x++) {
      const sag = Math.sin((x / VW) * Math.PI) * 5;
      pixel(c, x, y0 + sag, withAlpha('#3c4a52', 0.5));
    }
  }
  box(c, 116, 18, 3, 46, '#6d6455');
  box(c, 107, 24, 21, 2, '#6d6455');
  box(c, 107, 34, 21, 2, '#6d6455');
  // loma con árboles
  const r = rng(51);
  for (let i = 0; i < 40; i++) {
    const x = i * 10 + r() * 6;
    ellipse(c, x, 126 - r() * 8, 7 + r() * 5, 5 + r() * 4, '#93a086');
  }
  // iglesia: el campanario asoma por encima de los techos
  box(c, 188, 20, 22, 106, '#b7b0a0');
  box(c, 190, 20, 3, 106, withAlpha('#ffffff', 0.18));
  box(c, 207, 20, 3, 106, withAlpha('#000000', 0.16));
  box(c, 184, 17, 30, 4, '#8e8a7c');
  box(c, 193, 30, 12, 14, '#4c4a44');
  box(c, 193, 32, 12, 2, '#3b3934');
  box(c, 198, 8, 2, 10, '#7d7a6e');
  box(c, 195, 11, 8, 2, '#7d7a6e');
  // techos lejanos
  poly(c, [[0, 96], [40, 82], [86, 96]], '#a49b88');
  poly(c, [[300, 96], [344, 84], [384, 96]], '#a49b88');
}

function pavement(c) {
  vGrad(c, 0, GROUND, VW, VH - GROUND, [[0, '#9b9c94'], [0.4, '#8d9090'], [1, '#6f7472']]);
  box(c, 0, GROUND, VW, 2, '#7c7f7a');
  box(c, 0, GROUND + 2, VW, 3, '#a9aaa0');
  let y = GROUND + 6;
  let band = 0;
  while (y < VH) {
    const h = 4 + band * 1.6;
    const tw = 14 + band * 5;
    for (let i = -1; i < VW / tw + 1; i++) {
      const on = (i + band) % 2 === 0;
      box(c, i * tw, y, tw - 1, h - 1, on ? '#a3a49a' : '#92958c');
      box(c, i * tw, y, tw - 1, 1, on ? '#b2b3a8' : '#9c9f95');
    }
    y += h;
    band++;
  }
  const r = rng(88);
  for (let i = 0; i < 220; i++) {
    box(c, r() * VW, GROUND + 6 + r() * (VH - GROUND - 6), 1 + r() * 3, 1, withAlpha('#5f6360', 0.22));
  }
  blotch(c, 18, 200, 30, 14, withAlpha('#a1906a', 0.35), 4, 6);
  blotch(c, 350, 208, 34, 12, withAlpha('#a1906a', 0.3), 8, 6);
}

function signBoard(c, x, y, w, h, bg = '#cfc2a0', edge = '#3a3229') {
  box(c, x - 1, y - 1, w + 2, h + 2, edge);
  box(c, x, y, w, h, bg);
  box(c, x, y, w, 1, mix(bg, '#ffffff', 0.4));
}

function boliche(c) {
  box(c, 14, 62, 92, 90, '#c8bda6');
  vGrad(c, 14, 62, 92, 90, [[0, '#d2c7b0'], [0.55, '#c3b8a1'], [1, '#a89d88']]);
  box(c, 10, 58, 100, 5, '#9a9c95');
  box(c, 10, 56, 100, 2, '#b0b2aa');
  box(c, 10, 63, 100, 2, '#6f716b');
  signBoard(c, 26, 70, 66, 14, '#cfc2a0');
  box(c, 34, 77, 3, 6, '#4b6b4a');
  box(c, 35, 74, 1, 3, '#4b6b4a');
  box(c, 42, 78, 12, 1, withAlpha('#3a3229', 0.5));
  box(c, 42, 81, 8, 1, withAlpha('#3a3229', 0.4));
  box(c, 26, 72, 8, 1, withAlpha('#3a3229', 0.35));
  box(c, 22, 94, 40, 32, '#3a3128');
  box(c, 24, 96, 36, 28, '#1d2229');
  for (let x = 28; x < 60; x += 7) box(c, x, 96, 1, 28, '#2f2a22');
  box(c, 70, 100, 28, 52, '#332c24');
  vGrad(c, 72, 102, 24, 50, [[0, '#3d342a'], [1, '#241e18']]);
  box(c, 72, 102, 24, 1, '#4e4234');
  box(c, 92, 124, 2, 3, '#7a6a4a');
  box(c, 66, 150, 36, 3, '#6f6a5c');
  box(c, 96, 136, 22, 3, '#6b563d');
  box(c, 98, 139, 3, 14, '#4a3d2e');
  box(c, 113, 139, 3, 14, '#4a3d2e');
  dither(c, 14, 130, 92, 22, withAlpha('#6c6150', 0), withAlpha('#6c6150', 0.22), 0.5);
}

function almacen(c) {
  box(c, 108, 56, 88, 96, '#c2bda8');
  vGrad(c, 108, 56, 88, 96, [[0, '#cbc6b1'], [0.55, '#b9b4a0'], [1, '#9c9784']]);
  box(c, 104, 52, 96, 4, '#8d8878');
  box(c, 104, 50, 96, 2, '#a09b89');
  signBoard(c, 118, 58, 68, 13, '#dfd3b2');
  box(c, 126, 64, 10, 5, '#5f5238');
  box(c, 130, 61, 2, 3, '#5f5238');
  box(c, 142, 66, 30, 1, withAlpha('#5f5238', 0.55));
  box(c, 142, 69, 22, 1, withAlpha('#5f5238', 0.45));
  // toldo a rayas
  for (let i = 0; i < 11; i++) {
    const x = 106 + i * 8;
    const on = i % 2 === 0;
    box(c, x, 74, 8, 13, on ? '#a8463a' : '#d9cdae');
    box(c, x, 85, 8, 4, on ? '#8c3a30' : '#c1b596');
  }
  box(c, 106, 89, 90, 2, withAlpha('#000000', 0.22));
  box(c, 114, 94, 44, 34, '#3a3128');
  box(c, 116, 96, 40, 30, '#232a30');
  for (let i = 0; i < 3; i++) box(c, 118 + i * 13, 112, 10, 12, withAlpha('#8a8266', 0.45));
  box(c, 162, 94, 30, 58, '#4b3c28');
  vGrad(c, 164, 96, 26, 56, [[0, '#5b4a31'], [1, '#332a1c']]);
  box(c, 164, 96, 26, 2, '#6d5940');
  box(c, 186, 122, 2, 3, '#c9a763');
  box(c, 158, 150, 38, 3, '#8d8064');
}

function ferreteria(c) {
  box(c, 196, 60, 68, 92, '#b9ab93');
  vGrad(c, 196, 60, 68, 92, [[0, '#c3b59c'], [0.5, '#b2a48c'], [1, '#97896f']]);
  box(c, 194, 56, 72, 4, '#57595a');
  box(c, 194, 54, 72, 2, '#6c6e6f');
  signBoard(c, 202, 66, 56, 12, '#cfc4a6');
  box(c, 208, 69, 3, 6, '#5b5240');
  box(c, 211, 69, 3, 3, '#5b5240');
  box(c, 211, 72, 3, 3, '#5b5240');
  box(c, 220, 71, 26, 1, withAlpha('#5b5240', 0.55));
  box(c, 220, 74, 18, 1, withAlpha('#5b5240', 0.45));
  box(c, 202, 86, 46, 44, '#3a3128');
  box(c, 204, 88, 42, 40, '#262d31');
  for (let i = 0; i < 5; i++) box(c, 208 + i * 8, 90, 2, 22, withAlpha('#8c8f88', 0.5));
  box(c, 204, 116, 42, 3, withAlpha('#8c8f88', 0.4));
  box(c, 196, 84, 68, 3, '#4a453a');
  box(c, 240, 100, 20, 52, '#3f3423');
  vGrad(c, 242, 102, 16, 50, [[0, '#4f4229'], [1, '#2c2517']]);
  box(c, 242, 102, 16, 1, '#5f5133');
  box(c, 196, 152, 68, 3, '#8a7f68');
}

function farmacia(c) {
  box(c, 266, 58, 70, 94, '#c7c7bd');
  vGrad(c, 266, 58, 70, 94, [[0, '#d1d1c7'], [0.5, '#c2c2b8'], [1, '#a6a69c']]);
  box(c, 264, 54, 74, 4, '#7c7d76');
  box(c, 264, 52, 74, 2, '#96978f');
  signBoard(c, 272, 62, 52, 12, '#e4e2d2');
  box(c, 283, 64, 3, 8, '#5d7a63');
  box(c, 280, 67, 9, 3, '#5d7a63');
  // persiana metálica
  box(c, 268, 82, 56, 58, '#7f8378');
  for (let y = 84; y < 138; y += 4) box(c, 268, y, 56, 1, withAlpha('#5c6058', 0.55));
  for (let y = 86; y < 138; y += 4) box(c, 268, y, 56, 1, withAlpha('#a8ada1', 0.4));
  box(c, 268, 140, 56, 4, '#5a5e56');
  box(c, 272, 118, 30, 1, withAlpha('#3f433c', 0.5));
  box(c, 324, 96, 14, 56, '#4b4a44');
  vGrad(c, 325, 98, 12, 54, [[0, '#575650'], [1, '#33332e']]);
  box(c, 264, 152, 74, 3, '#8f9088');
}

function stand(c) {
  box(c, 350, 94, 2, 58, '#5c452f');
  box(c, 344, 94, 14, 2, '#6b5138');
  box(c, 347, 96, 8, 2, '#3b3830');
  box(c, 348, 98, 6, 8, '#4a463c');
  box(c, 349, 100, 4, 5, '#6b6350');
  // mesa
  box(c, 352, 156, 32, 3, '#8a6a49');
  box(c, 352, 156, 32, 1, '#a9855e');
  box(c, 356, 159, 3, 22, '#5c452f');
  box(c, 378, 159, 3, 22, '#5c452f');
  // cajones con velas
  box(c, 355, 146, 13, 10, '#a89272');
  box(c, 355, 146, 13, 2, '#c0aa88');
  for (let i = 0; i < 3; i++) box(c, 356 + i * 4, 139, 2, 7, '#e6dfc8');
  box(c, 370, 148, 11, 8, '#9a8465');
  for (let i = 0; i < 2; i++) box(c, 372 + i * 4, 142, 2, 6, '#e6dfc8');
}

function plaza(c) {
  // camino de tierra hacia el rancho, a la izquierda
  poly(c, [[0, 168], [40, 172], [58, 216], [0, 216]], '#a89772');
  const r = rng(63);
  for (let i = 0; i < 90; i++) {
    box(c, r() * 52, 172 + r() * 44, 1, 1, r() > 0.5 ? '#9d8a67' : '#bdab86');
  }
  // cartel del pueblo
  box(c, 92, 168, 3, 34, '#5c452f');
  signBoard(c, 72, 156, 42, 14, '#cbbd9c');
  box(c, 77, 160, 32, 2, withAlpha('#3a3229', 0.45));
  box(c, 77, 164, 24, 1, withAlpha('#3a3229', 0.35));
  // banco
  box(c, 118, 176, 38, 3, '#7d6244');
  box(c, 118, 176, 38, 1, '#96795a');
  box(c, 120, 179, 3, 12, '#4f3a27');
  box(c, 151, 179, 3, 12, '#4f3a27');
  box(c, 118, 168, 38, 2, '#8a6c4b');
  for (let x = 120; x < 154; x += 6) box(c, x, 165, 2, 3, '#6f5438');
  // fuente
  ellipse(c, 190, 194, 40, 9, withAlpha('#6a6a5e', 0.22));
  ellipse(c, 190, 188, 36, 13, '#b3b2a4');
  ellipse(c, 190, 186, 32, 10, '#c6c5b6');
  ellipse(c, 190, 185, 25, 7, '#8b8f88');
  ellipse(c, 190, 186, 18, 5, '#9a9c92');
  box(c, 186, 168, 8, 18, '#b8b7a8');
  box(c, 186, 168, 8, 1, '#cdccbc');
  ellipse(c, 190, 168, 7, 3, '#cdccbc');
  box(c, 177, 162, 3, 12, '#8f938c');
  box(c, 175, 160, 9, 3, '#a2a6a0');
  box(c, 175, 172, 3, 2, '#8f938c');
  // yuyos entre las piedras
  const g = rng(11);
  for (let i = 0; i < 34; i++) {
    const x = 8 + g() * 360;
    const y = GROUND + 8 + g() * 52;
    box(c, x, y, 1, 2, withAlpha('#6f7b48', 0.8));
  }
}

export default {
  id: 'pueblo',
  title: 'El centro del pueblo',
  width: VW,
  height: VH,
  floorY: 200,
  entryX: 26,
  maxX: 366,
  hotspots: [
    { id: 'boliche', x: 10, y: 52, w: 100, h: 100, label: 'El boliche', walkX: 48 },
    { id: 'almacen', x: 108, y: 48, w: 88, h: 104, label: 'El almacén de ramos generales', walkX: 150 },
    { id: 'ferreteria', x: 196, y: 52, w: 68, h: 100, label: 'La ferretería «La Tuerca»', walkX: 228 },
    { id: 'farmacia', x: 266, y: 50, w: 70, h: 102, label: 'La farmacia', walkX: 300 },
    { id: 'cartel', x: 70, y: 152, w: 44, h: 52, label: 'El cartel del pueblo', walkX: 92 },
    { id: 'banco', x: 116, y: 164, w: 40, h: 30, label: 'El banco de la plaza', walkX: 136 },
    { id: 'fuente', x: 156, y: 160, w: 68, h: 38, label: 'La fuente', walkX: 188 },
    { id: 'vecino', x: 282, y: 158, w: 30, h: 46, label: 'Un vecino con farol', walkX: 296 },
    { id: 'ruso', x: 340, y: 136, w: 44, h: 68, label: 'El Ruso, con su puesto de velas', walkX: 344 },
    { id: 'patio', x: 0, y: 160, w: 46, h: 56, label: 'El camino de vuelta al rancho', walkX: 26 },
  ],
  drawStatic(c) {
    sky(c);
    pavement(c);
    boliche(c);
    almacen(c);
    ferreteria(c);
    farmacia(c);
    stand(c);
    plaza(c);
  },
  drawDynamic(c, t, s) {
    const night = s.mode !== 'day';
    // estrellas
    if (night) {
      const r = rng(7);
      for (let i = 0; i < 40; i++) {
        const x = Math.floor(r() * VW);
        const y = Math.floor(r() * 90);
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * (0.5 + r()) + i));
        c.fillStyle = withAlpha('#e8f0ff', tw * 0.8);
        c.fillRect(x, y, 1, 1);
      }
    }
    // nubes bajas
    for (let i = 0; i < 3; i++) {
      const x = ((t * 1.6 + i * 150) % (VW + 100)) - 60;
      const yy = 26 + i * 14;
      const col = night ? withAlpha('#4a5772', 0.55) : withAlpha('#f2ecdd', 0.8);
      ellipse(c, x, yy + 3, 24, 5, col);
      ellipse(c, x - 9, yy, 13, 6, col);
      ellipse(c, x + 10, yy + 1, 14, 5, col);
    }
    // velas en las ventanas: es lo único que alumbra
    const fl = (k) => 0.72 + 0.28 * Math.abs(Math.sin(t * 6.1 * k) * Math.sin(t * 2.3 + k));
    const f1 = fl(1);
    glow(c, 43, 110, 30, '#ffb95e', 0.3 * f1, 6);
    box(c, 24, 96, 36, 28, withAlpha('#ffcf80', 0.26 * f1));
    box(c, 40, 112, 2, 4, withAlpha('#fff0c4', 0.9));
    glow(c, 176, 126, 34, '#ffb95e', 0.28 * f1, 6);
    box(c, 164, 96, 26, 56, withAlpha('#ffcf80', 0.16 * f1));
    glow(c, 220, 108, 26, '#ffb95e', 0.2 * fl(1.3), 5);
    box(c, 204, 88, 42, 40, withAlpha('#ffcf80', 0.12));
    box(c, 268, 140, 56, 1, withAlpha('#ffcf80', 0.55));
    glow(c, 296, 142, 22, '#ffb95e', 0.16, 5);
    // charcos de luz en la vereda
    ellipse(c, 176, 196, 26, 6, withAlpha('#ffcf80', 0.06));
    ellipse(c, 44, 198, 22, 5, withAlpha('#ffcf80', 0.05));
    // el farol del Ruso
    const fr = fl(1.6);
    glow(c, 350, 102, 30, '#ffc06a', 0.3 * fr, 6);
    box(c, 349, 100, 4, 5, withAlpha('#fff2c8', 0.9 * fr));
    // el vecino y el Ruso
    pueblerino(c, 296, 200, t, { coat: '#3a4048', lantern: true });
    pueblerino(c, 344, 200, t * 0.85, { coat: '#4a3c2c', hat: false, lantern: false });
    // el perro del boliche duerme
    const breath = Math.sin(t * 1.6) * 0.5;
    ellipse(c, 66, 200, 9, 2, withAlpha('#000000', 0.3));
    ellipse(c, 63, 197 + breath, 9, 4, '#5f5140');
    ellipse(c, 71, 195, 4, 3, '#5f5140');
    box(c, 72, 194, 2, 1, '#4a3f31');
    pixel(c, 73, 195, '#2a241c');
    // canilla de la fuente
    const dp = (t * 0.5) % 1;
    box(c, 176, 174 + dp * 8, 1, 1, withAlpha('#cfe3e6', 0.75));
    if (dp > 0.88) ellipse(c, 176, 186, 3, 1, withAlpha('#dfeef0', 0.35));
    // diario que arrastra el viento
    const px = ((t * 14) % (VW + 80)) - 40;
    const py = 188 + Math.sin(t * 1.4) * 5;
    box(c, px, py, 6, 3, withAlpha('#e4dfcd', 0.5));
    box(c, px + 1, py + 3, 4, 1, withAlpha('#cfc9b6', 0.4));
    dust(c, t, { count: 24, color: '#fff3ce', speed: 7, alpha: 0.4, seed: 6 });
  },
};