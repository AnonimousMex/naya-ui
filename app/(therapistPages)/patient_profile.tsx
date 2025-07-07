import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { UserStatsRow } from "@/components/UserStatistics";
import { NavbarComponent } from "@/components/NavBar";
import { BackButton } from "@/components/BackButton";
import {
  ButtonPatientProfile,
  NextDateView,
} from "@/components/patientProfileComponents";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { useState } from "react";


const PatientProfile = () => {
  const { width, height } = Dimensions.get("window");
  const bgColor = "bg-pink-700";
  const userImage = IMAGES.HAPPY_AXOLOTL_1;
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

  const [modalVisible, setModalVisible] = useState(false)

  const params = useLocalSearchParams();
  const { name } = params;


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
          <View className="absolute w-full flex-row justify-between p-7">
            <BackButton onPress={() => router.back()} />

            <HeaderInformationComponent
              type="name"
              name={name.toString()}
              borderColor="#E4B18E"
            />
          </View>
          <View className="flex-1 justify-end items-center">
            <Image
              source={userImage}
              className=" w-64 h-64"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>

        <View className="flex-1 bg-white rounded-t-3xl px-6 pt-6">
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
              icon={ICONS.CALENDAR_WHITE_ICON}
              onPress={() => {
                router.push("/(therapistPages)/patient-appointments");
              }}
            />
            <ButtonPatientProfile
              bg="bg-blue-80"
              name="Resultados"
              icon={ICONS.PLAY_ICON}
              onPress={() => {
                router.push("/(therapistPages)/test-results");
              }}
            />
          </View>
          <ButtonPatientProfile
              bg="bg-red-74"
              name="Cerrar Conexión"
              icon={ICONS.CLOSE_ICON}
              onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black-100 px-4">
              <View className="w-full max-w-md bg-slate-50 rounded-[50] p-9 items-center">
                <Text className="font-UrbanistBold text-xl text-center">
                  ¿Seguro que quieres cerrar conexión con el paciente:
                </Text>
                <Text className="font-UrbanistExtraBold text-3xl mt-8 border-b-2 border-red-500">
                  {name}
                </Text>
                <View className="flex-row justify-between gap-5 mt-8">
                  <Pressable 
                    onPress={() => setModalVisible(false)}
                    className="flex justify-center items-center border p-2 rounded-full px-6"
                  >
                    <Text className="font-UrbanistExtraBold text-xl">
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setModalVisible(false)}
                    className="flex justify-center items-center bg-red-600 p-2 rounded-full py-3 px-6"
                  >
                    <Text className="font-UrbanistExtraBold text-white text-xl">
                      Cerrar Conexión
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <SafeAreaViewContext
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaViewContext>
    </SafeAreaViewContext>
  );
};

export default PatientProfile;
