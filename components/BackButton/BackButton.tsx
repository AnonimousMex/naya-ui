import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ICONS } from "@/constants/images";

type TBackButton = {
  onPress: () => void;
};

const BackButton = ({ onPress }: TBackButton) => {
  return (
    <TouchableOpacity className="flex flex-row justify-start" onPress={onPress}>
      <View
        className={
          "p-[5px] items-center justify-center rounded-full bg-transparent border-brown-800 border-[1px]"
        }
      >
        <Image
          source={ICONS.RETURN_LEFT_ICON}
          className="w-8 h-8 justify-center items-center left-[-1]"
        />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
