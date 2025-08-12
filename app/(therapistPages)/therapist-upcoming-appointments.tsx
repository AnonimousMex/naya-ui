import { View, ScrollView } from "react-native";
import {
  SafeAreaView as SafeAreaViewContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { NavbarComponent } from "@/components/NavBar";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { useEffect, useState } from "react";
import { useListAllAppointmentsMutation } from "@/hooks/therapist/useListAllAppointmentsMutation";
import { TAppointmentWithPatient } from "@/models/Common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCard from "@/components/patientProfileComponents/AppointmentCard";

const TherapistUpcomingAppoinments = () => {
  const [appointments, setAppointments] = useState<TAppointmentWithPatient[]>([]);
  const listAllAppointmentsMutation = useListAllAppointmentsMutation();

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
    fetchAppointments();
  }, []);

  const sortedAppointments = appointments.sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  return (
    <SafeAreaViewContext className="flex-1 bg-slate-100">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 px-7 mb-8">
          <HeaderTitleComponent mainText="Consultas" />
        </View>

        <View className="px-7">
          {sortedAppointments.map((appointment, index) => (
            <View key={appointment.id} className={index < sortedAppointments.length - 1 ? "mb-4" : ""}>
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
      </ScrollView>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaView>
    </SafeAreaViewContext>
  );
};

export default TherapistUpcomingAppoinments;
