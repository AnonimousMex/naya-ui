import { Text, View, Image, TouchableOpacity } from "react-native";
import { IMAGES } from "@/constants/images";
import { MainButton } from "@/components/MainButton";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { useScreenDimensions } from "@/utils/dimensions";

const Welcome = () => {
  const { logoWidth, logoHeight, sloganWidth, sloganHeight } =
    useScreenDimensions();

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
          source={IMAGES.NAYA_SLOGAN}
          style={{
            width: sloganWidth,
            height: sloganHeight,
            resizeMode: "contain",
          }}
        />
        <TouchableOpacity className="w-80 py-3 rounded-full border items-center mt-24">
          <Text className="text-lg font-bold text-brown-700">Registrarme</Text>
        </TouchableOpacity>
        <MainButton
          mainText="Continuar"
          onPress={() => {}}
          className="w-80 py-3 mt-24"
          style={{ height: 50 }}
        />
      </View>
    </View>
  );
};

export default Welcome;
