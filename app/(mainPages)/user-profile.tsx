import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { IMAGES, ICONS } from "@/constants/images";
import { router } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { UserStatsRow } from "@/components/UserStatistics";
import UserProfileButtonsColumn, {
  UserProfileButton,
} from "@/components/UserProfileButton/UserProfileButton";
import { NavbarComponent } from "@/components/NavBar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useAnimalList } from "@/hooks/useAnimalList";
import { getAnimalVariantImage } from "@/utils/animalAssets";

const UserProfile = () => {
  const { width, height } = Dimensions.get("window");
  const fontSize = width * 0.06;
  const animals = useAnimalList();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState<any>(null);
  const [userDescription, setUserDescription] = useState("");
  const [bgColor, setBgColor] = useState<string>("#be185d");

  useEffect(() => {
    async function fetchUserData() {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUserName(decoded.user?.name || "");
          const animal_id = decoded.user?.animal_id;
          if (animal_id && animals.length > 0) {
            const found = animals.find(
              (a: any) => String(a.animal_id) === String(animal_id),
            );
            if (found) {
              setUserImage(getAnimalVariantImage(found.animal_key, "happy", 3));
              setUserDescription(found.description || "");
              setBgColor(found.color_ui || "#be185d");
            }
          }
        } catch (e) {
          setUserName("");
          setUserImage(null);
          setUserDescription("");
          setBgColor("#be185d");
        }
      }
    }
    fetchUserData();
  }, [animals]);
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

  const options: UserProfileButton[] = [
    {
      mainText: "Acceso parental",
      onPress: () =>
        router.push({
          pathname: "/(auth)/sign-in",
          params: { mode: "parental" },
        }),
      className: "border-blue-689 mt-10",
      textClassName: "text-blue-689",
    },
    {
      mainText: "Conectar terapeuta",
      onPress: () => router.push("/(auth)/activate-account"),
      className: "border-orange-300 mt-8",
      textClassName: "text-orange-300",
    },
    {
      mainText: "Cerrar Sesión",
      onPress: () => router.push("/(auth)/welcome"),
      className: "border-red-800 mt-10",
      textClassName: "text-red-800",
      imageSource: ICONS.LOGOUT_ICON,
    },
  ];

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaViewContext
        className="flex-1"
        style={{ backgroundColor: bgColor }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }}
          style={{ backgroundColor: "white" }}
          showsVerticalScrollIndicator
        >
          <View
            className="relative"
            style={{ height: dynamicHeight, backgroundColor: bgColor }}
          >
            <View className="absolute top-3 left-0 right-0 items-center z-0">
              <Text
                className="text-slate-100 font-UrbanistBold text-4xl"
                style={{ letterSpacing: -1 }}
              >
                Mi perfil
              </Text>
            </View>
            <View className="flex-1 justify-end items-center">
              <Image
                source={userImage}
                className="mb-[-20] w-64 h-64"
                style={{ resizeMode: "contain" }}
              />
              <View
                className="bg-slate-100 rounded-3xl py-3 mb-[-20] px-5 z-20"
                style={{ width: width * 0.45 }}
              >
                <Text
                  className="text-center font-UrbanistBold text-black"
                  style={{ fontSize, lineHeight: fontSize + 4 }}
                >
                  {userName}
                </Text>
              </View>
            </View>
          </View>

          <View
            className="flex-1 bg-white rounded-t-3xl px-6 pt-6"
            style={{ marginTop: 0 }}
          >
            <Text className="text-center font-UrbanistBold text-gray-730 text-sm mb-4 mt-2">
              {userDescription}
            </Text>
            <UserStatsRow badges={12} streak={5} exp={2300} />

            <View
              style={{
                height: 1,
                backgroundColor: "#ccc",
                width: "100%",
                marginVertical: 16,
              }}
            />

            <View className="w-full flex-row justify-end mt-[-10]">
              <Pressable
                onPress={() => router.push("/(auth)/welcome")}
                className="px-3 rounded-md"
              >
                <View className="flex-row items-center">
                  <Text className="text-black text-base font-UrbanistBold">
                    Ayuda
                  </Text>
                  <Image
                    source={ICONS.HELP_ICON}
                    style={{
                      width: width < 390 ? 14 : 18,
                      height: height < 390 ? 14 : 18,
                      resizeMode: "contain",
                      marginLeft: 5,
                    }}
                  />
                </View>
              </Pressable>
            </View>

            <UserProfileButtonsColumn options={options} />
          </View>
        </ScrollView>

        <SafeAreaViewContext
          edges={["bottom"]}
          className="bg-white absolute bottom-0 left-0 right-0 z-50"
        >
          <NavbarComponent />
        </SafeAreaViewContext>
      </SafeAreaViewContext>
    </>
  );
};

export default UserProfile;
