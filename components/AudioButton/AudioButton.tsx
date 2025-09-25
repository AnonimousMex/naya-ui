import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AudioButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  onPress: () => void;
  size?: number;
  style?: any;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  isPlaying,
  isLoading,
  onPress,
  size = 50,
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || isPlaying}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          opacity: (isLoading || isPlaying) ? 0.7 : 1,
        },
        style
      ]}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FF69B4" />
      ) : (
        <Ionicons
          name={isPlaying ? 'volume-high' : 'play'}
          size={size * 0.5}
          color="#FF69B4"
        />
      )}
    </TouchableOpacity>
  );
};