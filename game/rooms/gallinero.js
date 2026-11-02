import {
  VW, VH, box, pixel, vGrad, ellipse, poly, dither, blotch, rng, withAlpha, glow, mix,
} from '../pixel';
import { dust, beam, fly, flicker, cobweb, steam } from '../fx';
import { chicken, plankWall, hayPile, chapaRoof } from '../props';
import { alambreMan } from '../figures';

const WOOD = '#5e4530';
const WOOD_D = '#42301f';
const WOOD_L = '#77593c';

function walls(c) {
  plankWall(c, 0, 0, VW, 158, WOOD, WOOD_D, WOOD_L, { vertical: true, step: 13, seed: 4 });
  // vigas
  box(c, 0, 0, VW, 8, '#3b2a1c');
  box(c, 0, 8, VW, 3, '#4b3524');
  box(c, 0, 152, VW, 6, '#3b2a1c');
  box(c, 0, 152, VW, 2, '#4f3826');
  // claros entre tablas (luz del día)
  const gaps = [22, 58, 96, 134, 208, 246, 320, 358];
  for (const x of gaps) {
    box(c, x, 12, 2, 140, withAlpha('#f6e6b6', 0.55));
    box(c, x, 12, 1, 140, withAlpha('#fff6d8', 0.85));
  }
  blotch(c, 60, 120, 22, 18, withAlpha('#6d5433', 0.4), 6, 6);
  blotch(c, 300, 40, 26, 20, withAlpha('#4a3520', 0.35), 9, 5);
  dither(c, 0, 120, VW, 34, withAlpha('#2b1e13', 0), withAlpha('#2b1e13', 0.35), 0.5);
}

function floor(c) {
  vGrad(c, 0, 158, VW, 58, [[0, '#6b5334'], [0.4, '#5e4830'], [1, '#4a3826']]);
  const r = rng(33);
  for (let i = 0; i < 700; i++) {
    const x = r() * VW;
    const y = 158 + r() * 58;
    const t = (y - 158) / 58;
    const cols = t > 0.5 ? ['#7a6038', '#4a3826', '#8a6c3e', '#3f2f20'] : ['#74593a', '#523e2a', '#83653f'];
    c.fillStyle = cols[Math.floor(r() * cols.length)];
    c.fillRect(x, y, 1 + (r() > 0.85 ? 1 : 0), 1);
  }
  hayPile(c, 40, 208, 90, 14, 5);
  hayPile(c, 230, 214, 120, 16, 9);
  hayPile(c, 300, 205, 70, 10, 12);
  // excremento viejo
  for (let i = 0; i < 12; i++) {
    const x = 40 + r() * 300;
    const y = 166 + r() * 44;
    ellipse(c, x, y, 2 + r() * 2, 1, withAlpha('#b8ad92', 0.55));
  }
}

function doorOut(c) {
  box(c, 0, 30, 62, 128, '#3b2a1c');
  box(c, 3, 33, 56, 122, '#cfd7c2');
  vGrad(c, 3, 33, 56, 122, [[0, '#f4f0d8'], [0.4, '#dfe2c8'], [1, '#b8c0a2']]);
  // afuera
  box(c, 3, 33, 56, 40, '#dde6dc');
  ellipse(c, 24, 76, 22, 12, '#bcc9a8');
  ellipse(c, 46, 72, 18, 10, '#c6d2b2');
  box(c, 3, 84, 56, 71, '#c9bb90');
  // marco
  box(c, 0, 27, 66, 5, '#4a3524');
  box(c, 0, 155, 66, 4, '#3b2a1c');
  box(c, 59, 30, 5, 128, '#4a3524');
  box(c, 59, 30, 1, 128, '#5f4630');
  // puerta abierta (hoja)
  poly(c, [[64, 26], [78, 34], [78, 158], [64, 164]], '#6b4f34');
  for (let x = 66; x < 78; x += 3) box(c, x, 30, 1, 128, '#553d28');
  box(c, 64, 26, 14, 3, '#7d5f40');
}

function nests(c) {
  box(c, 266, 54, 112, 8, WOOD_L);
  box(c, 266, 54, 112, 2, '#8f7050');
  const cols = [270, 306, 342];
  for (let k = 0; k < 2; k++) {
    const y = 62 + k * 46;
    box(c, 266, y, 112, 4, '#4a3524');
    for (const x of cols) {
      box(c, x, y + 4, 32, 40, '#241a12');
      box(c, x + 2, y + 6, 28, 36, '#1a120c');
      // paja
      const r = rng(x + y);
      for (let i = 0; i < 40; i++) {
        box(c, x + 3 + r() * 26, y + 28 + r() * 12, 2 + r() * 3, 1, r() > 0.5 ? '#b99a4e' : '#8d7238');
      }
      for (let i = 0; i < 22; i++) {
        box(c, x + 3 + r() * 26, y + 10 + r() * 18, 1 + r() * 2, 1, withAlpha('#8d7238', 0.5));
      }
      // huevos
      if (k === 0) {
        ellipse(c, x + 12, y + 31, 3, 4, '#eee6d0');
        ellipse(c, x + 20, y + 33, 3, 4, '#e3dac2');
        pixel(c, x + 11, y + 28, '#fffaf0');
      } else if (x === 306) {
        ellipse(c, x + 16, y + 31, 3, 4, '#eee6d0');
      }
      box(c, x, y + 4, 32, 2, '#37271b');
      box(c, x, y + 42, 32, 2, withAlpha('#c9a86a', 0.4));
    }
  }
  // gallina clueca
  ellipse(c, 330, 128, 11, 8, '#d8c9a8');
  ellipse(c, 326, 122, 7, 6, '#e2d4b4');
  box(c, 330, 116, 3, 4, '#e2d4b4');
  box(c, 333, 115, 2, 1, '#c9a13f');
  pixel(c, 331, 113, '#bf5a44');
  pixel(c, 332, 118, '#241d14');
}

function roost(c) {
  box(c, 56, 106, 210, 7, '#7a5a3a');
  box(c, 56, 106, 210, 2, '#96744c');
  box(c, 56, 112, 210, 2, '#4e3624');
  box(c, 60, 113, 5, 8, '#4e3624');
  box(c, 250, 113, 5, 8, '#4e3624');
}

function bulb(c) {
  box(c, 197, 0, 2, 20, '#2c2620');
  box(c, 195, 20, 8, 4, '#3a352d');
  box(c, 195, 24, 8, 2, '#4a453b');
}

function trapdoor(c) {
  box(c, 150, 168, 104, 46, '#2f2a24');
  box(c, 152, 170, 100, 42, '#4a4740');
  vGrad(c, 152, 170, 100, 42, [[0, '#5b5850'], [1, '#3d3a34']]);
  for (let x = 156; x < 252; x += 16) box(c, x, 170, 1, 42, withAlpha('#2a2721', 0.6));
  box(c, 152, 170, 100, 2, '#6b6860');
  box(c, 152, 210, 100, 2, '#242220');
  box(c, 150, 172, 4, 8, '#7a756a');
  box(c, 246, 172, 4, 8, '#7a756a');
  box(c, 150, 200, 4, 8, '#7a756a');
  box(c, 246, 200, 4, 8, '#7a756a');
  // cadena y candado
  box(c, 196, 182, 12, 3, '#6b675e');
  box(c, 198, 184, 8, 7, '#8a8478');
  box(c, 199, 185, 6, 5, '#5e594f');
  pixel(c, 201, 188, '#2a2721');
}

function props(c) {
  // balde de maíz
  ellipse(c, 92, 196, 12, 4, 'rgba(20,16,10,0.35)');
  poly(c, [[82, 180], [104, 180], [101, 198], [85, 198]], '#6f7a72');
  ellipse(c, 93, 180, 11, 4, '#8b968c');
  ellipse(c, 93, 180, 9, 3, '#c9a95c');
  for (let i = 0; i < 14; i++) {
    const r = rng(i + 3);
    pixel(c, 86 + r() * 14, 178 + r() * 3, '#e0c176');
  }
  poly(c, [[82, 180], [93, 172], [104, 180], [100, 181], [93, 175], [86, 181]], '#4a5049');
  // lata de agua
  box(c, 126, 186, 20, 16, '#7b8280');
  box(c, 126, 186, 20, 2, '#9aa19d');
  box(c, 126, 200, 20, 2, '#5d6561');
  box(c, 132, 180, 8, 6, '#6b7370');
  // maíz tirado
  const r = rng(51);
  for (let i = 0; i < 40; i++) {
    const x = 70 + r() * 300;
    const y = 168 + r() * 42;
    box(c, x, y, 1, 1, r() > 0.4 ? '#d9b862' : '#a88b45');
  }
  // plumas
  for (let i = 0; i < 10; i++) {
    const x = 100 + r() * 250;
    const y = 160 + r() * 46;
    box(c, x, y, 3, 1, withAlpha('#e8e0cb', 0.75));
    pixel(c, x + 1, y + 1, withAlpha('#d5cbb2', 0.7));
  }
}

export default {
  id: 'gallinero',
  title: 'El gallinero',
  width: VW,
  height: VH,
  floorY: 200,
  entryX: 82,
  lights: [{ x: 199, y: 30, r: 84, color: '#ffcf86', a: 0.34 }],
  hotspots: [
    { id: 'patio', x: 0, y: 26, w: 64, h: 134, label: 'Volver al patio', walkX: 36 },
    { id: 'gallinas', x: 262, y: 50, w: 118, h: 96, label: 'Alimentar a las gallinas', walkX: 300 },
    { id: 'trampilla', x: 148, y: 166, w: 108, h: 48, label: 'La trampilla', walkX: 200 },
  ],
  drawStatic(c) {
    walls(c);
    floor(c);
    doorOut(c);
    // haces de luz entre las tablas
    for (const x of [24, 60, 98, 136, 210]) {
      beam(c, x, 14, x - 46, 214, 4, 26, '#ffeebc', 0.08, 0.06);
    }
    nests(c);
    roost(c);
    trapdoor(c);
    props(c);
    bulb(c);
    cobweb(c, 0, 10, 30, '#e8e2d2', 2);
    cobweb(c, 384, 10, 30, '#e8e2d2', 5);
    cobweb(c, 264, 54, 26, '#e8e2d2', 8);
  },
  drawDynamic(c, t, s) {
    const night = s.mode === 'night';
    // gallinas en el palo
    const bobs = [0, 1, 2];
    for (let i = 0; i < 3; i++) {
      const x = 88 + i * 52 + Math.sin(t * 0.4 + i) * 2;
      chicken(c, x, 106, t * (1 + bobs[i] * 0.1), i + 1, i === 1 ? '#d8c9a8' : '#efe7d4', i === 1 ? '#b3a68a' : '#c8bda4');
    }
    chicken(c, 176 + Math.sin(t * 0.35) * 10, 192, t * 0.8, 7, '#e8dfc8', '#c2b79c');
    chicken(c, 226 + Math.cos(t * 0.3) * 8, 206, t * 1.1, 9, '#efe7d4', '#c8bda4');
    dust(c, t, { count: 34, color: '#ffeec4', speed: 5, alpha: 0.6, seed: 8 });
    dust(c, t * 1.4, { count: 12, color: '#d9cfa8', speed: 9, alpha: 0.3, seed: 12 });
    fly(c, 300, 100, t, 12, 2);
    fly(c, 120, 90, t * 1.2, 10, 6);
    if (night) {
      const f = flicker(t, 4);
      glow(c, 199, 30, 88, '#ffcf86', 0.32 * f, 7);
      ellipse(c, 199, 30, 5, 6, mix('#c9a868', '#fff4d6', f));
      glow(c, 202, 190, 34, '#ffe0a0', 0.1);
      box(c, 152, 170, 100, 42, withAlpha('#101820', 0.35));
      // inscripción en la trampilla
      for (let i = 0; i < 6; i++) {
        box(c, 168 + i * 5, 186, 3, 1, withAlpha('#d8cba0', 0.55));
      }
      for (let i = 0; i < 4; i++) {
        box(c, 196 + i * 5, 186, 3, 1, withAlpha('#d8cba0', 0.55));
      }
      box(c, 190, 184, 1, 6, withAlpha('#d8cba0', 0.4));
      glow(c, 204, 186, 30, '#c8b070', 0.12, 5);
      // alguien parado en la puerta
      if (s.flags?.alambre) alambreMan(c, 30, 155, t, { h: 28 });
    } else {
      box(c, 195, 24, 8, 2, '#cfc9bb');
      ellipse(c, 199, 30, 5, 6, '#cfc9bb');
    }
  },
};