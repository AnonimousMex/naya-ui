import { EmotionButton } from "@/components/EmotionButton";
import { EmotionKey } from "@/app/(emorganiza)/emorganiza-main-page";
import React from "react";
import { View } from "react-native";

interface EmorganizaEmotionsPanelProps {
  emotions: { key: EmotionKey; color: string }[];
  onEmotionSelect: (emotion: EmotionKey) => void;
  selectedEmotion: EmotionKey | null;
}

const EmorganizaEmotionsPanel: React.FC<EmorganizaEmotionsPanelProps> = ({
  emotions,
  onEmotionSelect,
  selectedEmotion,
}) => {
  return (
    <View className="bg-white rounded-t-[50px] px-6 pt-4 w-full relative items-center">
      <View className="flex flex-row flex-wrap justify-center items-center gap-2">
        {emotions.map(({ key, color }) => (
          <EmotionButton
            key={key}
            emotion={key}
            color={color}
            onPress={onEmotionSelect}
            isSelected={selectedEmotion === key}
          />
        ))}
      </View>
    </View>
  );
};

export default EmorganizaEmotionsPanel;
