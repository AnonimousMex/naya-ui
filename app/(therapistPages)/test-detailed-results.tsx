import { View, Text, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestResultItem, TestStatistics } from "@/components/TestResultDetail";
import { BackButton } from "@/components/BackButton";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { router, useLocalSearchParams } from "expo-router";
import { ICONS } from "@/constants/images";
import { useEffect, useMemo, useState } from "react";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

// ====== Tipos de respuesta del backend ======
type InfoRes = {
  status: number;
  statusMessage: string;
  data: { date: string; total_answers: number; patient_name: string };
};

type ResultsRes = {
  status: number;
  statusMessage: string;
  data: { story: string; answer: string; emotion:string }[];
  pagination: unknown | null;
};

type StatsItem = { emotion_id: string; emotion_name: string; percentage: number };
type StatsRes = {
  status: number;
  statusMessage: string;
  data: StatsItem[];
  pagination: unknown | null;
};

// ====== Tipos que usa tu UI ======
type EmotionKey = "happy" | "angry" | "sad" | "shame" | "fear";

type TestInfoUI = {
  date: string;
  totalQuestions: number;
  performedBy: string;
};

type TestResultUI = {
  situation: string;
  answer: string;
  emotion: string;
};

type TestStatsUI = Record<EmotionKey, number>;

// ====== Mapeo de emociones (ES -> claves UI) ======
const EMOTION_MAP: Record<string, EmotionKey | undefined> = {
  Felicidad: "happy",
  Alegría: "happy",
  Enojo: "angry",
  Ira: "angry",
  Tristeza: "sad",
  Vergüenza: "shame",
  Pena: "shame",
  Miedo: "fear",
};

// Normaliza stats del backend (porcentajes) a llaves esperadas por TestStatistics
const adaptStats = (items: StatsItem[]): TestStatsUI => {
  const base: TestStatsUI = { happy: 0, angry: 0, sad: 0, shame: 0, fear: 0 };
  items.forEach((it) => {
    const key = EMOTION_MAP[it.emotion_name];
    if (key) base[key] = it.percentage ?? 0;
  });
  return base;
};

// 💡 Siempre devuelve una emoción válida (por defecto "happy")
const getDominantEmotion = (stats: TestStatsUI): EmotionKey => {
  let maxKey: EmotionKey = "happy";
  let maxVal = -1;
  (Object.keys(stats) as EmotionKey[]).forEach((k) => {
    if (stats[k] > maxVal) {
      maxVal = stats[k];
      maxKey = k;
    }
  });
  return maxKey;
};

// Adapta info general
const adaptInfo = (data: InfoRes["data"]): TestInfoUI => ({
  date: data.date,
  totalQuestions: data.total_answers,
  performedBy: data.patient_name,
});

// Adapta resultados (story/answer) y asigna emoción dominante (si no viene por ítem)
const adaptResults = (arr: ResultsRes["data"]): TestResultUI[] =>
  arr.map((x) => ({
    situation: x.story,
    answer: x.answer,
    emotion: x.emotion,
  }));

const TestDetailedResults = () => {
  const { width } = Dimensions.get("window");
  const params = useLocalSearchParams();
  const paramId = params?.test_id;

  const testId = useMemo(
    () => (Array.isArray(paramId) ? paramId[0] : (paramId as string | undefined)),
    [paramId]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [testID, setTestID] = useState<string | null>(null);
  const [testInfo, setTestInfo] = useState<TestInfoUI | null>(null);
  const [testResults, setTestResults] = useState<TestResultUI[]>([]);
  const [statistics, setStatistics] = useState<TestStatsUI>({
    happy: 0,
    angry: 0,
    sad: 0,
    shame: 0,
    fear: 0,
  });
  const [analysis, setAnalysis] = useState<{ tendency: string }>({ tendency: "" });

  // Helper GET con body { test_id }
  const getWithBody = async <T,>(url: string) => {
    const body = { test_id: paramId };
    const res = await HTTP.post<T>(
      url,
      body,
    );
    return res;
  };

  useEffect(() => {
    const loadAll = async () => {
      if (!testId) {
        setError("Falta test_id");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Llamadas en paralelo
        const [infoRes, resultsRes, statsRes] = await Promise.all([ 
          getWithBody<InfoRes>(URL_PATHS.TEST_THERAPIST.TEST_INFO),
          getWithBody<ResultsRes>(URL_PATHS.TEST_THERAPIST.TEST_RESULTS),
          getWithBody<StatsRes>(URL_PATHS.TEST_THERAPIST.TEST_STATICS),
        ]);

        const okInfo = infoRes.status === 200 && (infoRes.data as any)?.status === 200;
        const okResults = resultsRes.status === 200 && (resultsRes.data as any)?.status === 200;
        const okStats = statsRes.status === 200 && (statsRes.data as any)?.status === 200;

        if (!okInfo || !okResults || !okStats) {
          throw new Error(
            `Respuestas no OK -> info:${infoRes.status}/${(infoRes.data as any)?.status} ` +
              `results:${resultsRes.status}/${(resultsRes.data as any)?.status} ` +
              `stats:${statsRes.status}/${(statsRes.data as any)?.status}`
          );
        }

        // Adaptar a UI
        const info = adaptInfo((infoRes.data as any).data);
        const stats = adaptStats((statsRes.data as any).data);
        const dominant = getDominantEmotion(stats);
        const results = adaptResults((resultsRes.data as any).data);

        const analysisTextMap: Record<EmotionKey, string> = {
          happy:
            "Predominan respuestas asociadas a bienestar. Refuerza los hábitos que promueven emociones positivas.",
          angry:
            "Se detectan reacciones de enojo. Trabaja habilidades de regulación emocional y resolución de conflictos.",
          sad:
            "Hay tendencia a la tristeza. Considera actividades que fortalezcan la autoestima y el apoyo emocional.",
          shame:
            "Aparece vergüenza con frecuencia. Practica exposición gradual segura y refuerzo de autoaceptación.",
          fear:
            "Predomina el miedo. Enfoca estrategias de afrontamiento y desensibilización progresiva.",
        };

        setTestInfo(info);
        setStatistics(stats);
        setTestResults(results);
        setAnalysis({ tendency: analysisTextMap[dominant] });
      } catch (e: any) {
        setError(e?.message || "Error al cargar resultados");
        setTestInfo(null);
        setTestResults([]);
        setStatistics({ happy: 0, angry: 0, sad: 0, shame: 0, fear: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [testId]);

  const dateLabel = testInfo?.date ?? "";

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200">
        <ActivityIndicator />
        <Text className="mt-2 text-brown-800 font-UrbanistBold">Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200 px-6">
        <Text className="text-center text-red-600 font-UrbanistBold"> El test no se registro con respuestas</Text>
        {/* <Text className="mt-2 text-center text-brown-800">
          Verifica que el <Text className="font-UrbanistBold">test_id</Text> sea válido y que las rutas acepten body en GET.
        </Text> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pink-200" edges={["top"]}>
      <View className="w-full flex-row justify-between pt-6 px-7 pb-4 z-10 bg-pink-200">
        <BackButton onPress={() => router.back()} />
        <HeaderInformationComponent type="date" label={dateLabel} borderColor="#E4B18E" />
      </View>

      <ScrollView
        className="flex-1 px-4 pt-2 bg-pink-200"
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-UrbanistBold text-2xl mb-4 text-brown-800 text-center">
          Resultados detallados del test
        </Text>

        {/* Tarjeta info general */}
        <View className="items-center mb-4">
          <View className="rounded-full p-5 bg-white shadow-md flex-row items-center justify-between">
            <View className="ml-4 mr-9">
              <Text className="font-UrbanistBold text-base text-brown-800 mb-1">
                Realizado el {testInfo?.date}
              </Text>
              <Text className="font-UrbanistBold text-base text-brown-800 mb-1">
                Total de preguntas: {testInfo?.totalQuestions}
              </Text>
              <Text className="font-UrbanistBold text-base text-brown-800">
                Realizado por: {testInfo?.performedBy}
              </Text>
            </View>
            <View className="w-16 h-16 rounded-full p-4 bg-brown-20">
              <Image
                source={ICONS.DETAILS_ICON}
                style={{ width: "100%", height: "100%", resizeMode: "contain", tintColor: "white" }}
              />
            </View>
          </View>
        </View>

        {/* Lista de situaciones/respuestas */}
        {testResults.map((item, idx) => (
          <TestResultItem
            key={idx}
            situation={item.situation}
            answer={item.answer}
            emotion={item.emotion as EmotionKey}
          />
        ))}

        {/* Ola separadora */}
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
            <Path d={`M 0 90 Q ${width / 2} 0 ${width} 90`} fill="#F699B4" stroke="none" />
          </Svg>
        </View>

        {/* Estadísticas + análisis */}
        <View className="mb-0 -mx-4 relative">
          <View className="bg-pink-800 pt-7 px-4">
            <TestStatistics stats={statistics} />

            <View className="rounded-t-xl p-3 bg-white mt-4">
              <Text className="font-UrbanistBold text-lg text-brown-800">Tendencia del niño</Text>
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
