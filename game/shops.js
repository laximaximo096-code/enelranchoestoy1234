// Los locales del centro del pueblo: quién atiende y qué se puede comprar
// para pasar el apagón.
export const VENDORS = {
  almacen: {
    id: 'almacen',
    sign: 'ALMACÉN DE RAMOS GENERALES',
    vendor: 'DOÑA NELIDA',
    hello: '«Pasá, m\'hijo. Desde el apagón no hay hielo ni nafta, pero en la estantería algo queda.»',
    items: [
      { id: 'velas', name: 'Vela de sebo', price: 12 },
      { id: 'fosforos', name: 'Fósforos', price: 5 },
      { id: 'agua', name: 'Agua de pozo (2 L)', price: 8 },
      { id: 'yerba', name: 'Yerba de monte (1 kg)', price: 18 },
      { id: 'pan', name: 'Pan del día', price: 6 },
    ],
  },
  ferreteria: {
    id: 'ferreteria',
    sign: 'FERRETERÍA «LA TUERCA»',
    vendor: 'VIDAL, EL FERRETERO',
    hello: '«Linternas me quedan dos. Después de anoche, todo el pueblo quiere linternas.»',
    items: [
      { id: 'linterna', name: 'Linterna a manija', price: 38 },
      { id: 'baterias', name: 'Par de baterías', price: 14 },
      { id: 'carbon', name: 'Bolsa de carbón', price: 22 },
      { id: 'soga', name: 'Soga de diez metros', price: 16 },
    ],
  },
  farmacia: {
    id: 'farmacia',
    sign: 'FARMACIA DE LA PLAZA',
    vendor: 'ALICIA, LA FARMACÉUTICA',
    hello: '«La mitad del pueblo vino a buscar algo para dormir. Para eso no tengo nada.»',
    items: [
      { id: 'alcohol', name: 'Alcohol fino', price: 9 },
      { id: 'gasa', name: 'Rollo de gasa', price: 11 },
      { id: 'aspirinas', name: 'Aspirinas', price: 7 },
      { id: 'termometro', name: 'Termómetro', price: 25 },
    ],
  },
  boliche: {
    id: 'boliche',
    sign: 'BOLICHE «EL OMBÚ»',
    vendor: 'TITO, EL DEL BOLICHE',
    hello: '«Si venís a preguntar por la luz, no sé nada. Si venís a comprar, tampoco hay hielo.»',
    items: [
      { id: 'gaseosa', name: 'Gaseosa de litro', price: 10 },
      { id: 'picadillo', name: 'Lata de picadillo', price: 9 },
      { id: 'vino', name: 'Vino de la casa', price: 15 },
      { id: 'queso', name: 'Queso de campo', price: 13 },
    ],
  },
};