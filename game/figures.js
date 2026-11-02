// Figuras humanas del juego: siluetas dibujadas píxel por píxel.
import { box, pixel, ellipse, poly, withAlpha, glow, mix } from './pixel';

// El Hombre del Alambre: inmóvil, apenas más alto que un poste, envuelto en hilos.
export function alambreMan(c, x, y, t, opts = {}) {
  const h = opts.h || 34;
  const k = h / 34;
  const X = Math.round(x);
  const Y = Math.round(y);
  const dark = opts.color || '#0a0a0d';
  const rim = opts.rim || '#7f8798';

  ellipse(c, X, Y, Math.max(3, Math.round(7 * k)), 1, withAlpha('#000000', 0.32));
  // piernas
  box(c, X - 2 * k, Y - 12 * k, Math.max(1, Math.round(1.6 * k)), 12 * k, dark);
  box(c, X + 1.2 * k, Y - 12 * k, Math.max(1, Math.round(1.6 * k)), 12 * k, dark);
  // saco largo
  poly(c, [
    [X - 6 * k, Y - 10 * k],
    [X + 6 * k, Y - 10 * k],
    [X + 5 * k, Y - 25 * k],
    [X - 5 * k, Y - 25 * k],
  ], dark);
  // brazos pegados al cuerpo
  box(c, X - 7.2 * k, Y - 24 * k, Math.max(1, Math.round(1.8 * k)), 13 * k, dark);
  box(c, X + 5.4 * k, Y - 24 * k, Math.max(1, Math.round(1.8 * k)), 13 * k, dark);
  // cuello y cabeza, apenas inclinada
  box(c, X - 1 * k, Y - 27 * k, Math.max(1, Math.round(2 * k)), 3 * k, dark);
  ellipse(c, X + 0.6 * k, Y - 29 * k, 3.2 * k, 3.4 * k, dark);
  // hilos de alambre
  c.fillStyle = withAlpha(rim, 0.2);
  for (let i = 0; i < 5; i++) {
    const a = i / 5;
    const len = Math.round(13 * k);
    for (let s = 0; s < len; s++) {
      const off = Math.sin(s * 0.45 + a * 6 + t * 0.3) * (1 + s * 0.25);
      c.fillRect(Math.round(X - 6 * k + a * 12 * k + off), Math.round(Y - 24 * k + s), 1, 1);
    }
  }
  box(c, X - 6 * k, Y - 25 * k, Math.round(12 * k), 1, withAlpha(rim, 0.14));
  // dos reflejos donde irían los ojos
  const blink = Math.max(0, Math.sin(t * 0.6 + 1.2));
  if (blink > 0.55) {
    const a = (blink - 0.55) / 0.45;
    pixel(c, Math.round(X), Math.round(Y - 29 * k), withAlpha('#e9eef8', 0.5 * a));
    pixel(c, Math.round(X + 1.8 * k), Math.round(Y - 29 * k), withAlpha('#e9eef8', 0.5 * a));
  }
  glow(c, X, Y - 29 * k, Math.max(2, 5 * k), '#aab6cc', 0.05, 3);
}

// Doña Marta: la almacenera, plantada del lado de acá del alambrado con su farol.
export function marta(c, x, y, t, opts = {}) {
  const X = Math.round(x);
  const Y = Math.round(y);
  const dress = opts.day ? '#3f3f4c' : '#26262e';
  const apron = opts.day ? '#c3bca8' : '#8e897a';
  const skin = opts.day ? '#c99f7a' : '#a98a6c';
  const scarf = opts.day ? '#9c4f4a' : '#6b3a3a';

  ellipse(c, X, Y, 8, 2, withAlpha('#000000', 0.3));
  poly(c, [[X - 8, Y], [X + 8, Y], [X + 5, Y - 18], [X - 5, Y - 18]], dress);
  poly(c, [[X - 4, Y - 1], [X + 4, Y - 1], [X + 3, Y - 17], [X - 3, Y - 17]], apron);
  box(c, X - 4, Y - 26, 9, 9, dress);
  box(c, X - 6, Y - 23, 3, 8, dress);
  box(c, X + 4, Y - 23, 3, 8, dress);
  box(c, X - 4, Y - 19, 9, 2, apron);
  ellipse(c, X, Y - 29, 4, 4, scarf);
  ellipse(c, X, Y - 27, 3, 3, skin);
  pixel(c, X - 1, Y - 28, '#2a2020');
  pixel(c, X + 1, Y - 28, '#2a2020');
  // farol
  box(c, X + 6, Y - 15, 5, 7, '#3b3830');
  box(c, X + 7, Y - 14, 3, 5, '#f5cf7e');
  box(c, X + 7, Y - 16, 3, 1, withAlpha('#ffe6b0', 0.8));
  const f = 0.85 + 0.15 * Math.sin(t * 3 + 1);
  glow(c, X + 8, Y - 11, 18, '#ffca76', 0.24 * f, 5);
}

// Alguien del otro lado de la puerta: silueta parada detrás del vidrio.
export function doorVisitor(c, x, y, t, opts = {}) {
  const kind = opts.kind || 'vecino';
  const X = Math.round(x);
  const Y = Math.round(y + Math.sin(t * 0.8) * 0.8);
  const dark = withAlpha('#080b10', 0.88);

  ellipse(c, X, Y, 8, 2, withAlpha('#000000', 0.28));
  // piernas
  box(c, X - 4, Y - 11, 3, 11, dark);
  box(c, X + 2, Y - 11, 3, 11, dark);
  // abrigo
  poly(c, [[X - 6, Y - 10], [X + 6, Y - 10], [X + 5, Y - 24], [X - 5, Y - 24]], dark);
  box(c, X - 8, Y - 23, 2, 12, dark);
  box(c, X + 6, Y - 23, 2, 12, dark);
  ellipse(c, X, Y - 28, 3.4, 3.6, dark);

  if (kind === 'vecino') {
    // gorra
    box(c, X - 5, Y - 32, 10, 1, dark);
    box(c, X - 4, Y - 34, 8, 3, dark);
  } else {
    // capucha y dos puntos claros donde irían los ojos
    box(c, X - 5, Y - 33, 10, 4, dark);
    box(c, X - 4, Y - 29, 8, 4, dark);
    pixel(c, X - 2, Y - 28, withAlpha('#d8dcd0', 0.55));
    pixel(c, X + 2, Y - 28, withAlpha('#d8dcd0', 0.55));
    box(c, X + 7, Y - 20, 3, 3, withAlpha('#8a8270', 0.75));
    glow(c, X + 8, Y - 18, 10, '#ffd79a', 0.14, 4);
  }

  // la malla del vidrio, por delante
  c.fillStyle = withAlpha('#8b8a7a', 0.18);
  for (let gx = 316; gx < 373; gx += 4) c.fillRect(gx, 52, 1, 94);
}

// Gente del pueblo: vecinos, vendedores, alguno con farol.
export function pueblerino(c, x, y, t, opts = {}) {
  const X = Math.round(x);
  const Y = Math.round(y + Math.sin(t * 0.7) * 0.6);
  const coat = opts.coat || '#2f333a';
  const skin = opts.skin || '#8d7360';
  const hat = opts.hat !== false;

  ellipse(c, X, Y, 7, 2, withAlpha('#000000', 0.32));
  box(c, X - 4, Y - 12, 3, 12, withAlpha('#1a1d22', 0.95));
  box(c, X + 1, Y - 12, 3, 12, withAlpha('#1a1d22', 0.95));
  poly(c, [[X - 7, Y - 10], [X + 7, Y - 10], [X + 5, Y - 24], [X - 5, Y - 24]], coat);
  box(c, X - 8, Y - 23, 3, 13, coat);
  box(c, X + 5, Y - 23, 3, 13, coat);
  box(c, X - 1, Y - 24, 2, 14, withAlpha('#000000', 0.18));
  box(c, X - 1, Y - 27, 3, 3, skin);
  ellipse(c, X, Y - 29, 3.4, 3.6, skin);
  if (hat) {
    box(c, X - 5, Y - 32, 10, 2, '#22262b');
    box(c, X - 3, Y - 35, 7, 3, '#22262b');
  }
  if (opts.lantern) {
    const f = 0.8 + 0.2 * Math.sin(t * 5.5);
    box(c, X + 6, Y - 22, 1, 4, '#3b3830');
    box(c, X + 5, Y - 18, 4, 5, '#2b2822');
    box(c, X + 6, Y - 17, 2, 3, mix('#ffcf7a', '#fff3cf', f));
    glow(c, X + 6, Y - 15, 26, '#ffb95e', 0.22 * f, 5);
  }
}

// El plato que alguien deja servido todas las noches.
export function plateServed(c, x, y) {
  const X = Math.round(x);
  const Y = Math.round(y);
  ellipse(c, X, Y, 10, 3, withAlpha('#000000', 0.3));
  ellipse(c, X, Y - 1, 10, 4, '#e0d9c6');
  ellipse(c, X, Y - 2, 8, 3, '#cfc7b2');
  ellipse(c, X - 1, Y - 3, 5, 2, '#8a5f3a');
  ellipse(c, X - 2, Y - 4, 3, 1, '#a2713f');
  box(c, X + 3, Y - 4, 3, 1, '#6d7a4a');
  // tenedor
  box(c, X + 10, Y - 5, 1, 6, '#a8a294');
  for (let i = 0; i < 3; i++) box(c, X + 9 + i, Y - 7, 1, 2, '#a8a294');
  glow(c, X, Y - 4, 16, '#ffca76', 0.08, 4);
}