import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { IMAGES } from "@/constants/images";
import { MainButton } from "@/components/MainButton";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { useScreenDimensions } from "@/utils/dimensions";
import { router } from "expo-router";

const TestResults = () => {
  const { logoWidth, logoHeight, sloganWidth, sloganHeight } =
    useScreenDimensions();
  const { width } = Dimensions.get("window");

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <CloudBackground />
    </View>
  );
};

export default TestResults;
