import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import { IMAGES } from "@/constants/images";

interface MemocionesBackCard {
  onPress?: () => void;
}

const MemocionesBackCard: React.FC<MemocionesBackCard> = ({ onPress }) => {
  return (
    <View className="w-32 h-40 bg-brown-100 items-center justify-center overflow-hidden rounded-2xl">
      <View className="flex-col items-center py-5 bg-white h-36 w-28 rounded-lg">
        <Image
          source={IMAGES.NAYA_LOGO}
          className="w-20 h-20"
          resizeMode="none"
        />
        <Image
          source={IMAGES.NAYA_SLOGAN}
          className="w-20 h-20"
          resizeMode="none"
        />
      </View>
    </View>
  );
};

export default MemocionesBackCard;
