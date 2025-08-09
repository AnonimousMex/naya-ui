import React, { useEffect, useState } from "react";
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
import { useListPatientsMutation } from "@/hooks/therapist/useListPatientsMutation";
import { TPatient } from "@/models/therapist";
import { useUserAnimal } from "@/hooks/useUserAnimal";
import { useListAllAppointmentsMutation } from "@/hooks/therapist/useListAllAppointmentsMutation";
import { TAppointmentWithPatient } from "@/models/Common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "@/components/patientProfileComponents/AppointmentCard";
import { useUserInfo } from "@/hooks/useUserInfo";


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
  const [appointments, setAppointments] = useState<TAppointmentWithPatient[]>([]);
  const listAllAppointmentsMutation = useListAllAppointmentsMutation();
  const { userInfo } = useUserInfo();

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;
      listAllAppointmentsMutation.mutate(token, {
        onSuccess: (response) => {
          if (response.data) {
            const formattedAppointments = response.data.map((appointment) => ({
              ...appointment,
            }));
            setAppointments(formattedAppointments);
          }
        },
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    mutate();
    fetchAppointments();
  }, []);
  useEffect(() => {
    if (data?.data) {
      setDisplayPatients(data.data);
    }
  }, [data]);

  const upcomingAppointments = appointments
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    })
    .slice(0, 2);

  return (
    <View className="flex-1 bg-pink-200">
      <TherapistTopBar therapistName={userInfo?.name} />
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
          {upcomingAppointments.length > 0 ? (
            <View>
              {upcomingAppointments.map((appointment, index) => (
                <View key={appointment.id} className={index < upcomingAppointments.length - 1 ? "mb-4" : ""}>
                  <AppointmentCard
                    appointmentId={appointment.id}
                    patientId={appointment.patient_id}
                    patientName={appointment.patient_name || "Paciente"}
                    date={appointment.date}
                    time={appointment.time}
                    onAppointmentUpdate={fetchAppointments}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-brown-50 rounded-2xl p-4 mx-2 my-3 shadow-sm">
              <Text className="text-brown-800 font-UrbanistLight text-center">
                No tienes citas próximas
              </Text>
            </View>
          )}

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

export default TherapistHome;
