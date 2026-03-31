import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppointmentsMutation } from "@/hooks/therapist/useListAppointmentsMutation";
import { useCancelAppointmentMutation } from "@/hooks/therapist/useCancelAppointmentMutation";
import { useRescheduleAppointmentMutation } from "@/hooks/therapist/useRescheduleAppointmentMutation";
import { useCompleteAppointmentMutation } from "@/hooks/therapist/useCompleteAppointmentMutation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { NavbarComponent } from "@/components/NavBar";
import PatientAppointments from "@/components/PatientAppointments";
import { BackButton } from "@/components/BackButton";
import { IMAGES, ICONS } from "@/constants/images";
import { useLocalSearchParams } from "expo-router";
import { useCreateAppointmentMutation } from "@/hooks/therapist/useCreateAppointmentMuation";
import { getAnimalVariantImage } from "@/utils/animalAssets";
import { useUserAnimal } from "@/hooks/useUserAnimal";

const PatientAppoinment = () => {
  const { showSnackbar } = useSnackbar();
  const { width, height } = Dimensions.get("window");
  const fontSize = width * 0.06;
  
  const params = useLocalSearchParams();
  const patient_id = params.id as string;
  const patientName = params.name as string;
  const animalId = params.animalId as string;
  
  const { animalData, animalColor } = useUserAnimal(animalId);
  
  const patientAvatar = animalData?.animal_key 
    ? getAnimalVariantImage(animalData.animal_key, "happy", 3)
    : IMAGES.HAPPY_AXOLOTL_1;
  
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

  const [appointments, setAppointments] = useState<
    { id: string; patient_id: string; datetime: Date }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDetailsView, setShowDetailsView] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string;
    patient_id: string;
    datetime: Date;
  } | null>(null);

  const appointmentsMutation = useAppointmentsMutation(() => {
    setAppointments([]);
  });

  const createAppointmentMutation = useCreateAppointmentMutation();
  const completeAppointmentMutation = useCompleteAppointmentMutation();
  const rescheduleAppointmentMutation = useRescheduleAppointmentMutation();
  const cancelAppointmentMutation = useCancelAppointmentMutation();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    return date
      .toLocaleDateString("es-MX", options)
      .replace(",", "")
      .replace(".", "")
      .replace(/^\w{3}/, (day) => day.toLowerCase());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isSameDateTime = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getHours() === d2.getHours() &&
      d1.getMinutes() === d2.getMinutes()
    );
  };

  const fetchAppointments = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      showSnackbar({ type: "error", message: "No hay token de acceso" });
      return;
    }
    appointmentsMutation.mutate(
      { token, patient_id },
      {
        onSuccess(response) {
          if (response.data.length === 0) {
            showSnackbar({
              type: "warning",
              message: "No tienes citas programadas.",
            });
            setAppointments([]);
            return;
          }
          const mappedAppointments = response.data.map((item) => {
            const [year, month, day] = item.date.split("-").map(Number);
            const [hours, minutes] = item.time.split(":").map(Number);
            return {
              id: item.id,
              patient_id: item.patient_id,
              datetime: new Date(year, month - 1, day, hours, minutes),
            };
          });
          setAppointments(mappedAppointments);
        },
      }
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedAppointment(null);
    setShowDetailsView(true);
  };

  const handleCancelAppointment = () => {
    if (!selectedAppointment?.id) return;
    Alert.alert("¿Cancelar cita?", "¿Estás seguro que quieres cancelar esta cita?", [
      { text: "No", style: "cancel" },
      {
        text: "Sí",
        onPress: () => {
          cancelAppointmentMutation.mutate(selectedAppointment.id);
          fetchAppointments();
          handleCloseModal();
          showSnackbar({ type: "success", message: "Cita cancelada." });
        },
      },
    ]);
  };

  const handleMarkAsDone = () => {
    if (!selectedAppointment?.id) return;
    completeAppointmentMutation.mutate(selectedAppointment.id);
    fetchAppointments();
    handleCloseModal();
  };

  const handleDiscardChanges = () => {
    handleCloseModal();
  };

  return (
    <SafeAreaViewContext className="flex-1 bg-brown-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator>
        <View
          className="relative"
          style={{
            height: dynamicHeight,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: animalColor || "#edcedb",
          }}
        >
          <View className="relative h-16 justify-center">
            <View className="absolute left-0 top-0 bottom-0 justify-center px-5">
              <BackButton onPress={() => router.back()} />
            </View>
            <Text className="text-slate-100 font-UrbanistBold text-4xl text-center" style={{ letterSpacing: -1 }}>
              Consultas
            </Text>
          </View>
          <View className="flex-1 justify-end items-center">
            <Image source={patientAvatar} className="mb-[-20] w-64 h-64" style={{ resizeMode: "contain" }} />
            <View className="bg-slate-100 rounded-3xl py-3 mb-[-20] px-5 z-20" style={{ width: width * 0.45 }}>
              <Text className="text-center font-UrbanistBold text-black" style={{ fontSize, lineHeight: fontSize + 4 }}>
                {patientName}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 bg-brown-50  px-4 pt-6">
          <Text className="text-center font-UrbanistBold text-gray-730 text-xl mt-2 mb-3">Consultas próximas:</Text>
          <PatientAppointments
            appointments={appointments}
            onPressAppointment={(appointment) => {
              setSelectedAppointment(appointment);
              setSelectedDate(appointment.datetime);
              setSelectedTime(appointment.datetime);
              setModalVisible(true);
              setShowDetailsView(true);
            }}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-20 right-6 z-50">
        <Pressable
          onPress={() => {
            setSelectedAppointment(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setModalVisible(true);
            setShowDetailsView(false);
          }}
          className="bg-slate-50 w-14 h-14 rounded-full items-center justify-center shadow-lg mb-6"
        >
          <Text className="text-brown-800 text-2xl font-UrbanistExtraBold">＋</Text>
        </Pressable>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
          onPress={handleCloseModal}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-50 rounded-[50] p-9 items-center"
          >
            <Pressable onPress={handleCloseModal} className="absolute top-3 right-3 p-2 z-10">
              <Text className="text-3xl font-UrbanistExtraBold">×</Text>
            </Pressable>

            {selectedAppointment && showDetailsView ? (
              <>
                <Text className="text-xl mb-4 font-UrbanistExtraBold">Detalles de la cita</Text>
                <View className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                  <Image source={ICONS.CALENDAR_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                  <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                    {formatDate(selectedAppointment.datetime)}
                  </Text>
                </View>
                <View className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                  <Image source={ICONS.CLOCK_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                  <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                    {formatTime(selectedAppointment.datetime)}
                  </Text>
                </View>
                <Pressable onPress={() => setShowDetailsView(false)} className="bg-blue-900 w-full py-3 rounded-full mb-4">
                  <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Editar cita</Text>
                </Pressable>
                <Pressable onPress={handleMarkAsDone} className="bg-green-700 w-full py-3 rounded-full">
                  <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Cita realizada</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text className="text-2xl mb-6 text-center font-UrbanistExtraBold">
                  {selectedAppointment ? "Editar cita" : "Agendar nueva cita"}
                </Text>

                <Pressable onPress={() => setShowDatePicker(true)} className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                  <Image source={ICONS.CALENDAR_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                  <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                    {selectedDate ? formatDate(selectedDate) : "Seleccionar fecha"}
                  </Text>
                </Pressable>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="inline"
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      if (date) setSelectedDate(date);
                    }}
                  />
                )}
                <Pressable onPress={() => setShowTimePicker(true)} className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                  <Image source={ICONS.CLOCK_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                  <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                    {selectedTime ? formatTime(selectedTime) : "Seleccionar hora"}
                  </Text>
                </Pressable>
                {showTimePicker && (
                  <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time"
                    display="spinner"
                    onChange={(event, time) => {
                      setShowTimePicker(false);
                      if (time) setSelectedTime(time);
                    }}
                  />
                )}

                <View className={`w-full mt-6 ${selectedAppointment ? "flex-row justify-between gap-5 space-x-3" : ""}`}>
                  {selectedAppointment ? (
                    <>
                      <Pressable onPress={handleCancelAppointment} className="flex-1 bg-red-600 py-3 rounded-full">
                        <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Cancelar cita</Text>
                      </Pressable>
                      <Pressable
                        onPress={async () => {
                          if (selectedDate && selectedTime) {
                            const scheduledDateTime = new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate(),
                              selectedTime.getHours(),
                              selectedTime.getMinutes()
                            );

                            const now = new Date();
                            if (scheduledDateTime <= now) {
                              showSnackbar({
                                type: "warning",
                                message: "No puedes agendar una cita en el pasado.",
                              });
                              return;
                            }

                            const dateStr = `${scheduledDateTime.getFullYear()}-${String(scheduledDateTime.getMonth() + 1).padStart(2, "0")}-${String(scheduledDateTime.getDate()).padStart(2, "0")}`;
                            const timeStr = `${String(scheduledDateTime.getHours()).padStart(2, "0")}:${String(scheduledDateTime.getMinutes()).padStart(2, "0")}`;

                            const token = await AsyncStorage.getItem("accessToken");
                            if (!isSameDateTime(scheduledDateTime, selectedAppointment.datetime)) {
                              rescheduleAppointmentMutation.mutate(
                                { token: token!, appointment_id: selectedAppointment.id, date: dateStr, time: timeStr },
                                {
                                  onSuccess: () => {
                                    fetchAppointments();
                                    handleCloseModal();
                                    showSnackbar({ type: "success", message: "Cita reagendada con éxito." });
                                  },
                                }
                              );
                            } else {
                              showSnackbar({
                                type: "warning",
                                message: "No hiciste cambios en la fecha u hora.",
                              });
                            }
                          } else {
                            showSnackbar({
                              type: "warning",
                              message: "Completa todos los campos para agendar la cita.",
                            });
                          }
                        }}
                        className="flex-1 bg-blue-900 py-3 rounded-full"
                      >
                        <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Confirmar cambios</Text>
                      </Pressable>
                    </>
                  ) : (
                    <Pressable
                      onPress={async () => {
                        if (selectedDate && selectedTime) {
                          const scheduledDateTime = new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate(),
                            selectedTime.getHours(),
                            selectedTime.getMinutes()
                          );

                          const now = new Date();
                          if (scheduledDateTime <= now) {
                            showSnackbar({
                              type: "warning",
                              message: "No puedes agendar una cita en el pasado.",
                            });
                            return;
                          }

                          const dateStr = `${scheduledDateTime.getFullYear()}-${String(scheduledDateTime.getMonth() + 1).padStart(2, "0")}-${String(scheduledDateTime.getDate()).padStart(2, "0")}`;
                          const timeStr = `${String(scheduledDateTime.getHours()).padStart(2, "0")}:${String(scheduledDateTime.getMinutes()).padStart(2, "0")}`;

                          const token = await AsyncStorage.getItem("accessToken");
                          createAppointmentMutation.mutate(
                            { token: token!, date: dateStr, time: timeStr, patient_id: patient_id },
                            {
                              onSuccess: () => {
                                fetchAppointments();
                                handleCloseModal();
                                showSnackbar({ type: "success", message: "Cita agendada con éxito." });
                              },
                            }
                          );
                        } else {
                          showSnackbar({
                            type: "warning",
                            message: "Completa todos los campos para agendar la cita.",
                          });
                        }
                      }}
                      className="w-full bg-blue-900 py-3 rounded-full"
                    >
                      <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Agendar</Text>
                    </Pressable>
                  )}
                </View>

                <Pressable
                  onPress={handleDiscardChanges}
                  className="bg-gray-400 w-full py-3 rounded-full mt-4"
                >
                  <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">
                    Descartar cambios
                  </Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
      <SafeAreaViewContext edges={["bottom"]} className="bg-white absolute bottom-0 left-0 right-0 z-50">
        <NavbarComponent isTherapist />
      </SafeAreaViewContext>
    </SafeAreaViewContext>
  );
};

export default PatientAppoinment;
