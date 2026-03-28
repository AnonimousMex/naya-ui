import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router, useLocalSearchParams } from "expo-router";
import { ICONS } from "@/constants/images";
import { useEffect, useMemo, useState } from "react";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

type EmotionKey = "happy" | "angry" | "sad" | "shame" | "fear" | "unknown";

type TestInfoUI = {
  date: string;
  totalQuestions: number;
  performedBy: string;
};

type TestResultUI = {
  situation: string;
  answer: string;
  emotion: EmotionKey;
};

type TestStatsUI = Record<EmotionKey, number>;

const EMOTION_MAP: Record<string, EmotionKey> = {
  Felicidad: "happy",
  Alegría: "happy",
  happy: "happy",
  Enojo: "angry",
  Ira: "angry",
  angry: "angry",
  Tristeza: "sad",
  sad: "sad",
  Vergüenza: "shame",
  Pena: "shame",
  shame: "shame",
  Miedo: "fear",
  fear: "fear",
};

const EMOTION_COLORS: Record<EmotionKey, string> = {
  happy: "#FFD166",
  angry: "#EF476F",
  sad: "#118AB2",
  shame: "#9D4EDD",
  fear: "#06D6A0",
  unknown: "#BDBDBD",
};

const EMOTION_LABELS: Record<EmotionKey, string> = {
  happy: "Felicidad",
  angry: "Enojo",
  sad: "Tristeza",
  shame: "Vergüenza",
  fear: "Miedo",
  unknown: "Indefinida",
};

const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");
  const params = useLocalSearchParams();
  const paramId = params?.test_id;

  const testId = useMemo(
    () =>
      Array.isArray(paramId) ? paramId[0] : (paramId as string | undefined),
    [paramId],
  );

  const [loading, setLoading] = useState(true);

  const [testInfo, setTestInfo] = useState<TestInfoUI>({
    date: "Fecha no disp.",
    totalQuestions: 0,
    performedBy: "Paciente",
  });
  const [testResults, setTestResults] = useState<TestResultUI[]>([]);
  const [statistics, setStatistics] = useState<TestStatsUI>({
    happy: 0,
    angry: 0,
    sad: 0,
    shame: 0,
    fear: 0,
    unknown: 0,
  });

  const [isCompletelyEmpty, setIsCompletelyEmpty] = useState(false);

  useEffect(() => {
    const fetchWhatWeCan = async () => {
      if (!testId) {
        setIsCompletelyEmpty(true);
        setLoading(false);
        return;
      }

      let foundSomething = false;

      try {
        const resResults = await HTTP.post(
          URL_PATHS.TEST_THERAPIST.TEST_RESULTS,
          { test_id: testId },
        );
        const rawData = (resResults.data as any)?.data || [];

        if (rawData.length > 0) {
          foundSomething = true;
          const adaptedResults: TestResultUI[] = rawData.map((x: any) => ({
            situation: x.story || "Situación desconocida",
            answer: x.answer || "Sin respuesta",
            emotion: EMOTION_MAP[x.emotion] || "unknown",
          }));
          setTestResults(adaptedResults);

          setTestInfo((prev) => ({
            ...prev,
            totalQuestions: adaptedResults.length,
          }));
        }
      } catch (e) {
        console.log("No se pudieron cargar los resultados del test", e);
      }

      try {
        const resStats = await HTTP.post(
          URL_PATHS.TEST_THERAPIST.TEST_STATICS,
          { test_id: testId },
        );
        const rawStats = (resStats.data as any)?.data || [];

        if (rawStats.length > 0) {
          foundSomething = true;
          const baseStats: TestStatsUI = {
            happy: 0,
            angry: 0,
            sad: 0,
            shame: 0,
            fear: 0,
            unknown: 0,
          };
          rawStats.forEach((it: any) => {
            const key = EMOTION_MAP[it.emotion_name] || "unknown";
            baseStats[key] = it.percentage ?? 0;
          });
          setStatistics(baseStats);
        }
      } catch (e) {
        console.log("No se pudieron cargar las estadísticas", e);
      }

      try {
        const resInfo = await HTTP.post(URL_PATHS.TEST_THERAPIST.TEST_INFO, {
          test_id: testId,
        });
        const rawInfo = (resInfo.data as any)?.data;
        if (rawInfo) {
          foundSomething = true;
          setTestInfo((prev) => ({
            date: rawInfo.date || prev.date,
            totalQuestions: rawInfo.total_answers || prev.totalQuestions,
            performedBy: rawInfo.patient_name || prev.performedBy,
          }));
        }
      } catch (e) {
        console.log("No se pudo cargar la info general", e);
      }

      setIsCompletelyEmpty(!foundSomething);
      setLoading(false);
    };

    fetchWhatWeCan();
  }, [testId]);

  const dominantEmotion = Object.keys(statistics).reduce((a, b) =>
    statistics[a as EmotionKey] > statistics[b as EmotionKey] ? a : b,
  ) as EmotionKey;

  if (loading)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200">
        <ActivityIndicator size="large" color="#EF476F" />
        <Text className="mt-4 text-brown-800 font-UrbanistBold text-lg">
          Cargando datos del paciente...
        </Text>
      </SafeAreaView>
    );

  if (isCompletelyEmpty)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200 px-6">
        <Image
          source={ICONS.WARNING_IMAGE}
          style={{
            width: 80,
            height: 80,
            tintColor: "#EF476F",
            marginBottom: 16,
          }}
        />
        <Text className="text-center text-red-600 font-UrbanistBold text-xl mb-4">
          No hay datos registrados en este test
        </Text>
        <BackButton onPress={() => router.back()} />
      </SafeAreaView>
    );

  const hasStats = Object.values(statistics).some((val) => val > 0);

  return (
    <SafeAreaView className="flex-1 bg-pink-200" edges={["top"]}>
      <View className="w-full flex-row justify-between pt-6 px-7 pb-4 z-10 bg-pink-200">
        <BackButton onPress={() => router.back()} />
        <HeaderInformationComponent
          type="date"
          label={testInfo.date}
          borderColor="#E4B18E"
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-UrbanistBold text-2xl mb-2 text-brown-800 text-center px-4">
          Reporte Clínico
        </Text>
        <Text className="font-UrbanistMedium text-base mb-6 text-brown-600 text-center px-4">
          Paciente: {testInfo.performedBy}
        </Text>

        {hasStats && (
          <View className="bg-white mx-4 rounded-3xl p-5 mb-6 shadow-sm border border-pink-100">
            <Text className="font-UrbanistBold text-lg text-brown-800 mb-4">
              Espectro Emocional
            </Text>
            {(Object.entries(statistics) as [EmotionKey, number][])
              .sort((a, b) => b[1] - a[1])
              .filter(([_, val]) => val > 0)
              .map(([key, value]) => (
                <View key={key} className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-UrbanistMedium text-brown-700">
                      {EMOTION_LABELS[key]}
                    </Text>
                    <Text className="font-UrbanistBold text-brown-800">
                      {value.toFixed(1)}%
                    </Text>
                  </View>
                  <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      style={{
                        width: `${value}%`,
                        backgroundColor: EMOTION_COLORS[key],
                      }}
                      className="h-full rounded-full"
                    />
                  </View>
                </View>
              ))}
          </View>
        )}

        {testResults.length > 0 && (
          <View
            className="bg-white mx-4 rounded-3xl p-5 mb-6 shadow-sm border-l-4"
            style={{ borderLeftColor: EMOTION_COLORS[dominantEmotion] }}
          >
            <View className="flex-row items-center mb-2">
              <Image
                source={ICONS.DETAILS_ICON}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: EMOTION_COLORS[dominantEmotion],
                  marginRight: 8,
                }}
              />
              <Text className="font-UrbanistBold text-xl text-brown-800 flex-1">
                Resumen de Respuestas
              </Text>
            </View>
            <Text className="font-UrbanistMedium text-sm text-brown-600 mb-2 leading-5">
              Se han registrado {testResults.length} respuestas a situaciones en
              este test. Revisa el desglose a continuación para detectar los
              detonantes emocionales específicos del niño.
            </Text>
          </View>
        )}

        <View
          style={{ position: "relative", width: width, height: 60, zIndex: 10 }}
        >
          <Svg
            height="60"
            width={width}
            viewBox={`0 0 ${width} 60`}
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
            <Path
              d={`M 0 60 Q ${width / 2} 0 ${width} 60`}
              fill="#F699B4"
              stroke="none"
            />
          </Svg>
        </View>

        <View className="bg-pink-400 pt-6 px-4 pb-10 min-h-[400px]">
          {testResults.length > 0 ? (
            <>
              <Text className="font-UrbanistBold text-xl text-white mb-4 text-center">
                Desglose de Situaciones ({testInfo.totalQuestions})
              </Text>
              {testResults.map((item, idx) => (
                <View
                  key={idx}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm border-l-4"
                  style={{ borderLeftColor: EMOTION_COLORS[item.emotion] }}
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="font-UrbanistBold text-brown-800 flex-1 pr-2 text-base">
                      {item.situation}
                    </Text>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: EMOTION_COLORS[item.emotion] + "30",
                      }}
                    >
                      <Text
                        className="font-UrbanistBold text-xs"
                        style={{ color: EMOTION_COLORS[item.emotion] }}
                      >
                        {EMOTION_LABELS[item.emotion]}
                      </Text>
                    </View>
                  </View>
                  <Text className="font-UrbanistMedium text-brown-600 italic">
                    "{item.answer}"
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text className="font-UrbanistMedium text-white text-center mt-10">
              No se encontraron respuestas detalladas para este test.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestDetailedResults;
