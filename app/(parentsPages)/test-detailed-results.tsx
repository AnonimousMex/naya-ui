import { View, Text, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestResultItem, TestStatistics } from "@/components/TestResultDetail";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router } from "expo-router";
import { ICONS } from "@/constants/images";
import { useLocalUserInfo } from "@/hooks/useLocalUserInfo";
import { getLatestTestResult, TestResult } from "@/utils/psychometricTestStorage";
import { useEffect, useState } from "react";

const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");
  const { userInfo } = useLocalUserInfo();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestResults = async () => {
      if (userInfo?.name) {
        try {
          const result = await getLatestTestResult(userInfo.name);
          setTestResult(result);
        } catch (error) {
          console.error('Error loading detailed test results:', error);
        }
      }
      setLoading(false);
    };

    loadTestResults();
  }, [userInfo]);

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Función para mapear emociones a los tipos esperados por el componente
  const mapEmotionToType = (emotion: string): "happy" | "angry" | "sad" | "shame" | "fear" => {
    const emotionMap: Record<string, "happy" | "angry" | "sad" | "shame" | "fear"> = {
      "Felicidad": "happy",
      "Enojo": "angry", 
      "Tristeza": "sad",
      "Verguenza": "shame",
      "Miedo": "fear"
    };
    return emotionMap[emotion] || "happy";
  };

  // Función para generar análisis basado en la emoción predominante
  const generateAnalysis = (predominantEmotion: string, emotionCounts: Record<string, number>) => {
    const analysisMap: Record<string, { tendency: string; parentRecommendation: string }> = {
      "Felicidad": {
        tendency: "El niño muestra una tendencia positiva, demostrando optimismo y capacidad de encontrar soluciones constructivas ante los desafíos. Sus respuestas indican una buena salud emocional.",
        parentRecommendation: "Actividad sugerida: Continuar reforzando esta actitud positiva mediante actividades que fomenten la gratitud y celebren sus logros diarios."
      },
      "Enojo": {
        tendency: "El niño tiende a reaccionar con frustración ante las situaciones desafiantes. Sus respuestas muestran dificultades para regular la ira, lo que puede afectar sus relaciones sociales.",
        parentRecommendation: "Actividad sugerida: Practicar técnicas de respiración y crear un 'termómetro de emociones' para que aprenda a identificar y manejar su enojo antes de que escale."
      },
      "Tristeza": {
        tendency: "El niño muestra tendencias melancólicas y puede tener dificultades para afrontar situaciones adversas. Sus respuestas indican una necesidad de apoyo emocional adicional.",
        parentRecommendation: "Actividad sugerida: Crear un diario de emociones donde pueda expresar sus sentimientos y establecer rutinas que incluyan actividades que le generen alegría."
      },
      "Verguenza": {
        tendency: "El niño muestra signos de timidez y puede tener dificultades con la autoestima en situaciones sociales. Sus respuestas sugieren sensibilidad a la percepción de otros.",
        parentRecommendation: "Actividad sugerida: Realizar actividades que fortalezcan su confianza personal y practicar situaciones sociales en un ambiente seguro y comprensivo."
      },
      "Miedo": {
        tendency: "El niño tiende a responder con ansiedad ante situaciones nuevas o desafiantes. Sus respuestas muestran una necesidad de desarrollar mayor seguridad y confianza.",
        parentRecommendation: "Actividad sugerida: Implementar técnicas de relajación y exposición gradual a situaciones que generen ansiedad, siempre en un ambiente de apoyo."
      },
      "Balance": {
        tendency: "El niño muestra una variedad saludable de respuestas emocionales, demostrando flexibilidad y adaptabilidad ante diferentes situaciones. Esta diversidad emocional es positiva.",
        parentRecommendation: "Actividad sugerida: Continuar fomentando esta diversidad emocional mediante conversaciones sobre diferentes formas de reaccionar ante las situaciones."
      }
    };

    return analysisMap[predominantEmotion] || analysisMap["Balance"];
  };

  // Datos por defecto si no hay información del test
  const defaultData = {
    testInfo: {
      date: "25/09/2025",
      totalQuestions: 5,
      performedBy: "Usuario",
      testId: "default_test",
    },
    testResults: [
      {
        situation: "Te sacaste una buena calificación y tu maestra te felicitó frente a todos.",
        answer: "¡Me sentí muy feliz y orgulloso de mí mismo!",
        emotion: "happy" as const,
      },
      {
        situation: "Un compañero te quita un juguete en clase.",
        answer: "Le pido que me lo devuelva amablemente.",
        emotion: "happy" as const,
      },
      {
        situation: "Te llaman la atención por hablar en clase.",
        answer: "Me enojo y no hablo más.",
        emotion: "angry" as const,
      },
      {
        situation: "No te invitan a jugar en el recreo.",
        answer: "Me siento triste y juego solo.",
        emotion: "sad" as const,
      },
      {
        situation: "Te caíste frente a todos en el recreo.",
        answer: "Quería que la tierra me tragara.",
        emotion: "shame" as const,
      },
    ],
    statistics: {
      happy: 2,
      angry: 1,
      sad: 1,
      shame: 1,
    },
    analysis: generateAnalysis("Felicidad", { "Felicidad": 2, "Enojo": 1, "Tristeza": 1, "Verguenza": 1 })
  };

  // Preparar datos para mostrar
  let displayData;
  
  if (testResult) {
    // Convertir estadísticas del formato guardado al formato esperado
    const statistics: Record<string, number> = {};
    Object.entries(testResult.emotionCounts).forEach(([emotion, count]) => {
      const mappedEmotion = mapEmotionToType(emotion);
      statistics[mappedEmotion] = count;
    });

    displayData = {
      testInfo: {
        date: formatDate(testResult.date),
        totalQuestions: testResult.answers.length,
        performedBy: testResult.userName,
        testId: testResult.id,
      },
      testResults: testResult.answers.map(answer => ({
        situation: answer.storyTitle,
        answer: answer.answerText,
        emotion: mapEmotionToType(answer.emotionName),
      })),
      statistics,
      analysis: generateAnalysis(testResult.predominantEmotion, testResult.emotionCounts)
    };
  } else {
    displayData = defaultData;
  }

  const { testInfo, testResults, statistics, analysis } = displayData;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-pink-200 justify-center items-center">
        <ActivityIndicator size="large" color="#0066CC" />
        <Text className="text-brown-800 mt-4 font-UrbanistMedium">
          Cargando resultados detallados...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-pink-200"
      edges={["top"]}
    >
      <View className="w-full flex-row justify-between pt-6 px-7 pb-4 z-10 bg-pink-200">
        <BackButton onPress={() => router.back()} />
        <HeaderInformationComponent
          type="date"
          label={testInfo.date}
          borderColor="#E4B18E"
        />
      </View>
      <ScrollView
        className="flex-1 px-4 pt-2 bg-pink-200"
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-UrbanistBold text-2xl mb-4 text-brown-800 text-center">
          Resultados detallados del test
        </Text>
        
        {testResult && (
          <Text className="font-UrbanistMedium text-lg mb-4 text-brown-700 text-center">
            Emoción predominante: {testResult.predominantEmotion}
          </Text>
        )}
        <View className="items-center mb-4">
          <View className="rounded-full p-5 bg-white shadow-md flex-row items-center justify-between">
            <View className="ml-4 mr-9">
              <Text className="font-UrbanistBold text-base text-brown-800 mb-1">
                Realizado el {testInfo.date}
              </Text>
              <Text className="font-UrbanistBold text-base text-brown-800 mb-1">
                Total de preguntas: {testInfo.totalQuestions}
              </Text>
              <Text className="font-UrbanistBold text-base text-brown-800">
                Realizado por: {testInfo.performedBy}
              </Text>
            </View>
            <View className="w-16 h-16 rounded-full p-4 bg-brown-20">
              <Image
                source={ICONS.DETAILS_ICON}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  tintColor: "white",
                }}
              />
            </View>
          </View>
        </View>
        {testResults.map((item, idx) => (
          <TestResultItem
            key={idx}
            situation={item.situation}
            answer={item.answer}
            emotion={item.emotion as any}
          />
        ))}
        <View
          style={{
            position: "relative",
            width: width,
            height: 89.95,
            zIndex: 10,
            marginLeft: -16,
            marginRight: -16,
            marginTop: -30,
          }}
        >
          <Svg
            height="90"
            width={width}
            viewBox={`0 0 ${width} 90`}
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
            <Path
              d={`M 0 90 Q ${width / 2} 0 ${width} 90`}
              fill="#F699B4"
              stroke="none"
            />
          </Svg>
        </View>
        <View className="mb-0 -mx-4 relative">
          <View className="bg-pink-800 pt-7 px-4">
            <TestStatistics stats={statistics} />

            <View className="rounded-t-xl p-3 bg-white mt-4">
              <Text className="font-UrbanistBold text-lg text-brown-800">
                Tendencia del niño
              </Text>
            </View>
            <View className="rounded-b-2xl p-4 mb-4 bg-[#FFF8E1]">
              <Text className="font-UrbanistBold text-base text-brown-700">
                {analysis.tendency}
              </Text>
            </View>
            <View className="rounded-t-xl p-3 bg-white">
              <Text className="font-UrbanistBold text-lg text-brown-800">
                Recomendación para el papá
              </Text>
            </View>
            <View className="rounded-b-2xl p-4 mb-12 bg-[#E0F7FA]">
              <Text className="font-UrbanistBold text-base text-brown-700">
                {analysis.parentRecommendation}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestDetailedResults;
