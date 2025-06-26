import { View, Text } from "react-native";

const emotionColors: Record<string, string> = {
  fear: "#8E24AA",
  happy: "#FFE01B",
  sad: "#29A8FF",
  angry: "#FF4B1F",
  shame: "#FF90D0",
  neutral: "#E0E0E0",
};

interface TestStatisticsProps {
  stats: { [emotion: string]: number };
}

export const TestStatistics = ({ stats }: TestStatisticsProps) => {
  const total = Object.values(stats).reduce((acc, val) => acc + val, 0);
  return (
    <View className="rounded-2xl p-4 my-4 bg-white">
      <Text className="font-UrbanistBold text-lg mb-2 text-brown-800">Estadísticas de respuestas</Text>
      {Object.entries(stats).map(([emotion, count]) => {
        const percent = total > 0 ? (count / total) * 100 : 0;
        return (
          <View key={emotion} className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="font-UrbanistBold text-base text-brown-700">
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </Text>
              <Text className="font-UrbanistBold text-base" style={{ color: emotionColors[emotion] || emotionColors.neutral }}>
                {percent.toFixed(1)}%
              </Text>
            </View>
            <View className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-2 flex-row items-center">
              <View
                className="h-3 rounded-full"
                style={{
                  width: percent > 5 ? `${percent}%` : percent > 0 ? 12 : 0,
                  minWidth: percent > 0 && percent < 5 ? 12 : undefined,
                  backgroundColor: emotionColors[emotion] || emotionColors.neutral,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
