import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { IMAGES } from "@/constants/images";
import { MainButton } from "@/components/MainButton";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { useScreenDimensions } from "@/utils/dimensions";
import { router } from "expo-router";

const Welcome = () => {
  const { logoWidth, logoHeight, sloganWidth, sloganHeight } =
    useScreenDimensions();
  const { width } = Dimensions.get("window");

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <CloudBackground />

      <View
        style={{ width: logoWidth }}
        className="justify-center items-center mt-16"
      >
        <Image
          source={IMAGES.NAYA_LOGO}
          style={{
            width: logoWidth,
            height: logoHeight,
            resizeMode: "contain",
          }}
        />
        <Image
          className="mb-6"
          source={IMAGES.NAYA_SLOGAN}
          style={{
            width: sloganWidth,
            height: sloganHeight,
            resizeMode: "contain",
          }}
        />
        <TouchableOpacity
          className="w-full py-3 rounded-full border items-center mt-24"
          onPress={() => router.push("/(mainPages)/insignias")}
        >
          <Text
            className="text-lg font-bold text-brown-700"
            style={{ fontSize: width < 390 ? 16 : 20 }}
          >
            Registrarme
          </Text>
        </TouchableOpacity>
        <MainButton
          mainText="Continuar"
          onPress={() => router.push("/(therapistPages)/therapist-upcoming-appointments")}
          className="w-80 py-3 mt-6"
        />
      </View>
    </View>
  );
};

export default Welcome;
