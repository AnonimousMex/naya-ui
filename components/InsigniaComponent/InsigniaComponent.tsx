import React from "react";
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import { IMAGES } from "@/constants/images";

interface InsigniaItem {
  title: string;
  description?: string;
  image_path: string; 
}

interface InsigniaComponentProps {
  badges: InsigniaItem[];
  onMedalPress?: (
    title: string,
    description: string | undefined,
    image_path: string
  ) => void;
}

const InsigniaComponent: React.FC<InsigniaComponentProps> = ({
  badges,
  onMedalPress,
}) => {
  const medalsMap: Record<string, ImageSourcePropType> = {
    "medal1.png": IMAGES.MEDAL_1,
    "medal2.png": IMAGES.MEDAL_2,
    "medal3.png": IMAGES.MEDAL_3,
    "medal4.png": IMAGES.MEDAL_4,
  };

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      <View className="flex-row flex-wrap justify-between mx-4">
        {badges.map((item, index) => {
      
          const imageName = item.image_path.split("/").pop() || "";

          return (
            <TouchableOpacity
              key={index}
              className="w-[41%] mb-6 items-center"
              onPress={() => {
                if (onMedalPress) {
                  onMedalPress(item.title, item.description, item.image_path);
                }
              }}
            >
              <View className="w-full h-36 bg-purple-400 rounded-full items-center justify-center overflow-hidden">
                <View className="rounded-full bg-purple-200 items-center justify-center p-3">
                  <Image
                    source={medalsMap[imageName] || IMAGES.MEDAL_1}
                    className="w-20 h-20 rounded-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text className="text-black font-semibold text-lg mt-2 text-center">
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default InsigniaComponent;
