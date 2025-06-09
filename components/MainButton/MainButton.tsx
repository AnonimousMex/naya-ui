import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import { IMAGES } from "@/constants/images";

type TMainButton = {
  mainText: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const MainButton = ({
  mainText,
  onPress,
  disabled = false,
  isLoading = false,
  className = "",
  style,
}: TMainButton) => {
  const { width } = Dimensions.get("window");
  const buttonPadding = width < 390 ? 12 : 16;

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        className={`bg-pink-400 rounded-full flex-row items-center justify-center ${
          disabled || isLoading ? "opacity-70" : ""
        } ${className}`}
        onPress={onPress}
        disabled={disabled || isLoading}
        style={[
          {
            paddingHorizontal: buttonPadding,
            paddingVertical: buttonPadding * 0.75,
            minWidth: width * 0.6, // 60% del ancho de pantalla como mínimo
          },
          style,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <View className="flex-row items-center" style={{ flexShrink: 1 }}>
            <Text
              className="text-brown-800 font-UrbanistExtraBold"
              style={{
                fontSize: width < 390 ? 16 : 20,
                lineHeight: 24,
                marginRight: 8,
                flexShrink: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {mainText}
            </Text>
            <Image
              source={IMAGES.ARROW_RIGHT}
              style={{
                width: width < 390 ? 24 : 32,
                height: width < 390 ? 24 : 32,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainButton;
