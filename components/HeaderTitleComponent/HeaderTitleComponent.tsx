// components/HeaderTitleComponent.tsx
import { View, Text } from "react-native";

interface HeaderTitleProps {
  mainText: string;
}

const HeaderTitleComponent = ({ mainText }: HeaderTitleProps) => {
  return (
    <View className="flex-row items-center w-full">
      <View className="flex-1 items-center mr-4">
        <Text className="font-UrbanistExtraBold text-4xl text-blue-900">
          {mainText}
        </Text>
      </View>
    </View>
  );
};

export default HeaderTitleComponent;
