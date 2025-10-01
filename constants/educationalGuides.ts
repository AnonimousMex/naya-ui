// Constantes para las guías educativas basadas en emociones

export interface GuideResource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article';
  icon?: string;
}

export interface EmotionGuide {
  emotion: string;
  resources: GuideResource[];
}

export const EDUCATIONAL_GUIDES: EmotionGuide[] = [
  {
    emotion: "Tristeza",
    resources: [
      {
        id: "tristeza_video_1",
        title: "¿Su hijo está deprimido? - por Psicoactiva",
        url: "https://www.youtube.com/watch?v=ltMonj8oCrs",
        type: "video"
      },
      {
        id: "tristeza_video_2", 
        title: "Siete pasos para ayudar a tu hijo a entender sus emociones",
        url: "https://aprendemosjuntos.bbva.com/especial/que-es-la-empatia-y-como-desarrollarla-en-los-ninos-rafael-guerrero/",
        type: "video"
      },
      {
        id: "tristeza_video_3",
        title: "LA TRISTEZA para niños ¿Qué es la tristeza? Emociones para niños",
        url: "https://www.youtube.com/watch?v=InSIbnSHIr4", 
        type: "video"
      },
      {
        id: "tristeza_video_4",
        title: "Ponencia de Begoña Ibarrola: Ser padre o madre es siempre EMOCIONANTE",
        url: "https://www.youtube.com/watch?v=U6kbBmLbyIA",
        type: "video"
      },
      {
        id: "tristeza_video_5",
        title: "AprendemosJuntos - Canal de BBVA Aprendemos Juntos",
        url: "https://www.youtube.com/c/AprendemosJuntos",
        type: "video"
      },
      {
        id: "tristeza_article_1",
        title: "Qué hacer cuando te sientes triste (para Niños) - KidsHealth.org",
        url: "https://kidshealth.org/es/kids/depression.html",
        type: "article"
      },
      {
        id: "tristeza_article_2",
        title: "¿Tu hijo está triste? Haz esto.. - por Alvaro Bilbao",
        url: "https://alvarobilbao.com/tu-hijo-esta-triste-haz-esto",
        type: "article"
      },
      {
        id: "tristeza_article_3",
        title: "Salud Mental - Hospital Sant Joan de Déu Barcelona",
        url: "https://www.sjdhospitalbarcelona.org/es/servicios-asistenciales/salud-mental",
        type: "article"
      }
    ]
  },
  {
    emotion: "Enojo",
    resources: [
      {
        id: "enojo_video_1",
        title: "Cómo gestionar las RABIETAS en niños - Entrevista con Rafa Guerrero",
        url: "https://www.youtube.com/watch?v=THXPl_HlcNs",
        type: "video"
      },
      {
        id: "enojo_video_2",
        title: "Que es Disciplina Positiva y sus 4 pilares en la educación",
        url: "https://www.youtube.com/watch?v=okEiD38ygoc",
        type: "video"
      },
      {
        id: "enojo_video_3",
        title: "Cómo gestionar las rabietas de los niños - por Hacer Familia",
        url: "https://www.youtube.com/watch?v=pMSrmCkNegE",
        type: "video"
      },
      {
        id: "enojo_video_4",
        title: "Parenting without yelling or threatening children, even during tantrums",
        url: "https://www.youtube.com/watch?v=oLNmX2A2pDk",
        type: "video"
      },
      {
        id: "enojo_video_5",
        title: "PSICOLOGÍA - TÉCNICA EL VOLCÁN - por El mundo de TDAH",
        url: "https://www.youtube.com/watch?v=I4QJRu002bs",
        type: "video"
      },
      {
        id: "enojo_video_6",
        title: "Cómo podemos controlar nuestra ira. Consejos para controlar la ira",
        url: "https://www.dailymotion.com/video/x8mhyoh",
        type: "video"
      },
      {
        id: "enojo_article_1",
        title: "Controlar las rabietas (para Padres) - por Nemours KidsHealth",
        url: "https://kidshealth.org/es/parents/temper.html",
        type: "article"
      },
      {
        id: "enojo_article_2",
        title: "Cómo ayudar a tu hijo a manejar el enfado - por Iratxe López Psicología",
        url: "https://iratxelopezpsicologia.com/como-ayudar-a-tu-hijo-a-a-manejar-el-enfado/",
        type: "article"
      },
      {
        id: "enojo_article_3",
        title: "Rabietas: MedlinePlus enciclopedia médica",
        url: "https://medlineplus.gov/spanish/ency/article/001922.htm",
        type: "article"
      }
    ]
  },
  {
    emotion: "Alegría",
    resources: [
      {
        id: "alegria_video_1",
        title: "Rojas Marcos explica cómo entrenar el optimismo - por BBVA Aprendemos Juntos",
        url: "https://www.youtube.com/watch?v=9zopIxORFDU",
        type: "video"
      },
      {
        id: "alegria_video_2",
        title: "Recognizing and enhancing the strengths of children's character",
        url: "https://www.youtube.com/watch?v=NkwN-189_VE",
        type: "video"
      },
      {
        id: "alegria_video_3",
        title: "Me siento agradecido ❤️ Cuento para niños sobre la gratitud",
        url: "https://www.youtube.com/watch?v=Iu7LQ-w5oPE",
        type: "video"
      },
      {
        id: "alegria_video_4",
        title: "La Inteligencia Emocional - Emotional Intelligence",
        url: "https://www.youtube.com/watch?v=DOEEXlGUiDA",
        type: "video"
      },
      {
        id: "alegria_video_5",
        title: "Educar niños autónomos. - por Alberto Soler",
        url: "https://www.youtube.com/watch?v=vyfy8JO7eqo",
        type: "video"
      },
      {
        id: "alegria_video_6",
        title: "IMPORTANCIA DEL JUEGO EN EL DESARROLLO DEL NIÑO",
        url: "https://www.youtube.com/watch?v=FoUTbfzUwMs",
        type: "video"
      },
      {
        id: "alegria_article_1",
        title: "9 pasos para criar a un niño feliz - por Newport School",
        url: "https://newportschool.edu.co/es/school-news/9-pasos-para-criar-a-un-nino-feliz/",
        type: "article"
      },
      {
        id: "alegria_article_2",
        title: "Practicar la gratitud: 5 formas de mejorar la salud mental de su familia",
        url: "https://www.healthychildren.org/Spanish/healthy-living/emotional-wellness/Building-Resilience/Paginas/how-to-practice-gratitude.aspx",
        type: "article"
      },
      {
        id: "alegria_article_3",
        title: "Cómo fomentar la resiliencia en los niños - por HealthyChildren.org",
        url: "https://www.healthychildren.org/Spanish/healthy-living/emotional-wellness/Building-Resilience/Paginas/building-resilience-in-children.aspx",
        type: "article"
      }
    ]
  },
  {
    emotion: "Vergüenza",
    resources: [
      {
        id: "verguenza_video_1",
        title: "¿Cómo ayudar a nuestros hijos a gestionar los miedos? - por Rafael Guerrero",
        url: "https://www.youtube.com/watch?v=bwmsUjLY0wU",
        type: "video"
      },
      {
        id: "verguenza_video_2",
        title: "Elena DOMÍNGUEZ - Canal de la Psicóloga Elena Domínguez",
        url: "https://www.youtube.com/channel/UCIh5M5Ffdb9xSXRAvdUGtpQ",
        type: "video"
      },
      {
        id: "verguenza_video_3",
        title: "¿Sabes qué es la VERGÜENZA TÓXICA? - por PsicoActiva",
        url: "https://www.youtube.com/watch?v=wiWU_t3N53Q",
        type: "video"
      },
      {
        id: "verguenza_video_4",
        title: "Alberto Soler: Confiemos en su capacidad de sobreponerse a los errores",
        url: "https://www.youtube.com/watch?v=r7ZGxH4XXEE",
        type: "video"
      },
      {
        id: "verguenza_video_5",
        title: "Versión Completa. Claves para educar a nuestros hijos con calma.",
        url: "https://www.youtube.com/watch?v=KprSjajZtIw",
        type: "video"
      },
      {
        id: "verguenza_video_6",
        title: "Educar sin recetas, por Mar Romera",
        url: "https://www.youtube.com/watch?v=b56bxXpXmv8",
        type: "video"
      },
      {
        id: "verguenza_article_1",
        title: "Cómo ayudar a los niños a lidiar con el sentimiento de vergüenza",
        url: "https://childmind.org/es/articulo/como-ayudar-los-ninos-lidiar-con-la-verguenza/",
        type: "article"
      },
      {
        id: "verguenza_article_2",
        title: "Confianza y autoestima en los niños - por Child Mind Institute",
        url: "https://childmind.org/es/temas/confianza-y-autoestima/#:~:text=Una%20parte%20importante%20de%20desarrollar,hijos%20a%20desarrollar%20estas%20habilidades.",
        type: "article"
      },
      {
        id: "verguenza_article_3",
        title: "Vergüenza vs. Culpa - Significado, Culturas - por The Pleasant Mind",
        url: "https://thepleasantmind.com/shame-vs-guilt/#:~:text=La%20verg%C3%BCenza%20y%20la%20culpa%20se%20explican%20mejor%20a%20trav%C3%A9s,se%20refleja%20en%20el%20acto.",
        type: "article"
      }
    ]
  },
  {
    emotion: "Balance",
    resources: [
      {
        id: "balance_video_1",
        title: "Rafa Guerrero: claves para desarrollar la inteligencia emocional en los niños",
        url: "https://www.youtube.com/watch?v=3Sj4ZPPvnRg",
        type: "video"
      },
      {
        id: "balance_video_2",
        title: "Claves para sanar heridas emocionales - por Psico fácil",
        url: "https://www.youtube.com/watch?v=6Q3SoaTFamA",
        type: "video"
      },
      {
        id: "balance_video_3",
        title: "Video para enseñar a los niños/as a identificar las emociones.",
        url: "https://www.youtube.com/watch?v=xtcQFO-FlpE",
        type: "video"
      },
      {
        id: "balance_video_4",
        title: "Nuestros hijos no necesitan padres perfectos, necesitan padres presentes",
        url: "https://www.youtube.com/watch?v=JvkjS0UPuVc",
        type: "video"
      },
      {
        id: "balance_video_5",
        title: "ELABORAMOS UN EMOCIÓMETRO - APRENDO EN CASA INICIAL",
        url: "https://www.youtube.com/watch?v=tdxHcWCmKqA",
        type: "video"
      },
      {
        id: "balance_video_6",
        title: "10 claves para enseñar inteligencia emocional a los niños #MiSaludemocional",
        url: "https://www.youtube.com/watch?v=esDr91j0XsU",
        type: "video" 
      },
      {
        id: "balance_article_1",
        title: "Portada faros 6 Cast - PDF de Faros Sant Joan de Déu",
        url: "https://faros.hsjdbcn.org/sites/default/files/faros_6_cast.pdf",
        type: "article"
      },
      {
        id: "balance_article_2",
        title: "Claves para educar niños emocionalmente inteligentes - por UNAM Global TV",
        url: "https://unamglobal.unam.mx/global_revista/claves-para-educar-ninos-emocionalmente-inteligentes/",
        type: "article"
      },
      {
        id: "balance_article_3",
        title: "El termómetro de las emociones - por La Mente es Maravillosa",
        url: "https://lamenteesmaravillosa.com/termometro-emociones/#:~:text=Se%20trata%20de%20una%20escala,con%20el%20que%20queramos%20trabajar.",
        type: "article"
      }
    ]
  }
];

// Función para obtener guías por emoción
export const getGuidesByEmotion = (emotion: string): GuideResource[] => {
  const guide = EDUCATIONAL_GUIDES.find(g => 
    g.emotion.toLowerCase() === emotion.toLowerCase()
  );
  
  // Si no encuentra la emoción específica, devuelve las guías de Balance como fallback
  return guide?.resources || EDUCATIONAL_GUIDES.find(g => g.emotion === "Balance")?.resources || [];
};