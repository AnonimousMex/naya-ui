import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import TherapistTopBar from "@/components/TherapistTopBar";
import AppointmentCard from "@/components/AppointmentCard";
import PatientCard from "@/components/PatientCard";
import { IMAGES } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { TherapistNavBarComponent } from "@/components/TherapistNavBar";

const patients = [
  { name: "Hilary Arroyo Martinez", avatar: IMAGES.HAPPY_AXOLOTL_HEAD, circleColor: "#C8B8B4" },
  { name: "Francisco Rivera Rodriguez", avatar: IMAGES.HAPPY_LION_HEAD, circleColor: "#F9D7B5" },
  { name: "José Antonio Cisneros", avatar: IMAGES.HAPPY_PANDA_HEAD, circleColor: "#D6E6F2" },
  { name: "Alejandra Cisneros Pascual", avatar: IMAGES.HAPPY_BUNNY_HEAD, circleColor: "#BEE3DB" },
];

const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 40;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const TherapistHome = () => {
  return (
    <View className="flex-1 bg-pink-200">
      <TherapistTopBar />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5">
          <View className="flex-row justify-between items-center mb-2 mt-5">
            <Text className="text-brown-800 font-bold text-lg font-UrbanistBold">
              Consultas
            </Text>
            <TouchableOpacity>
              <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <AppointmentCard />
          <View className="flex-row justify-between items-center mb-2 mt-8">
            <Text className="text-brown-800 font-bold text-lg font-UrbanistBold">
              Mis pacientes
            </Text>
            <TouchableOpacity>
              <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {patients.map((p) => (
              <PatientCard key={p.name} name={p.name} avatar={p.avatar} width={CARD_WIDTH} circleColor={p.circleColor} />
            ))}
          </View>
        </View>
      </ScrollView>
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <TherapistNavBarComponent />
      </SafeAreaView>
    </View>
  );
};

export default TherapistHome;
