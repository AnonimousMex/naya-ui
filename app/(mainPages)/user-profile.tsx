import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { IMAGES } from "@/constants/images";
import { router } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { UserStatsRow } from "@/components/UserStatistics";
import UserProfileButtonsColumn, {
  UserProfileButton,
} from "@/components/UserProfileButton/UserProfileButton";
import { NavbarComponent } from "@/components/NavBar";

const UserProfile = () => {
  const { width, height } = Dimensions.get("window");
  const fontSize = width * 0.06;
  const userName = "Rodrigo";
  const bgColor = "bg-pink-700";
  const userImage = IMAGES.HAPPY_AXOLOTL_1;
  const userDescription =
    "Soy un Ajolote chido, me gusta estar con mis amigos soy divertido y me gusta sonreír.";
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
      onPress: () => router.push("/(auth)/connection-therapist"),
      className: "border-orange-300 mt-8",
      textClassName: "text-orange-300",
    },
    {
      mainText: "Cerrar Sesión",
      onPress: () => router.push("/(auth)/welcome"),
      className: "border-red-800 mt-10",
      textClassName: "text-red-800",
      imageSource: IMAGES.LOGOUT_ICON,
    },
  ];

  return (
    <SafeAreaViewContext className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator
      >
        <View
          className={`relative ${bgColor}`}
          style={{ height: dynamicHeight }}
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

        <View className="flex-1 bg-white rounded-t-3xl px-6 pt-6">
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
                  source={IMAGES.HELP_ICON}
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
  );
};

export default UserProfile;
