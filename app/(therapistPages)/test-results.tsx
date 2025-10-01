import {
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";
import { BackButton } from "@/components/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { AnswersTest } from "@/components/AnswersTest";
import { MainButton } from "@/components/MainButton";
import { useLocalPatients } from "@/hooks/useLocalPatients";
import { useEffect, useState } from "react";
import { AnswerComponent } from "@/components/AnswerComponent";
import { NavbarComponent } from "@/components/NavBar";

const TestResults = () => {
  const params = useLocalSearchParams();
  const patientId = Array.isArray(params?.id) ? params.id[0] : params?.id as string;
  
  const { width, height } = Dimensions.get("window");
  const { getPatientById, getPatientTestResult } = useLocalPatients();
  const [patient, setPatient] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatientData = async () => {
      if (patientId) {
        try {
          const patientData = getPatientById(patientId);
          const testData = getPatientTestResult(patientId);
          
          setPatient(patientData);
          setTestResult(testData);
        } catch (error) {
          console.error('Error loading patient data:', error);
        }
      }
      setLoading(false);
    };

    loadPatientData();
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

  // Configuración de colores y personajes según emoción
  const getEmotionConfig = (emotion: string) => {
    const configs = {
      "Tristeza": {
        bgColor: "bg-[#8AC2FF]",
        image: IMAGES.SHAME_AXOLOTL_HEAD,
        description: "La tristeza es una emoción natural que nos ayuda a procesar pérdidas y cambios."
      },
      "Enojo": {
        bgColor: "bg-[#DE4E41]", 
        image: IMAGES.ANGRY_CAT,
        description: "El enojo nos indica que algo no está bien y nos motiva a hacer cambios."
      },
      "Alegría": {
        bgColor: "bg-[#FFF27C]",
        image: IMAGES.HAPPY_AXOLOTL_1,
        description: "La alegría fortalece nuestras relaciones y nos ayuda a disfrutar la vida."
      },
      "Vergüenza": {
        bgColor: "bg-[#F2AAAE]",
        image: IMAGES.SHAME_AXOLOTL_HEAD,
        description: "La vergüenza nos ayuda a reflexionar sobre nuestras acciones y crecer."
      },
      "Balance": {
        bgColor: "bg-[#D6D4FF]",
        image: IMAGES.CONFUSED_BUNNY_1,
        description: "Un balance emocional indica una gran capacidad de adaptación y bienestar."
      }
    };
    
    return configs[emotion as keyof typeof configs] || configs["Balance"];
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-slate-100 flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#8B4513" />
        <Text className="mt-4 text-gray-600 font-UrbanistMedium">Cargando datos del paciente...</Text>
      </SafeAreaView>
    );
  }

  if (!patient || !testResult) {
    return (
      <SafeAreaView className="bg-slate-100 flex-1 justify-center items-center">
        <Text className="text-gray-600 font-UrbanistMedium text-center px-8">
          No se encontraron datos del test para este paciente
        </Text>
        <MainButton
          mainText="Volver"
          onPress={() => router.back()}
          className="mt-6"
        />
      </SafeAreaView>
    );
  }

  const emotionConfig = getEmotionConfig(testResult.predominantEmotion);
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;
  const fontSize = width * 0.06;

  return (
    <SafeAreaView className="bg-slate-100 flex-1">
      {/* Encabezado con fondo y personaje */}
      <View className={`relative ${emotionConfig.bgColor}`} style={{ height: dynamicHeight }}>
        <View className="absolute w-full flex-row justify-between p-7">
          <BackButton onPress={() => router.back()} />
          <HeaderInformationComponent 
            type="date" 
            label={`${patient.name}`} 
            borderColor="#E4B18E" 
          />
        </View>

        <View className="flex-1 justify-end items-center">
          <View>
            <Text
              className="text-brown-800 font-UrbanistBold text-2xl mb-8 text-center px-5"
              style={{ letterSpacing: -1 }}
            >
              Último test realizado el {formatDate(testResult.test_date)}
            </Text>
          </View>
          <Image
            source={emotionConfig.image}
            className="mb-[-80] w-64 h-64"
            style={{ resizeMode: "contain" }}
          />
        </View>
      </View>

      {/* Contenido principal */}
      <View className="flex-1 bg-white rounded-t-3xl px-6 pt-1">
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full flex-row justify-end">
            <Pressable onPress={() => router.push("/(auth)/welcome")} className="px-3 rounded-md mt-4">
              <View className="flex-row items-center">
                <Text className="text-black text-base font-UrbanistBold">Ayuda</Text>
                <Image
                  source={ICONS.HELP_ICON}
                  style={{
                    width: width < 390 ? 14 : 18,
                    height: height < 390 ? 14 : 18,
                    resizeMode: "contain",
                    marginLeft: 5,
                  }}
                />
              </View>
            </Pressable>
          </View>

          <MainButton
            mainText="Ver detalles completos"
            onPress={() => {
              router.push({
                pathname: "/(therapistPages)/test-detailed-results",
                params: { id: patientId },
              });
            }}
            className="w-80 py-3 mt-6"
          />

          <Text
            className="font-UrbanistExtraBold text-center text-brown-100 mb-6 mt-8"
            style={{ fontSize: fontSize + 2 }}
          >
            Resultado: {testResult.predominantEmotion}
          </Text>

          {/* Descripción de la emoción */}
          <View className="bg-gray-50 rounded-3xl p-6 mb-6">
            <Text className="font-UrbanistMedium text-gray-700 text-center leading-6">
              {emotionConfig.description}
            </Text>
          </View>

          {/* Estadísticas emocionales */}
          <Text className="font-UrbanistBold text-lg text-brown-100 mb-4">
            Distribución Emocional:
          </Text>
          
          {Object.entries(testResult.emotionCounts).map(([emotion, count]) => {
            const countNum = typeof count === 'number' ? count : 0;
            return (
              <View key={emotion} className="flex-row justify-between items-center mb-3 bg-gray-50 p-4 rounded-2xl">
                <Text className="font-UrbanistMedium text-gray-700">{emotion}</Text>
                <View className="flex-row items-center">
                  <Text className="font-UrbanistBold text-brown-100 mr-2">{countNum}</Text>
                  <View 
                    className="h-3 bg-brown-200 rounded-full"
                    style={{ width: Math.max((countNum / 10) * 100, 20) }}
                  />
                </View>
              </View>
            );
          })}

          {/* Información del paciente */}
          <View className="mt-6 bg-blue-50 rounded-3xl p-6">
            <Text className="font-UrbanistBold text-lg text-brown-100 mb-4">
              Información del Paciente:
            </Text>
            <Text className="font-UrbanistMedium text-gray-700 mb-2">
              <Text className="font-UrbanistBold">Edad:</Text> {patient.age} años
            </Text>
            <Text className="font-UrbanistMedium text-gray-700 mb-2">
              <Text className="font-UrbanistBold">Tutor:</Text> {patient.tutor_name} ({patient.tutor_relationship})
            </Text>
            <Text className="font-UrbanistMedium text-gray-700 mb-2">
              <Text className="font-UrbanistBold">Progreso:</Text> {patient.totalSessions} sesiones, {patient.moodImprovement}% mejora
            </Text>
            {patient.nextAppointment && (
              <Text className="font-UrbanistMedium text-gray-700">
                <Text className="font-UrbanistBold">Próxima cita:</Text> {patient.nextAppointment.date} a las {patient.nextAppointment.time}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

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

export default TestResults;