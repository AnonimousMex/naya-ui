import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Modal,
  FlatList,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BackButton } from '@/components/BackButton';
import { HeaderTitleComponent } from '@/components/HeaderTitleComponent';
import { useLocalPatients } from '@/hooks/useLocalPatients';
import { useLocalAppointments } from '@/hooks/useLocalAppointments';
import { LocalPatient } from '@/constants/localData/patients';
import { LocalAppointment } from '@/constants/localData/appointments';

const THERAPY_TYPES = [
  'Terapia Individual',
  'Terapia Familiar', 
  'Ludoterapia',
  'Terapia de Arte',
  'Evaluación Psicológica',
  'Consulta de Seguimiento'
];

const ScheduleAppointment = () => {
  const { patients } = useLocalPatients();
  const { createAppointment } = useLocalAppointments();
  const params = useLocalSearchParams();
  
  // Pre-select patient if coming from patient profile
  const preSelectedPatient = params.patientId 
    ? patients.find(p => p.patient_id === params.patientId)
    : null;

  const [selectedPatient, setSelectedPatient] = useState<LocalPatient | null>(preSelectedPatient || null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [therapyType, setTherapyType] = useState(THERAPY_TYPES[0]);
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showTherapyModal, setShowTherapyModal] = useState(false);

  const handleScheduleAppointment = () => {
    if (!selectedPatient) {
      Alert.alert('Error', 'Por favor selecciona un paciente');
      return;
    }

    // Validar que la fecha no sea en el pasado
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
    
    if (appointmentDateTime <= new Date()) {
      Alert.alert('Error', 'No puedes agendar una cita en el pasado');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];
    const timeStr = `${String(selectedTime.getHours()).padStart(2, '0')}:${String(selectedTime.getMinutes()).padStart(2, '0')}`;

    const newAppointment: Omit<LocalAppointment, 'id'> = {
      patient_id: selectedPatient.patient_id,
      patient_name: selectedPatient.name,
      therapist_id: '9493bc02-f84e-4187-82ea-f7a369306a12',
      date: dateStr,
      time: timeStr,
      type: therapyType,
      status: 'scheduled',
      notes: notes.trim() || undefined,
      duration: 60,
      location: 'Consultorio Principal'
    };

    try {
      createAppointment(newAppointment);
      Alert.alert(
        'Éxito', 
        'Cita agendada correctamente',
        [
          { 
            text: 'OK', 
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo agendar la cita');
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-6 py-4">
          <BackButton onPress={() => router.back()} />
          <View className="flex-1 ml-4">
            <HeaderTitleComponent mainText="Agendar Cita" />
          </View>
        </View>

        <View className="px-6 pb-8">
          {/* Patient Selection */}
          <View className="mb-6">
            <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
              Paciente
            </Text>
            <TouchableOpacity
              onPress={() => setShowPatientModal(true)}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              {selectedPatient ? (
                <View className="flex-row items-center">
                  <View className="bg-orange-400 w-10 h-10 rounded-full items-center justify-center mr-3">
                    <Text className="text-white font-UrbanistBold">
                      {selectedPatient.name.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-brown-800 font-UrbanistBold text-base">
                      {selectedPatient.name}
                    </Text>
                    <Text className="text-gray-600 font-UrbanistRegular text-sm">
                      {selectedPatient.age} años
                    </Text>
                  </View>
                </View>
              ) : (
                <Text className="text-gray-500 font-UrbanistRegular">
                  Seleccionar paciente
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Date Selection */}
          <View className="mb-6">
            <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
              Fecha
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              <Text className="text-brown-800 font-UrbanistRegular capitalize">
                {formatDate(selectedDate)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time Selection */}
          <View className="mb-6">
            <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
              Hora
            </Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              <Text className="text-brown-800 font-UrbanistRegular">
                {formatTime(selectedTime)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Therapy Type Selection */}
          <View className="mb-6">
            <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
              Tipo de Terapia
            </Text>
            <TouchableOpacity
              onPress={() => setShowTherapyModal(true)}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              <Text className="text-brown-800 font-UrbanistRegular">
                {therapyType}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View className="mb-8">
            <Text className="text-brown-800 font-UrbanistBold text-lg mb-3">
              Notas (Opcional)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Agregar notas sobre la cita..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              className="bg-white p-4 rounded-xl border border-gray-200 text-brown-800 font-UrbanistRegular"
              style={{ textAlignVertical: 'top' }}
            />
          </View>

          {/* Schedule Button */}
          <TouchableOpacity
            onPress={handleScheduleAppointment}
            className="bg-orange-400 py-4 px-6 rounded-xl"
          >
            <Text className="text-white font-UrbanistBold text-lg text-center">
              Agendar Cita
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {/* Patient Selection Modal */}
      <Modal
        visible={showPatientModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-96">
            <View className="p-6 border-b border-gray-200">
              <Text className="text-brown-800 font-UrbanistBold text-xl text-center">
                Seleccionar Paciente
              </Text>
            </View>
            <FlatList
              data={patients}
              keyExtractor={(item) => item.patient_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPatient(item);
                    setShowPatientModal(false);
                  }}
                  className="p-4 border-b border-gray-100"
                >
                  <View className="flex-row items-center">
                    <View className="bg-orange-400 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-white font-UrbanistBold">
                        {item.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-brown-800 font-UrbanistBold text-base">
                        {item.name}
                      </Text>
                      <Text className="text-gray-600 font-UrbanistRegular text-sm">
                        {item.age} años
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <Pressable
              onPress={() => setShowPatientModal(false)}
              className="p-6"
            >
              <Text className="text-center text-gray-500 font-UrbanistRegular">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Therapy Type Selection Modal */}
      <Modal
        visible={showTherapyModal}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-3xl">
            <View className="p-6 border-b border-gray-200">
              <Text className="text-brown-800 font-UrbanistBold text-xl text-center">
                Tipo de Terapia
              </Text>
            </View>
            <FlatList
              data={THERAPY_TYPES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setTherapyType(item);
                    setShowTherapyModal(false);
                  }}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className="text-brown-800 font-UrbanistRegular text-base">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Pressable
              onPress={() => setShowTherapyModal(false)}
              className="p-6"
            >
              <Text className="text-center text-gray-500 font-UrbanistRegular">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleAppointment;