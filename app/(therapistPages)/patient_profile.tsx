import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { ICONS, IMAGES } from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { UserStatsRow } from "@/components/UserStatistics";
import { NavbarComponent } from "@/components/NavBar";
import { BackButton } from "@/components/BackButton";
import {
  ButtonPatientProfile,
  AppointmentCard,
} from "@/components/patientProfileComponents";
import { HeaderInformationComponent } from "@/components/HeaderInformationComponent";
import { useState, useEffect } from "react";
import { useCloseConnectionMutation } from "@/hooks/therapist/useCloseConnectionMutation";
import { TCloseConnection } from "@/models/therapist";
import { getAnimalVariantImage } from "@/utils/animalAssets";
import { useUserAnimal } from "@/hooks/useUserAnimal";
import { useListAllAppointmentsMutation } from "@/hooks/therapist/useListAllAppointmentsMutation";
import { TAppointmentWithPatient } from "@/models/Common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppointmentCardComponent from "@/components/patientProfileComponents/AppointmentCard";


const PatientProfile = () => {
  const { width, height } = Dimensions.get("window");
  const isTablet = width >= 520;
  const dynamicHeight = isTablet ? height * 0.6 : height * 0.4;
  const params = useLocalSearchParams();
  const { id, name, avatar, circleColor, animalId } = params;

  const { animalData, animalColor } = useUserAnimal(animalId as string);
  
  const userImage = animalData?.animal_key 
    ? getAnimalVariantImage(animalData.animal_key, "happy", 3)
    : IMAGES.UNKNOWN_HEAD;
  
  const closeConnectionMutation = useCloseConnectionMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [appointments, setAppointments] = useState<TAppointmentWithPatient[]>([]);
  const listAllAppointmentsMutation = useListAllAppointmentsMutation();

  const fetchPatientAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return;
      listAllAppointmentsMutation.mutate(token, {
        onSuccess: (response) => {
          if (response.data) {
            const patientAppointments = response.data.filter(
              (appointment) => appointment.patient_id === id
            );
            setAppointments(patientAppointments);
          }
        },
      });
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  useEffect(() => {
    fetchPatientAppointments();
  }, [id]);

  const nextAppointment = appointments
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    })[0]; 

  const handleOnSubmit = () =>{
    const payload: TCloseConnection = {
      idPatient: id.toString()
    }
    closeConnectionMutation.mutate(payload)
  }

  return (
    <SafeAreaViewContext className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator
      >
        <View
          className="relative"
          style={{ 
            height: dynamicHeight,
            backgroundColor: animalColor || "#edcedb"
          }}
        >
          <View className="absolute w-full flex-row justify-between p-7">
            <BackButton onPress={() => router.back()} />

            <HeaderInformationComponent
              type="name"
              name={name.toString()}
              borderColor="#E4B18E"
            />
          </View>
          <View className="flex-1 justify-end items-center">
            <Image
              source={userImage}
              className=" w-64 h-64"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>

        <View className="flex-1 bg-white rounded-t-3xl px-6 pt-6">
          <View className="flex justify-center items-center mb-4">
            {nextAppointment ? (
              <AppointmentCardComponent
                appointmentId={nextAppointment.id}
                patientId={nextAppointment.patient_id}
                patientName={nextAppointment.patient_name || name.toString()}
                date={nextAppointment.date}
                time={nextAppointment.time}
                onAppointmentUpdate={fetchPatientAppointments}
                customTitle="Próxima Consulta"
                customSubtitle={name.toString()}
              />
            ) : (
              <View className="bg-brown-50 rounded-2xl p-4 mx-2 my-3 shadow-sm w-full">
                <Text className="text-brown-800 font-UrbanistLight text-center">
                  No hay citas próximas para este paciente
                </Text>
              </View>
            )}
          </View>

          <UserStatsRow badges={12} streak={5} exp={2300} />

          <View className="w-full flex-row justify-end mt-10">
            <Pressable
              onPress={() => router.push("/(auth)/welcome")}
              className="px-3 rounded-md"
            >
              <View className="flex-row items-center">
                <Text className="text-black text-base font-UrbanistBold">
                  Ayuda 
                </Text>
                <Image
                  source={ICONS.HELP_ICON}
                  style={{
                    width: width < 390 ? 14 : 18,
                    height: height < 390 ? 14 : 18,
                    resizeMode: "contain",
                    marginLeft: 5,
                  }}
                />
              </View>
            </Pressable>
          </View>
          <View className="flex-row justify-between mx-1 my-8">
            <ButtonPatientProfile
              bg="bg-brown-800"
              name="Citas"
              icon={ICONS.CALENDAR_WHITE_ICON}
              onPress={() => {
                router.push({
                  pathname: "/(therapistPages)/patient-appointments",
                  params: {
                    id: id,
                    name: name,
                    animalId: animalId || "",
                  },
                });
              }}
            />
            <ButtonPatientProfile
              bg="bg-blue-80"
              name="Resultados"
              icon={ICONS.PLAY_ICON}
              onPress={() => {
                router.push({
                  pathname: "/(therapistPages)/test-results",
                  params: {
                    id: id,
                    name: name,
                    animalId: animalId || "",
                  },
                });
              }}
            />
          </View>
          <ButtonPatientProfile
              bg="bg-red-74"
              name="Cerrar Conexión"
              icon={ICONS.CLOSE_ICON}
              onPress={() => setModalVisible(true)}
          />
          <Modal visible={modalVisible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black-100 px-4">
              <View className="w-full max-w-md bg-slate-50 rounded-[50] p-9 items-center">
                <Text className="font-UrbanistBold text-xl text-center">
                  ¿Seguro que quieres cerrar conexión con el paciente:
                </Text>
                <Text className="font-UrbanistExtraBold text-3xl mt-8 ">
                  {name}
                </Text>
                <View className="flex-row justify-between gap-5 mt-8">
                  <Pressable 
                    onPress={() => setModalVisible(false)}
                    className="flex justify-center items-center border p-2 rounded-full px-6"
                  >
                    <Text className="font-UrbanistExtraBold text-xl">
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => handleOnSubmit()}
                    className="flex justify-center items-center bg-red-600 p-2 rounded-full py-3 px-6"
                  >
                    <Text className="font-UrbanistExtraBold text-white text-xl">
                      Cerrar Conexión
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <SafeAreaViewContext
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaViewContext>
    </SafeAreaViewContext>
  );
};

export default PatientProfile;
