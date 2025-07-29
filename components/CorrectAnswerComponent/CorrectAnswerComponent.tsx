import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { IMAGES } from "@/constants/images";

type EmotionItem = {
  text: string; // viene en inglés desde el backend
  title: string;
  body: string;
  tip: string;
  highlight: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  emotion: EmotionItem;
};

// Mapeo visual basado en la emoción traducida al español
const EMOTION_STYLE_MAP: Record<
  string,
  { image: any; color: string; borderColor: string }
> = {
  Alegría: {
    image: IMAGES.HAPPY_PANDA_1,
    color: "#FFD700",
    borderColor: "#FFEA78",
  },
  Tristeza: {
    image: IMAGES.SAD_AXOLOTL_1,
    color: "#1E90FF",
    borderColor: "#7ABDFF",
  },
  Enojo: {
    image: IMAGES.ANGRY_LION_1,
    color: "#FF4500",
    borderColor: "#FFB99F",
  },
  Temor: {
    image: IMAGES.SCARED_BUNNY_1,
    color: "#800080",
    borderColor: "#C34FC3",
  },
};

const translateEmotion = (text: string): string => {
  switch (text.toLowerCase()) {
    case "happy":
      return "Alegría";
    case "sad":
      return "Tristeza";
    case "angry":
      return "Enojo";
    case "scared":
      return "Temor";
    default:
      return "Alegría"; 
  }
};

const CorrectAnswerComponent = ({ visible, onClose, emotion }: Props) => {
  if (!visible) return null;

  const { title, body, tip, highlight } = emotion;
  const emotionTranslated = translateEmotion(emotion.text);
  const { image, color, borderColor } = EMOTION_STYLE_MAP[emotionTranslated] || {
    image: IMAGES.HAPPY_PANDA_1,
    color: "#f472b6",
    borderColor: "#ec4899",
  };

  const [before, keyword, after] = (() => {
    const idx = body.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return [body, "", ""];
    return [
      body.slice(0, idx),
      body.slice(idx, idx + highlight.length),
      body.slice(idx + highlight.length),
    ];
  })();

  const screenHeight = Dimensions.get("window").height;
  const containerHeight = screenHeight * 0.55;

  return (
    <View className="items-center">
      {/* Header y emoción */}
      <View className="w-full px-8 items-center">
        <Text className="text-4xl font-UrbanistExtraBold text-center mb-5">
          ¡Correcto!
        </Text>
        <View
          className="flex-row items-center px-6 py-4 rounded-[35px] w-8/12"
          style={{
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: 4,
            minHeight: 100,
          }}
        >
          <Image
            source={image}
            style={{
              width: 100,
              height: 100,
              marginRight: 5,
              marginBottom: -13,
            }}
            resizeMode="contain"
          />
          <Text className="text-4xl font-UrbanistExtraBold text-white">
            {emotionTranslated}
          </Text>
        </View>
      </View>

      {/* Contenido principal */}
      <View
        className="justify-center items-center w-full mt-5"
        style={{ height: containerHeight }}
      >
        <ImageBackground
          source={IMAGES.SOUNDS_BACKGROUND}
          resizeMode="cover"
          imageStyle={{ borderRadius: 70 }}
          className="w-10/12 h-full"
        >
          <View className="rounded-[70px] pt-5 px-5 items-center border-4 border-pink-600 bg-white/90 flex-1 justify-between">
            <View className="items-center w-full px-4 py-9 pb-12">
              <Text className="text-3xl font-UrbanistExtraBold text-black-20 mb-5 text-center">
                {title}
              </Text>

              <Text className="text-2xl font-UrbanistExtraBold text-center mt-5 mb-5">
                <Text className="text-black-20">{before}</Text>
                <Text className="text-blue-226 ">{keyword}</Text>
                <Text className="text-black-20">{after}</Text>
              </Text>

              <Text
                className="text-2xl font-UrbanistExtraBold text-center mt-5 mb-9"
                style={{
                  color: color,
                  textShadowColor: borderColor,
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 1,
                }}
              >
                {tip}
              </Text>

              <Pressable
                onPress={onClose}
                className="bg-pink-10 py-3 px-8 rounded-full"
              >
                <Text className="text-black-20 font-UrbanistBold text-lg">
                  Continuar
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default CorrectAnswerComponent;
