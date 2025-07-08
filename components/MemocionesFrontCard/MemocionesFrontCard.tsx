import React from "react";
import { View, Image, Text, ImageSourcePropType } from "react-native";

interface Props {
  kind: "emotion" | "situation";
  img?: ImageSourcePropType;
  text: string;
}

const MemocionesFrontCard: React.FC<Props> = ({ kind, img, text }) => (
  <View className="w-32 h-40 bg-yellow-500 items-center justify-center overflow-hidden rounded-2xl">
    <View className="flex-col items-center py-5 bg-white h-36 w-28 rounded-lg">
      {kind === "emotion" ? (
        <>
          <Image source={img!} className="w-20 h-20" resizeMode="contain" />
          <Text className="text-black font-semibold text-base mt-2 text-center">
            {text}
          </Text>
        </>
      ) : (
        <Text className="text-black font-semibold text-sm px-2 text-center">
          {text}
        </Text>
      )}
    </View>
  </View>
);

export default MemocionesFrontCard;
