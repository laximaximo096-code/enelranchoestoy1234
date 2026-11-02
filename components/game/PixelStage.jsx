import React, { useEffect, useRef, useState } from 'react';
import { VW, VH, clamp } from '@/game/pixel';
import { drawHero } from '@/game/character';

const cache = new Map();

const WALK_KEYS = { a: 'left', arrowleft: 'left', d: 'right', arrowright: 'right' };
const USE_KEYS = ['w', 's', 'e', 'arrowup', 'arrowdown', ' '];

function nearestHotspot(room, x) {
  let best = null;
  let dist = Infinity;
  for (const h of room.hotspots || []) {
    const cx = h.walkX ?? h.x + h.w / 2;
    const d = Math.abs(cx - x);
    if (d < dist) {
      dist = d;
      best = h;
    }
  }
  return best;
}

function buildCache(room, mode) {
  const cv = document.createElement('canvas');
  cv.width = room.width;
  cv.height = room.height;
  const cx = cv.getContext('2d');
  cx.imageSmoothingEnabled = false;
  room.drawStatic(cx, mode);
  if (mode === 'night') {
    cx.globalCompositeOperation = 'multiply';
    cx.fillStyle = '#6b7ba4';
    cx.fillRect(0, 0, cv.width, cv.height);
    cx.globalCompositeOperation = 'source-over';
    cx.fillStyle = 'rgba(10,16,32,0.28)';
    cx.fillRect(0, 0, cv.width, cv.height);
  }
  return cv;
}

function getCache(room, mode) {
  const key = `${room.id}:${mode}`;
  let cv = cache.get(key);
  if (!cv) {
    cv = buildCache(room, mode);
    cache.set(key, cv);
  }
  return cv;
}

export default function PixelStage({ room, mode = 'day', camera, heroRef, onAction, interactive = true, flags = {}, labels = {} }) {
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);
  const live = useRef({});
  live.current = { room, mode, camera, interactive, heroRef, flags };
  const actionRef = useRef(onAction);
  actionRef.current = onAction;
  const keys = useRef({ left: false, right: false });

  useEffect(() => {
    const onDown = (e) => {
      const k = e.key.toLowerCase();
      if (WALK_KEYS[k]) {
        keys.current[WALK_KEYS[k]] = true;
        e.preventDefault();
        return;
      }
      if (!USE_KEYS.includes(k) || e.repeat || !live.current.interactive) return;
      e.preventDefault();
      const hero = live.current.heroRef?.current;
      const room = live.current.room;
      if (!hero || !room) return;
      const hit = nearestHotspot(room, hero.x);
      if (!hit) return;
      hero.target = hit.walkX ?? hero.x;
      hero.pending = hit.id;
    };
    const onUp = (e) => {
      const k = e.key.toLowerCase();
      if (WALK_KEYS[k]) keys.current[WALK_KEYS[k]] = false;
    };
    const onBlur = () => {
      keys.current.left = false;
      keys.current.right = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let raf = 0;
    let last = performance.now();
    const start = last;

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;
      const { room: rm, mode: md, camera: cam, heroRef: hr, flags: fl } = live.current;

      const zoom = Math.max(1, Math.round(cam?.zoom || 1));
      const vw = Math.round(VW / zoom);
      const vh = Math.round(VH / zoom);
      const sx = clamp(Math.round(cam?.x || 0), 0, rm.width - vw);
      const sy = clamp(Math.round(cam?.y || 0), 0, rm.height - vh);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#08070a';
      ctx.fillRect(0, 0, VW, VH);
      ctx.drawImage(getCache(rm, md), sx, sy, vw, vh, 0, 0, VW, VH);

      ctx.setTransform(zoom, 0, 0, zoom, -sx * zoom, -sy * zoom);
      const hero = hr?.current;
      if (hero) {
        const dir = (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0);
        if (dir !== 0 && live.current.interactive) {
          hero.pending = null;
          hero.target = null;
          hero.x = clamp(hero.x + dir * dt * 132, rm.minX ?? 14, rm.maxX ?? rm.width - 14);
          hero.moving = true;
        } else {
          const target = hero.target ?? hero.x;
          const dx = target - hero.x;
          if (Math.abs(dx) > 0.8) {
            hero.x += Math.sign(dx) * Math.min(Math.abs(dx), dt * 132);
            hero.moving = true;
          } else {
            hero.x = target;
            hero.moving = false;
            if (hero.pending) {
              const action = hero.pending;
              hero.pending = null;
              actionRef.current?.(action);
            }
          }
        }
      }
      rm.drawDynamic?.(ctx, t, {
        mode: md,
        heroX: hero ? hero.x : rm.entryX,
        flags: fl || {},
      });
      if (hero) drawHero(ctx, hero.x, rm.floorY, t, { moving: hero.moving });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toRoom = (e) => {
    const canvas = canvasRef.current;
    const { room: rm, camera: cam } = live.current;
    const rect = canvas.getBoundingClientRect();
    const zoom = Math.max(1, Math.round(cam?.zoom || 1));
    const vw = VW / zoom;
    const vh = VH / zoom;
    const sx = clamp(Math.round(cam?.x || 0), 0, rm.width - vw);
    const sy = clamp(Math.round(cam?.y || 0), 0, rm.height - vh);
    const x = sx + ((e.clientX - rect.left) / rect.width) * vw;
    const y = sy + ((e.clientY - rect.top) / rect.height) * vh;
    return { x, y };
  };

  const hitAt = (p) => {
    const rm = live.current.room;
    return rm.hotspots?.find(
      (h) => p.x >= h.x && p.x <= h.x + h.w && p.y >= h.y && p.y <= h.y + h.h
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        width={VW}
        height={VH}
        className="h-full w-full"
        style={{ imageRendering: 'pixelated', cursor: hover && interactive ? 'pointer' : 'default' }}
        onClick={(e) => {
          if (!interactive) return;
          const hit = hitAt(toRoom(e));
          if (!hit) return;
          const hero = heroRef?.current;
          if (hero) {
            hero.target = hit.walkX ?? hero.x;
            hero.pending = hit.id;
          } else {
            onAction?.(hit.id);
          }
        }}
        onMouseMove={(e) => {
          if (!interactive) return;
          const hit = hitAt(toRoom(e));
          setHover(hit ? labels[hit.id] || hit.label : null);
        }}
        onMouseLeave={() => setHover(null)}
      />
      {hover && interactive && (
        <div className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 rounded-sm border border-amber-200/25 bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-100/90">
          {hover}
        </div>
      )}
    </div>
  );
}