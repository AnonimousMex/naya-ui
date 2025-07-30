import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { ICONS } from "@/constants/images";

type TGameHeader = {
  name: string;
  avatar: ImageSourcePropType;
  energy: number;
};

const GameHeader = ({ name, avatar, energy }: TGameHeader) => {
  const { width } = Dimensions.get("window");
  const fontSize = width * 0.06;

  const energyInactive = Math.max(0, 3 - energy);

  return (
    <View className="p-[0.7rem] rounded-[3rem] w-[93%] bg-blue-200">
      <View className="flex flex-row justify-between items-center p-1 rounded-full bg-white px-2">
        <Image source={avatar} className="w-16 h-12" resizeMode="contain" />
        <Text
          className="font-UrbanistExtraBold text-2xl text-center"
          style={{ fontSize: fontSize - 3 }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {name}
        </Text>
        <View className="flex flex-row mr-1">
          {[...Array(energy)].map((_, i) => (
            <Image
              key={`active-${i}`}
              source={ICONS.ENERGY_ACTIVE_ICON}
              className="w-8 h-8"
            />
          ))}
          {[...Array(energyInactive)].map((_, i) => (
            <Image
              key={`inactive-${i}`}
              source={ICONS.ENERGY_INACTIVE_ICON}
              className="w-7 h-7"
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default GameHeader;
