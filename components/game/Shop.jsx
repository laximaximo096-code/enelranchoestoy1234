import React from 'react';

export default function Shop({ shop, money, bag, onBuy, onClose }) {
  const carry = shop.items
    .filter((item) => bag[item.id])
    .map((item) => `${bag[item.id]} ${item.name.toLowerCase()}`);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 px-3 py-4">
      <div className="w-full max-w-md border border-amber-200/20 bg-stone-950/95 p-4">
        <p className="font-mono text-[8px] tracking-[0.35em] text-amber-200/70">{shop.sign}</p>
        <p className="mt-1 font-display text-lg leading-tight text-stone-100">{shop.vendor}</p>
        <p className="mt-2 font-body text-sm italic leading-snug text-stone-400">{shop.hello}</p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-y border-amber-200/10 py-1.5 font-mono text-[8px] tracking-[0.2em] text-stone-400">
          <span className="text-amber-200/80">TENÉS ${money}</span>
          <span>{carry.length ? `LLEVÁS ${carry.join(' · ').toUpperCase()}` : 'NO LLEVÁS NADA'}</span>
        </div>

        <ul className="mt-2 max-h-52 space-y-1 overflow-y-auto pr-1">
          {shop.items.map((item) => {
            const short = money < item.price;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onBuy(item)}
                  className={`flex w-full items-center justify-between gap-3 border border-transparent px-2 py-1.5 text-left transition-colors hover:border-amber-200/25 hover:bg-amber-100/5 ${
                    short ? 'opacity-40' : ''
                  }`}
                >
                  <span className="font-body text-sm text-stone-200">{item.name}</span>
                  <span className="font-mono text-[9px] text-amber-200/80">${item.price}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={onClose}
          className="mt-3 w-full border border-amber-200/25 py-1.5 font-mono text-[9px] tracking-[0.3em] text-stone-300 transition-colors hover:bg-amber-100/10 hover:text-amber-100"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
}