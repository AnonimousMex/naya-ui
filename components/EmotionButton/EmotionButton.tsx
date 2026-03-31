import React from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { EmotionKey } from "@/app/(emorganiza)/emorganiza-main-page";

interface EmotionButtonProps {
  emotion: EmotionKey;
  color: string;
  onPress: (emotion: EmotionKey) => void;
  isSelected: boolean;
}

const EmotionButton: React.FC<EmotionButtonProps> = ({
  emotion,
  color,
  onPress,
  isSelected,
}) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.40;
  const displayName = emotion.charAt(0).toUpperCase() + emotion.slice(1);

  return (
    <TouchableOpacity
      onPress={() => onPress(emotion)}
      className="h-12 rounded-full items-center justify-center m-2 border-4"
      style={{
        width: buttonWidth,
        backgroundColor: isSelected ? "#9ca3af" : color,
        borderColor: isSelected ? "#d1d5db" : lightenColor(color),
      }}
    >
      <Text style={{ fontSize: 23 }} className="font-UrbanistExtraBold text-white">
        {displayName}
      </Text>
    </TouchableOpacity>
  );
};

const lightenColor = (color: string) => {
  const colorValue = parseInt(color.slice(1), 16);
  const r = (colorValue >> 16) & 0xff;
  const g = (colorValue >> 8) & 0xff;
  const b = colorValue & 0xff;

  const lightenFactor = 0.3;
  const newR = Math.min(255, Math.floor(r + (255 - r) * lightenFactor));
  const newG = Math.min(255, Math.floor(g + (255 - g) * lightenFactor));
  const newB = Math.min(255, Math.floor(b + (255 - b) * lightenFactor));

  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB)
    .toString(16)
    .slice(1)}`;
};

export default EmotionButton;
