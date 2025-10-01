import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { ICONS } from "@/constants/images";
import { router } from "expo-router";
import { ProfileButtonComponent } from "@/components/ProfileButtonsComponent";
import { useLocalUserInfo } from "@/hooks/useLocalUserInfo";
import { useState } from "react";
import { ParentsProfileModal } from "@/components/ParentsProfileModal";

const ParentsProfile = () => {
  const { userInfo, loading, logout } = useLocalUserInfo();
  const userEmail = userInfo?.email || "No hay correo registrado";
  const userName = userInfo?.name || "Usuario";
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"profile" | "terms">("profile");

  const openModal = (type: "profile" | "terms") => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/welcome");
  };

  // Redirigir si no hay usuario logueado
  if (!loading && !userInfo) {
    router.replace("/(auth)/welcome");
    return null;
  }

  const profileButtons = [
    {
      icon: ICONS.PERSON_ICON,
      text: "Información personal",
      onPress: () => openModal("profile"),
    },
    {
      icon: ICONS.LOCK_ICON,
      text: "Progreso del niño",
      onPress: () => router.push("/(parentsPages)/test-results"),
    },
    {
      icon: ICONS.BOOK_NAV_ICON,
      text: "Guías educativas",
      onPress: () => router.push("/(parentsPages)/educational-guides"),
    },
    {
      icon: ICONS.WEB_ICON,
      text: "Ver especialistas",
      onPress: () => router.push("/(parentsPages)/therapists-list"),
    },
    {
      icon: ICONS.VERIFIED_ICON,
      text: "Terminos y condiciones",
      onPress: () => openModal("terms"),
    },
  ];

  return (
    <SafeAreaViewContext className="flex-1 bg-white-800">
      <ScrollView showsVerticalScrollIndicator>
        <View className="bg-blue-300 px-4 pt-5 pb-20 rounded-b-[15] relative">
          <View className="flex-row items-center justify-between mt-5 mb-5 px-0">
            <Text className="text-white text-4xl font-UrbanistBold">
              Mi perfil
            </Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => router.push("/(auth)/welcome")}>
                <View className="rounded-full mr-2">
                  <Image source={ICONS.NOTIFICATION_ICON} className="w-8 h-8" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/welcome")}>
                <View className="rounded-full">
                  <Image source={ICONS.GEAR_ICON} className="w-7 h-7" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-white text-sm leading-5 font-UrbanistBold">
            Dentro de esta sección podrás gestionar toda tu información personal
            y configurar tu cuenta según tus preferencias.
          </Text>
        </View>

        <View className="mt-8 items-center">
          {loading ? (
            <ActivityIndicator size="large" color="#0066CC" className="mb-10" />
          ) : (
            <>
              <View className="items-center mb-10">
                <Text className="text-brown-800 font-UrbanistBold text-2xl mb-2">
                  {userName}
                </Text>
                <Text className="text-brown-800 font-UrbanistMedium text-lg">
                  {userEmail}
                </Text>
                {userInfo?.user_type && (
                  <Text className="text-gray-600 font-UrbanistMedium text-sm mt-1">
                    Tipo: {userInfo.user_type === "PATIENT" ? "Paciente" : userInfo.user_type === "THERAPIST" ? "Terapeuta" : "Padre/Madre"}
                  </Text>
                )}
              </View>
            </>
          )}
          <ProfileButtonComponent options={profileButtons} />

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-74 rounded-full px-4 py-4 mb-10 shadow-sm  items-center justify-center w-4/5 self-center"
          >
            <Text className="text-white text-xl font-UrbanistBold">
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <ParentsProfileModal
        visible={modalVisible}
        onClose={closeModal}
        type={modalType}
        userInfo={userInfo}
      />
    </SafeAreaViewContext>
  );
};

export default ParentsProfile;
