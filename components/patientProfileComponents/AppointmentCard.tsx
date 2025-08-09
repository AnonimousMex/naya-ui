import { ICONS } from '@/constants/images';
import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import { useCancelAppointmentMutation } from "@/hooks/therapist/useCancelAppointmentMutation";
import { useRescheduleAppointmentMutation } from "@/hooks/therapist/useRescheduleAppointmentMutation";
import { useCompleteAppointmentMutation } from "@/hooks/therapist/useCompleteAppointmentMutation";
import { useSnackbar } from "@/hooks/useSnackbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TAppointmentCard = {
    appointmentId: string;
    patientId: string;
    patientName: string;
    date: string;
    time: string;
    onAppointmentUpdate?: () => void;
    customTitle?: string; 
    customSubtitle?: string; 
}

const AppointmentCard = ({ 
    appointmentId, 
    patientId, 
    patientName, 
    date, 
    time, 
    onAppointmentUpdate,
    customTitle,
    customSubtitle 
}: TAppointmentCard) => {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const datetime = new Date(year, month - 1, day, hours, minutes);

    const [modalVisible, setModalVisible] = useState(false);
    const [showDetailsView, setShowDetailsView] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const { showSnackbar } = useSnackbar();
    const cancelAppointmentMutation = useCancelAppointmentMutation();
    const rescheduleAppointmentMutation = useRescheduleAppointmentMutation();
    const completeAppointmentMutation = useCompleteAppointmentMutation();

    const progress = (hours + (minutes * 0.01)) / 24;
    const size = 60;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress * circumference);

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

    const handleOpenModal = () => {
        setModalVisible(true);
        setSelectedDate(datetime);
        setSelectedTime(datetime);
        setShowDetailsView(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setShowDetailsView(true);
    };

    const handleCancelAppointment = () => {
        Alert.alert("¿Cancelar cita?", "¿Estás seguro que quieres cancelar esta cita?", [
            { text: "No", style: "cancel" },
            {
                text: "Sí",
                onPress: () => {
                    cancelAppointmentMutation.mutate(appointmentId, {
                        onSuccess: () => {
                            handleCloseModal();
                            showSnackbar({ type: "success", message: "Cita cancelada." });
                            onAppointmentUpdate?.();
                        },
                    });
                },
            },
        ]);
    };

    const handleMarkAsDone = () => {
        completeAppointmentMutation.mutate(appointmentId, {
            onSuccess: () => {
                handleCloseModal();
                showSnackbar({ type: "success", message: "Cita completada." });
                onAppointmentUpdate?.();
            },
        });
    };

    const handleReschedule = async () => {
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

            if (!isSameDateTime(scheduledDateTime, datetime)) {
                const token = await AsyncStorage.getItem("accessToken");
                rescheduleAppointmentMutation.mutate(
                    { token: token!, appointment_id: appointmentId, date: dateStr, time: timeStr },
                    {
                        onSuccess: () => {
                            handleCloseModal();
                            showSnackbar({ type: "success", message: "Cita reagendada con éxito." });
                            onAppointmentUpdate?.();
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
    };

    return (
        <>
            <View className="bg-white rounded-2xl p-4 mx-2 my-3">
                <TouchableOpacity onPress={handleOpenModal} className='w-full h-18 flex-row'>
                    <View className='w-[80%] h-full flex-row items-center'>
                        <View className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center'>
                            <Image 
                                source={ICONS.TIMER_ICON}
                                className='w-[55%] h-[55%]'
                            />
                        </View>
                        <View className='flex-col h-full ml-7'>
                            <Text className='text-brown-800 font-UrbanistExtraBold text-2xl'>
                                {customTitle || patientName}
                            </Text>
                            <Text className='text-brown-800 font-UrbanistLight pt-[0.1rem]'>
                                {customSubtitle || "Consulta"}
                            </Text>
                            <Text className='text-brown-800 font-UrbanistSemiBold'>
                                {formatDate(datetime)}
                            </Text>
                        </View>
                    </View>
                <View className='w-[20%]'>
                    <View className="items-center justify-center">
                        <View className="relative items-center justify-center">
                            <Svg width={size} height={size} className="absolute">
                                <Circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="rgb(237, 233, 254)" 
                                    strokeWidth={strokeWidth}
                                    fill="transparent"
                                />
                                <Circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke="rgb(167, 139, 250)"
                                    strokeWidth={strokeWidth}
                                    fill="transparent"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                />
                            </Svg>
                            
                            <View className="absolute items-center justify-center">
                                <Text className="text-lg font-light text-gray-700">
                                    {hours > 12 ? (
                                        <>{(hours-12).toString()}:{minutes.toString().padStart(2,'0')}</>
                                    ):(
                                        <>{(hours).toString()}:{minutes.toString().padStart(2,'0')}</>
                                    )}
                                </Text>
                                <Text className="text-sm font-light text-gray-500 -mt-1">
                                    {hours >= 12 ? (
                                        <>PM</>
                                    ):(
                                        <>AM</>
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

            {/* Modal para interactuar con las citas */}
            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
                <Pressable
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
                    onPress={handleCloseModal}
                >
                    <Pressable
                        onPress={(e) => e.stopPropagation()}
                        className="w-full max-w-md bg-slate-50 rounded-[50] p-9 items-center mx-4"
                    >
                        <Pressable onPress={handleCloseModal} className="absolute top-3 right-3 p-2 z-10">
                            <Text className="text-3xl font-UrbanistExtraBold">×</Text>
                        </Pressable>

                        {showDetailsView ? (
                            <>
                                <Text className="text-xl mb-4 font-UrbanistExtraBold">Detalles de la cita</Text>
                                
                                {/* Mostrar nombre del paciente */}
                                <View className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                                    <Image source={ICONS.PERSON_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                                    <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                                        {patientName}
                                    </Text>
                                </View>

                                {/* Mostrar fecha */}
                                <View className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                                    <Image source={ICONS.CALENDAR_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                                    <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                                        {formatDate(datetime)}
                                    </Text>
                                </View>

                                {/* Mostrar hora */}
                                <View className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full">
                                    <Image source={ICONS.CLOCK_ICON} className="w-10 h-10 mr-3" resizeMode="contain" />
                                    <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                                        {formatTime(datetime)}
                                    </Text>
                                </View>

                                {/* Botones de acción */}
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
                                    Editar cita
                                </Text>

                                {/* Fecha */}
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

                                {/* Hora */}
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

                                {/* Botones */}
                                <View className="w-full mt-6 flex-row justify-between gap-5 space-x-3">
                                    <Pressable onPress={handleCancelAppointment} className="flex-1 bg-red-600 py-3 rounded-full">
                                        <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Cancelar cita</Text>
                                    </Pressable>
                                    <Pressable onPress={handleReschedule} className="flex-1 bg-blue-900 py-3 rounded-full">
                                        <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">Confirmar cambios</Text>
                                    </Pressable>
                                </View>

                                <Pressable onPress={handleCloseModal} className="bg-gray-400 w-full py-3 rounded-full mt-4">
                                    <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">
                                        Descartar cambios
                                    </Text>
                                </Pressable>
                            </>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

export default AppointmentCard