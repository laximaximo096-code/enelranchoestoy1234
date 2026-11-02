import {
  VW, VH, box, pixel, vGrad, ellipse, poly, dither, blotch, rng, withAlpha, glow, mix, crack,
} from '../pixel';
import { dust, beam, fly, flicker, cobweb } from '../fx';
import { bottle, plateDirty, plankWall } from '../props';

const WOOD = '#5b4732';
const WOOD_D = '#3f3122';
const WOOD_L = '#725b41';

function wallpaper(c) {
  box(c, 0, 0, VW, 154, '#c3bfa6');
  for (let x = 0; x < VW; x += 11) {
    box(c, x, 0, 4, 154, '#cbc7ae');
    box(c, x + 5, 0, 1, 154, '#b2ae96');
    box(c, x + 6, 0, 1, 154, '#c8c4ab');
  }
  for (let y = 6; y < 150; y += 18) {
    for (let x = 2; x < VW; x += 22) {
      box(c, x + 1, y, 3, 1, withAlpha('#9aa085', 0.55));
      pixel(c, x + 2, y - 1, withAlpha('#9aa085', 0.5));
      pixel(c, x + 2, y + 1, withAlpha('#9aa085', 0.5));
      box(c, x, y + 3, 1, 2, withAlpha('#9aa085', 0.35));
      box(c, x + 4, y + 3, 1, 2, withAlpha('#9aa085', 0.35));
    }
  }
  // humedad
  blotch(c, 320, 22, 34, 20, withAlpha('#8a8158', 0.35), 4, 6);
  blotch(c, 158, 8, 40, 16, withAlpha('#8a8158', 0.3), 7, 5);
  blotch(c, 26, 120, 30, 26, withAlpha('#7c7550', 0.45), 11, 7);
  blotch(c, 246, 128, 44, 24, withAlpha('#6f6a48', 0.35), 13, 6);
  // moho
  const r = rng(41);
  for (let i = 0; i < 120; i++) {
    const x = r() * VW;
    const y = r() * 150;
    const near = Math.abs(x - 320) < 40 && y < 50;
    if (near || r() > 0.7) {
      c.fillStyle = withAlpha(r() > 0.5 ? '#5d6340' : '#454d2e', 0.5);
      c.fillRect(x, y, 1, 1);
    }
  }
  // papel descascarado
  poly(c, [[8, 92], [56, 84], [66, 120], [18, 132]], '#a89f8c');
  poly(c, [[8, 92], [56, 84], [58, 92], [12, 100]], '#b8b0a0');
  poly(c, [[250, 96], [300, 88], [312, 126], [258, 134]], '#a89f8c');
  poly(c, [[250, 96], [300, 88], [302, 96], [254, 104]], '#b8b0a0');
  poly(c, [[120, 30], [156, 24], [162, 52], [126, 58]], '#a89f8c');
  crack(c, 176, 0, 40, '#7d7460', 3, 1);
  crack(c, 344, 60, 54, '#6f6752', 9, -1);
  box(c, 0, 0, VW, 6, 'rgba(50,44,32,0.4)');
  box(c, 0, 148, VW, 6, '#8a8168');
  box(c, 0, 148, VW, 1, '#9d947a');
}

function floor(c) {
  vGrad(c, 0, 154, VW, 62, [[0, '#6b543a'], [0.5, '#5c472f'], [1, '#47351f']]);
  for (let y = 154; y < 216; y += 12) {
    box(c, 0, y, VW, 1, withAlpha('#3a2a1a', 0.7));
    box(c, 0, y + 1, VW, 1, withAlpha('#7d6444', 0.25));
  }
  const r = rng(19);
  for (let i = 0; i < 500; i++) {
    const x = r() * VW;
    const y = 154 + r() * 62;
    c.fillStyle = withAlpha(r() > 0.5 ? '#33261a' : '#7d6444', 0.35);
    c.fillRect(x, y, 1 + r() * 3, 1);
  }
  // tablas rotas
  poly(c, [[186, 190], [222, 186], [230, 202], [192, 206]], '#2a1e14');
  poly(c, [[188, 191], [220, 187], [226, 200], [192, 204]], '#3a2a1c');
  // basura
  const r2 = rng(29);
  for (let i = 0; i < 90; i++) {
    const x = r2() * VW;
    const y = 158 + r2() * 56;
    c.fillStyle = r2() > 0.6 ? '#b8ae94' : '#6f6144';
    c.fillRect(x, y, 1 + r2() * 3, 1);
  }
}

function windowBoarded(c) {
  box(c, 56, 18, 84, 82, '#4a3728');
  box(c, 59, 21, 78, 76, '#1a1712');
  // luz entre tablas
  for (let i = 0; i < 4; i++) {
    box(c, 60, 26 + i * 19, 76, 2, withAlpha('#ffe9b0', 0.75));
    box(c, 60, 28 + i * 19, 76, 1, withAlpha('#fff6d4', 0.35));
  }
  for (let i = 0; i < 4; i++) {
    const y = 24 + i * 19;
    box(c, 54, y, 88, 7, '#6d5238');
    box(c, 54, y, 88, 2, '#8a6a49');
    box(c, 54, y + 6, 88, 1, '#4a3728');
    for (let x = 58; x < 140; x += 7) box(c, x, y + 2, 3, 1, withAlpha('#5a4128', 0.6));
  }
  box(c, 54, 94, 88, 6, '#3f2f22');
  // trapo en una esquina
  poly(c, [[120, 96], [142, 92], [146, 118], [124, 116]], withAlpha('#8a7f64', 0.8));
  // haces de luz
  beam(c, 96, 26, 62, 200, 12, 40, '#ffe9b0', 0.1, 0.07);
  beam(c, 96, 64, 78, 210, 8, 26, '#ffe9b0', 0.07, 0.05);
}

function bed(c) {
  ellipse(c, 302, 204, 70, 8, 'rgba(20,16,10,0.3)');
  // base
  box(c, 238, 176, 128, 22, '#6a5136');
  box(c, 238, 176, 128, 2, '#82653f');
  // colchón
  box(c, 236, 158, 132, 22, '#cfc6ae');
  box(c, 236, 158, 132, 3, '#ddd4bc');
  box(c, 236, 176, 132, 4, '#b0a68c');
  // manchas
  blotch(c, 268, 168, 16, 7, withAlpha('#a8935e', 0.5), 4, 5);
  blotch(c, 320, 172, 20, 8, withAlpha('#8f7a4a', 0.45), 9, 5);
  ellipse(c, 348, 166, 9, 4, withAlpha('#7d6a3e', 0.4));
  // sábana revuelta
  poly(c, [[236, 172], [268, 158], [310, 174], [340, 166], [368, 178], [366, 190], [250, 192]], '#d8d0b8');
  poly(c, [[236, 172], [268, 158], [266, 166], [240, 180]], '#e8e0c8');
  poly(c, [[300, 170], [318, 162], [330, 174], [312, 182]], '#c2b99c');
  box(c, 238, 186, 128, 3, withAlpha('#a89c7e', 0.6));
  // almohada
  box(c, 340, 154, 26, 12, '#ded6be');
  box(c, 342, 156, 22, 8, '#eae2ca');
  blotch(c, 350, 160, 6, 3, withAlpha('#b9a271', 0.45), 6, 4);
  // el bulto
  poly(c, [[262, 162], [296, 156], [306, 174], [268, 178]], '#c9c0a6');
  poly(c, [[274, 160], [296, 158], [300, 172], [278, 174]], '#d5ccb2');
}

function chair(c) {
  ellipse(c, 196, 196, 22, 5, 'rgba(20,16,10,0.28)');
  box(c, 178, 176, 5, 20, WOOD_D);
  box(c, 212, 176, 5, 20, WOOD_D);
  box(c, 178, 150, 5, 28, WOOD_D);
  box(c, 212, 150, 5, 28, WOOD_D);
  box(c, 178, 150, 39, 4, WOOD);
  box(c, 178, 172, 39, 5, WOOD);
  box(c, 178, 172, 39, 1, WOOD_L);
  // ropa encima
  poly(c, [[176, 172], [200, 158], [222, 168], [216, 182], [184, 184]], '#7a6a52');
  poly(c, [[178, 174], [198, 162], [210, 168], [196, 178]], '#8d7c60');
  poly(c, [[190, 182], [210, 176], [214, 190], [196, 194]], '#6a5c48');
}

function boxClutter(c) {
  box(c, 138, 176, 34, 26, '#8a7048');
  box(c, 138, 176, 34, 3, '#9d8256');
  box(c, 138, 176, 34, 1, '#a89066');
  box(c, 154, 176, 2, 26, withAlpha('#6a5434', 0.9));
  box(c, 138, 186, 34, 2, withAlpha('#6a5434', 0.9));
  poly(c, [[142, 176], [150, 168], [162, 174], [156, 178]], '#6f5a3a');
  // caja de cartón inclinada
  poly(c, [[150, 170], [178, 164], [186, 178], [156, 184]], '#a08a5e');
  poly(c, [[150, 170], [178, 164], [180, 168], [152, 174]], '#b59d6c');
}

function junk(c) {
  bottle(c, 120, 204, '#4b6b4a');
  bottle(c, 128, 210, '#6a5c3a');
  bottle(c, 348, 210, '#4b5f6b');
  bottle(c, 94, 210, '#7a5a3a');
  bottle(c, 336, 190, '#3f5a46');
  plateDirty(c, 214, 208, 3);
  plateDirty(c, 236, 202, 7);
  // cenizas y puchos
  ellipse(c, 166, 200, 9, 4, '#8a8378');
  ellipse(c, 166, 199, 7, 3, '#6f695f');
  for (let i = 0; i < 9; i++) {
    const r = rng(i + 21);
    box(c, 160 + r() * 14, 197 + r() * 4, 2, 1, '#d8d2c0');
    box(c, 161 + r() * 14, 197 + r() * 4, 1, 1, '#c98a3a');
  }
  // diario
  poly(c, [[252, 202], [292, 198], [296, 210], [256, 214]], '#b9b39c');
  for (let i = 0; i < 4; i++) box(c, 256, 203 + i * 2, 34, 1, withAlpha('#79735e', 0.5));
  // espejo tapado
  box(c, 288, 52, 46, 62, '#5b4a34');
  box(c, 290, 54, 42, 58, '#2a2620');
  poly(c, [[288, 52], [334, 52], [332, 118], [292, 116]], withAlpha('#b8ae94', 0.92));
  poly(c, [[288, 52], [334, 52], [330, 66], [290, 64]], withAlpha('#cfc6ac', 0.95));
  for (let i = 0; i < 3; i++) {
    box(c, 292 + i * 14, 60, 2, 56, withAlpha('#8f8670', 0.5));
  }
  box(c, 288, 116, 46, 3, withAlpha('#7a725c', 0.8));
}

export default {
  id: 'pieza',
  title: 'La pieza',
  width: VW,
  height: VH,
  floorY: 200,
  entryX: 66,
  lights: [{ x: 200, y: 32, r: 96, color: '#ffd096', a: 0.32 }],
  hotspots: [
    { id: 'cocina', x: 0, y: 22, w: 56, h: 134, label: 'Volver a la cocina', walkX: 30 },
    { id: 'cama', x: 232, y: 146, w: 140, h: 62, label: 'La cama sin tender', walkX: 276 },
    { id: 'ventana', x: 52, y: 14, w: 92, h: 90, label: 'La ventana clausurada', walkX: 104 },
    { id: 'espejo', x: 284, y: 48, w: 54, h: 72, label: 'El espejo tapado', walkX: 314 },
  ],
  drawStatic(c) {
    wallpaper(c);
    floor(c);
    windowBoarded(c);
    bed(c);
    chair(c);
    boxClutter(c);
    junk(c);
    // puerta a la cocina
    box(c, 0, 24, 54, 132, '#3f2f22');
    box(c, 3, 27, 48, 126, '#6b5138');
    vGrad(c, 3, 27, 48, 126, [[0, '#7a5f42'], [1, '#4f3a27']]);
    for (let x = 8; x < 50; x += 7) box(c, x, 27, 1, 126, '#5b442e');
    box(c, 0, 20, 58, 6, '#33261a');
    box(c, 0, 152, 58, 4, '#33261a');
    box(c, 46, 86, 3, 6, '#c9a763');
    box(c, 52, 27, 2, 126, withAlpha('#ffe0a8', 0.5));
    // foco colgante
    box(c, 199, 0, 2, 24, '#2b2620');
    box(c, 196, 24, 8, 4, '#3a352d');
    box(c, 196, 28, 8, 2, '#4a453b');
    ellipse(c, 200, 32, 5, 6, '#d5cfbd');
  },
  drawDynamic(c, t, s) {
    const night = s.mode === 'night';
    const f = flicker(t, 3);
    if (night) {
      glow(c, 200, 32, 100, '#ffd096', 0.3 * f, 7);
      ellipse(c, 200, 32, 5, 6, mix('#c9a25a', '#fff6da', f));
      glow(c, 96, 60, 40, '#9fb0c8', 0.06, 4);
    } else {
      glow(c, 200, 32, 60, '#ffe6b8', 0.1 * f, 5);
    }
    // polillas
    fly(c, 200, 44, t, 14, 3, '#3a3328');
    fly(c, 96, 40, t * 1.4, 10, 8, '#3a3328');
    dust(c, t, { count: 30, color: '#fff0c8', speed: 4, alpha: 0.5, seed: 6 });
    fly(c, 220, 206, t * 1.1, 12, 1);
    fly(c, 262, 196, t * 0.8, 9, 4);
    fly(c, 300, 180, t * 1.3, 14, 6);
    // sábana que respira
    const k = Math.sin(t * 0.5) * 1;
    box(c, 300 + k, 168, 6, 1, withAlpha('#e0d8c0', 0.55));
    box(c, 316 - k, 172, 8, 1, withAlpha('#d0c7ad', 0.5));
  },
};