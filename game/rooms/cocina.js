import {
  VW, VH, box, pixel, vGrad, circle, ellipse, poly, dither, speckle, blotch, rng,
  withAlpha, glow, mix,
} from '../pixel';
import { dust, steam, fly, beam, flicker, cobweb } from '../fx';
import { plateDirty, bottle } from '../props';
import { plateServed, doorVisitor } from '../figures';

const WALL_TOP = '#d9cdb2';
const WALL_D = '#c2b698';
const TILE_L = '#d9ded2';
const TILE_D = '#c6cec0';
const GROUT = '#a7b1a1';
const WOOD = '#6f5238';
const WOOD_D = '#523c28';
const WOOD_L = '#8a6a49';
const IRON = '#3f3d3a';

function wall(c) {
  vGrad(c, 0, 0, VW, 146, [[0, '#e0d5bb'], [0.6, '#d7cbae'], [1, '#c6b99a']]);
  blotch(c, 330, 24, 26, 14, withAlpha('#b7a683', 0.5), 6, 6);
  blotch(c, 24, 96, 18, 30, withAlpha('#b09c78', 0.45), 9, 5);
  const r = rng(15);
  for (let i = 0; i < 40; i++) {
    box(c, r() * VW, r() * 140, 1 + r() * 2, 1, withAlpha('#a8977a', 0.35));
  }
  // zócalo de azulejos
  box(c, 0, 62, VW, 80, TILE_D);
  for (let j = 0; j < 80; j += 8) {
    for (let i = 0; i < VW; i += 8) {
      const on = ((i / 8) + (j / 8)) % 2 === 0;
      box(c, i + 1, 62 + j + 1, 7, 7, on ? TILE_L : TILE_D);
      box(c, i + 1, 62 + j + 1, 7, 1, on ? '#e6eae0' : '#d5dbcf');
      box(c, i + 1, 62 + j + 7, 7, 1, '#b6bfb2');
    }
  }
  // grasa cerca de la cocina
  blotch(c, 96, 108, 30, 22, withAlpha('#a98f62', 0.28), 3, 9);
  dither(c, 0, 62, VW, 10, withAlpha('#8d7a58', 0), withAlpha('#8d7a58', 0.22), 0.5);
  box(c, 0, 140, VW, 3, '#8f8268');
  box(c, 0, 0, VW, 8, 'rgba(70,58,42,0.35)');
  box(c, 0, 6, VW, 2, 'rgba(50,40,28,0.4)');
}

function floor(c) {
  let y = 143;
  let band = 0;
  while (y < VH) {
    const h = Math.round(6 + band * 2.8);
    const tw = 18 + band * 6;
    for (let i = -2; i < VW / tw + 2; i++) {
      const on = (i + band) % 2 === 0;
      box(c, i * tw, y, tw, h, on ? '#c1b695' : '#a89b7b');
      box(c, i * tw, y, tw, 1, on ? '#cfc4a2' : '#b5a888');
      box(c, i * tw, y, 1, h, withAlpha('#8b7f63', 0.5));
    }
    y += h;
    band++;
  }
  box(c, 0, 141, VW, 3, '#7d7259');
  // sombras y mugre
  const r = rng(23);
  for (let i = 0; i < 260; i++) {
    const x = r() * VW;
    const yy = 146 + r() * 70;
    box(c, x, yy, 1 + r() * 2, 1, withAlpha('#7c6f52', 0.3));
  }
  ellipse(c, 150, 200, 70, 16, withAlpha('#6f6448', 0.16));
}

function windowLight(c) {
  // marco
  box(c, 138, 20, 70, 66, '#8a7250');
  box(c, 140, 22, 66, 62, '#efe4c4');
  vGrad(c, 141, 23, 64, 60, [[0, '#fdf6d8'], [0.55, '#f2e3b6'], [1, '#e2cd9a']]);
  // afuera
  box(c, 141, 23, 64, 26, '#c9d7d2');
  box(c, 141, 23, 64, 12, '#dce6e0');
  ellipse(c, 158, 42, 12, 6, '#a9bda4');
  ellipse(c, 186, 40, 16, 8, '#b3c4ab');
  box(c, 141, 47, 64, 36, '#e9d9ae');
  // postigos
  box(c, 143, 26, 2, 56, '#7a6244');
  box(c, 201, 26, 2, 56, '#7a6244');
  box(c, 171, 23, 4, 60, '#8a7250');
  box(c, 141, 50, 64, 3, '#8a7250');
  box(c, 134, 84, 78, 4, '#6f5a3f');
  box(c, 134, 84, 78, 1, '#9c8461');
  // cortina
  box(c, 141, 23, 10, 60, withAlpha('#e8e0cc', 0.75));
  box(c, 143, 23, 1, 60, withAlpha('#cdc3a8', 0.7));
  box(c, 147, 23, 1, 60, withAlpha('#cdc3a8', 0.7));
}

function stove(c, t, night) {
  // caño
  box(c, 90, 30, 12, 74, '#4a4845');
  box(c, 90, 30, 3, 74, '#5d5b57');
  box(c, 100, 30, 2, 74, '#35332f');
  box(c, 86, 26, 20, 5, '#3a3835');
  // cuerpo
  box(c, 62, 100, 66, 54, IRON);
  vGrad(c, 62, 100, 66, 54, [[0, '#4c4a46'], [0.5, '#3d3b38'], [1, '#2e2c2a']]);
  box(c, 62, 100, 66, 3, '#575450');
  box(c, 62, 100, 66, 1, '#6a6762');
  box(c, 126, 100, 2, 54, '#26241f');
  box(c, 62, 152, 66, 3, '#232120');
  // parrilla superior
  box(c, 68, 94, 54, 7, '#4b4945');
  box(c, 68, 94, 54, 1, '#5f5c57');
  for (let i = 0; i < 5; i++) box(c, 72 + i * 11, 97, 6, 1, '#2c2a27');
  // boca del fuego
  box(c, 78, 116, 36, 30, '#1b1917');
  box(c, 80, 118, 32, 26, night ? '#5e2a10' : '#3a1d10');
  if (night) {
    ellipse(c, 96, 136, 13, 7, withAlpha('#ff8a2c', 0.55));
    ellipse(c, 96, 138, 8, 4, withAlpha('#ffc25e', 0.6));
  }
  box(c, 80, 118, 32, 1, '#141210');
  for (let i = 0; i < 4; i++) box(c, 82 + i * 8, 132, 7, 2, withAlpha('#000000', 0.35));
  box(c, 76, 114, 40, 2, '#57544f');
  // manija
  box(c, 118, 128, 3, 6, '#7c7872');
  // pava
  ellipse(c, 94, 90, 12, 8, '#8e8a80');
  ellipse(c, 94, 88, 11, 6, '#a5a196');
  ellipse(c, 94, 87, 8, 4, '#b9b5a9');
  box(c, 90, 80, 8, 3, '#8e8a80');
  box(c, 91, 78, 6, 2, '#6f6b62');
  poly(c, [[104, 86], [112, 82], [112, 84], [105, 89]], '#9c988d');
  box(c, 85, 79, 2, 3, '#6f6b62');
  box(c, 101, 79, 2, 3, '#6f6b62');
}

function counter(c) {
  // alacena
  box(c, 212, 66, 92, 22, '#7d5f42');
  box(c, 212, 66, 92, 2, '#96755a');
  box(c, 214, 70, 40, 16, '#6b5038');
  box(c, 258, 70, 42, 16, '#6b5038');
  box(c, 231, 77, 3, 2, '#c9a763');
  box(c, 276, 77, 3, 2, '#c9a763');
  // frascos
  box(c, 216, 56, 8, 10, '#9a8e5c');
  box(c, 216, 54, 8, 3, '#6d6440');
  box(c, 228, 58, 7, 8, '#8a6a4a');
  box(c, 228, 56, 7, 3, '#5c4630');
  // mesada
  box(c, 206, 96, 100, 6, '#a1855c');
  box(c, 206, 96, 100, 2, '#b99b6c');
  box(c, 206, 102, 100, 2, '#7d6642');
  // bacha
  box(c, 236, 98, 44, 5, '#8e9490');
  box(c, 238, 99, 40, 3, '#6f7673');
  box(c, 238, 99, 40, 1, '#565d5a');
  // canilla
  box(c, 272, 84, 3, 14, '#9aa09c');
  box(c, 266, 84, 9, 3, '#9aa09c');
  box(c, 266, 86, 2, 4, '#b0b6b2');
  box(c, 264, 90, 1, 1, '#8e9692');
  // pileta de platos
  box(c, 222, 88, 18, 9, '#cfc7b2');
  ellipse(c, 228, 88, 10, 4, '#dcd4bf');
  ellipse(c, 240, 86, 9, 4, '#e2dac5');
  ellipse(c, 234, 82, 8, 3, '#cfc7b2');
  plateDirty(c, 262, 93, 4);
  bottle(c, 300, 96, '#6d7a55');
  // mueble
  box(c, 210, 102, 92, 52, WOOD);
  vGrad(c, 210, 102, 92, 52, [[0, '#7d5f42'], [1, '#5f4630']]);
  box(c, 214, 108, 40, 42, WOOD_D);
  box(c, 260, 108, 38, 42, WOOD_D);
  box(c, 214, 108, 40, 1, '#8f7051');
  box(c, 260, 108, 38, 1, '#8f7051');
  box(c, 232, 126, 4, 2, '#c9a763');
  box(c, 276, 126, 4, 2, '#c9a763');
  // sombra
  box(c, 206, 152, 100, 4, 'rgba(50,40,28,0.25)');
}

function table(c) {
  ellipse(c, 186, 188, 68, 7, 'rgba(50,40,28,0.22)');
  // mantel
  poly(c, [[126, 152], [250, 152], [244, 176], [132, 176]], '#c8c0ae');
  poly(c, [[126, 152], [250, 152], [249, 156], [127, 156]], '#ddd5c2');
  for (let x = 130; x < 246; x += 8) {
    box(c, x, 152, 1, 24, withAlpha('#b05a4a', 0.28));
  }
  for (let y = 158; y < 176; y += 6) {
    box(c, 130, y, 114, 1, withAlpha('#b05a4a', 0.22));
  }
  // patas
  box(c, 138, 176, 5, 14, WOOD_D);
  box(c, 232, 176, 5, 14, WOOD_D);
  box(c, 138, 176, 1, 14, WOOD);
  box(c, 232, 176, 1, 14, WOOD);
  // tabla
  box(c, 120, 148, 136, 5, WOOD);
  box(c, 120, 148, 136, 2, WOOD_L);
  // mate
  ellipse(c, 168, 146, 6, 4, '#7a4a2c');
  ellipse(c, 168, 145, 5, 3, '#8f5a34');
  ellipse(c, 168, 144, 3, 2, '#5f7a3c');
  box(c, 170, 134, 1, 8, '#b7b2a4');
  box(c, 170, 134, 1, 1, '#d8d3c4');
  // termo
  box(c, 190, 126, 10, 22, '#4c6b62');
  box(c, 190, 126, 10, 2, '#648578');
  box(c, 191, 126, 1, 22, withAlpha('#ffffff', 0.2));
  box(c, 189, 122, 12, 4, '#3b544d');
  box(c, 192, 118, 6, 4, '#2f423d');
  box(c, 194, 114, 2, 5, '#7f8e86');
  // yerba y pan
  box(c, 206, 142, 12, 6, '#8a7a4a');
  box(c, 206, 142, 12, 1, '#a89a63');
  ellipse(c, 232, 146, 9, 4, '#c9a46f');
  ellipse(c, 232, 145, 8, 3, '#d9b882');
  plateDirty(c, 148, 147, 8);
  box(c, 214, 150, 16, 1, 'rgba(90,70,40,0.35)');
}

function calendar(c) {
  box(c, 256, 10, 34, 46, '#3b3a36');
  box(c, 258, 12, 30, 42, '#e8e2cf');
  box(c, 258, 12, 30, 12, '#8f3b31');
  box(c, 261, 15, 24, 2, '#e8e2cf');
  box(c, 263, 20, 18, 1, withAlpha('#e8e2cf', 0.7));
  box(c, 264, 28, 18, 9, '#f4efdd');
  box(c, 268, 30, 1, 5, '#3b3a36');
  box(c, 274, 30, 1, 5, '#3b3a36');
  box(c, 268, 30, 7, 1, '#3b3a36');
  box(c, 272, 35, 4, 1, '#3b3a36');
  box(c, 261, 42, 24, 1, withAlpha('#6a6555', 0.5));
  box(c, 261, 46, 18, 1, withAlpha('#6a6555', 0.4));
  pixel(c, 270, 10, '#8a8375');
}

function shelves(c) {
  box(c, 210, 84, 46, 3, WOOD);
  box(c, 210, 84, 46, 1, WOOD_L);
  // radio
  box(c, 216, 70, 30, 14, '#7a4a2c');
  box(c, 216, 70, 30, 2, '#96603a');
  box(c, 218, 74, 16, 8, '#3b3226');
  box(c, 219, 75, 14, 6, '#5f6b4a');
  box(c, 220, 76, 5, 4, '#8a9470');
  box(c, 237, 74, 7, 7, '#2f2a22');
  box(c, 238, 75, 5, 1, '#a8a08a');
  box(c, 238, 78, 5, 1, '#a8a08a');
  pixel(c, 241, 72, '#c9a763');
}

function doors(c, night) {
  // puerta a la pieza (izquierda, entornada)
  box(c, 0, 46, 54, 104, '#4b3a29');
  box(c, 2, 48, 50, 100, '#2a2119');
  box(c, 2, 48, 12, 100, '#5f4a32');
  box(c, 4, 48, 10, 100, '#6f573b');
  for (let x = 4; x < 14; x += 3) box(c, x, 48, 1, 100, '#5b452e');
  box(c, 0, 44, 58, 4, '#3a2d20');
  box(c, 0, 148, 58, 3, '#2c2118');
  dither(c, 14, 48, 8, 100, '#241c15', withAlpha('#241c15', 0), 0.45);
  // puerta al patio (derecha)
  box(c, 310, 48, 68, 102, '#7a5f40');
  box(c, 314, 52, 60, 94, night ? '#1d2430' : '#cfd6c6');
  vGrad(c, 314, 52, 60, 94, night
    ? [[0, '#232c3a'], [1, '#131a24']]
    : [[0, '#dde4d2'], [0.6, '#c6cfb8'], [1, '#a8b39a']]);
  if (!night) {
    ellipse(c, 340, 96, 26, 20, withAlpha('#a9b98e', 0.5));
    box(c, 314, 120, 60, 26, '#b3a276');
    box(c, 314, 120, 60, 1, '#9c8d64');
  }
  // malla
  for (let x = 316; x < 373; x += 4) box(c, x, 52, 1, 94, withAlpha('#8b8a7a', 0.35));
  for (let y = 54; y < 146; y += 4) box(c, 314, y, 60, 1, withAlpha('#8b8a7a', 0.35));
  box(c, 342, 52, 4, 94, '#8a7250');
  box(c, 314, 96, 60, 3, '#8a7250');
  box(c, 314, 52, 3, 94, '#8a7250');
  box(c, 371, 52, 3, 94, '#8a7250');
  box(c, 368, 98, 2, 6, '#3c2f1e');
  box(c, 310, 146, 68, 4, '#5b442e');
}

export default {
  id: 'cocina',
  title: 'La cocina',
  width: VW,
  height: VH,
  floorY: 200,
  entryX: 296,
  maxX: 302,
  lights: [{ x: 300, y: 36, r: 96, color: '#ffca76', a: 0.4 }],
  hotspots: [
    { id: 'patio', x: 306, y: 44, w: 74, h: 108, label: 'La puerta del patio', walkX: 296 },
    { id: 'pieza', x: 0, y: 44, w: 58, h: 108, label: 'La pieza', walkX: 34 },
    { id: 'mate', x: 140, y: 112, w: 72, h: 46, label: 'Cebar unos mates', walkX: 176 },
    { id: 'pileta', x: 208, y: 78, w: 96, h: 42, label: 'Los platos sucios', walkX: 254 },
    { id: 'radio', x: 210, y: 62, w: 46, h: 26, label: 'La radio', walkX: 228 },
    { id: 'plato', x: 232, y: 132, w: 34, h: 24, label: 'El plato servido', walkX: 244 },
  ],
  drawStatic(c) {
    wall(c);
    floor(c);
    windowLight(c);
    // haz de luz de la ventana
    beam(c, 140, 84, 108, 214, 34, 62, '#ffe6a8', 0.1, 0.08);
    beam(c, 172, 84, 150, 214, 16, 34, '#fff0c4', 0.1, 0.07);
    stove(c, 0, false);
    shelves(c);
    counter(c);
    table(c);
    // el plato que alguien deja servido todas las noches
    plateServed(c, 246, 146);
    calendar(c);
    doors(c, false);
    cobweb(c, 4, 46, 22, '#efe9dd', 2);
    // colgante
    box(c, 299, 0, 2, 28, '#2e2a24');
    box(c, 296, 28, 8, 5, '#3a352d');
    ellipse(c, 300, 36, 5, 6, '#d8d2c0');
    box(c, 296, 24, 8, 4, '#4a453b');
    // papel matamoscas
    box(c, 148, 0, 10, 34, withAlpha('#c9b47a', 0.9));
    box(c, 148, 0, 10, 2, '#8a7a4a');
    for (let i = 0; i < 8; i++) box(c, 149, 4 + i * 4, 8, 1, withAlpha('#a89058', 0.7));
    // balde
    box(c, 58, 190, 22, 20, '#7c8580');
    box(c, 58, 190, 22, 2, '#98a19c');
    box(c, 58, 208, 22, 2, '#5d6661');
    box(c, 56, 186, 26, 4, '#8b948f');
    box(c, 66, 178, 8, 8, '#3a3a34');
  },
  drawDynamic(c, t, s) {
    const night = s.mode === 'night';
    steam(c, 94, 76, t, { height: 30, spread: 5, color: '#f2ece0', density: 8 });
    steam(c, 170, 132, t * 1.2, { height: 22, spread: 3, color: '#f4efe4', density: 5, speed: 0.18 });
    steam(c, 246, 140, t * 0.9, { height: 18, spread: 3, color: '#f6f1e2', density: 4, speed: 0.14 });
    dust(c, t, { count: 30, color: '#fff3ce', speed: 8, alpha: 0.55, seed: 2 });
    fly(c, 230, 92, t, 9, 1);
    fly(c, 244, 84, t * 1.3, 7, 3);
    fly(c, 262, 96, t * 0.9, 11, 5);
    // gota de la canilla
    const dp = (t * 0.55) % 1;
    box(c, 265, 91 + dp * 6, 1, 1, withAlpha('#cfe3e6', 0.8));
    if (dp > 0.9) {
      c.fillStyle = withAlpha('#dfeef0', 0.5);
      c.fillRect(263, 97, 5, 1);
    }
    // papel matamoscas meciéndose
    for (let y = 34; y < 46; y++) {
      const off = Math.sin(t * 0.9 + y * 0.2) * 2;
      box(c, 148 + off, y, 10, 1, withAlpha('#c9b47a', 0.9 - (y - 34) * 0.06));
    }
    fly(c, 152, 44, t, 4, 7);
    if (night) {
      const f = flicker(t, 2);
      glow(c, 300, 36, 92, '#ffca76', 0.35 * f, 7);
      ellipse(c, 300, 36, 5, 6, mix('#c9a25a', '#fff2cf', f));
      glow(c, 96, 136, 40, '#ff8a2c', 0.28 * flicker(t, 5), 5);
      ellipse(c, 96, 136, 12, 6, withAlpha('#ff9a3c', 0.6));
      // ventana de noche
      box(c, 141, 23, 64, 60, withAlpha('#121a26', 0.72));
      box(c, 141, 23, 64, 26, withAlpha('#0e1620', 0.8));
      // alguien esperando del otro lado del vidrio
      if (s.flags?.visitor) {
        glow(c, 344, 120, 40, '#5d7f92', 0.18, 6);
        doorVisitor(c, 344, 146, t, { kind: s.flags.visitor });
      }
    }
  },
};