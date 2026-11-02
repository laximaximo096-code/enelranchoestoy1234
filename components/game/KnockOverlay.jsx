import React from 'react';

export default function KnockOverlay({ hint }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-24">
      <div className="border border-amber-200/25 bg-black/70 px-3 py-1.5 text-center">
        <p className="flicker-text font-mono text-[9px] tracking-[0.34em] text-amber-100/90 sm:text-[11px]">
          TOC · TOC · TOC
        </p>
        <p className="mt-1 font-mono text-[6px] tracking-[0.22em] text-stone-400 sm:text-[7px]">{hint}</p>
      </div>
    </div>
  );
}