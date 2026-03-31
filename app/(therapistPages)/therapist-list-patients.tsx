import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PatientCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarComponent from "@/components/NavBar/NavBarComponent";
import { router } from "expo-router";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { useListPatientsMutation } from "@/hooks/therapist/useListPatientsMutation";
import { TPatient } from "@/models/therapist";
import { useUserAnimal } from "@/hooks/useUserAnimal";


const CARD_MARGIN = 8;
const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 40;
const CARD_WIDTH =
  (SCREEN_WIDTH - CONTAINER_PADDING - CARD_MARGIN * (NUM_COLUMNS + 1)) /
  NUM_COLUMNS;

const PatientCardWithAnimal: React.FC<{
  patient: TPatient;
  width: number;
}> = ({ patient, width }) => {
  const animalId = patient.animal_id || undefined;
  const { animalImage, animalColor } = useUserAnimal(animalId);
  
  return (
    <PatientCard
      key={patient.patient_id}
      id={patient.patient_id}
      name={patient.name}
      avatar={animalImage}
      width={width}
      circleColor={animalColor}
      animalId={animalId}
      type="patient"
    />
  );
};

const TherapistListPatients = () => {


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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-16 px-7 mb-8">
          <HeaderTitleComponent mainText="Pacientes" />
        </View>
        <View className="px-5">
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
              <PatientCardWithAnimal
                key={p.patient_id}
                patient={p}
                width={CARD_WIDTH}
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

export default TherapistListPatients;
