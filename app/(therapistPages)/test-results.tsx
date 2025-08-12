import {
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { ICONS, IMAGES } from "@/constants/images";
import { BackButton } from "@/components/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { MainButton } from "@/components/MainButton";
import { NavbarComponent } from "@/components/NavBar";
import { useEffect, useState, useMemo } from "react";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

type TestRecord = {
  id: string;
  created_at: string;
  user_id: string;
};

type ApiResponse = {
  status: number;
  statusMessage: string;
  data: TestRecord[];
  pagination: unknown | null;
};

const TestResults = () => {
  const params = useLocalSearchParams();
  const paramId = params?.id;
  const normalizedId = useMemo(
    () => (Array.isArray(paramId) ? paramId[0] : (paramId as string | undefined)),
    [paramId]
  );

  const [patientId, setpatientId] = useState<string | null>(null);
  const [firstTest, setFirstTest] = useState<string>("dd/mm/aaaa");
  const { width, height } = Dimensions.get("window");

  const [tests, setTests] = useState<TestRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#FFF27C");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  useEffect(() => {
    if (normalizedId) {
      setpatientId(normalizedId);
    }
  }, [normalizedId]);

  useEffect(() => {
    const loadTests = async () => {
      if (!patientId) return; 
      try {
        setLoading(true);
        const payload = { patient_id: patientId };
        const { data } = await HTTP.post<ApiResponse>(
          URL_PATHS.TEST.LIST_TESTS, // o el endpoint que reciba el user_id
          payload,
        );
        const items = Array.isArray(data?.data) ? data.data : [];
        const ordered = [...items].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setTests(ordered);
      } catch (err) {
        console.error("Error loading tests:", err);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, [patientId]);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const dia = d.toLocaleDateString("es-MX", { day: "2-digit" });
      const mesCorto = d.toLocaleDateString("es-MX", { month: "short" }).replace(".", "");
      const anio = d.getFullYear();
      return `${dia}/${mesCorto}/${anio}`;
    } catch {
      return iso;
    }
  };

  const bgColorClasses = {
    happy: "bg-[#FFF27C]",
    angry: "bg-[#DE4E41]",
    sad: "bg-[#8AC2FF]",
    shame: "bg-[#F2AAAE]",
    fear: "bg-[#D6D4FF]",
  };

  const userEmotion = "happy";
  const bgColor = bgColorClasses[userEmotion] || "bg-white";
  const userImage = IMAGES.HAPPY_AXOLOTL_1;
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;
  const fontSize = width * 0.06;

  const todayLabel = formatDate(new Date().toISOString());

  const renderItem = ({ item, index }: { item: TestRecord; index: number }) => (
    <TouchableOpacity
      className="border-2 border-brown-800 items-center justify-between rounded-3xl py-2 px-2 bg-white mb-3 flex-row"
      onPress={() =>
        router.push({
          pathname: "/(therapistPages)/test-detailed-results",
          params: { test_id: item.id },
        })
      }
    >
      <View className="w-[75%] px-2">
        <Text
          className="font-UrbanistExtraBold text-[2rem] text-start"
          style={{ fontSize }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.5}
        >
          {`Test ${index + 1}`}
        </Text>
        <Text
          className="font-UrbanistExtraBold text-start text-gray-30"
          style={{ fontSize: fontSize - 6 }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.5}
        >
          {`Fecha: ${formatDate(item.created_at)}`}
        </Text>
      </View>
      <Image source={ICONS.BACK_RIGHT_ICON} className="h-9" resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-slate-100 flex-1">
      {/* Encabezado con fondo y personaje */}
      <View className={`relative ${bgColor}`} style={{ height: dynamicHeight }}>
        <View className="absolute w-full flex-row justify-between p-7">
          <BackButton onPress={() => router.back()} />
          <HeaderInformationComponent type="date" label={`Resueltos`} borderColor="#E4B18E" />
        </View>

        <View className="flex-1 justify-end items-center">
          <View>
            <Text
              className="text-brown-800 font-UrbanistBold text-2xl mb-8 text-center px-5"
              style={{ letterSpacing: -1 }}
            >
              EL ultimo Test lo realizo el dd/mm/aa. Da clic en Ver Más
            </Text>
          </View>
          <Image
            source={userImage}
            className="mb-[-80] w-64 h-64"
            style={{ resizeMode: "contain" }}
          />
        </View>
      </View>

      {/* Contenido principal */}
      <View className="flex-1 bg-white rounded-t-3xl px-6 pt-1">
        <View className="w-full flex-row justify-end">
          <Pressable onPress={() => router.push("/(auth)/welcome")} className="px-3 rounded-md mt-4">
            <View className="flex-row items-center ">
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
          mainText="Ver más"
          onPress={() => {
            router.push({
              pathname: "/(therapistPages)/test-detailed-results",
              params: { test_id: tests[0].id },
            })
          }}
          className="w-80 py-3 mt-6"
        />

        <Text
          className="font-UrbanistExtraBold text-center text-brown-100 mb-3 mt-4"
          style={{ fontSize: fontSize + 5 }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.5}
        >
          Test Resueltos
        </Text>

        {/* Lista de tests */}
        {loading || !patientId ? (
          <View className="items-center justify-center py-8">
            <ActivityIndicator />
            <Text className="mt-2 text-gray-500">
              {patientId ? "Cargando..." : "Cargando usuario..."}
            </Text>
          </View>
        ) : tests.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-500">Aún no hay tests resueltos. </Text>
          </View>
        ) : (
          <FlatList
            data={tests}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        )}
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
