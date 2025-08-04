import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";

type EmotionItem = {
  text: string;
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
    image: IMAGES.FEAR_BUNNY_3,
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

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.55;

  return (
    <View style={{ alignItems: "center", paddingHorizontal: screenWidth * 0.05 }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: screenWidth * 0.05,
        }}
      >
        <Text
          style={{
            fontSize: screenWidth * 0.09,
            fontWeight: "800",
            textAlign: "center",
            marginBottom: screenHeight * 0.02,
            fontFamily: "UrbanistExtraBold",
          }}
        >
          ¡Correcto!
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: 4,
            borderRadius: 35,
            width: screenWidth * 0.7,
            minHeight: 100,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Image
            source={image}
            style={{
              width: screenWidth * 0.25,
              height: screenWidth * 0.25,
              marginRight: 10,
              marginBottom: -screenHeight * 0.01,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: screenWidth * 0.08,
              fontWeight: "800",
              color: "white",
              fontFamily: "UrbanistExtraBold",
            }}
          >
            {emotionTranslated}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: screenHeight * 0.03,
          height: containerHeight,
        }}
      >
        <ImageBackground
          source={IMAGES.SOUNDS_BACKGROUND}
          resizeMode="cover"
          imageStyle={{ borderRadius: 70 }}
          style={{
            width: screenWidth * 0.85,
            height: "100%",
            justifyContent: "space-between",
            borderRadius: 70,
          }}
        >
          <View
            className="border-pink-600"
            style={{
              borderRadius: 70,
              paddingTop: screenHeight * 0.025,
              paddingHorizontal: screenWidth * 0.05,
              backgroundColor: "white",
              borderWidth: 4,
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: screenHeight * 0.04,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                paddingHorizontal: screenWidth * 0.03,
                paddingVertical: screenHeight * 0.03,
                paddingBottom: screenHeight * 0.06,
              }}
            >
              <Text
                style={{
                  fontSize: screenWidth * 0.075,
                  fontWeight: "800",
                  color: "#1e293b",
                  marginBottom: screenHeight * 0.02,
                  textAlign: "center",
                  fontFamily: "UrbanistExtraBold",
                }}
              >
                {title}
              </Text>

              <Text
                style={{
                  fontSize: screenWidth * 0.055,
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: screenHeight * 0.02,
                  marginBottom: screenHeight * 0.02,
                  fontFamily: "UrbanistExtraBold",
                  color: "#1e293b",
                }}
              >
                <Text>{before}</Text>
                <Text className="text-blue-226">{keyword}</Text>
                <Text>{after}</Text>
              </Text>

              <Text
                style={{
                  fontSize: screenWidth * 0.055,
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: screenHeight * 0.02,
                  marginBottom: screenHeight * 0.03,
                  color: color,
                  textShadowColor: borderColor,
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 1,
                  fontFamily: "UrbanistExtraBold",
                }}
              >
                {tip}
              </Text>

              <Pressable
                onPress={onClose}
                style={{
                  backgroundColor: "#D6D4FF",
                  paddingVertical: screenHeight * 0.015,
                  paddingHorizontal: screenWidth * 0.1,
                  borderRadius: 9999,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#000000",
                      fontWeight: "700",
                      fontSize: screenWidth * 0.045,
                      fontFamily: "UrbanistBold",
                      textAlign: "center",
                      marginRight: screenWidth * 0.02, 
                    }}
                  >
                    Continuar
                  </Text>
                  <Image
                    source={ICONS.ARROW_ICON_2}
                    style={{
                      width: screenWidth * 0.055,
                      height: screenWidth * 0.055,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </Pressable>

            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default CorrectAnswerComponent;
