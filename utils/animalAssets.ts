import { IMAGES } from "@/constants/images";

export type AnimalEmotion = "happy" | "sad" | "angry" | "confused" | "fear" | "shame";
export type AnimalImageKind = "head" | "variant" | "emotion";

export function getAnimalHeadImage(animal_key: string) {
  // Ejemplo: HAPPY_AXOLOTL_HEAD
  const key = `HAPPY_${animal_key.toUpperCase()}_HEAD`;
  return IMAGES[key] || IMAGES["UNKNOWN_HEAD"];
}

export function getAnimalVariantImage(animal_key: string, emotion: AnimalEmotion, variant: number) {
  // Ejemplo: HAPPY_AXOLOTL_3
  const key = `${emotion.toUpperCase()}_${animal_key.toUpperCase()}_${variant}`;
  return IMAGES[key] || IMAGES["UNKNOWN_HEAD"];
}

export function getAnimalEmotionImage(animal_key: string, emotion: AnimalEmotion): any[] {
  // Devuelve todas las imagenes de la emocion para el animal sin el head
  const prefix = `${emotion.toUpperCase()}_${animal_key.toUpperCase()}`;
  return Object.entries(IMAGES)
    .filter(([key]) => key.startsWith(prefix) && !key.endsWith("_HEAD"))
    .map(([, value]) => value);
}
