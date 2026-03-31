import React from "react";
import { View, Image, Text } from "react-native";
import { IMAGES } from "@/constants/images";
import { MainButton } from "@/components/MainButton";

interface Props {
  title: string;
  medalImageName: string;
  description: string;
  onClose: () => void;
}

const InsigniaDescriptionComponent: React.FC<Props> = ({
  title,
  medalImageName,
  description,
  onClose,
}) => {

  const medalsMap: Record<string, any> = {
    "medal1.png": IMAGES.MEDAL_1,
    "medal2.png": IMAGES.MEDAL_2,
    "medal3.png": IMAGES.MEDAL_3,
    "medal4.png": IMAGES.MEDAL_4,
  };

  const selectedImage = medalsMap[medalImageName] || IMAGES.MEDAL_1;

  return (
    <View className="flex-1 relative items-center justify-center">
      <View className="absolute w-[90%] h-[60%] bg-white rounded-t-[90px] rounded-b-[90px] items-center justify-start py-40 px-6">
        <Text className="text-purple-800 font-UrbanistExtraBold text-5xl leading-[60px] mb-4">
          {title || "Medalla"}
        </Text>
        <Text className="text-center text-xl text-gray-730 font-UrbanistMedium mb-8">
          {description}
        </Text>
        <MainButton
          mainText="Continuar"
          onPress={onClose}
          className="w-[50%] py-3 mt-6"
        />
      </View>

      <View className="absolute top-[5%] w-64 h-64 bg-purple-400 rounded-full items-center justify-center overflow-hidden z-10">
        <View className="w-52 h-52 bg-purple-200 rounded-full items-center justify-center">
          <Image
            source={selectedImage}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default InsigniaDescriptionComponent;
