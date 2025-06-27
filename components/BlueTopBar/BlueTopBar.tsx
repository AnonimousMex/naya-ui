import React from "react";
import { View, Text } from "react-native";
import NotificationsButton from "@/components/NotificationsButton";
import SettingsButton from "@/components/SettingsButton";

interface BlueTopBarProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const BlueTopBar: React.FC<BlueTopBarProps> = ({ title, subtitle, description }) => {

  let paddingBottom = 24;
  let paddingTop = 48;
  let contentCount = 0;
  if (title) contentCount++;
  if (subtitle) contentCount++;
  if (description) contentCount++;
  if (contentCount === 2) paddingBottom = 16;
  if (contentCount === 1) paddingBottom = 8;

  return (
    <View className="bg-blue-80 rounded-b-[32px] px-6" style={{ paddingTop, paddingBottom }}>
      <View className="flex-row justify-between items-center mt-3">
        {title ? (
          <Text className="text-3xl font-bold font-[UrbanistBold] text-white">
            {title}
          </Text>
        ) : null}
        <View className="flex-row items-center">
          <View className="mr-2">
            <NotificationsButton />
          </View>
          <SettingsButton />
        </View>
      </View>
      {subtitle && (
        <Text className="text-white text-xl font-bold font-[UrbanistBold] mt-4">
          {subtitle}
        </Text>
      )}
      {description && (
        <Text className="text-white text-m font-bold font-[UrbanistBold] mt-2 mb-2">
          {description}
        </Text>
      )}
    </View>
  );
};

export default BlueTopBar;
