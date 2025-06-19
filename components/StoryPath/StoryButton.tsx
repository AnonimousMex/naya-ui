import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, runOnJS } from 'react-native-reanimated';

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
  const shake = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const handlePress = () => {
    shake.value = withSequence(
      withTiming(8, { duration: 40 }),
      withTiming(-8, { duration: 40 }),
      withTiming(8, { duration: 40 }),
      withTiming(0, { duration: 40 }, (finished) => {
        if (finished) runOnJS(onPress)(id);
      })
    );
  };

  return (
    <Animated.View style={[animatedStyle, style]} className="absolute">
      <TouchableOpacity
        key={id}
        onPress={handlePress}
        disabled={!isUnlocked}
        activeOpacity={1}
        style={{ width: '100%', height: '100%' }}
      >
        <Image
          source={isUnlocked ? sourceUnlocked : sourceLocked}
          className="w-full h-full"
          resizeMode="contain"
          accessibilityLabel={name}
          style={{ opacity: 1 }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StoryButton;
