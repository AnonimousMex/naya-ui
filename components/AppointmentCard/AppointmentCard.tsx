import React from "react";
import { View, Text, Image } from "react-native";
import { ICONS } from "@/constants/images";

const AppointmentCard = () => {
  return (
    <View className="bg-white rounded-[20px] px-5 py-5 flex-row items-center mt-3">
      <View className="bg-purple-10 rounded-[16px] p-4 mr-4">
        <Image source={ICONS.SAND_CLOCK_ICON} className="w-7 h-8" />
      </View>
      <View className="flex-1">
        <Text className="text-brown-800 font-UrbanistBold text-base leading-tight">Próxima Appointment</Text>
        <Text className="text-gray-70 font-Urbanist text-xs mt-0.5 leading-tight">Hilary Arroyo Martinez</Text>
        <Text className="text-gray-60 font-Urbanist text-xs mt-0.5 leading-tight">20 de abril del 2025</Text>
      </View>
      <View className="bg-white rounded-full w-14 h-14 items-center justify-center p-2 border-4 border-purple-20">
        <Text className="text-gray-60 font-UrbanistBold text-xs text-center leading-tight">1:00{"\n"}PM</Text>
      </View>
    </View>
  );
};

export default AppointmentCard;
