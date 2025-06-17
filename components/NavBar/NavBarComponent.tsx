import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

const NavbarComponent = () => {
  const widthAndHeight = "w-9 h-9";
  const bg = "bg-red-900";

  return (
    <View className="bg-slate-100 w-full">
      <View className="flex-row justify-around items-center h-[4rem] mx-4">
        <TouchableOpacity onPress={() => router.push("/(auth)/welcome")}>
          <View className="rounded-full">
            <Image source={ICONS.HOME_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(mainPages)/story-path")}>
          <View className="rounded-full">
            <Image source={ICONS.BOOK_NAV_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(mainPages)/achievements")}
        >
          <View className="rounded-full">
            <Image source={ICONS.REWARD_NAV_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(mainPages)/user-profile")}
        >
          <View
            className={`rounded-full w-11 h-11 ${bg} flex justify-center items-center overflow-hidden p-[0.5rem]`}
          >
            <Image
              source={IMAGES.HAPPY_LION_HEAD}
              className="w-[140%] h-[110%] object-contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarComponent;
