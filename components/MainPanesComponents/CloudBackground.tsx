import { View, Image } from "react-native";
import { IMAGES } from "@/constants/images";
import { useScreenDimensions } from "@/utils/dimensions";

export const CloudBackground = () => {
  const { height, cloudOffsetTop, cloudOffsetLeft } = useScreenDimensions();

  return (
    <>
      <Image
        source={IMAGES.CLOUDS_IMAGE}
        style={{
          top: cloudOffsetTop,
          left: cloudOffsetLeft,
          tintColor: 'white',
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
          tintColor: 'white',
        }}
      />
    </>
  );
};
