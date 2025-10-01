import { View, Image, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { ICONS, IMAGES } from "@/constants/images";

type AchievementDescriptionProps = {
  bgColor?: string;
  image: keyof typeof ICONS;
  description: string;
  className?: string;
  onPress?: () => void;
  url?: string;
};

const GuidesDescription = ({
  bgColor = "#DEE3FF",
  image,
  description,
  className,
  onPress,
  url,
}: AchievementDescriptionProps) => {
  
  const handlePress = async () => {
    if (onPress) {
      onPress();
      return;
    }
    
    if (url) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'No se puede abrir este enlace');
        }
      } catch (error) {
        console.error('Error opening URL:', error);
        Alert.alert('Error', 'Hubo un problema al abrir el enlace');
      }
    }
  };

  const Component = url || onPress ? TouchableOpacity : View;

  return (
    <Component
      className={`p-4 flex-row items-center bg-brown-50 rounded-[50px] ${className}`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View
        className="rounded-t-[50px] rounded-b-[50px] p-5"
        style={{ backgroundColor: bgColor }}
      >
        <Image
          source={ICONS[image]}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <Text className="px-10 pr-20 font-UrbanistExtraBold" numberOfLines={3}>{description}</Text>
    </Component>
  );
};

export default GuidesDescription;
