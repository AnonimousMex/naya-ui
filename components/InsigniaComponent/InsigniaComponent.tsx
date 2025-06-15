import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import { IMAGES } from "@/constants/images";

interface InsigniaComponentProps {
  onMedalPress?: (title: string, imageIndex: number) => void;
}

const InsigniaComponent: React.FC<InsigniaComponentProps> = ({
  onMedalPress,
}) => {
  const medals: ImageSourcePropType[] = [
    IMAGES.MEDAL_1,
    IMAGES.MEDAL_2,
    IMAGES.MEDAL_3,
    IMAGES.MEDAL_4,
  ];

  const titles: string[] = [
    "30 días",
    "25 días",
    "20 días",
    "15 días",
    "10 días",
    "5 días",
    "1 día",
    "Perfecto",
    "Constante",
    "¡Sigue así!",
  ];

  const [medalItems, setMedalItems] = useState<
    { image: ImageSourcePropType; title: string; imageIndex: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: titles.length }, (_, i) => {
      const index = Math.floor(Math.random() * medals.length);
      return {
        image: medals[index],
        title: titles[i],
        imageIndex: index,
      };
    });
    setMedalItems(generated);
  }, []);

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      <View className="flex-row flex-wrap justify-between mx-4">
        {medalItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-[41%] mb-6 items-center"
            onPress={() => {
              if (onMedalPress) {
                onMedalPress(item.title, item.imageIndex);
              }
            }}
          >
            <View className="w-full h-36 bg-purple-400 rounded-full items-center justify-center overflow-hidden">
              <View className="rounded-full bg-purple-200 items-center justify-center p-3">
                <Image
                  source={item.image}
                  className="w-20 h-20 rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-black font-semibold text-lg mt-2 text-center">
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default InsigniaComponent;
