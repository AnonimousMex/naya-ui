import {
    ScrollView,
    Image,
    View,
    Dimensions,
    Text,
    Modal,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { router } from "expo-router";
import { NavbarComponent } from "@/components/NavBar";
import PatientAppointments from "@/components/PatientAppointments";
import { BackButton } from "@/components/BackButton";
import { IMAGES, ICONS } from "@/constants/images";
import { useSnackbar } from "@/hooks/useSnackbar";

const UserProfile = () => {
    const { showSnackbar } = useSnackbar();
    const { width, height } = Dimensions.get("window");
    const fontSize = width * 0.06;
    const patientName = "Rodrigo";
    const bgColor = "bg-pink-700";
    const patientAvatar = IMAGES.HAPPY_AXOLOTL_1;
    const isTablet = width >= 520;
    const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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

    const appointments = [
        { datetime: new Date("2025-06-28T11:00:00") },
        { datetime: new Date("2025-06-28T16:30:00") },
        { datetime: new Date("2025-06-26T14:00:00") },
        { datetime: new Date("2025-07-01T10:00:00") },
    ];

    return (
        <SafeAreaViewContext className="flex-1 bg-brown-50">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator>
                <View
                    className={`relative ${bgColor}`}
                    style={{
                        height: dynamicHeight,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                    }}
                >
                    <View className="relative h-16 justify-center">
                        <View className="absolute left-0 top-0 bottom-0 justify-center px-5">
                            <BackButton onPress={() => router.push("/(auth)/welcome")} />
                        </View>
                        <Text
                            className="text-slate-100 font-UrbanistBold text-4xl text-center"
                            style={{ letterSpacing: -1 }}
                        >
                            Consultas
                        </Text>
                    </View>
                    <View className="flex-1 justify-end items-center">
                        <Image
                            source={patientAvatar}
                            className="mb-[-20] w-64 h-64"
                            style={{ resizeMode: "contain" }}
                        />
                        <View
                            className="bg-slate-100 rounded-3xl py-3 mb-[-20] px-5 z-20"
                            style={{ width: width * 0.45 }}
                        >
                            <Text
                                className="text-center font-UrbanistBold text-black"
                                style={{ fontSize, lineHeight: fontSize + 4 }}
                            >
                                {patientName}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="flex-1 bg-brown-50 rounded-t-3xl px-4 pt-6">
                    <Text className="text-center font-UrbanistBold text-gray-730 text-xl mt-2">
                        Consultas próximas:
                    </Text>
                    <PatientAppointments appointments={appointments} />
                </View>
            </ScrollView>
            <View className="absolute bottom-20 right-6 z-50">
                <Pressable
                    onPress={() => setModalVisible(true)}
                    className="bg-slate-50 w-14 h-14 rounded-full items-center justify-center shadow-lg mb-6"
                >
                    <Text className="text-brown-800 text-2xl font-UrbanistExtraBold">＋</Text>
                </Pressable>
            </View>
            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black-100 px-4">
                    <View className="w-full max-w-md bg-slate-50 rounded-[50] p-9 items-center">
                        <Text className="text-2xl mb-6 text-center font-UrbanistExtraBold">
                            Agendar nueva cita
                        </Text>
                        <Pressable
                            onPress={() => setShowDatePicker(true)}
                            className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full"
                        >
                            <Image
                                source={ICONS.CALENDAR_ICON}
                                className="w-10 h-10 mr-3"
                                resizeMode="contain"
                            />
                            <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                                {selectedDate
                                    ? formatDate(selectedDate)
                                    : "Seleccionar fecha"}
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
                        <Pressable
                            onPress={() => setShowTimePicker(true)}
                            className="flex-row items-center bg-slate-100 rounded-full p-3 mb-4 w-full"
                        >
                            <Image
                                source={ICONS.CLOCK_ICON}
                                className="w-10 h-10 mr-3"
                                resizeMode="contain"
                            />
                            <Text className="text-slate-800 text-base font-bold font-urbanistBold">
                                {selectedTime
                                    ? selectedTime.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      })
                                    : "Seleccionar hora"}
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
                        <View className="flex-row justify-between gap-5 w-full mt-6 space-x-3">
                            <Pressable
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedDate(null);
                                    setSelectedTime(null);
                                }}
                                className="flex-1 bg-red-600 py-3 rounded-full"
                            >
                                <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">
                                    Cancelar
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
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

                                        setModalVisible(false);
                                        setSelectedDate(null);
                                        setSelectedTime(null);

                                        showSnackbar({
                                            type: "success",
                                            message: `Se agendó la cita correctamente.`,
                                        });
                                    } else {
                                        showSnackbar({
                                            type: "warning",
                                            message: `Completa todos los campos para agendar la cita.`,
                                        });
                                    }
                                }}
                                className="flex-1 bg-blue-900 py-3 rounded-full"
                            >
                                <Text className="text-slate-50 text-center font-UrbanistExtraBold text-base">
                                    Agendar
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <SafeAreaViewContext
                edges={["bottom"]}
                className="bg-slate-100 absolute bottom-0 left-0 right-0 z-50"
            >
                <NavbarComponent />
            </SafeAreaViewContext>
        </SafeAreaViewContext>
    );
};

export default UserProfile;
