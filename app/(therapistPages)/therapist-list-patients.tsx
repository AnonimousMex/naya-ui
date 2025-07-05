import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import TherapistTopBar from "@/components/TherapistTopBar";
import PatientCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarComponent from "@/components/NavBar/NavBarComponent";
import { router } from "expo-router";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";

const patients = [
  {
    id: "u1",
    name: "Hilary Arroyo Martinez",
    avatar: IMAGES.HAPPY_AXOLOTL_HEAD,
    circleColor: "#C8B8B4",
  },
  {
    id: "u2",
    name: "Francisco Rivera Rodriguez",
    avatar: IMAGES.HAPPY_LION_HEAD,
    circleColor: "#F9D7B5",
  },
  {
    id: "u3",
    name: "José Antonio Cisneros",
    avatar: IMAGES.HAPPY_PANDA_HEAD,
    circleColor: "#D6E6F2",
  },
  {
    id: "u4",
    name: "Alejandra Cisneros Pascual",
    avatar: IMAGES.HAPPY_BUNNY_HEAD,
    circleColor: "#BEE3DB",
  },
];

const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 40;
const CARD_WIDTH =
  (SCREEN_WIDTH - CONTAINER_PADDING - CARD_MARGIN * (NUM_COLUMNS + 1)) /
  NUM_COLUMNS;

const TherapistListPatients = () => {
  return (
    <View className="flex-1 bg-pink-200">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-16 px-7 mb-8">
          <HeaderTitleComponent mainText="Pacientes" />
        </View>
        <View className="px-5">
          <View className="flex-row flex-wrap justify-between">
            {patients.map((p) => (
              <PatientCard
                key={p.id}
                id={p.id}
                name={p.name}
                avatar={p.avatar}
                width={CARD_WIDTH}
                circleColor={p.circleColor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaView>
    </View>
  );
};

export default TherapistListPatients;
