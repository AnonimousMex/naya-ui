// Datos locales para el juego Memociones
export interface MemocionPair {
  pairId: string;
  emotion: string;
  situation: string;
  animalKey: string; // Para asegurar que la imagen coincida con la situación
}

export const LOCAL_MEMOCIONES_PAIRS: MemocionPair[] = [
  {
    pairId: "pair_1",
    emotion: "felicidad",
    situation: "Bambu sonrió al encontrar bambú fresco en el bosque.",
    animalKey: "panda"
  },
  {
    pairId: "pair_2", 
    emotion: "tristeza",
    situation: "Mish se entristeció cuando su juguete favorito se rompió.",
    animalKey: "cat"
  },
  {
    pairId: "pair_3",
    emotion: "enojo",
    situation: "Leono se enojó cuando lo despertaron de su siesta.",
    animalKey: "lion"
  },
  {
    pairId: "pair_4",
    emotion: "miedo",
    situation: "Ajolito se asustó al escuchar un ruido extraño.",
    animalKey: "axolotl"
  },
  {
    pairId: "pair_5",
    emotion: "verguenza",
    situation: "Bony se sintió avergonzado al tropezar frente a todos.",
    animalKey: "bunny"
  },
  {
    pairId: "pair_6",
    emotion: "felicidad",
    situation: "Mish saltó de alegría al ver a su dueño llegar a casa.",
    animalKey: "cat"
  }
];