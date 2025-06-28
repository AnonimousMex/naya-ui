import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

interface NavbarComponentProps {
  isTherapist?: boolean;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  isTherapist = false,
}) => {
  const widthAndHeight = "w-9 h-9";
  const bg = isTherapist ? "bg-pink-400" : "bg-red-900";
  const navBg = isTherapist ? "bg-white" : "bg-slate-100";

  return (
    <View className={`${navBg} w-full`}>
      <View className="flex-row justify-around items-center h-[4rem] mx-4">
        <TouchableOpacity onPress={() => router.push("/(mainPages)/home")}>
          <View className="rounded-full">
            <Image source={ICONS.HOME_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              isTherapist
                ? "/(therapistPages)/therapist-home"
                : "/(mainPages)/story-path",
            )
          }
        >
          <View className="rounded-full">
            <Image
              source={isTherapist ? ICONS.CALENDAR_ICON : ICONS.BOOK_NAV_ICON}
              className={widthAndHeight}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(mainPages)/insignias")}>
          <View className="rounded-full">
            <Image
              source={isTherapist ? ICONS.PEOPLE_ICON : ICONS.REWARD_NAV_ICON}
              className={widthAndHeight}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(
            isTherapist ?
            "/(therapistPages)/therapist-home"
            :
            "/(therapistPages)/patient_profile")}
        >
          <View
            className={`rounded-full w-11 h-11 ${bg} flex justify-center items-center overflow-hidden p-[0.5rem]`}
          >
            <Image
              source={
                isTherapist
                  ? IMAGES.DEFAULT_WOMAN_THERAPIST
                  : IMAGES.HAPPY_LION_HEAD
              }
              className="w-[140%] h-[110%] object-contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarComponent;
