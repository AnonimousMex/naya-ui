import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

const TherapistNavBarComponent = () => {
  const widthAndHeight = "w-8 h-8";
  const bg = "bg-pink-400";

  return (
    <View className="bg-white w-full">
      <View className="flex-row justify-around items-center h-[4rem] mx-4">
        <TouchableOpacity onPress={() => router.push("/(auth)/welcome")}>
          <View className="rounded-full">
            <Image source={ICONS.HOME_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(therapistPages)/therapist-home")}>
          <View className="rounded-full">
            <Image source={ICONS.CALENDAR_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(mainPages)/achievements")}
        >
          <View className="rounded-full">
            <Image source={ICONS.PEOPLE_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(mainPages)/user-profile")}
        >
          <View
            className={`rounded-full w-10 h-10 ${bg} flex justify-center items-center overflow-hidden p-[0.5rem]`}
          >
            <Image
              source={IMAGES.DEFAULT_WOMAN_THERAPIST}
              className="w-[140%] h-[110%] object-contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TherapistNavBarComponent;
