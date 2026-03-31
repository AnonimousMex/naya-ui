import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { ICONS } from "@/constants/images";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUserAnimal } from "@/hooks/useUserAnimal";

interface ParentsProfileModalProps {
  visible: boolean;
  onClose: () => void;
  type: "profile" | "terms";
}

const ParentsProfileModal: React.FC<ParentsProfileModalProps> = ({
  visible,
  onClose,
  type,
}) => {
  const { userInfo } = useUserInfo();
  const { animalImage } = useUserAnimal();

  const renderProfileContent = () => (
    <View className="px-8 py-6">
      <Text className="text-2xl font-UrbanistBold text-brown-800 mb-6 text-center">
        Información Personal
      </Text>
      
      <View className="items-center mb-6">
        {animalImage ? (
          <Image source={animalImage as ImageSourcePropType} className="w-40 h-40" style={{ resizeMode: "contain" }} />
        ) : (
          <View className="w-40 h-40 bg-gray-300 rounded-full items-center justify-center">
            <Text className="text-gray-600 text-xs">Sin avatar</Text>
          </View>
        )}
      </View>

      <View className="space-y-4">
        <View className="bg-gray-100 p-4 rounded-lg">
          <Text className="text-base font-UrbanistSemiBold text-gray-600 mb-1">
            Correo registrado
          </Text>
          <Text className="text-lg font-UrbanistMedium text-brown-800">
            {userInfo?.email || "No hay correo registrado"}
          </Text>
        </View>

        <View className="bg-gray-100 p-4 rounded-lg mt-5">
          <Text className="text-base font-UrbanistSemiBold text-gray-600 mb-1">
            Nombre del niño
          </Text>
          <Text className="text-lg font-UrbanistMedium text-brown-800">
            {userInfo?.name || "No hay nombre registrado"}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTermsContent = () => (
    <View className="px-8 py-6">
      <Text className="text-2xl font-UrbanistBold text-brown-800 mb-6 text-center">
        Términos y Condiciones
      </Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ maxHeight: 400 }}
        nestedScrollEnabled={true}
      >
        <View className="space-y-4 px-2">
          <Text className="text-lg font-UrbanistMedium text-gray-700 leading-7 text-justify">
            Los términos y condiciones de uso de la aplicación NAYA están siendo elaborados
            por nuestro equipo legal para garantizar la mejor experiencia y protección de datos
            para nuestros usuarios.
          </Text>
          
          <Text className="text-lg font-UrbanistMedium text-gray-700 leading-7 text-justify">
            Mientras tanto, nuestra aplicación se encuentra en fase de desarrollo y todas las
            funcionalidades están siendo implementadas con los más altos estándares de seguridad
            y privacidad.
          </Text>
          
          <Text className="text-lg font-UrbanistMedium text-gray-700 leading-7 text-justify">
            Si tienes alguna pregunta o inquietud sobre el uso de la aplicación, no dudes en
            contactar a nuestro equipo de soporte.
          </Text>
          
          <View className="mt-6 p-4 bg-blue-50 rounded-lg">
            <Text className="text-base font-UrbanistSemiBold text-blue-800 mb-2">
              Nota importante:
            </Text>
            <Text className="text-base font-UrbanistMedium text-blue-700 text-justify">
              Los términos y condiciones definitivos estarán disponibles próximamente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/30 justify-center items-center px-4"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          className="bg-white rounded-3xl max-h-[80%] w-full max-w-md"
          style={{ borderWidth: 4, borderColor: '#2e385c' }}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row justify-end items-center p-4 border-b border-gray-200">
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Text className="text-black text-xl font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {type === "profile" ? renderProfileContent() : renderTermsContent()}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ParentsProfileModal;
