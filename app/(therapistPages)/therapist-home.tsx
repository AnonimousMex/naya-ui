import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import TherapistTopBar from "@/components/TherapistTopBar";
import PatientCard from "@/components/PersonCard";
import { IMAGES } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarComponent from "@/components/NavBar/NavBarComponent";
import { router } from "expo-router";
import { useLocalPatients } from "@/hooks/useLocalPatients";
import { useLocalAppointments } from "@/hooks/useLocalAppointments";
import { LocalPatient } from "@/constants/localData/patients";
import { LocalAppointment } from "@/constants/localData/appointments";
import { useUserAnimal } from "@/hooks/useUserAnimal";
import AppointmentCard from "@/components/patientProfileComponents/AppointmentCard";
import { useLocalUserInfo } from "@/hooks/useLocalUserInfo";


const PatientCardWithAnimal: React.FC<{
  patient: LocalPatient;
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
      circleColor={patient.circleColor || animalColor}
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
  const { patients, loading: patientsLoading, error: patientsError } = useLocalPatients();
  const { upcomingAppointments, loading: appointmentsLoading, refetch: refetchAppointments } = useLocalAppointments();
  const { userInfo } = useLocalUserInfo();

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
                    onAppointmentUpdate={refetchAppointments}
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
          
          {/* Quick Schedule Button */}
          <View className="mx-2 my-4">
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => router.push("/(therapistPages)/schedule-appointment")}
                className="flex-1 bg-orange-400 py-3 px-4 rounded-xl flex-row items-center justify-center"
              >
                <Text className="text-white font-UrbanistBold text-sm">
                  Agendar Cita
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(therapistPages)/daily-schedule")}
                className="flex-1 bg-blue-500 py-3 px-4 rounded-xl flex-row items-center justify-center"
              >
                <Text className="text-white font-UrbanistBold text-sm">
                  Ver Agenda
                </Text>
              </TouchableOpacity>
            </View>
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
          { patients.length == 0 ? (
            <View className="flex items-center mt-8">
              <Text className=" text-xl font-UrbanistLight ">
                Aun no tienes pacientes asignados
              </Text>
            </View>
          ):
          (
          <View className="flex-row flex-wrap justify-between">
            {patients.map((p: LocalPatient) => (
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
