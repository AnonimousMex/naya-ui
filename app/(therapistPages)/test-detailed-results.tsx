import { View, Text, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestResultItem, TestStatistics } from "@/components/TestResultDetail";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router, useLocalSearchParams } from "expo-router";
import { ICONS } from "@/constants/images";
import { useLocalPatients } from "@/hooks/useLocalPatients";
import { useEffect, useState } from "react";
import { NavbarComponent } from "@/components/NavBar";

type EmotionKey = "happy" | "angry" | "sad" | "shame" | "fear";

const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");
  const params = useLocalSearchParams();
  const patientId = Array.isArray(params?.id) ? params.id[0] : params?.id as string;
  
  const { getPatientById, getPatientTestResult } = useLocalPatients();
  const [patient, setPatient] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestData = async () => {
      if (patientId) {
        try {
          const patientData = getPatientById(patientId);
          const testData = getPatientTestResult(patientId);
          
          setPatient(patientData);
          setTestResult(testData);
        } catch (error) {
          console.error('Error loading test data:', error);
        }
      }
      setLoading(false);
    };

    loadTestData();
  }, [patientId]);

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
  const mapEmotionToType = (emotion: string): EmotionKey => {
    const emotionMap: Record<string, EmotionKey> = {
      "Felicidad": "happy",
      "Enojo": "angry", 
      "Tristeza": "sad",
      "Vergüenza": "shame",
      "Miedo": "fear",
    };
    
    return emotionMap[emotion] || "happy";
  };

  // Función para calcular estadísticas
  const calculateStats = (emotionCounts: any): Record<EmotionKey, number> => {
    const total = Object.values(emotionCounts).reduce((sum: number, count: any) => sum + (typeof count === 'number' ? count : 0), 0);
    
    return {
      happy: total > 0 ? Math.round(((emotionCounts.Felicidad || 0) / total) * 100) : 0,
      angry: total > 0 ? Math.round(((emotionCounts.Enojo || 0) / total) * 100) : 0,
      sad: total > 0 ? Math.round(((emotionCounts.Tristeza || 0) / total) * 100) : 0,
      shame: total > 0 ? Math.round(((emotionCounts.Vergüenza || 0) / total) * 100) : 0,
      fear: total > 0 ? Math.round(((emotionCounts.Miedo || 0) / total) * 100) : 0,
    };
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-slate-100 flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#8B4513" />
        <Text className="mt-4 text-gray-600 font-UrbanistMedium">Cargando resultados detallados...</Text>
      </SafeAreaView>
    );
  }

  if (!patient || !testResult) {
    return (
      <SafeAreaView className="bg-slate-100 flex-1 justify-center items-center">
        <Text className="text-gray-600 font-UrbanistMedium text-center px-8">
          No se encontraron resultados detallados para este paciente
        </Text>
        <BackButton onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const testStats = calculateStats(testResult.emotionCounts);
  const totalQuestions = testResult.answers?.length || 0;

  return (
    <SafeAreaView className="bg-slate-100 flex-1">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center p-7 mt-8">
          <BackButton onPress={() => router.back()} />
          <HeaderInformationComponent 
            type="date" 
            label={formatDate(testResult.test_date)} 
            borderColor="#E4B18E" 
          />
        </View>

        {/* Título */}
        <View className="px-7 mb-6">
          <Text className="text-3xl font-UrbanistBold text-brown-800 text-center mb-2">
            Resultados Detallados
          </Text>
          <Text className="text-lg font-UrbanistMedium text-gray-600 text-center">
            {patient.name} • {totalQuestions} preguntas respondidas
          </Text>
        </View>

        {/* Estadísticas */}
        <View className="px-7 mb-8">
          <Text className="text-xl font-UrbanistBold text-brown-800 mb-4">
            Distribución Emocional
          </Text>
          <TestStatistics 
            stats={{
              "Felicidad": testStats.happy,
              "Enojo": testStats.angry,
              "Tristeza": testStats.sad,
              "Vergüenza": testStats.shame,
              "Miedo": testStats.fear
            }}
          />
        </View>

        {/* Resumen de emoción predominante */}
        <View className="mx-7 mb-8 bg-white rounded-3xl p-6 shadow-sm">
          <Text className="text-lg font-UrbanistBold text-brown-800 mb-3">
            Emoción Predominante: {testResult.predominantEmotion}
          </Text>
          <Text className="text-base font-UrbanistMedium text-gray-600 leading-6">
            {testResult.predominantEmotion === "Tristeza" && "Esta emoción puede indicar necesidad de apoyo emocional y acompañamiento terapéutico."}
            {testResult.predominantEmotion === "Enojo" && "Es importante trabajar en estrategias de autorregulación y manejo de la frustración."}
            {testResult.predominantEmotion === "Alegría" && "Un estado emocional muy positivo que debe ser mantenido y fortalecido."}
            {testResult.predominantEmotion === "Vergüenza" && "Se recomienda trabajar en el fortalecimiento de la autoestima y autoconcepto."}
            {testResult.predominantEmotion === "Balance" && "Excelente equilibrio emocional, continuar con el seguimiento preventivo."}
          </Text>
        </View>

        {/* Recomendaciones */}
        {testResult.recommendations && (
          <View className="mx-7 mb-8 bg-blue-50 rounded-3xl p-6">
            <Text className="text-lg font-UrbanistBold text-brown-800 mb-4">
              Recomendaciones Terapéuticas
            </Text>
            {testResult.recommendations.map((recommendation: string, index: number) => (
              <View key={index} className="flex-row mb-3">
                <Text className="text-brown-600 font-UrbanistBold mr-2">•</Text>
                <Text className="text-base font-UrbanistMedium text-gray-600 flex-1 leading-6">
                  {recommendation}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Respuestas detalladas */}
        <View className="px-7 mb-8">
          <Text className="text-xl font-UrbanistBold text-brown-800 mb-4">
            Respuestas del Test
          </Text>
          
          {testResult.answers && testResult.answers.map((answer: any, index: number) => (
            <TestResultItem
              key={index}
              situation={`Pregunta ${answer.questionId || index + 1}`}
              answer={answer.selectedAnswer}
              emotion={answer.emotion}
            />
          ))}
        </View>

        {/* Información adicional del paciente */}
        <View className="mx-7 mb-8 bg-green-50 rounded-3xl p-6">
          <Text className="text-lg font-UrbanistBold text-brown-800 mb-4">
            Información del Paciente
          </Text>
          <View className="space-y-2">
            <Text className="text-base font-UrbanistMedium text-gray-600">
              <Text className="font-UrbanistBold">Edad:</Text> {patient.age} años
            </Text>
            <Text className="text-base font-UrbanistMedium text-gray-600">
              <Text className="font-UrbanistBold">Tutor responsable:</Text> {patient.tutor_name} ({patient.tutor_relationship})
            </Text>
            <Text className="text-base font-UrbanistMedium text-gray-600">
              <Text className="font-UrbanistBold">Total de sesiones:</Text> {patient.totalSessions || 0}
            </Text>
            <Text className="text-base font-UrbanistMedium text-gray-600">
              <Text className="font-UrbanistBold">Progreso general:</Text> {patient.moodImprovement || 0}% de mejora
            </Text>
            <Text className="text-base font-UrbanistMedium text-gray-600">
              <Text className="font-UrbanistBold">Estado del tratamiento:</Text> {patient.status === 'active' ? 'Activo' : patient.status === 'completed' ? 'Completado' : 'Pausado'}
            </Text>
          </View>
        </View>

        {/* Gráfico decorativo */}
        <View className="items-center mt-6 mb-8">
          <Svg height="100" width={width - 60}>
            <Path
              d={`M 20 80 Q ${width/4} 20 ${width/2} 80 T ${width-40} 80`}
              stroke="#E4B18E"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
          </Svg>
          <Text className="text-sm font-UrbanistMedium text-gray-500 text-center mt-2 px-6">
            Progreso emocional del paciente a lo largo del tiempo
          </Text>
        </View>
      </ScrollView>

      {/* Navbar fija */}
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TestDetailedResults;