import {
  VW, VH, box, pixel, vGrad, circle, ellipse, poly, dither, speckle, blotch, rng,
  mix, withAlpha, glow,
} from '../pixel';
import { dust, smoke } from '../fx';
import { chicken, chapaRoof } from '../props';
import { marta, alambreMan } from '../figures';

const HORIZON = 138;

function sky(c) {
  vGrad(c, 0, 0, VW, HORIZON + 2, [
    [0, '#68849b'], [0.34, '#8ba5ad'], [0.66, '#bfc1a8'], [1, '#e0d3b1'],
  ]);
  circle(c, 292, 30, 13, '#fbf1cf');
  circle(c, 292, 30, 15, withAlpha('#fdf6dd', 0.16));
  circle(c, 292, 30, 18, withAlpha('#fdf6dd', 0.08));
}

function treeLine(c) {
  const r = rng(31);
  for (let i = 0; i < 44; i++) {
    const x = i * 9 + r() * 7;
    const h = 6 + r() * 10;
    ellipse(c, x, HORIZON - h * 0.35, 6 + r() * 5, h * 0.55 + 2, '#95a086');
  }
  for (let i = 0; i < 34; i++) {
    const x = i * 12 + r() * 8 - 4;
    const h = 5 + r() * 8;
    ellipse(c, x, HORIZON - h * 0.2, 5 + r() * 4, h * 0.45 + 2, '#7c8a70');
  }
  box(c, 0, HORIZON, VW, 3, 'rgba(96,104,72,0.35)');
}

function ground(c) {
  vGrad(c, 0, HORIZON, VW, VH - HORIZON, [
    [0, '#8d9660'], [0.28, '#818c55'], [0.7, '#6f7b48'], [1, '#5b6739'],
  ]);
  const r = rng(77);
  for (let i = 0; i < 900; i++) {
    const x = Math.floor(r() * VW);
    const y = Math.floor(HORIZON + r() * (VH - HORIZON));
    const t = (y - HORIZON) / (VH - HORIZON);
    const cols = t > 0.6 ? ['#7d8a4f', '#556134', '#8d9a5c'] : ['#94a067', '#7b8850', '#9daa70'];
    c.fillStyle = cols[Math.floor(r() * cols.length)];
    c.fillRect(x, y, 1 + (r() > 0.85 ? 1 : 0), 1);
  }
  // matujos
  for (let i = 0; i < 90; i++) {
    const x = Math.floor(r() * VW);
    const y = Math.floor(HORIZON + 6 + r() * (VH - HORIZON - 6));
    const t = (y - HORIZON) / (VH - HORIZON);
    const col = t > 0.55 ? '#4d5a30' : '#67743e';
    c.fillStyle = col;
    c.fillRect(x, y, 1, 2);
    c.fillRect(x + 1, y + 1, 1, 1);
    if (r() > 0.6) c.fillRect(x - 1, y + 1, 1, 1);
  }
}

function path(c) {
  poly(c, [[128, 152], [150, 152], [206, 216], [96, 216]], '#a89572');
  poly(c, [[132, 152], [146, 152], [190, 216], [118, 216]], '#b3a07a');
  const r = rng(41);
  for (let i = 0; i < 220; i++) {
    const y = 154 + r() * 62;
    const t = (y - 152) / 64;
    const cx = 139 + (150 - 139) * t;
    const half = 8 + t * 44;
    const x = cx + (r() - 0.5) * half * 2;
    c.fillStyle = r() > 0.5 ? '#9d8a67' : '#c0ad88';
    c.fillRect(Math.round(x), Math.round(y), 1, 1);
  }
  // huellas de ruedas
  for (let y = 158; y < 216; y += 2) {
    const t = (y - 152) / 64;
    box(c, 128 + t * 26, y, 1, 1, 'rgba(120,104,78,0.55)');
    box(c, 152 + t * 30, y, 1, 1, 'rgba(120,104,78,0.55)');
  }
}

function house(c) {
  ellipse(c, 100, 156, 76, 6, 'rgba(56,46,30,0.18)');
  // pared
  box(c, 30, 98, 132, 56, '#e0d5bc');
  vGrad(c, 30, 98, 132, 56, [[0, '#e6dcc4'], [0.55, '#dbd0b6'], [1, '#c9bea3']]);
  blotch(c, 44, 142, 16, 9, withAlpha('#b8aa8b', 0.75), 3, 7);
  blotch(c, 148, 136, 12, 8, withAlpha('#b3a487', 0.6), 8, 5);
  const rr = rng(9);
  for (let i = 0; i < 16; i++) {
    const x = 32 + rr() * 124;
    const y = 100 + rr() * 50;
    box(c, x, y, 1 + rr() * 3, 1 + rr() * 2, withAlpha('#a89a7e', 0.4));
  }
  // zócalo de ladrillo
  box(c, 30, 148, 132, 6, '#9c8c74');
  for (let x = 30; x < 162; x += 8) box(c, x, 148, 1, 6, '#8a7a62');
  box(c, 30, 151, 132, 1, '#8a7a62');
  // techo de chapa
  chapaRoof(c, [[14, 100], [96, 56], [178, 100]], '#8d8e86', { rust: true, seed: 6 });
  box(c, 14, 100, 164, 2, '#55564f');
  // chimenea
  box(c, 58, 44, 12, 22, '#9a7f6a');
  box(c, 58, 44, 12, 3, '#7a6150');
  box(c, 56, 40, 16, 4, '#8a7360');
  for (let y = 48; y < 66; y += 4) box(c, 58, y, 12, 1, 'rgba(90,68,54,0.55)');
  // ventana
  box(c, 46, 112, 36, 30, '#6b5138');
  box(c, 48, 114, 32, 26, '#f4dca8');
  vGrad(c, 48, 114, 32, 26, [[0, '#fdf1cd'], [1, '#e8c07c']]);
  box(c, 48, 126, 32, 2, '#6b5138');
  box(c, 62, 114, 2, 26, '#6b5138');
  box(c, 44, 141, 40, 3, '#5c452f');
  box(c, 44, 141, 40, 1, '#7a5f42');
  dither(c, 84, 114, 6, 26, withAlpha('#6b5138', 0), withAlpha('#d8b077', 0.5), 0.45);
  // puerta
  box(c, 120, 108, 32, 46, '#4e3a26');
  box(c, 122, 110, 28, 44, '#6b5138');
  for (let x = 124; x < 150; x += 5) box(c, x, 110, 1, 44, '#5b442e');
  box(c, 122, 110, 28, 2, '#7d6044');
  box(c, 146, 130, 2, 3, '#3c2f1e');
  box(c, 148, 129, 1, 1, '#c9a763');
  box(c, 118, 152, 36, 3, '#8d7f66');
  // luz bajo la puerta
  box(c, 122, 152, 28, 1, withAlpha('#ffdca0', 0.5));
  // alero sombra
  box(c, 30, 98, 132, 3, 'rgba(60,50,36,0.22)');
}

function silo(c) {
  ellipse(c, 192, 154, 18, 4, 'rgba(56,46,30,0.18)');
  vGrad(c, 176, 74, 32, 80, [[0, '#b9b5a7'], [0.5, '#a9a597'], [1, '#8d897c']]);
  ellipse(c, 192, 74, 16, 5, '#bdb9ab');
  ellipse(c, 192, 73, 16, 4, '#a29e91');
  for (let y = 86; y < 154; y += 14) box(c, 176, y, 32, 1, 'rgba(110,106,96,0.55)');
  box(c, 176, 74, 1, 80, 'rgba(255,255,255,0.18)');
  box(c, 207, 74, 1, 80, 'rgba(40,38,34,0.25)');
  for (let y = 80; y < 152; y += 6) {
    box(c, 199, y, 6, 1, '#6f6b60');
    box(c, 199, y, 1, 6, '#6f6b60');
    box(c, 205, y, 1, 6, '#6f6b60');
  }
}

function windmill(c) {
  poly(c, [[262, 140], [268, 66], [276, 66], [282, 140]], '#8b8375');
  for (let y = 70; y < 140; y += 6) {
    box(c, 268, y, 8, 1, 'rgba(120,112,98,0.5)');
  }
  for (let i = 0; i < 5; i++) {
    const y = 72 + i * 12;
    box(c, 266 - i * 0.4, y, 12, 1, 'rgba(110,102,88,0.7)');
  }
  circle(c, 272, 62, 2, '#6d675c');
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + 0.4;
    const ex = 272 + Math.cos(a) * 15;
    const ey = 62 + Math.sin(a) * 15;
    box(c, Math.min(272, ex), Math.min(62, ey), 1, 30, withAlpha('#9a9382', 0.9));
    poly(c, [
      [272 + Math.cos(a) * 8, 62 + Math.sin(a) * 8],
      [ex + Math.cos(a + 1.6) * 3, ey + Math.sin(a + 1.6) * 3],
      [ex + Math.cos(a - 1.6) * 3, ey + Math.sin(a - 1.6) * 3],
    ], withAlpha('#b3ab98', 0.9));
  }
  circle(c, 272, 62, 2, '#5f5a50');
}

function coop(c) {
  ellipse(c, 330, 168, 44, 6, 'rgba(56,46,30,0.2)');
  // patas
  box(c, 298, 140, 4, 28, '#4f3a27');
  box(c, 358, 140, 4, 28, '#4f3a27');
  // cuerpo
  box(c, 288, 112, 84, 32, '#7d5c3f');
  vGrad(c, 288, 112, 84, 32, [[0, '#8a6746'], [1, '#6a4c33']]);
  for (let x = 290; x < 372; x += 6) box(c, x, 112, 1, 32, 'rgba(74,52,34,0.65)');
  box(c, 288, 112, 84, 2, '#9a7551');
  // interior con malla
  box(c, 302, 118, 56, 22, '#241a13');
  for (let x = 302; x < 358; x += 4) box(c, x, 118, 1, 22, 'rgba(150,130,105,0.35)');
  for (let y = 118; y < 140; y += 4) box(c, 302, y, 56, 1, 'rgba(150,130,105,0.28)');
  box(c, 306, 130, 10, 10, '#3b2a1d');
  box(c, 330, 128, 12, 12, '#3b2a1d');
  // techo
  chapaRoof(c, [[282, 112], [330, 92], [378, 112]], '#7f8078', { rust: true, seed: 12 });
  box(c, 282, 112, 96, 2, '#4f5049');
  // rampa
  poly(c, [[348, 144], [366, 144], [372, 166], [342, 166]], '#6d5136');
  for (let i = 0; i < 4; i++) box(c, 344 + i * 2, 148 + i * 5, 26 - i * 2, 1, '#57402b');
}

function fence(c) {
  const posts = [0, 26, 52, 78, 176, 202, 228, 254];
  for (const x of posts) {
    box(c, x, 146, 4, 30, '#6b5138');
    box(c, x, 146, 1, 30, '#82684b');
    box(c, x, 146, 4, 1, '#4f3a27');
    ellipse(c, x + 2, 176, 4, 2, 'rgba(56,46,30,0.18)');
  }
  for (let y = 151; y < 172; y += 7) {
    box(c, 0, y, 82, 1, 'rgba(120,110,90,0.55)');
    box(c, 176, y, 82, 1, 'rgba(120,110,90,0.55)');
  }
}

function mailbox(c) {
  ellipse(c, 214, 160, 8, 2, 'rgba(56,46,30,0.2)');
  box(c, 212, 144, 4, 16, '#5c452f');
  box(c, 204, 132, 20, 12, '#8f9a96');
  box(c, 204, 132, 20, 3, '#a7b1ad');
  box(c, 204, 141, 20, 3, '#6f7a76');
  box(c, 202, 129, 24, 4, '#a7b1ad');
  box(c, 206, 136, 8, 1, 'rgba(40,44,42,0.6)');
  box(c, 224, 128, 2, 8, '#a04a3a');
  box(c, 220, 124, 8, 4, '#a04a3a');
}

function weeds(c) {
  const r = rng(19);
  for (let i = 0; i < 26; i++) {
    const x = r() * VW;
    const y = 196 + r() * 20;
    const h = 4 + r() * 9;
    for (let j = 0; j < 3; j++) {
      box(c, x + j * 1.5, y - h + j * 2, 1, h - j * 2, '#46532c');
    }
  }
  // sombra inferior
  box(c, 0, 210, VW, 6, 'rgba(40,46,26,0.18)');
}

function camino(c) {
  // cartel que baja al pueblo
  ellipse(c, 194, 198, 10, 2, 'rgba(56,46,30,0.2)');
  box(c, 192, 172, 3, 26, '#5c452f');
  box(c, 192, 172, 1, 26, '#7a5f42');
  box(c, 176, 168, 36, 14, '#8a6a49');
  box(c, 176, 168, 36, 2, '#a9855e');
  box(c, 176, 179, 36, 3, '#6b5138');
  box(c, 182, 172, 22, 1, withAlpha('#e6dcc4', 0.65));
  box(c, 182, 175, 15, 1, withAlpha('#e6dcc4', 0.5));
  poly(c, [[206, 172], [213, 175], [206, 178]], '#c9bda2');
}

export default {
  id: 'patio',
  title: 'El patio',
  width: VW,
  height: VH,
  floorY: 202,
  entryX: 150,
  hotspots: [
    { id: 'cocina', x: 116, y: 104, w: 40, h: 52, label: 'La cocina', walkX: 136 },
    { id: 'gallinero', x: 286, y: 96, w: 92, h: 62, label: 'El gallinero', walkX: 330 },
    { id: 'buzon', x: 198, y: 122, w: 32, h: 40, label: 'El buzón', walkX: 216 },
    { id: 'alambrado', x: 232, y: 136, w: 34, h: 46, label: 'Doña Marta, junto al alambrado', walkX: 246 },
    { id: 'pueblo', x: 120, y: 176, w: 96, h: 40, label: 'El camino al pueblo', walkX: 166 },
  ],
  drawStatic(c) {
    sky(c);
    treeLine(c);
    ground(c);
    path(c);
    windmill(c);
    house(c);
    silo(c);
    coop(c);
    fence(c);
    mailbox(c);
    weeds(c);
    camino(c);
  },
  drawDynamic(c, t, s) {
    if (s.mode === 'night') {
      const r = rng(5);
      for (let i = 0; i < 46; i++) {
        const x = Math.floor(r() * VW);
        const y = Math.floor(r() * 118);
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.6 + r()) + i));
        c.fillStyle = withAlpha('#e8f0ff', tw * 0.85);
        c.fillRect(x, y, 1, 1);
      }
      circle(c, 300, 34, 11, '#e8e4d2');
      circle(c, 306, 30, 9, '#e8e4d2');
      circle(c, 300, 34, 15, withAlpha('#cfd8ea', 0.08));
      glow(c, 300, 34, 40, '#9fb4d8', 0.16, 6);
      // ventana encendida
      glow(c, 64, 128, 26, '#ffbf62', 0.35, 6);
      box(c, 48, 114, 32, 26, withAlpha('#ffcf80', 0.45));
      glow(c, 136, 152, 20, '#ffcf80', 0.22, 5);
      box(c, 122, 152, 28, 1, withAlpha('#ffdca0', 0.8));
    }
    // nubes
    const clouds = [[46, 34, 1], [168, 22, 0.7], [252, 56, 0.55]];
    for (let i = 0; i < clouds.length; i++) {
      const [bx, by, k] = clouds[i];
      const x = ((bx + t * 2.2 * k) % (VW + 90)) - 60;
      const col = s.mode === 'night' ? withAlpha('#5b6a86', 0.5) : '#f4efe2';
      const dark = s.mode === 'night' ? withAlpha('#48576f', 0.5) : '#d3ccb8';
      ellipse(c, x, by + 4, 22 * k, 5 * k, dark);
      ellipse(c, x - 8 * k, by, 12 * k, 6 * k, col);
      ellipse(c, x + 9 * k, by + 1, 13 * k, 5 * k, col);
      ellipse(c, x + 2 * k, by - 4, 10 * k, 6 * k, col);
    }
    // pájaros
    for (let i = 0; i < 3; i++) {
      const bx = ((t * 16 + i * 130) % (VW + 60)) - 30;
      const by = 40 + i * 13 + Math.sin(t * 0.8 + i) * 4;
      const f = Math.sin(t * 7 + i * 2) > 0 ? 1 : 0;
      c.fillStyle = 'rgba(52,48,40,0.6)';
      c.fillRect(Math.round(bx), Math.round(by), 1, 1);
      c.fillRect(Math.round(bx) - 1, Math.round(by) - f, 1, 1);
      c.fillRect(Math.round(bx) + 1, Math.round(by) - f, 1, 1);
    }
    smoke(c, 64, 40, t, { height: 40, spread: 6, color: '#a9a394', density: 9 });
    // gallinas sueltas
    chicken(c, 296 + Math.sin(t * 0.5) * 6, 182, t, 1);
    chicken(c, 332 + Math.cos(t * 0.4) * 8, 188, t * 1.2, 2, '#dcd4c0', '#b8ae96');
    chicken(c, 356 + Math.sin(t * 0.3 + 2) * 5, 178, t * 0.9, 3, '#e5d9bc', '#bfb098');
    dust(c, t, { count: 22, color: '#fff2cd', speed: 9, alpha: 0.45, seed: 4 });
    if (s.mode === 'night') {
      for (let i = 0; i < 6; i++) {
        const fx = 250 + Math.sin(t * 0.7 + i * 2.1) * 40 + i * 8;
        const fy = 160 + Math.cos(t * 0.9 + i) * 12;
        c.fillStyle = withAlpha('#d8ff9a', 0.35 + 0.4 * Math.abs(Math.sin(t * 2 + i)));
        c.fillRect(Math.round(fx), Math.round(fy), 1, 1);
      }
      // doña Marta, plantada junto al alambrado
      marta(c, 244, 180, t, { day: false });
      // el Hombre del Alambre, del otro lado
      if (s.flags?.alambre) alambreMan(c, 62, 152, t, { h: 30 });
    }
  },
};