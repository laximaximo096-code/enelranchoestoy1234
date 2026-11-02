import React, { useEffect, useState } from 'react';

const OPTIONS = [
  { id: 'abrir', label: 'Abrir la puerta', note: 'Que te vea la cara.' },
  { id: 'rendija', label: 'Hablar sin abrir', note: 'Pegar la boca a la madera.' },
  { id: 'ignorar', label: 'Apagar la luz y no contestar', note: 'Esperar que se vaya.' },
];

export default function DoorChoice({ night, onChoose }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      const i = ['1', '2', '3'].indexOf(e.key);
      if (i >= 0) onChoose(OPTIONS[i].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onChoose]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-black/30 px-4 pb-6 pt-10 sm:px-10 sm:pb-10">
      <div className="slow-fade-in mx-auto w-full max-w-2xl">
        <p className="font-mono text-[6px] tracking-[0.45em] text-amber-200/50 sm:text-[7px]">TOC · TOC · TOC</p>
        <p className="mt-2 font-display text-base italic leading-snug text-stone-200 sm:text-xl">{night.knock}</p>

        <div className="mt-4 flex flex-col gap-[2px] border-t border-amber-100/10 pt-3 sm:mt-6">
          {OPTIONS.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChoose(opt.id)}
              onMouseEnter={() => setActive(opt.id)}
              onMouseLeave={() => setActive(null)}
              className="group flex items-baseline gap-3 py-2 text-left transition-colors"
            >
              <span className="font-mono text-[6px] text-amber-200/40 sm:text-[7px]">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block font-display text-[13px] leading-tight transition-colors sm:text-base ${
                    active === opt.id ? 'text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="mt-0.5 block font-mono text-[5px] uppercase tracking-[0.22em] text-stone-600 sm:text-[6px]">
                  {opt.note}
                </span>
              </span>
              <span
                className={`font-mono text-[8px] transition-opacity ${
                  active === opt.id ? 'text-amber-200/80 opacity-100' : 'opacity-0'
                }`}
              >
                ›
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}