// Datos locales para test psicométrico - 10 historias más relevantes
export interface PsychometricTestQuestion {
  id: string;
  title: string;
  story: string;
  image_url: string;
  emotion_id: string;
  question: string;
  answers: PsychometricAnswer[];
}

export interface PsychometricAnswer {
  id: string;
  answer_text: string;
  emotion_id: string;
  emotion_name: string;
  score: number;
}

export const LOCAL_PSYCHOMETRIC_TEST: PsychometricTestQuestion[] = [
  // 1. TRISTEZA - Falla académica
  {
    id: "test_1",
    title: "Reprobaste una tarea",
    story: "Reprobaste una tarea en la escuela en la que te habías esforzado mucho.",
    image_url: "FAILED_ASSIGNMENT",
    emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_1_1",
        answer_text: "Me dieron ganas de llorar.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      },
      {
        id: "ans_1_2",
        answer_text: "Sentí una gran injusticia.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_1_3",
        answer_text: "Empecé a imaginar cosas aterradoras.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_1_4",
        answer_text: "Quería que la tierra me tragara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      }
    ]
  },
  // 2. FELICIDAD - Éxito académico
  {
    id: "test_2",
    title: "Buenas calificaciones",
    story: "Te sacaste una buena calificación y tu maestra te felicitó frente a todos.",
    image_url: "GOOD_GRADES",
    emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_2_1",
        answer_text: "¡Me sentí muy feliz y orgulloso de mí mismo!",
        emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
        emotion_name: "Felicidad",
        score: 100
      },
      {
        id: "ans_2_2",
        answer_text: "No sabía dónde meter la cara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      },
      {
        id: "ans_2_3",
        answer_text: "Me puse rojo de coraje.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_2_4",
        answer_text: "Me quedé paralizado del susto.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      }
    ]
  },
  // 3. TRISTEZA - Pérdida de mascota
  {
    id: "test_3",
    title: "Tu mascota se perdió",
    story: "Tu mascota favorita se perdió o murió.",
    image_url: "PET_LOST",
    emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_3_1",
        answer_text: "Estuve triste todo el día.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      },
      {
        id: "ans_3_2",
        answer_text: "Me tapé con la cobija esperando que pasara.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_3_3",
        answer_text: "Me dieron muchas ganas de gritarle.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_3_4",
        answer_text: "No sabía dónde meter la cara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      }
    ]
  },
  // 4. TRISTEZA - Exclusión social
  {
    id: "test_4",
    title: "No te invitaron a la fiesta",
    story: "No te invitaron a una fiesta a la que fueron otros amigos.",
    image_url: "NO_INVITE",
    emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_4_1",
        answer_text: "Sentí un vacío en el pecho.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      },
      {
        id: "ans_4_2",
        answer_text: "Me tapé con la cobija esperando que pasara.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_4_3",
        answer_text: "No podía dejar de sonreír, fue genial.",
        emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
        emotion_name: "Felicidad",
        score: 100
      },
      {
        id: "ans_4_4",
        answer_text: "Quería que la tierra me tragara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      }
    ]
  },
  // 5. ENOJO - Injusticia
  {
    id: "test_5",
    title: "Te acusaron injustamente",
    story: "Te acusaron de algo que tú no hiciste en la escuela.",
    image_url: "FALSE_ACCUSATION",
    emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_5_1",
        answer_text: "Sentí una gran injusticia.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_5_2",
        answer_text: "Me quedé paralizado del susto.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_5_3",
        answer_text: "¡Me sentí muy feliz y orgulloso de mí mismo!",
        emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
        emotion_name: "Felicidad",
        score: 100
      },
      {
        id: "ans_5_4",
        answer_text: "No tenía ganas de hablar con nadie.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      }
    ]
  },
  // 6. ENOJO - Traición de confianza
  {
    id: "test_6",
    title: "Contaron tu secreto",
    story: "Le contaste un secreto a tu amigo y él lo contó a los demás.",
    image_url: "SECRET_BETRAYED",
    emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_6_1",
        answer_text: "Me enojé tanto que me alejé sin decir nada.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_6_2",
        answer_text: "No sabía qué hacer, estaba muy asustado.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_6_3",
        answer_text: "No tenía ganas de hablar con nadie.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      },
      {
        id: "ans_6_4",
        answer_text: "Sentí que todos me miraban y me puse rojo.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      }
    ]
  },
  // 7. MIEDO - Situación médica
  {
    id: "test_7",
    title: "Miedo a una inyección",
    story: "Vas al doctor y te dicen que te van a poner una inyección.",
    image_url: "INJECTION_FEAR",
    emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_7_1",
        answer_text: "Empecé a imaginar cosas aterradoras.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_7_2",
        answer_text: "Quería que la tierra me tragara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      },
      {
        id: "ans_7_3",
        answer_text: "¡Me sentí muy feliz y orgulloso de mí mismo!",
        emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
        emotion_name: "Felicidad",
        score: 100
      },
      {
        id: "ans_7_4",
        answer_text: "Me dieron muchas ganas de gritarle.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      }
    ]
  },
  // 8. MIEDO - Pérdida temporal de padres
  {
    id: "test_8",
    title: "Te perdiste en una tienda",
    story: "Te perdiste por un momento en una tienda y no veías a tus papás.",
    image_url: "LOST_STORE",
    emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_8_1",
        answer_text: "Empecé a imaginar cosas aterradoras.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      },
      {
        id: "ans_8_2",
        answer_text: "Me enojé tanto que me alejé sin decir nada.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_8_3",
        answer_text: "Me tapé la cara con las manos del bochorno.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      },
      {
        id: "ans_8_4",
        answer_text: "Sentí un vacío en el pecho.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      }
    ]
  },
  // 9. VERGÜENZA - Situación académica pública
  {
    id: "test_9",
    title: "No supiste la respuesta",
    story: "Te tocó pasar al pizarrón y no sabías la respuesta.",
    image_url: "NO_ANSWER",
    emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_9_1",
        answer_text: "Quería que la tierra me tragara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      },
      {
        id: "ans_9_2",
        answer_text: "Me enojé tanto que me alejé sin decir nada.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_9_3",
        answer_text: "Me dieron ganas de llorar.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      },
      {
        id: "ans_9_4",
        answer_text: "Me tapé con la cobija esperando que pasara.",
        emotion_id: "8897ef96-09c0-46bb-92d1-b0ae32533626",
        emotion_name: "Miedo",
        score: 100
      }
    ]
  },
  // 10. VERGÜENZA - Situación física pública
  {
    id: "test_10",
    title: "Caíste en el recreo",
    story: "Te caíste frente a todos en el recreo.",
    image_url: "FALL_RECESS",
    emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
    question: "¿Cómo te sentiste cuando pasó esto?",
    answers: [
      {
        id: "ans_10_1",
        answer_text: "Quería que la tierra me tragara.",
        emotion_id: "d6144727-41d5-4a14-8a63-3ea67c5fd7ba",
        emotion_name: "Verguenza",
        score: 100
      },
      {
        id: "ans_10_2",
        answer_text: "Me puse rojo de coraje.",
        emotion_id: "832c39b7-d20b-4ae9-bd94-d3163ba949a7",
        emotion_name: "Enojo",
        score: 100
      },
      {
        id: "ans_10_3",
        answer_text: "¡Me sentí muy feliz y orgulloso de mí mismo!",
        emotion_id: "6f359b86-9858-45d8-8de2-1a4069a3a5fe",
        emotion_name: "Felicidad",
        score: 100
      },
      {
        id: "ans_10_4",
        answer_text: "No tenía ganas de hablar con nadie.",
        emotion_id: "ac5be64f-4ef1-4f99-b011-574fcc9959df",
        emotion_name: "Tristeza",
        score: 100
      }
    ]
  }
];