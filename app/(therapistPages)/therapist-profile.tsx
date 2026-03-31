import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ICONS } from "@/constants/images";
import { router } from "expo-router";
import { NavbarComponent } from "@/components/NavBar";
import { ProfileButtonComponent } from "@/components/ProfileButtonsComponent";
import { useUserInfo } from "@/hooks/useUserInfo";

const TherapistProfile = () => {
  const { userInfo } = useUserInfo();
  const userEmail = userInfo?.email || "Cargando...";
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactElement;
  } | null>(null);

  const openModal = (title: string, content: React.ReactElement) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const profileButtons = [
    {
      icon: ICONS.PERSON_ICON,
      text: "Información personal",
      onPress: () => openModal("Información Personal", (
        <View className="space-y-4">
          <View className="mb-4">
            <Text className="text-gray-600 font-UrbanistMedium text-base mb-1">Nombre</Text>
            <Text className="text-gray-800 font-UrbanistBold text-lg">{userInfo?.name || "No disponible"}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-gray-600 font-UrbanistMedium text-base mb-1">Correo electrónico</Text>
            <Text className="text-gray-800 font-UrbanistBold text-lg">{userEmail}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-gray-600 font-UrbanistMedium text-base mb-1">Código de terapeuta</Text>
            <Text className="text-gray-800 font-UrbanistBold text-lg">{userInfo?.code_connection || "No disponible"}</Text>
          </View>
        </View>
      )),
    },
    {
      icon: ICONS.LOCK_ICON,
      text: "Seguridad",
      onPress: () => openModal("Configuración de Seguridad", (
        <View className="space-y-4">
          <Text className="text-gray-700 font-Urbanist text-lg mb-4">
            En esta sección podrás configurar las opciones de seguridad de tu cuenta.
          </Text>
          <Text className="text-gray-600 font-Urbanist text-base">
            • Cambiar contraseña{'\n'}
            • Configurar autenticación de dos factores{'\n'}
            • Revisar sesiones activas{'\n'}
            • Configurar preguntas de seguridad
          </Text>
        </View>
      )),
    },
    {
      icon: ICONS.VERIFIED_ICON,
      text: "Términos y condiciones",
      onPress: () => openModal("Términos y Condiciones", (
        <View className="space-y-4">
          <Text className="text-gray-700 font-Urbanist text-lg mb-4">
            Información sobre los términos y condiciones de uso de la plataforma.
          </Text>
          <Text className="text-gray-600 font-Urbanist text-base">
            • Términos de servicio{'\n'}
            • Política de privacidad{'\n'}
            • Consentimiento informado{'\n'}
            • Código de ética profesional{'\n'}
            • Responsabilidades del terapeuta
          </Text>
        </View>
      )),
    },
  ];

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaViewContext className="flex-1 bg-blue-300">
        <ScrollView
          className="flex-1 bg-gray-100"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator
        >
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

        <View className="mt-8 items-center px-5">
          <Text className="text-brown-800 font-UrbanistBold text-xl mb-10">
            {userEmail}
          </Text>
          <ProfileButtonComponent options={profileButtons} />
          <TouchableOpacity
            onPress={() => router.push("/(auth)/welcome")}
            className="bg-red-74 rounded-full px-4 py-6 mb-10 shadow-sm w-full items-center justify-center"
          >
            <Text className="text-white text-xl font-UrbanistBold">
              Cerrar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SafeAreaViewContext
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent isTherapist />
      </SafeAreaViewContext>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          className="flex-1 justify-center items-center bg-black/50 px-6"
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="w-full"
          >
            <View className="bg-white rounded-3xl px-6 py-6 max-w-md mx-auto shadow-lg">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-UrbanistBold text-gray-800">
                  {modalContent?.title}
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center"
                >
                  <Text className="text-gray-600 font-UrbanistBold text-2xl">×</Text>
                </TouchableOpacity>
              </View>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 400 }}
              >
                {modalContent?.content}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaViewContext>
    </>
  );
};

export default TherapistProfile;
