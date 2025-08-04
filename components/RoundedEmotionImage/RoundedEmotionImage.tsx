import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

interface RoundedEmotionImageProps {
  image: any;
  color: string;
}

export const RoundedEmotionImage = ({ image, color }: RoundedEmotionImageProps) => {
  const { width: screenWidth } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      width: screenWidth * 0.25,
      height: screenWidth * 0.25,
      borderRadius: screenWidth * 0.125,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
    }
  });

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  );
};
