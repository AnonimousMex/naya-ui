import {
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";
import { BackButton } from "@/components/BackButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { AnswersTest } from "@/components/AnswersTest";
import { MainButton } from "@/components/MainButton";

const TestResults = () => {
  const { width, height } = Dimensions.get("window");

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

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className={`relative ${bgColor}`}
          style={{ height: dynamicHeight }}
        >
          <View className="absolute w-full flex-row justify-between p-7">
            <BackButton onPress={() => router.push("/(auth)/welcome")} />

            <HeaderInformationComponent
              type="date"
              label="16/Junio/2025"
              borderColor="#E4B18E"
            />
          </View>

          <View className="flex-1 justify-end items-center">
            <View>
              <Text
                className="text-brown-800 font-UrbanistBold text-xl mb-8 text-center px-5"
                style={{ letterSpacing: -1 }}
              >
                Resultados: Mejoró sus relaciones sociales, ha estado feliz y
                tranquilo
              </Text>
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
          <AnswersTest />
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
