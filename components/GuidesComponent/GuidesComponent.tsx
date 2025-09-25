import { View } from "react-native";
import { GuidesDescription } from "../GuidesDescription";
import { ICONS } from "@/constants/images";

const GuidesComponent = () => {
  const achievements = [
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
    { description: "Video de guia estudio" },
  ];

  const bgColors = [
    "#DEE3FF",
    "#DACCCC",
    "#FCF6F1",
    "#D1DDD0",
    "#EFDDEF",
    "#E8D9A9",
  ] as const;
  const images: (keyof typeof ICONS)[] = ["PLAY_ICON_2"];

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      {achievements.map((achievement, index) => (
        <GuidesDescription
          key={index}
          bgColor={bgColors[index % bgColors.length]}
          image={images[index % images.length]}
          description={achievement.description}
          className="mb-4"
        />
      ))}
    </View>
  );
};

export default GuidesComponent;
