import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { IMAGES } from "@/constants/images";

type TSubmitButton = {
  mainText: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const SubmitButton = ({
  mainText,
  onPress,
  disabled = false,
  isLoading = false,
  className = "",
  style,
}: TSubmitButton) => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className={`bg-pink-400 rounded-full flex-row items-center justify-center ${
          disabled || isLoading ? "opacity-70" : ""
        } ${className}`}
        onPress={onPress}
        disabled={disabled || isLoading}
        style={style}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <Text className="text-brown-800 text-xl font-UrbanistExtraBold ml-9 top-[-2px]">
              {mainText}
            </Text>
            <Image source={IMAGES.ARROW_RIGHT} className="w-10 h-10 ml-4" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;
