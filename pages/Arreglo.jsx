import React from 'react';

export default function Arreglo() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          In the Middle of the Rancho
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Archivo corregido
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          El juego no arrancaba por un solo carácter: faltaba la llave <code className="font-mono text-foreground">{'}'}</code> que
          cierra la última función al final de <code className="font-mono text-foreground">props.js</code>. Acá tenés el archivo
          completo, listo para reemplazar el tuyo. No hace falta tocar nada más: el resto de tu ZIP ya está correcto.
        </p>

        <a
          href="/arreglo/props.js"
          download="props.js"
          className="mt-8 inline-flex w-fit items-center gap-2 border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
        >
          Descargar props.js
        </a>

        <ol className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="font-mono text-foreground">1.</span> Descargá el archivo con el botón de arriba.
          </li>
          <li>
            <span className="font-mono text-foreground">2.</span> Copialo dentro de tu proyecto, en la carpeta{' '}
            <code className="font-mono text-foreground">src/game/</code>, reemplazando el que está (mismo nombre: props.js).
          </li>
          <li>
            <span className="font-mono text-foreground">3.</span> En la terminal, volvé a correr{' '}
            <code className="font-mono text-foreground">npm run dev</code> y abrí la dirección que muestra.
          </li>
        </ol>
      </div>
    </div>
  );
}