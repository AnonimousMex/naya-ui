import { ICONS, IMAGES } from "@/constants/images";
import React, { useEffect } from "react";
import { Modal, View, Image, Text, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
  correctOption: string;
  wrongOption: string;
};

const screenWidth = Dimensions.get("window").width;

const getHintFromEmotion = (emotion: string): string => {
  const hints: Record<string, string> = {
    alegría: "Cuando algo te produce risa es porque algo bueno pasó",
    tristeza: "A veces cuando algo se pierde o no sale como esperábamos, aparece esta emoción.",
    enojo: "Cuando algo injusto sucede o alguien te molesta, puedes sentir esto.",
    temor: "Esta emoción aparece cuando sentimos que algo puede salir mal o nos pone en peligro.",
  };

  return hints[emotion.toLowerCase()] || `Pista: piensa en "${emotion}"`;
};

const WrongAnswerComponent = ({ visible, onClose, correctOption, wrongOption }: Props) => {
  const shake = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      shake.value = withSequence(
        withRepeat(
          withTiming(10, { duration: 50 }),
          6,
          true 
        ),
        withTiming(0, { duration: 50 })
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shake.value,
      },
    ],
  }));

  if (!visible) return null;

  const hint = getHintFromEmotion(correctOption);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <Animated.View className="items-center" style={animatedStyle}>
          <Image
            source={IMAGES.SHAME_AXOLOTL_HEAD}
            resizeMode="contain"
            style={{
              width: screenWidth * 0.7,
              height: screenWidth * 0.7,
              marginBottom: -130,
              zIndex: 10,
            }}
          />

          <View
            className="bg-white pt-16 items-center shadow-md px-4"
            style={{
              width: screenWidth * 0.7,
              height: 400,
              borderRadius: 100,
              justifyContent: "space-between",
              paddingBottom: 30,
            }}
          >
            <View>
              <Text className="text-4xl font-UrbanistExtraBold text-center mb-5 mt-10 text-blue-109">
                ¡Ups!
              </Text>
              <Text className="text-2xl font-UrbanistExtraBold text-center mb-4 text-green-995">
                ¡Uy, no sonó a alguien con {wrongOption}!
              </Text>
              <Text className="text-xl font-UrbanistExtraBold text-center mb-2 text-gray-41">
                Piensa: {hint}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="bg-pink-92 py-3 px-8 rounded-full mt-5 border-2 border-pink-992"
            >
              <View className="flex-row items-center space-x-2">
                <Text className="text-pink-458 font-UrbanistExtraBold text-xl">
                  Continuar
                </Text>
                <Image
                  source={ICONS.ARROW_ICON}
                  resizeMode="contain"
                  className="w-7 h-7"
                />
              </View>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default WrongAnswerComponent;
