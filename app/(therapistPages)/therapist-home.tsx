import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import TherapistTopBar from "@/components/TherapistTopBar";
import PatientCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarComponent from "@/components/NavBar/NavBarComponent";
import { router } from "expo-router";
import { useListPatientsMutation } from "@/hooks/therapist/useListPatientsMutation";
import { emptyListPatientsResponse, TListPatientsResponse, TSingleDataResponse } from "@/models/Common";
import { TPatient } from "@/models/therapist";


const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 40;
const CARD_WIDTH =
  (SCREEN_WIDTH - CONTAINER_PADDING - CARD_MARGIN * (NUM_COLUMNS + 1)) /
  NUM_COLUMNS;

  
const TherapistHome = () => {
  
  const {mutate, data , }= useListPatientsMutation()
  const [displayPatients, setDisplayPatients] = useState<TPatient[]>([]);

  useEffect(() => {
    mutate();
  }, [])
  useEffect(() => {
    if (data?.data) {
      setDisplayPatients(data.data);
    }
  }, [data]);

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
            <TouchableOpacity
              onPress={() =>
                router.push("/(therapistPages)/therapist-upcoming-appointments")
              }
            >
              <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between items-center mb-2 mt-8">
            <Text className="text-brown-800 font-bold text-lg font-UrbanistBold">
              Mis pacientes
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push("/(therapistPages)/therapist-list-patients")
              }
            >
              <Text className="text-orange-400 font-bold text-sm font-UrbanistBold">
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
          { displayPatients.length == 0 ? (
            <View className="flex items-center mt-8">
              <Text className=" text-xl font-UrbanistLight ">
                Aun no tienes pacientes asignados
              </Text>
            </View>
          ):
          (
          <View className="flex-row flex-wrap justify-between">
            {displayPatients.map((p) => (
              <PatientCard
                key={p.patient_id}
                id={p.patient_id}
                name={p.name}
                avatar={p.avatar || IMAGES.HAPPY_AXOLOTL_HEAD} //Provisional
                width={CARD_WIDTH}
                circleColor={p.circleColor} //provisional
                type="patient"
              />
            ))}
          </View>
          )}
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

export default TherapistHome;
