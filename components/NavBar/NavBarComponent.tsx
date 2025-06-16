import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

type TNavBarComponent = {
  animalProfile: string;
};

const NavbarComponent = () => {
  const widthAndHeigth = "w-9 h-9";
  const bg = "bg-red-900";

  return (
    <>
      <View className="h-20" />
      <View className="absolute bottom-0 left-0 right-0 bg-slate-100">
        <View className="flex-row justify-around items-center h-[5rem] mx-4">
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/welcome");
            }}
          >
            <View className="roudend-full mb-4">
              <Image source={ICONS.HOME_ICON} className={widthAndHeigth} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/welcome");
            }}
          >
            <View className="roudend-full mb-4">
              <Image source={ICONS.BOOK_NAV_ICON} className={widthAndHeigth} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/welcome");
            }}
          >
            <View className="roudend-full mb-4">
              <Image
                source={ICONS.REWARD_NAV_ICON}
                className={widthAndHeigth}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/welcome");
            }}
          >
            <View
              className={`rounded-full mb-4 w-11 h-11 ${bg} flex justify-center items-center overflow-hidden p-[0.5rem]`}
            >
              <Image
                source={IMAGES.HAPPY_LION_HEAD}
                className=" w-[140%] h-[110%] object-contain "
              />
              {/* Provicional hast arreglar imagenes*/}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NavbarComponent;
