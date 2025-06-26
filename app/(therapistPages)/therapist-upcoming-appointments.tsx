import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView as SafeAreaViewContext, SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/BackButton";
import TherapistUpcomingAppointments from "@/components/Therapist-Appointments";
import { router } from "expo-router";
import { NavbarComponent } from '@/components/NavBar';
import { IMAGES } from "@/constants/images";

const TherapistUpcomingAppoinments = () => {
  const appointments = [
    {
      patient: {
        name: "Andrea López",
        image: IMAGES.HAPPY_AXOLOTL_HEAD
      },
      datetime: new Date("2025-06-28T11:00:00"),
    },
    {
      patient: {
        name: "Carlos Ruiz",
        image: IMAGES.HAPPY_PANDA_HEAD
      },
      datetime: new Date("2025-06-28T16:30:00"),
    },
    {
      patient: {
        name: "Armando Casanova",
        image: IMAGES.HAPPY_LION_HEAD
      },
      datetime: new Date("2025-06-26T14:00:00"),
    },
    {
      patient: {
        name: "Cesar Figueroa",
        image: IMAGES.HAPPY_BUNNY_HEAD
      },
      datetime: new Date("2025-07-01T10:00:00"),
    },
  ];

  return (
    <SafeAreaViewContext className="flex-1 bg-slate-100">
      <ScrollView className="mt-8">
        <View className="flex-row items-center px-5">
          <BackButton onPress={() => router.push("/(auth)/welcome")} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text className="font-UrbanistExtraBold text-4xl text-blue-900 leading-[40px]">
              Consultas
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <TherapistUpcomingAppointments appointments={appointments} />
      </ScrollView>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-slate-100 absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaViewContext>
  );
};

export default TherapistUpcomingAppoinments;
