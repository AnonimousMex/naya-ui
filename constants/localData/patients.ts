// Datos locales de pacientes para las pantallas de terapeuta
export interface LocalPatient {
  patient_id: string;
  name: string;
  age: number;
  birth_date: string;
  address: string;
  phone: string;
  tutor_name: string;
  tutor_relationship: string;
  emergency_contact: string;
  emergency_phone: string;
  animal_id: string;
  avatar: string;
  circleColor: string;
  // Información del último test
  lastTestDate?: string;
  predominantEmotion?: string;
  // Próxima cita
  nextAppointment?: {
    date: string;
    time: string;
    type: string;
  };
  // Estadísticas de progreso
  totalSessions?: number;
  moodImprovement?: number; // porcentaje de mejora
  status: 'active' | 'completed' | 'paused';
}

export interface LocalTestResult {
  patient_id: string;
  patient_name: string;
  test_date: string;
  predominantEmotion: string;
  emotionCounts: {
    Felicidad: number;
    Enojo: number;
    Tristeza: number;
    Vergüenza: number;
    Miedo: number;
  };
  answers: Array<{
    questionId: number;
    selectedAnswer: string;
    emotion: string;
  }>;
  recommendations: string[];
}

export const LOCAL_PATIENTS: LocalPatient[] = [
  {
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0",
    name: "Daniel",
    age: 8,
    birth_date: "2016-03-15",
    address: "Calle Reforma 456, Ciudad de México",
    phone: "+52 555 234 5678",
    tutor_name: "María González",
    tutor_relationship: "Madre",
    emergency_contact: "Carlos González",
    emergency_phone: "+52 555 234 5679",
    animal_id: "550e8400-e29b-41d4-a716-446655440004", // Bambu - Panda
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#E8A87C",
    lastTestDate: "2024-09-20",
    predominantEmotion: "Tristeza",
    nextAppointment: {
      date: "2024-10-15",
      time: "10:00",
      type: "Terapia Individual"
    },
    totalSessions: 8,
    moodImprovement: 65,
    status: "active"
  },
  {
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2",
    name: "Hugo",
    age: 7,
    birth_date: "2017-07-22",
    address: "Av. Insurgentes 789, Ciudad de México", 
    phone: "+52 555 345 6789",
    tutor_name: "Carlos Ramírez",
    tutor_relationship: "Padre",
    emergency_contact: "Elena Ramírez",
    emergency_phone: "+52 555 345 6790",
    animal_id: "550e8400-e29b-41d4-a716-446655440010", // Mish - Cat
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#7FB3D3",
    lastTestDate: "2024-09-18",
    predominantEmotion: "Enojo",
    nextAppointment: {
      date: "2024-10-16",
      time: "11:00",
      type: "Terapia Lúdica"
    },
    totalSessions: 12,
    moodImprovement: 78,
    status: "active"
  },
  {
    patient_id: "a1b2c3d4-e5f6-7890-1234-567890abcde1",
    name: "Sofia González",
    age: 9,
    birth_date: "2015-11-08",
    address: "Calle Juárez 321, Ciudad de México",
    phone: "+52 555 456 7890",
    tutor_name: "Ana López",
    tutor_relationship: "Madre",
    emergency_contact: "Miguel López",
    emergency_phone: "+52 555 456 7891",
    animal_id: "550e8400-e29b-41d4-a716-446655440001", // Axolotl
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#C8B8B4",
    lastTestDate: "2024-09-22",
    predominantEmotion: "Alegría",
    nextAppointment: {
      date: "2024-10-17",
      time: "09:00",
      type: "Evaluación Mensual"
    },
    totalSessions: 6,
    moodImprovement: 85,
    status: "active"
  },
  {
    patient_id: "b2c3d4e5-f6g7-8901-2345-678901bcdef2",
    name: "Mateo Silva",
    age: 6,
    birth_date: "2018-01-30",
    address: "Av. Universidad 654, Ciudad de México",
    phone: "+52 555 567 8901",
    tutor_name: "Roberto Silva",
    tutor_relationship: "Padre",
    emergency_contact: "Patricia Silva",
    emergency_phone: "+52 555 567 8902",
    animal_id: "550e8400-e29b-41d4-a716-446655440002", // León
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#FFDDC1",
    lastTestDate: "2024-09-25",
    predominantEmotion: "Vergüenza",
    nextAppointment: {
      date: "2024-10-18",
      time: "15:00",
      type: "Terapia Familiar"
    },
    totalSessions: 4,
    moodImprovement: 45,
    status: "active"
  },
  {
    patient_id: "c3d4e5f6-g7h8-9012-3456-789012cdef34",
    name: "Emma Hernández",
    age: 8,
    birth_date: "2016-09-12",
    address: "Calle Hidalgo 987, Ciudad de México",
    phone: "+52 555 678 9012",
    tutor_name: "Laura Hernández",
    tutor_relationship: "Madre",
    emergency_contact: "Javier Hernández",
    emergency_phone: "+52 555 678 9013",
    animal_id: "550e8400-e29b-41d4-a716-446655440003", // Conejo
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#D4EDDA",
    lastTestDate: "2024-09-19",
    predominantEmotion: "Balance",
    nextAppointment: {
      date: "2024-10-19",
      time: "16:00",
      type: "Sesión de Seguimiento"
    },
    totalSessions: 10,
    moodImprovement: 92,
    status: "active"
  },
  {
    patient_id: "d4e5f6g7-h8i9-0123-4567-890123def456",
    name: "Diego Torres",
    age: 7,
    birth_date: "2017-04-18",
    address: "Paseo de la Reforma 321, Ciudad de México",
    phone: "+52 555 789 0123",
    tutor_name: "Carmen Torres",
    tutor_relationship: "Madre",
    emergency_contact: "Luis Torres",
    emergency_phone: "+52 555 789 0124",
    animal_id: "550e8400-e29b-41d4-a716-446655440004", // Panda
    avatar: "DEFAULT_CHILD_AVATAR",
    circleColor: "#B8E6B8",
    lastTestDate: "2024-08-30",
    predominantEmotion: "Miedo",
    totalSessions: 15,
    moodImprovement: 88,
    status: "completed"
  }
];

// Resultados de tests locales para cada paciente
export const LOCAL_TEST_RESULTS: LocalTestResult[] = [
  {
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0",
    patient_name: "Daniel",
    test_date: "2024-09-20T10:30:00.000Z",
    predominantEmotion: "Tristeza",
    emotionCounts: {
      Felicidad: 2,
      Enojo: 1,
      Tristeza: 6,
      Vergüenza: 1,
      Miedo: 0
    },
    answers: [
      { questionId: 1, selectedAnswer: "Me siento muy triste", emotion: "Tristeza" },
      { questionId: 2, selectedAnswer: "Prefiero estar solo", emotion: "Tristeza" },
      { questionId: 3, selectedAnswer: "No tengo ganas de jugar", emotion: "Tristeza" },
      { questionId: 4, selectedAnswer: "Me dan ganas de llorar", emotion: "Tristeza" },
      { questionId: 5, selectedAnswer: "Me siento feliz a veces", emotion: "Felicidad" },
      { questionId: 6, selectedAnswer: "Me enojo cuando no me entienden", emotion: "Enojo" },
      { questionId: 7, selectedAnswer: "Me da pena hablar", emotion: "Vergüenza" },
      { questionId: 8, selectedAnswer: "Extraño mucho a mi familia", emotion: "Tristeza" },
      { questionId: 9, selectedAnswer: "Me gusta dibujar", emotion: "Felicidad" },
      { questionId: 10, selectedAnswer: "A veces no quiero ir a la escuela", emotion: "Tristeza" }
    ],
    recommendations: [
      "Terapia lúdica enfocada en expresión emocional",
      "Actividades de arte terapia",
      "Sesiones familiares para fortalecer vínculos",
      "Técnicas de relajación adaptadas para niños"
    ]
  },
  {
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2",
    patient_name: "Hugo",
    test_date: "2024-09-18T14:15:00.000Z",
    predominantEmotion: "Enojo",
    emotionCounts: {
      Felicidad: 1,
      Enojo: 7,
      Tristeza: 1,
      Vergüenza: 0,
      Miedo: 1
    },
    answers: [
      { questionId: 1, selectedAnswer: "Me enojo muy fácil", emotion: "Enojo" },
      { questionId: 2, selectedAnswer: "Grito cuando estoy molesto", emotion: "Enojo" },
      { questionId: 3, selectedAnswer: "No me gusta que me digan qué hacer", emotion: "Enojo" },
      { questionId: 4, selectedAnswer: "Quiero romper cosas cuando estoy enojado", emotion: "Enojo" },
      { questionId: 5, selectedAnswer: "Me gusta jugar videojuegos", emotion: "Felicidad" },
      { questionId: 6, selectedAnswer: "Peleo con mis hermanos", emotion: "Enojo" },
      { questionId: 7, selectedAnswer: "Me da miedo cuando gritan", emotion: "Miedo" },
      { questionId: 8, selectedAnswer: "No me gusta perder", emotion: "Enojo" },
      { questionId: 9, selectedAnswer: "A veces me siento triste después de enojarme", emotion: "Tristeza" },
      { questionId: 10, selectedAnswer: "Quiero que me entiendan", emotion: "Enojo" }
    ],
    recommendations: [
      "Técnicas de manejo de la ira adaptadas para niños",
      "Terapia cognitivo-conductual infantil",
      "Actividades de autorregulación emocional",
      "Entrenamiento en habilidades sociales"
    ]
  },
  {
    patient_id: "a1b2c3d4-e5f6-7890-1234-567890abcde1",
    patient_name: "Sofia González",
    test_date: "2024-09-22T11:00:00.000Z",
    predominantEmotion: "Alegría",
    emotionCounts: {
      Felicidad: 8,
      Enojo: 0,
      Tristeza: 1,
      Vergüenza: 0,
      Miedo: 1
    },
    answers: [
      { questionId: 1, selectedAnswer: "Me siento muy feliz la mayoría del tiempo", emotion: "Felicidad" },
      { questionId: 2, selectedAnswer: "Me gusta jugar con mis amigos", emotion: "Felicidad" },
      { questionId: 3, selectedAnswer: "Disfruto ir a la escuela", emotion: "Felicidad" },
      { questionId: 4, selectedAnswer: "Me gusta aprender cosas nuevas", emotion: "Felicidad" },
      { questionId: 5, selectedAnswer: "Sonrío mucho", emotion: "Felicidad" },
      { questionId: 6, selectedAnswer: "Me gusta ayudar a otros", emotion: "Felicidad" },
      { questionId: 7, selectedAnswer: "A veces me preocupo por las tareas", emotion: "Miedo" },
      { questionId: 8, selectedAnswer: "Me gusta cantar y bailar", emotion: "Felicidad" },
      { questionId: 9, selectedAnswer: "Extraño a mi abuela que está lejos", emotion: "Tristeza" },
      { questionId: 10, selectedAnswer: "Me siento orgullosa de mis logros", emotion: "Felicidad" }
    ],
    recommendations: [
      "Continuar fortaleciendo la autoestima positiva",
      "Actividades de expresión creativa",
      "Técnicas de manejo de la ansiedad escolar leve",
      "Sesiones de mantenimiento y seguimiento"
    ]
  }
];