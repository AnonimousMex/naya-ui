import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useAnimalList } from "@/hooks/useAnimalList";
import { getAnimalVariantImage } from "@/utils/animalAssets";

interface NavbarComponentProps {
  isTherapist?: boolean;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  isTherapist = false,
}) => {
  const widthAndHeight = "w-9 h-9";
  const animals = useAnimalList();
  const [userAnimalImage, setUserAnimalImage] = useState<any>(
    IMAGES.UNKNOWN_HEAD,
  );
  const [userAnimalColor, setUserAnimalColor] = useState<string>("bg-red-900");

  useEffect(() => {
    if (!isTherapist) {
      async function fetchUserAnimalData() {
        try {
          const token = await AsyncStorage.getItem("accessToken");
          if (token) {
            const decoded: any = jwtDecode(token);
            const animal_id = decoded.user?.animal_id;

            if (animal_id && animals.length > 0) {
              const found = animals.find(
                (a: any) => String(a.animal_id) === String(animal_id),
              );
              if (found) {
                const animalKey = found.animal_key.toUpperCase();
                const headImageKey = `HAPPY_${animalKey}_HEAD`;
                const headImage = IMAGES[headImageKey as keyof typeof IMAGES];

                setUserAnimalImage(headImage || IMAGES.UNKNOWN_HEAD);
                setUserAnimalColor(found.color_ui || "#b91c1c");
              }
            }
          }
        } catch (error) {
          console.log("Error fetching user animal data:", error);
        }
      }
      fetchUserAnimalData();
    }
  }, [animals, isTherapist]);

  const bg = isTherapist ? "bg-pink-400" : userAnimalColor;
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
              backgroundColor: isTherapist ? undefined : userAnimalColor,
            }}
          >
            <Image
              source={
                isTherapist ? IMAGES.DEFAULT_WOMAN_THERAPIST : userAnimalImage
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
