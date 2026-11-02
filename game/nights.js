// Las noches del apagón: quién golpea la puerta y qué dice la radio.
export const NIGHTS = [
  {
    clock: '23:40',
    date: 'NOCHE 1 · 17 OCT 2007',
    kind: 'vecino',
    who: 'DON CEJAS',
    knock: '«¿Hay alguien? Soy don Cejas, del pueblo. No vengo a molestar.»',
    line: '«¿Tenés velas, pibe? A la ruta no sube nadie. En el pueblo no hay luz ni teléfono.»',
    whisper: '«No me abras si no querés. Pero escuchá: a la ruta no sube nadie, y en el pueblo no hay luz ni teléfono.»',
    ignore: 'Apagaste la luz y no contestaste. Del otro lado alguien deja algo en el umbral y se va. En el piso hay una vela nueva.',
    intro: 'Se cortó la luz a las 23:40. En la radio dicen que el apagón va para largo. Y alguien golpea la puerta.',
    radio: 'Corte general en todo el partido. Desde la cooperativa estiman al menos tres noches sin servicio. Y después, más bajo: se reportaron casos de desorientación y crisis nerviosas en la zona rural.',
  },
  {
    clock: '01:20',
    date: 'NOCHE 2 · 18 OCT 2007',
    kind: 'desconocido',
    who: 'DESCONOCIDO',
    knock: 'La voz es tranquila y no pide nada. Habla como quien ya sabe la respuesta.',
    line: '«No soy del pueblo. Vengo de la ruta. Si alguien te ofrece cambiar de lugar con vos, no aceptes.»',
    whisper: '«No hace falta que me abras. Solo quiero que sepas que en el pueblo hay dos de vos. El otro está más tranquilo.»',
    ignore: 'No contestaste. Los golpes siguieron un rato, con paciencia de máquina. Después, nada.',
    intro: 'Segunda noche. Afuera hay un tipo parado que no se va. La radio sigue hablando del apagón.',
    radio: 'El apagón se extiende: cuatro noches más y sin fecha de restablecimiento. Y después: salud confirmó nuevos casos de locura. Dos internados que dicen haber visto su casa repetida al final del camino.',
  },
  {
    clock: '03:31',
    date: 'NOCHE 3 · 19 OCT 2007',
    kind: 'desconocido',
    who: 'EL DE LA VOZ DE BETO',
    knock: 'La voz es la del tío. Pero el tío está durmiendo adentro, y no se despertó con los golpes.',
    line: '«Soy yo, pibe. Abrime. Hace dos noches que estoy afuera.» Adentro, el tío sigue roncando.',
    whisper: '«Soy yo, pibe. Abrime.» Y la voz se quiebra igual que la del tío cuando miente.',
    ignore: 'No contestaste. La voz insistió con tu nombre, cada vez más parecida a la del tío. Después se rió y se fue.',
    intro: 'Tercera noche. Golpean con la voz del tío. Pero el tío está durmiendo adentro.',
    radio: 'La cooperativa confirmó que no hay personal para restablecer el servicio. El apagón sigue sin fecha. Siete casos de locura en el partido. Todos hablan de una puerta abajo de un gallinero.',
  },
];

export const KNOCK_HINT = 'ALGUIEN GOLPEA LA PUERTA DE LA COCINA';