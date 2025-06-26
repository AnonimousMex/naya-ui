import { View, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestResultItem } from "@/components/TestResultDetail/TestResultItem";
import { TestStatistics } from "@/components/TestResultDetail/TestStatistics";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router } from "expo-router";

const testResults = [
  {
    situation: "Un compañero te quita un juguete en clase.",
    answer: "Le pido que me lo devuelva amablemente.",
    emotion: "happy",
  },
  {
    situation: "Te llaman la atención por hablar en clase.",
    answer: "Me enojo y no hablo más.",
    emotion: "angry",
  },
  {
    situation: "No te invitan a jugar en el recreo.",
    answer: "Me siento triste y juego solo.",
    emotion: "sad",
  },
];

const stats = {
  happy: 1,
  angry: 1,
  sad: 1,
};

const explanation =
  "El niño tiende a expresar sus emociones de manera variada, mostrando tanto respuestas asertivas como reacciones emocionales negativas. Se recomienda reforzar la gestión emocional positiva.";

const parentRecommendation =
  "Actividad sugerida: Realizar juntos un diario de emociones donde el niño pueda expresar cómo se sintió cada día y qué hizo para sentirse mejor.";


const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 520;

  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <View className="w-full flex-row justify-between pt-6 px-7 pb-4 z-10">
        <BackButton onPress={() => router.push("/(auth)/welcome")} />
        <HeaderInformationComponent
          type="date"
          label="16/Junio/2025"
          borderColor="#E4B18E"
        />
      </View>
      <ScrollView
        className="flex-1 px-4 pt-2 pb-8"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-UrbanistBold text-2xl mb-4 text-brown-800 text-center">
          Resultados detallados del test
        </Text>

        <View className="rounded-2xl p-4 mb-4 bg-white shadow-md">
          <Text className="font-UrbanistBold text-base text-brown-800 mb-1">
            Test de emociones
          </Text>
          <Text className="font-UrbanistMedium text-sm text-brown-700">
            Realizado el 16/Junio/2025
          </Text>
          <Text className="font-UrbanistMedium text-sm text-brown-700">
            Total de preguntas: {testResults.length}
          </Text>
        </View>
        {testResults.map((item, idx) => (
          <TestResultItem
            key={idx}
            situation={item.situation}
            answer={item.answer}
            emotion={item.emotion as any}
          />
        ))}
        <TestStatistics stats={stats} />
        <View className="rounded-2xl p-4 my-4 bg-[#FFF8E1]">
          <Text className="font-UrbanistBold text-lg mb-2 text-brown-800">
            Tendencia del niño
          </Text>
          <Text className="font-UrbanistMedium text-base text-brown-700">
            {explanation}
          </Text>
        </View>
        {/* Solo para padres, puedes condicionar por rol si lo necesitas */}
        <View className="rounded-2xl p-4 my-4 bg-[#E0F7FA]">
          <Text className="font-UrbanistBold text-lg mb-2 text-brown-800">
            Recomendación para el papá
          </Text>
          <Text className="font-UrbanistMedium text-base text-brown-700">
            {parentRecommendation}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestDetailedResults;
