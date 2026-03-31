import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "@/constants/images";

interface TherapistTopBarProps {
  therapistName?: string;
  currentDate?: string;
}

const TherapistTopBar: React.FC<TherapistTopBarProps> = ({ 
  therapistName = "Terapeuta", 
  currentDate 
}) => {
  // Función para formatear la fecha actual
  const formatCurrentDate = () => {
    if (currentDate) return currentDate;
    
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    
    return today
      .toLocaleDateString("es-MX", options)
      .replace(",", "")
      .replace(/^\w{3}/, (day) => day.charAt(0).toUpperCase() + day.slice(1).toLowerCase());
  };

  return (
    <View className="bg-blue-80 rounded-b-[32px] px-6 pt-12 pb-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-[32px] font-bold font-[UrbanistBold]">
          <Text className="text-pink-50">Nayá</Text>
          
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
      <Text className="text-white text-2xl font-bold font-[UrbanistBold] mt-4">
        ¡Hola, {therapistName}!
      </Text>
      <Text className="text-white text-sm font-[Urbanist] mt-1">
        {formatCurrentDate()}
      </Text>
    </View>
  );
};

export default TherapistTopBar;
