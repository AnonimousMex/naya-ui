import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ICONS } from "@/constants/images";
import { router } from "expo-router";

interface PersonCardProps {
  id: string;
  name: string;
  avatar?: any;
  width?: number;
  circleColor?: string;
  animalId?: string;
  type?: "patient" | "therapist";
}

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  avatar,
  width,
  circleColor = "#FAD4D4",
  animalId,
  type,
}) => {
  const handlePress = () => {
    if (type === "therapist") {
      router.push({
        pathname: "/(parentsPages)/therapist-cv",
        params: {
          id,
          name,
          description: `Hola, soy ${name}, terapeuta en nuestra app.`,
          phone: "4436459525",
          email: "correo@ejemplo.com",
          address: "Col. husbx calle bz #221, morelia, mich",
          image: "DEFAULT_WOMAN_THERAPIST",
        },
      });
    } else {
      router.push({
        pathname: "/(therapistPages)/patient_profile",
        params: {
          id: id,
          name: name,
          avatar: JSON.stringify(avatar), 
          circleColor: circleColor,
          animalId: animalId || "", 
        },
      });
    }
  };
  return (
    <View
      className="bg-white rounded-[20px] p-4 mb-4"
      style={width ? { width } : {}}
    >
      <View
        className="rounded-full mb-2 self-start w-20 h-20 items-center justify-center overflow-hidden"
        style={{ borderWidth: 4, borderColor: circleColor }}
      >
        <View className="rounded-full bg-white w-18 h-18 items-center justify-center">
          <Image
            source={avatar}
            className="w-16 h-16"
            style={{ resizeMode: "contain" }}
          />
        </View>
      </View>
      <Text
        className="text-[#604943] font-extrabold text-lg text-left leading-tight self-stretch"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ minHeight: 44 }}
      >
        {name}
      </Text>
      <TouchableOpacity
        className="bg-orange-300 rounded-full py-2 px-4 mt-3 flex-row items-center self-stretch justify-center"
        onPress={handlePress}
      >
        <Text className="text-white font-extrabold text-sm mr-2">
          {type === "therapist" ? "Ver terapeuta" : "Ver paciente"}
        </Text>
        <Image source={ICONS.GO_ICON} style={{ width: 15, height: 15 }} />
      </TouchableOpacity>
    </View>
  );
};

export default PersonCard;
