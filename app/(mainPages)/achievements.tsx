import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { IMAGES } from "@/constants/images";
import { MainButton } from "@/components/MainButton";
import { useScreenDimensions } from "@/utils/dimensions";

const Welcome = () => {
  const { logoWidth, logoHeight, sloganWidth, sloganHeight } =
    useScreenDimensions();
  const { width } = Dimensions.get("window");

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <View
        style={{ width: logoWidth }}
        className="justify-center items-center mt-16"
      ></View>
    </View>
  );
};

export default Welcome;
