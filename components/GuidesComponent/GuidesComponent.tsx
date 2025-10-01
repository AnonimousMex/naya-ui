import { View, Text, ActivityIndicator } from "react-native";
import { GuidesDescription } from "../GuidesDescription";
import { ICONS } from "@/constants/images";
import { useEducationalGuides } from "@/hooks/useEducationalGuides";

const GuidesComponent = () => {
  const { guides, loading, error } = useEducationalGuides();

  const bgColors = [
    "#DEE3FF",
    "#DACCCC", 
    "#FCF6F1",
    "#D1DDD0",
    "#EFDDEF",
    "#E8D9A9",
  ] as const;

  const getIconForType = (type: 'video' | 'article') => {
    return type === 'video' ? 'PLAY_ICON_2' : 'BOOK_NAV_ICON'; 
  };

  if (loading) {
    return (
      <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px] items-center justify-center">
        <ActivityIndicator size="large" color="#8B4513" />
        <Text className="mt-4 text-gray-600 font-UrbanistMedium">Cargando guías educativas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px] items-center justify-center">
        <Text className="text-red-500 font-UrbanistMedium text-center">{error}</Text>
      </View>
    );
  }

  if (!guides.length) {
    return (
      <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px] items-center justify-center">
        <Text className="text-gray-600 font-UrbanistMedium text-center">No hay guías disponibles</Text>
      </View>
    );
  }

  return (
    <View className="bg-white px-7 pt-14 pb-10 rounded-t-[50px] rounded-b-[50px]">
      {guides.map((guide, index) => (
        <GuidesDescription
          key={guide.id}
          bgColor={bgColors[index % bgColors.length]}
          image={getIconForType(guide.type) as keyof typeof ICONS}
          description={guide.title}
          className="mb-4"
          url={guide.url}
        />
      ))}
    </View>
  );
};

export default GuidesComponent;
