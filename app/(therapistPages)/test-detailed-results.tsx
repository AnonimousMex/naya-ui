import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestResultItem, TestStatistics } from "@/components/TestResultDetail";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router } from "expo-router";
import { ICONS } from "@/constants/images";

const mockBackendResponse = {
  testInfo: {
    date: "16/Junio/2025",
    totalQuestions: 3,
    performedBy: "Emiliano",
    testId: "test_001",
  },
  testResults: [
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
  ],
  statistics: {
    happy: 1,
    angry: 1,
    sad: 1,
  },
  analysis: {
    tendency:
      "El niño tiende a expresar sus emociones de manera variada, mostrando tanto respuestas asertivas como reacciones emocionales negativas. Se recomienda reforzar la gestión emocional positiva."
  },
};

const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");

  const { testInfo, testResults, statistics, analysis } = mockBackendResponse;

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
            <View className="rounded-b-2xl p-4 mb-12 bg-[#FFF8E1]">
              <Text className="font-UrbanistBold text-base text-brown-700">
                {analysis.tendency}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestDetailedResults;
