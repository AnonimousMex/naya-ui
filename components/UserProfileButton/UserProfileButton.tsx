import React from "react";
import {
  View,
  Text,
  Pressable,
  ImageSourcePropType,
  Image,
  Dimensions,
} from "react-native";

export interface UserProfileButton {
  mainText: string;
  onPress: () => void;
  className: string;
  textClassName?: string;
  imageSource?: ImageSourcePropType;
}

interface UserProfileButtonsColumnProps {
  options: UserProfileButton[];
}

const UserProfileButtonsColumn: React.FC<UserProfileButtonsColumnProps> = ({
  options,
}) => {
  const { width } = Dimensions.get("window");
  return (
    <View className="w-full space-y-3 mb-5">
      {options.map((option, index) => {
        const textClass = option.textClassName ?? "text-black";

        return (
          <Pressable
            key={index}
            onPress={option.onPress}
            className={`w-full py-2 px-4 border bg-white rounded-3xl flex-row items-center justify-center space-x-2 ${option.className}`}
            style={{
              shadowColor: "#999",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text className={`font-UrbanistBold text-xl ${textClass}`}>
              {option.mainText}
            </Text>
            {option.imageSource && (
              <Image
                source={option.imageSource}
                style={{
                  left: 30,
                  width: width < 390 ? 14 : 16,
                  height: width < 390 ? 14 : 16,
                  resizeMode: "contain",
                }}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default UserProfileButtonsColumn;
