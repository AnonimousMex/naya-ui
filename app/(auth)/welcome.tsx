import { IMAGES } from "@/constants/images";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { MainButton } from "@/components/MainButton";

const Welcome = () => {
  const { width, height } = useWindowDimensions();

  const isSmall = width < 390 || height < 800;

  const logoWidth = width * 0.7;
  const logoHeight = height * 0.25;

  const sloganWidth = width * 0.5;
  const sloganHeight = height * 0.1;

  const cloudOffsetLeft = isSmall ? -60 : -80;
  const cloudOffsetTop = isSmall ? 10 : 20;

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <Image
        source={IMAGES.CLOUDS_IMAGE}
        style={{
          top: cloudOffsetTop,
          left: cloudOffsetLeft,
        }}
        className="absolute"
      />
      <Image
        source={IMAGES.CLOUDS_IMAGE}
        className="absolute z-0"
        style={{
          top: cloudOffsetTop + height * 0.6,
          right: cloudOffsetLeft,
          transform: [{ scaleX: -1 }],
        }}
      />
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
        <TouchableOpacity
          className={`w-80 py-3 rounded-full border items-center mt-24 "
        }`}
        >
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
