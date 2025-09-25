// Mapeo de archivos de audio para historias y respuestas
export const STORY_AUDIOS = {
  1: require('@/assets/sounds/stories/test_1.mp3'),
  2: require('@/assets/sounds/stories/test_2.mp3'),
  3: require('@/assets/sounds/stories/test_3.mp3'),
  4: require('@/assets/sounds/stories/test_4.mp3'),
  5: require('@/assets/sounds/stories/test_5.mp3'),
  6: require('@/assets/sounds/stories/test_6.mp3'),
  7: require('@/assets/sounds/stories/test_7.mp3'),
  8: require('@/assets/sounds/stories/test_8.mp3'),
  9: require('@/assets/sounds/stories/test_9.mp3'),
  10: require('@/assets/sounds/stories/test_10.mp3'),
} as const;

export const ANSWER_AUDIOS = {
  1: require('@/assets/sounds/stories/ans_1.mp3'),
  2: require('@/assets/sounds/stories/ans_2.mp3'),
  3: require('@/assets/sounds/stories/ans_3.mp3'),
  4: require('@/assets/sounds/stories/ans_4.mp3'),
  5: require('@/assets/sounds/stories/ans_5.mp3'),
  6: require('@/assets/sounds/stories/ans_6.mp3'),
  7: require('@/assets/sounds/stories/ans_7.mp3'),
  8: require('@/assets/sounds/stories/ans_8.mp3'),
  9: require('@/assets/sounds/stories/ans_9.mp3'),
  10: require('@/assets/sounds/stories/ans_10.mp3'),
} as const;

export type AudioNumber = keyof typeof STORY_AUDIOS;