import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useUserAnimal } from "@/hooks/useUserAnimal";

interface NavbarComponentProps {
  isTherapist?: boolean;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  isTherapist = false,
}) => {
  const widthAndHeight = "w-9 h-9";
  const { animalImage, animalColor } = useUserAnimal();
  const navBg = "bg-white";

  return (
    <View className={`${navBg} w-full`}>
      <View className="flex-row justify-around items-center h-[4rem] mx-4">
        <TouchableOpacity
          onPress={() =>
            router.push(
              isTherapist
                ? "/(therapistPages)/therapist-home"
                : "/(mainPages)/home",
            )
          }
        >
          <View className="rounded-full">
            <Image source={ICONS.HOME_ICON} className={widthAndHeight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              isTherapist
                ? "/(therapistPages)/therapist-upcoming-appointments"
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

        <TouchableOpacity
          onPress={() =>
            router.push(
              isTherapist
                ? "/(therapistPages)/therapist-list-patients"
                : "/(mainPages)/insignias",
            )
          }
        >
          <View className="rounded-full">
            <Image
              source={isTherapist ? ICONS.PEOPLE_ICON : ICONS.REWARD_NAV_ICON}
              className={widthAndHeight}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              isTherapist
                ? "/(therapistPages)/therapist-profile"
                : "/(mainPages)/user-profile",
            )
          }
        >
          <View
            className={`rounded-full w-11 h-11 flex justify-center items-center overflow-hidden p-[0.5rem] ${isTherapist ? "bg-pink-400" : ""}`}
            style={{
              backgroundColor: isTherapist ? undefined : animalColor,
            }}
          >
            <Image
              source={
                isTherapist ? IMAGES.DEFAULT_WOMAN_THERAPIST : animalImage
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
