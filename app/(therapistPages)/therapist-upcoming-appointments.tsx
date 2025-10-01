import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import {
  SafeAreaView as SafeAreaViewContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { NavbarComponent } from "@/components/NavBar";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { useLocalAppointments } from "@/hooks/useLocalAppointments";
import AppointmentCard from "@/components/patientProfileComponents/AppointmentCard";
import { router } from "expo-router";

const TherapistUpcomingAppoinments = () => {
  const { appointments, loading, refetch } = useLocalAppointments();

  // Sort appointments by date and time
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
        <View className="mt-10 px-7 mb-4">
          <HeaderTitleComponent mainText="Consultas" />
        </View>

        <View className="px-7 mb-6">
          <TouchableOpacity
            onPress={() => router.push("/(therapistPages)/schedule-appointment")}
            className="bg-orange-400 py-4 px-6 rounded-xl flex-row items-center justify-center"
          >
            <Text className="text-white font-UrbanistBold text-lg">
              Agendar Nueva Cita
            </Text>
          </TouchableOpacity>
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
                onAppointmentUpdate={refetch}
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
