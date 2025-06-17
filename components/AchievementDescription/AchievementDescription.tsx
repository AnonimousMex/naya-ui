import { View, Image, Text } from "react-native";
import { IMAGES } from "@/constants/images";

type AchievementDescriptionProps = {
  bgColor?: string;
  image: keyof typeof IMAGES;
  description: string;
  className?: string;
};

const AchievementDescription = ({
  bgColor = "#DEE3FF",
  image,
  description,
  className,
}: AchievementDescriptionProps) => {
  return (
    <View
      className={`p-4 flex-row items-center bg-brown-50 rounded-[50px] ${className}`}
    >
      <View
        className="rounded-t-[50px] rounded-b-[50px] p-5"
        style={{ backgroundColor: bgColor }}
      >
        <Image
          source={IMAGES[image]}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <Text className="px-10 pr-20 font-UrbanistExtraBold">{description}</Text>
    </View>
  );
};

export default AchievementDescription;
