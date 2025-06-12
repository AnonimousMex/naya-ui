import React, { useEffect, useState } from "react";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { IMAGES } from "@/constants/images";

const InsigniaComponent = () => {
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
    { image: ImageSourcePropType; title: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: titles.length }, (_, i) => ({
      image: medals[Math.floor(Math.random() * medals.length)],
      title: titles[i],
    }));
    setMedalItems(generated);
  }, []);

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      <View className="flex-row flex-wrap justify-between mx-4">
        {medalItems.map((item, index) => (
          <View key={index} className="w-[41%] mb-6 items-center">
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
          </View>
        ))}
      </View>
    </View>
  );
};

export default InsigniaComponent;
