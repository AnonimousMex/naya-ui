import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "@/constants/images";

const TherapistTopBar = () => {
  return (
    <View className="bg-blue-80 rounded-b-[32px] px-6 pt-12 pb-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-[32px] font-bold font-[UrbanistBold]">
          <Text className="text-pink-50">N</Text>
          <Text className="text-white">ay</Text>
          <Text className="text-pink-50">á</Text>
        </Text>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Image source={ICONS.NOTIFICATION_ICON} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={ICONS.GEAR_ICON} className="w-6 h-6" />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-white text-2xl font-bold font-[UrbanistBold] mt-4">¡Hola, Fernanda!</Text>
      <Text className="text-white text-sm font-[Urbanist] mt-1">Jue, 10 de abril 2025</Text>
    </View>
  );
};

export default TherapistTopBar;
