// PatientAppointments.tsx
import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import { ICONS } from "@/constants/images";

interface Appointment {
  id: string;
  patient_id: string;
  datetime: Date;
}

interface PatientAppointmentsProps {
  appointments: Appointment[];
  onPressAppointment?: (appointment: Appointment) => void;
}

const PatientAppointments = ({ appointments, onPressAppointment }: PatientAppointmentsProps) => {
  const sortedAppointments = [...appointments].sort(
    (a, b) => a.datetime.getTime() - b.datetime.getTime()
  );

  return (
    <View className="px-6 pt-10 pb-10 bg-white rounded-[40px]">
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
            <Pressable
              key={index}
              onPress={() => onPressAppointment?.(appt)}
              className="flex-row items-center px-4 py-4 mb-4 rounded-[30px] shadow-md bg-slate-50"
            >
              <View className="rounded-full bg-white w-18 h-18 items-center justify-center">
                <Image
                  source={ICONS.CALENDAR_ICON}
                  className="w-12 h-12"
                  style={{ resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text className="text-lg text-gray-800 ml-5 font-UrbanistBold">
                  {dateStr}, {timeStr}
                </Text>
              </View>
            </Pressable>
          );
        })
      )}
    </View>
  );
};

export default PatientAppointments;
