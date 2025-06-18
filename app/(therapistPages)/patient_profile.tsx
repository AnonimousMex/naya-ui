import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";
import { router } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { UserStatsRow } from "@/components/UserStatistics";
import UserProfileButtonsColumn, {
  UserProfileButton,
} from "@/components/UserProfileButton/UserProfileButton";
import { NavbarComponent } from "@/components/NavBar";
import { BackButton } from "@/components/BackButton";
import { ButtonPatientProfile, NextDateView } from "@/components/patientProfileComponents";

const PatientProfile= () => {
    const { width, height } = Dimensions.get("window");
  const fontSize = width * 0.052;
  const userName = "Itzi Alondra Hernandez Rodriguez";
  const bgColor = "bg-pink-700";
  const userImage = IMAGES.HAPPY_AXOLOTL_1;
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

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
          <View className="mt-3 flex-row justify-between items-center px-4">
            <View>
              <BackButton
                onPress={()=> {router.push("/(auth)/welcome")}}
              />
            </View>
            <View className="bg-pink-300 rounded-full flex justify-center items-center px-2 py-2 " >
                <Text className="font-UrbanistExtraBold text-2xl text-black bg-white rounded-full py-1 px-3" 
                  style={{ letterSpacing: -0.5, fontSize, lineHeight: fontSize + 4  }}
                >
                  {userName}
                </Text>
            </View>
          </View>
          <View className="flex-1 justify-end items-center">
            <Image
              source={userImage}
              className="mb-[-20] w-64 h-64"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>

        <View className="flex-1 bg-white rounded-t-3xl px-6 pt-6 ">
          <View className="flex justify-center items-center mb-4">
            <NextDateView
              patientName="Rodrigo vega Espinoza"
              date="20 de junio del 2025"
              hours={13}
              minutes={1}
            />
          </View>

          <UserStatsRow badges={12} streak={5} exp={2300} />

          <View className="w-full flex-row justify-end mt-10">
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
          <View className="flex-row justify-between mx-1 my-8">
            <ButtonPatientProfile
              bg="bg-brown-800"
              name="Citas"
              icon={ICONS.CALENDAR_ICON}
            />
            <ButtonPatientProfile
              bg="bg-blue-400"
              name="Resultados"
              icon={ICONS.PLAY_ICON}
            />
            
          </View>
          
        </View>
      </ScrollView>

      <SafeAreaViewContext
        edges={["bottom"]}
        className="bg-slate-100 absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaViewContext>
    </SafeAreaViewContext>
  )
}

export default PatientProfile