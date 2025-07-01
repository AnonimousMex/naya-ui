import { View, Image, Text } from "react-native";
import React from "react";

interface Appointment {
  patient: {
    name: string;
    image: any;
  };
  datetime: Date;
}

interface TherapistUpcomingAppointmentsProps {
  appointments: Appointment[];
}

const TherapistUpcomingAppointmentsComponent = ({ appointments }: TherapistUpcomingAppointmentsProps) => {
  const sortedAppointments = [...appointments].sort(
    (a, b) => a.datetime.getTime() - b.datetime.getTime()
  );

  return (
    <View className="px-6 pt-10 pb-10 bg-white rounded-t-[40px]">
      {sortedAppointments.length === 0 ? (
        <Text className="text-gray-500 text-center font-UrbanistExtraBold text-xl">
          No hay consultas próximas
        </Text>
      ) : (
        sortedAppointments.map((appt, index) => {
          const dateStr = appt.datetime.toLocaleDateString("es-MX", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });

          const timeStr = appt.datetime.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <View
              key={index}
              className="flex-row items-center px-4 py-4 mb-4 rounded-[30px] shadow-sm bg-brown-50"
            >              
              <View className="rounded-full bg-white w-22 h-22 items-center justify-center">
                <Image
                  source={appt.patient.image}
                  className="w-20 h-20"
                  style={{ resizeMode: "contain" }}
                />
              </View>              
              <View>
                <Text className="font-UrbanistBold text-gray-800 text-lg ml-5">
                  {appt.patient.name}
                </Text>
                <Text className="text-sm text-gray-600 ml-5 font-UrbanistBold">
                  {dateStr}, {timeStr}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
};

export default TherapistUpcomingAppointmentsComponent;
