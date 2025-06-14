import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface StoryButtonProps { 
  id: number;
  sourceLocked: ImageSourcePropType;
  sourceUnlocked: ImageSourcePropType;
  name: string;
  isUnlocked: boolean;
  onPress: (id: number) => void;
  style: any; 
}

const StoryButton: React.FC<StoryButtonProps> = ({ 
  id,
  sourceLocked,
  sourceUnlocked,
  name,
  isUnlocked,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      key={id}
      style={style} 
      onPress={() => onPress(id)}
      disabled={!isUnlocked} 
      className="absolute"
    >
      <Image
        source={isUnlocked ? sourceUnlocked : sourceLocked}
        className="w-full h-full"
        resizeMode="contain"
        accessibilityLabel={name}
      />
    </TouchableOpacity>
  );
};

export default StoryButton; 
