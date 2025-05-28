import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-2xl font-UrbanistExtraBold text-white">
        Not found
      </Text>
    </View>
  );
}
