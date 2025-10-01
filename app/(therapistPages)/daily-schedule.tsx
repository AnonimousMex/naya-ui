import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BackButton } from '@/components/BackButton';
import { HeaderTitleComponent } from '@/components/HeaderTitleComponent';
import { useLocalAppointments } from '@/hooks/useLocalAppointments';
import AppointmentCard from '@/components/patientProfileComponents/AppointmentCard';

const DAYS_OF_WEEK = [
  'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
];

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DailySchedule = () => {
  const { getByDate, refetch } = useLocalAppointments();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate dates for the current week
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates();
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const dayAppointments = getByDate(selectedDateStr);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
  };

  const sortedAppointments = dayAppointments.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <BackButton onPress={() => router.back()} />
        <View className="flex-1 ml-4">
          <HeaderTitleComponent mainText="Agenda Diaria" />
        </View>
      </View>

      {/* Week selector */}
      <View className="px-6 mb-4">
        <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
          {formatDate(selectedDate)}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {weekDates.map((date, index) => (
              <TouchableOpacity
                key={date.toISOString()}
                onPress={() => setSelectedDate(date)}
                className={`px-4 py-3 rounded-xl min-w-16 items-center ${
                  isSameDate(date, selectedDate)
                    ? 'bg-orange-400'
                    : isToday(date)
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <Text
                  className={`font-UrbanistBold text-xs mb-1 ${
                    isSameDate(date, selectedDate)
                      ? 'text-white'
                      : isToday(date)
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  {DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                </Text>
                <Text
                  className={`font-UrbanistBold text-lg ${
                    isSameDate(date, selectedDate)
                      ? 'text-white'
                      : isToday(date)
                      ? 'text-blue-600'
                      : 'text-brown-800'
                  }`}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Appointments for selected day */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-brown-800 font-UrbanistBold text-lg">
            Citas del día ({sortedAppointments.length})
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(therapistPages)/schedule-appointment")}
            className="bg-orange-400 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-UrbanistBold text-sm">
              Agendar
            </Text>
          </TouchableOpacity>
        </View>

        {sortedAppointments.length > 0 ? (
          <View className="pb-8">
            {sortedAppointments.map((appointment, index) => (
              <View 
                key={appointment.id} 
                className={index < sortedAppointments.length - 1 ? "mb-4" : "mb-4"}
              >
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
        ) : (
          <View className="flex-1 items-center justify-center py-16">
            <View className="bg-white rounded-2xl p-6 shadow-sm max-w-xs">
              <Text className="text-brown-800 font-UrbanistBold text-lg text-center mb-2">
                Sin citas programadas
              </Text>
              <Text className="text-gray-600 font-UrbanistRegular text-center mb-4">
                No tienes consultas agendadas para este día
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(therapistPages)/schedule-appointment")}
                className="bg-orange-400 py-3 px-6 rounded-xl"
              >
                <Text className="text-white font-UrbanistBold text-center">
                  Agendar Cita
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailySchedule;