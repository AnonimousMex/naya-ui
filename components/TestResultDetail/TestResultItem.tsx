import { View, Text } from "react-native";

const emotionColors: Record<string, string> = {
  fear: "#8E24AA",      // Temor (morado)
  happy: "#FFE01B",    // Alegría (amarillo)
  sad: "#29A8FF",      // Tristeza (azul)
  angry: "#FF4B1F",    // Enojo (naranja/rojo)
  shame: "#FF90D0",    // Vergüenza (rosa)
  neutral: "#E0E0E0",
};

const emotionBgLight: Record<string, string> = {
  fear: "#F3E1F7",
  happy: "#FFFBE5",
  sad: "#EAF4FF",
  angry: "#FFE5E0",
  shame: "#FFE6F4",
  neutral: "#F5F5F5",
};

const emotionTextColors: Record<string, string> = {
  fear: "#8E24AA",
  happy: "#E08A1E",
  sad: "#2563EB",
  angry: "#FF4B1F",
  shame: "#D946EF",
  neutral: "#757575",
};

interface TestResultItemProps {
  situation: string;
  answer: string;
  emotion: keyof typeof emotionColors;
}

export const TestResultItem = ({ situation, answer, emotion }: TestResultItemProps) => {
  return (
    <View
      className="rounded-2xl p-1 mb-4 border-2"
      style={{ borderColor: emotionColors[emotion] || emotionColors.neutral }}
    >
      <View
        className="rounded-2xl p-4"
        style={{ backgroundColor: emotionBgLight[emotion] || emotionBgLight.neutral }}
      >
        <Text className="font-UrbanistBold text-base mb-2 text-brown-800">{situation}</Text>
        <View className="rounded-xl bg-white px-3 py-2 mt-1">
          <Text
            className="font-UrbanistBold text-base"
            style={{ color: emotionTextColors[emotion] || emotionTextColors.neutral }}
          >
            Respuesta: {answer}
          </Text>
        </View>
      </View>
    </View>
  );
};
