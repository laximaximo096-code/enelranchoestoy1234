import {
  VW, VH, box, pixel, vGrad, ellipse, poly, dither, blotch, rng,
  withAlpha, glow, mix,
} from '../pixel';
import { dust, beam, cobweb, flicker, steam } from '../fx';
import { bottle } from '../props';
import { alambreMan, plateServed } from '../figures';

const STONE = '#54544c';

function floor(c) {
  vGrad(c, 0, 154, VW, 62, [[0, '#453529'], [0.5, '#3a2d22'], [1, '#2d231a']]);
  const r = rng(19);
  for (let i = 0; i < 900; i++) {
    const x = r() * VW;
    const y = 154 + r() * 62;
    box(c, x, y, 1 + (r() > 0.9 ? 1 : 0), 1, ['#4f3d2e', '#2b2118', '#584433', '#332718'][Math.floor(r() * 4)]);
  }
  box(c, 0, 152, VW, 3, '#2a221a');
  for (const [px, py, rx, ry] of [[92, 196, 22, 5], [268, 202, 16, 4]]) {
    ellipse(c, px, py, rx, ry, withAlpha('#1c2630', 0.55));
    ellipse(c, px - 2, py - 1, rx * 0.6, ry * 0.5, withAlpha('#334450', 0.45));
  }
  for (let i = 0; i < 7; i++) {
    ellipse(c, 150 + i * 16, 186 + Math.sin(i) * 5, 2, 3, withAlpha('#241b14', 0.5));
  }
  for (let i = 0; i < 9; i++) {
    const x = 30 + r() * 320;
    const y = 168 + r() * 40;
    box(c, x, y, 3 + r() * 4, 2, withAlpha('#b9b09a', 0.3));
  }
  dither(c, 0, 154, VW, 6, withAlpha('#12100c', 0), withAlpha('#12100c', 0.5), 0.5);
}

function ceiling(c) {
  box(c, 0, 0, VW, 22, '#26221d');
  for (let x = -4; x < VW; x += 28) {
    box(c, x, 0, 6, 22, '#332c24');
    box(c, x, 0, 1, 22, '#3f372c');
  }
  box(c, 0, 18, VW, 6, '#2e281f');
  dither(c, 0, 18, VW, 6, withAlpha('#000000', 0), withAlpha('#000000', 0.45), 0.5);
  const r = rng(41);
  for (let i = 0; i < 8; i++) {
    const x = 24 + r() * 336;
    const len = 8 + r() * 22;
    for (let j = 0; j < len; j++) {
      pixel(c, x + Math.sin(j * 0.5 + i) * 2, 20 + j, withAlpha('#6b5a3c', 0.6 - (j / len) * 0.45));
    }
  }
}

function stoneWall(c) {
  box(c, 0, 22, VW, 134, '#3a3a34');
  const r = rng(77);
  for (let row = 0; row < 11; row++) {
    const y = 24 + row * 12;
    const off = (row % 2) * 11;
    for (let x = -off; x < VW; x += 22) {
      const w = 18 + Math.floor(r() * 7);
      const h = 8 + Math.floor(r() * 3);
      const base = [STONE, '#4c4c45', '#5b5b51', '#474740'][Math.floor(r() * 4)];
      box(c, x + 1, y + 1, w, h, base);
      box(c, x + 1, y + 1, w, 1, withAlpha('#78786c', 0.5));
      box(c, x + 1, y + h, w, 1, withAlpha('#232320', 0.7));
      if (r() > 0.78) blotch(c, x + w / 2, y + h / 2, 5, 3, withAlpha('#3f5a3a', 0.22), row * 7 + x, 3);
    }
  }
  // humedad y chorreaduras
  blotch(c, 60, 122, 42, 30, withAlpha('#2f3b33', 0.32), 6, 7);
  blotch(c, 316, 58, 34, 24, withAlpha('#2b2f34', 0.28), 9, 6);
  for (let i = 0; i < 14; i++) {
    const x = 18 + i * 25 + (i % 3) * 6;
    const len = 16 + (i % 5) * 12;
    box(c, x, 26, 1, len, withAlpha('#20262a', 0.3));
  }
  box(c, 0, 22, VW, 3, '#211f1c');
}

function vent(c) {
  box(c, 330, 34, 30, 24, '#2b2a25');
  box(c, 332, 36, 26, 20, '#101720');
  for (let x = 334; x < 358; x += 4) box(c, x, 36, 1, 20, '#4a4a42');
  beam(c, 344, 58, 328, 80, 10, 24, '#9fb6c8', 0.12, 0.06);
  glow(c, 344, 46, 20, '#a8c0d4', 0.14, 5);
}

function stairs(c) {
  // hueco de la trampilla
  box(c, 8, 6, 78, 18, '#100e0c');
  box(c, 6, 4, 82, 4, '#3a2d20');
  box(c, 6, 4, 82, 1, '#4e3c2b');
  // caño de la escalera, en sombra
  poly(c, [[8, 152], [78, 152], [58, 22], [16, 22]], '#141210');
  for (let i = 0; i < 6; i++) {
    box(c, 12 + i * 2, 26 + i * 12, 4, 3, withAlpha('#3a3a32', 0.5));
  }
  // escalones en perspectiva
  for (let i = 0; i < 7; i++) {
    const y = 150 - i * 16;
    const x = 6 + i * 2;
    const w = 76 - i * 4;
    box(c, x, y, w, 6, '#4a3728');
    box(c, x, y, w, 2, '#5e4732');
    box(c, x, y + 6, w, 3, '#33251a');
    box(c, x, y, 2, 6, '#3a2b1f');
  }
  // zanca y pasamanos
  poly(c, [[4, 158], [11, 158], [26, 22], [21, 22]], '#33251a');
  box(c, 84, 44, 3, 108, '#3d2d20');
  box(c, 84, 44, 1, 108, '#54402c');
  for (let i = 0; i < 5; i++) box(c, 78 - i * 8, 56 + i * 18, 9, 2, '#3d2d20');
}

function tunnelDoor(c) {
  // marco
  box(c, 276, 84, 88, 76, '#2c2a25');
  box(c, 279, 87, 82, 70, '#3f3d36');
  box(c, 283, 91, 74, 66, '#050506');
  // escalones del túnel que bajan
  for (let i = 0; i < 4; i++) {
    box(c, 294 + i * 2, 150 - i * 8, 52 - i * 6, 3, withAlpha('#2a2b30', 0.45 - i * 0.09));
  }
  // hoja de hierro abierta hacia adentro
  poly(c, [[285, 91], [305, 99], [305, 156], [285, 158]], '#42474a');
  poly(c, [[287, 95], [302, 101], [302, 153], [287, 155]], '#4e5457');
  for (let y = 104; y < 152; y += 8) box(c, 288, y, 13, 1, withAlpha('#2f3436', 0.8));
  box(c, 301, 99, 2, 57, '#33383a');
  for (const y of [102, 128, 152]) {
    box(c, 283, y - 1, 6, 3, '#6b7072');
    box(c, 284, y - 1, 2, 1, '#8a8f91');
  }
  // candado roto colgando
  box(c, 306, 118, 6, 2, '#7c7a70');
  box(c, 307, 120, 4, 5, '#8a877c');
  box(c, 304, 123, 3, 4, '#6d6a60');
  box(c, 276, 158, 88, 4, '#221f1a');
}

function names(c) {
  box(c, 104, 44, 90, 62, withAlpha('#28271f', 0.5));
  const r = rng(88);
  for (let row = 0; row < 8; row++) {
    const y = 50 + row * 7;
    let x = 110;
    const n = 4 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      const w = 2 + Math.floor(r() * 3);
      box(c, x, y, w, 1, withAlpha('#c9bd9a', 0.45 + r() * 0.3));
      x += w + 2;
    }
    if (r() > 0.45) box(c, 110, y - 1, x - 112, 1, withAlpha('#a85a48', 0.32));
  }
  box(c, 112, 100, 30, 1, withAlpha('#c9bd9a', 0.35));
  box(c, 112, 104, 18, 1, withAlpha('#c9bd9a', 0.28));
}

function shelf(c) {
  box(c, 194, 62, 60, 4, '#4a3728');
  box(c, 194, 62, 60, 1, '#5f4832');
  box(c, 194, 66, 60, 2, '#2b2118');
  bottle(c, 200, 62, '#4b5a3c');
  bottle(c, 210, 62, '#5a4a3a');
  box(c, 222, 52, 11, 10, '#6b6a4a');
  box(c, 222, 50, 11, 3, '#4e4d34');
  box(c, 224, 55, 7, 1, withAlpha('#c9c08a', 0.35));
  box(c, 238, 54, 12, 8, '#57422c');
  box(c, 240, 56, 8, 1, withAlpha('#8a7452', 0.6));
  // cadena colgando
  for (let i = 0; i < 4; i++) box(c, 250, 66 + i * 4, 2, 3, '#6b675e');
}

function crate(c) {
  vGrad(c, 126, 132, 88, 30, [[0, '#523d2c'], [1, '#3a2a1e']]);
  box(c, 126, 130, 88, 4, '#5f4832');
  box(c, 126, 130, 88, 1, '#755a3e');
  for (let x = 132; x < 212; x += 14) box(c, x, 134, 1, 28, withAlpha('#2e2117', 0.7));
  box(c, 124, 128, 4, 36, '#3a2a1e');
  box(c, 212, 128, 4, 36, '#3a2a1e');
  box(c, 124, 158, 92, 3, '#241a12');
  // lámpara de aceite
  ellipse(c, 138, 129, 6, 3, '#6b5a38');
  box(c, 135, 119, 7, 10, '#7a6a42');
  box(c, 136, 116, 5, 3, '#8f7c4d');
  box(c, 137, 114, 3, 2, '#5d4e31');
  // lata de galletitas con papeles
  box(c, 164, 118, 28, 12, '#7c8580');
  box(c, 164, 116, 28, 3, '#98a19c');
  box(c, 166, 112, 24, 3, '#3c3a34');
  box(c, 172, 106, 14, 6, withAlpha('#cfc6ac', 0.9));
  box(c, 172, 106, 14, 1, '#e6dfc8');
  box(c, 175, 109, 8, 1, withAlpha('#6b6555', 0.7));
  // papeles tirados en el piso
  const r = rng(52);
  for (let i = 0; i < 7; i++) {
    const x = 128 + r() * 84;
    const y = 164 + r() * 30;
    box(c, x, y, 4 + r() * 5, 2, withAlpha('#b9b09a', 0.4));
  }
}

function barrels(c) {
  // barril viejo
  box(c, 218, 138, 16, 24, '#4a3a2a');
  vGrad(c, 218, 138, 16, 24, [[0, '#55422f'], [1, '#392c20']]);
  ellipse(c, 226, 138, 8, 3, '#5c4934');
  ellipse(c, 226, 138, 6, 2, '#2a2018');
  for (const y of [144, 154]) box(c, 218, y, 16, 2, '#3d3d38');
  box(c, 218, 138, 1, 24, withAlpha('#7a6244', 0.5));
  // bolsa de arpillera caída
  ellipse(c, 208, 176, 10, 5, '#6b604a');
  ellipse(c, 206, 173, 7, 4, '#7c7058');
  box(c, 202, 170, 4, 3, '#5c5240');
  // balde oxidado
  box(c, 96, 168, 14, 12, '#5a5248');
  box(c, 96, 168, 14, 2, '#6f675a');
  ellipse(c, 103, 168, 7, 2, '#3d372f');
}

function chair(c) {
  box(c, 236, 118, 4, 36, '#3f2e21');
  box(c, 258, 118, 4, 36, '#3f2e21');
  box(c, 236, 118, 4, 1, '#54402c');
  box(c, 258, 118, 4, 1, '#54402c');
  box(c, 238, 124, 22, 3, '#4a3728');
  box(c, 238, 132, 22, 3, '#4a3728');
  box(c, 234, 148, 32, 4, '#4a3728');
  box(c, 234, 148, 32, 1, '#5f4832');
  box(c, 236, 152, 3, 16, '#33251a');
  box(c, 262, 152, 3, 16, '#33251a');
  // campera colgada del respaldo
  poly(c, [[237, 120], [261, 120], [259, 141], [239, 141]], '#262a2e');
  box(c, 239, 122, 20, 2, '#33383c');
  box(c, 244, 124, 1, 16, withAlpha('#1b1e21', 0.8));
  // plato servido en el asiento
  plateServed(c, 250, 147);
}

export default {
  id: 'sotano',
  title: 'El sótano',
  width: VW,
  height: VH,
  floorY: 198,
  entryX: 62,
  lights: [{ x: 224, y: 34, r: 74, color: '#ffcf86', a: 0.3 }],
  hotspots: [
    { id: 'escalera', x: 2, y: 10, w: 92, h: 152, label: 'Subir al gallinero', walkX: 54 },
    { id: 'pared', x: 102, y: 42, w: 94, h: 66, label: 'Los nombres en la pared', walkX: 148 },
    { id: 'caja', x: 158, y: 102, w: 42, h: 34, label: 'La lata de papeles', walkX: 176 },
    { id: 'silla', x: 230, y: 112, w: 42, h: 58, label: 'La silla del abuelo', walkX: 248 },
    { id: 'puerta', x: 274, y: 82, w: 92, h: 80, label: 'La puerta del túnel', walkX: 320 },
  ],
  drawStatic(c) {
    ceiling(c);
    stoneWall(c);
    floor(c);
    vent(c);
    stairs(c);
    beam(c, 44, 24, 22, 152, 16, 44, '#ffe6b0', 0.1, 0.06);
    names(c);
    shelf(c);
    tunnelDoor(c);
    barrels(c);
    crate(c);
    chair(c);
    cobweb(c, 0, 22, 34, '#ded8c8', 3);
    cobweb(c, 384, 22, 30, '#d5cfbe', 7);
    cobweb(c, 100, 44, 20, '#d5cfbe', 11);
    // cable y bombita
    box(c, 223, 22, 2, 12, '#2c2620');
    box(c, 221, 34, 6, 3, '#3a352d');
  },
  drawDynamic(c, t, s) {
    const f = flicker(t, 3);
    glow(c, 224, 38, 78, '#ffcf86', 0.28 * f, 8);
    ellipse(c, 224, 38, 4, 5, mix('#c9a868', '#fff4d6', f));
    glow(c, 138, 122, 26, '#ffb964', 0.22 * flicker(t, 7), 5);
    ellipse(c, 138, 120, 3, 4, withAlpha('#ffd79a', 0.75));
    steam(c, 250, 142, t, { height: 20, spread: 3, color: '#e6dfd0', density: 5, speed: 0.16 });
    dust(c, t, { count: 44, color: '#e8dcc0', speed: 4, alpha: 0.38, seed: 5 });
    // goteo del techo al charco
    const dp = (t * 0.32) % 1;
    pixel(c, 92, 24 + dp * 168, withAlpha('#9fb6c0', 0.55));
    if (dp > 0.96) {
      c.fillStyle = withAlpha('#9fb6c0', 0.4);
      c.fillRect(88, 193, 8, 1);
    }
    // la rata cruza el sótano
    const rx = 40 + ((t * 13) % 300);
    ellipse(c, rx, 208, 4, 2, withAlpha('#1d1712', 0.85));
    pixel(c, rx + 4, 207, withAlpha('#1d1712', 0.7));
    box(c, rx - 5, 208 + Math.round(Math.sin(t * 4)), 3, 1, withAlpha('#1d1712', 0.4));
    if (s.flags?.alambre) alambreMan(c, 322, 152, t, { h: 30 });
  },
};