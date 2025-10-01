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
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { AnswersTest } from "@/components/AnswersTest";
import { MainButton } from "@/components/MainButton";
import { useLocalUserInfo } from "@/hooks/useLocalUserInfo";
import { getLatestTestResult, getTestResults, clearTestResults, TestResult } from "@/utils/psychometricTestStorage";
import { useEffect, useState } from "react";
import { AnswerComponent } from "@/components/AnswerComponent";

const TestResults = () => {
  const { width, height } = Dimensions.get("window");
  const { userInfo } = useLocalUserInfo();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestResults = async () => {
      if (userInfo?.name) {
        try {
          console.log('Buscando resultados para usuario:', userInfo.name);
          
          // Debug: mostrar todos los resultados guardados
          const allResults = await getTestResults();
          console.log('Todos los resultados guardados:', allResults);
          
          const result = await getLatestTestResult(userInfo.name);
          console.log('Resultado encontrado:', result);
          setTestResult(result);
        } catch (error) {
          console.error('Error loading test results:', error);
        }
      } else {
        console.log('No hay userInfo disponible');
      }
      setLoading(false);
    };

    loadTestResults();
  }, [userInfo]);

  const bgColorClasses = {
    Felicidad: "bg-[#FFF27C]",
    Enojo: "bg-[#DE4E41]",
    Tristeza: "bg-[#8AC2FF]",
    Verguenza: "bg-[#F2AAAE]",
    Miedo: "bg-[#D6D4FF]",
    Balance: "bg-[#B8E6B8]",
  };

  const emotionImages = {
    Felicidad: IMAGES.HAPPY_AXOLOTL_1,
    Enojo: IMAGES.ANGRY_AXOLOTL_1,
    Tristeza: IMAGES.SAD_AXOLOTL_1,
    Verguenza: IMAGES.HAPPY_PANDA_1, // Usar panda para vergüenza
    Miedo: IMAGES.FEAR_AXOLOTL_1,
    Balance: IMAGES.HAPPY_AXOLOTL_4,
  };

  const emotionDescriptions = {
    Felicidad: "Tuvo respuestas que indican alegría y optimismo al tomar decisiones",
    Enojo: "Tuvo respuestas que indican frustración e irritabilidad al enfrentar situaciones",
    Tristeza: "Tuvo respuestas que indican melancolía y desánimo al tomar acciones",
    Verguenza: "Tuvo respuestas que indican timidez y bochorno en situaciones sociales",
    Miedo: "Tuvo respuestas que indican ansiedad y preocupación ante los desafíos",
    Balance: "Tuvo respuestas equilibradas mostrando una variedad de emociones saludables",
  };

  // Valores por defecto si no hay datos
  const defaultDate = "25/09/2025";
  const currentEmotion = testResult?.predominantEmotion || "Felicidad";
  const userEmotion = currentEmotion as keyof typeof bgColorClasses;
  const bgColor = bgColorClasses[userEmotion] || bgColorClasses.Felicidad;
  const userImage = emotionImages[userEmotion] || emotionImages.Felicidad;
  const description = emotionDescriptions[userEmotion] || emotionDescriptions.Felicidad;
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const displayDate = testResult ? formatDate(testResult.date) : defaultDate;
  
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className={`relative ${bgColor}`}
          style={{ height: dynamicHeight }}
        >
          <View className="absolute w-full flex-row justify-between p-7">
            <BackButton
              onPress={() => router.push("/(parentsPages)/parents-profile")}
            />

            <HeaderInformationComponent
              type="date"
              label={displayDate}
              borderColor="#E4B18E"
            />
          </View>

          <View className="flex-1 justify-end items-center">
            <View>
              {testResult && (
                <Text
                  className="text-brown-800 font-UrbanistBold text-lg mb-2 text-center px-5"
                  style={{ letterSpacing: -1 }}
                >
                  {testResult.userName}
                </Text>
              )}
              <Text
                className="text-brown-800 font-UrbanistBold text-xl mb-4 text-center px-5"
                style={{ letterSpacing: -1 }}
              >
                Resultados: {description}
              </Text>
              
              {testResult && testResult.predominantEmotion !== "Balance" && (
                <Text
                  className="text-brown-700 font-UrbanistMedium text-sm mb-4 text-center px-5"
                  style={{ letterSpacing: -0.5 }}
                >
                  Emoción predominante: {currentEmotion}
                  {testResult.emotionCounts[currentEmotion] && 
                    ` (${testResult.emotionCounts[currentEmotion]}/5 respuestas)`
                  }
                </Text>
              )}
            </View>
            <Image
              source={userImage}
              className="mb-[-80] w-64 h-64"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>
        <View className="flex-1 bg-white rounded-t-3xl px-6 pt-1">
          <View className="w-full flex-row justify-end">
            <View className="flex-row">
              <Pressable
                onPress={async () => {
                  await clearTestResults();
                  console.log('Storage limpiado');
                  setTestResult(null);
                }}
                className="px-3 rounded-md mt-4 mr-2"
              >
                <View className="flex-row items-center mb-2">
                  <Text className="text-red-600 text-sm font-UrbanistBold">
                  </Text>
                </View>
              </Pressable>
              
              <Pressable
                onPress={() => router.push("/(auth)/welcome")}
                className="px-3 rounded-md mt-4"
              >
                <View className="flex-row items-center mb-2">
                  <Text className="text-black text-base font-UrbanistBold">
                    Ayuda
                  </Text>
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
          </View>
          {loading ? (
            <View className="items-center py-10">
              <ActivityIndicator size="large" color="#0066CC" />
              <Text className="text-gray-600 mt-4">Cargando resultados...</Text>
            </View>
          ) : (
            <View className="bg-white rounded-[50px] border-4 border-yellow-500">
              <View className="space-y-2 mt-6">
                {testResult?.answers ? (
                  testResult.answers.map((answer, index) => (
                    <AnswerComponent
                      key={index}
                      backgroundColor="rgba(248, 230, 60, 0.17)"
                      textColor="#918917"
                      displayText={answer.answerText}
                      alignment={index % 2 === 0 ? "flex-start" : "flex-end"}
                    />
                  ))
                ) : (
                  // Respuestas por defecto si no hay datos
                  [
                    "Escuchar mi canción favorita",
                    "Abrazar a alguien que quiero", 
                    "Reír a carcajadas",
                    "Bailar libremente",
                    "Disfrutar de un paseo al aire libre"
                  ].map((text, index) => (
                    <AnswerComponent
                      key={index}
                      backgroundColor="rgba(248, 230, 60, 0.17)"
                      textColor="#918917"
                      displayText={text}
                      alignment={index % 2 === 0 ? "flex-start" : "flex-end"}
                    />
                  ))
                )}
              </View>
            </View>
          )}
          
          <MainButton
            mainText="Ver más"
            onPress={() => router.push("/(parentsPages)/test-detailed-results")}
            className="w-80 py-3 my-6"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestResults;
