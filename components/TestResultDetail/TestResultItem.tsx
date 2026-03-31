import { View, Text } from "react-native";

const emotionColors: Record<string, string> = {
  Miedo: "#8E24AA",     
  Felicidad: "#FFE01B",    
  Tristeza: "#29A8FF",      
  Enojo: "#FF4B1F",    
  Verguenza: "#FF90D0",    
  neutral: "#E0E0E0",
};

const emotionBgLight: Record<string, string> = {
  Miedo: "#F3E1F7",
  Felicidad: "#FFFBE5",
  Tristeza: "#EAF4FF",
  Enojo: "#FFE5E0",
  Verguenza: "#FFE6F4",
  neutral: "#F5F5F5",
};

const emotionTextColors: Record<string, string> = {
  Miedo: "#8E24AA",
  Felicidad: "#E08A1E",
  Tristeza: "#2563EB",
  Enojo: "#FF4B1F",
  Verguenza: "#D946EF",
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
