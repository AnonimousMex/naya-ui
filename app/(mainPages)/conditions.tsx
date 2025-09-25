import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavbarComponent } from "@/components/NavBar";
import { router } from "expo-router";
import { MainButton } from "@/components/MainButton";

const TermsAndConditions = () => {
  const handleAccept = async () => {
    try {
      console.log("Términos y condiciones aceptados y guardados.");
    } catch (e) {
      console.error("Error al guardar la aceptación de los términos", e);
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Términos y Condiciones
        </Text>

        <View style={styles.textContainer} className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text className="text-gray-700 text-base leading-relaxed">
              Bienvenido a nuestra aplicación. Al ser una herramienta de apoyo a la salud emocional infantil, te pedimos leer cuidadosamente los siguientes términos.
              {"\n\n"}
              <Text className="font-bold text-lg">1. Aceptación de los Términos</Text>
              {"\n"}
              El uso de esta aplicación por parte de un menor de edad debe ser supervisado y consentido por su padre, madre o tutor legal. Al crear una cuenta y utilizar nuestros servicios, confirmas que tienes la autoridad para aceptar estos términos en nombre del menor.
              {"\n\n"}
              <Text className="font-bold text-lg">2. Descripción del Servicio</Text>
              {"\n"}
              Nuestra aplicación ofrece una plataforma digital diseñada como herramienta de apoyo para el bienestar y la salud emocional de los niños. A través de actividades interactivas y lúdicas, la aplicación permite realizar un seguimiento del estado emocional y desarrollar habilidades socioemocionales, sirviendo como un recurso complementario para padres y tutores.
              {"\n\n"}
              <Text className="font-bold text-lg">3. Privacidad y Protección de Datos Sensibles</Text>
              {"\n"}
              La confidencialidad y seguridad de los datos es nuestra máxima prioridad. El tratamiento de los datos personales se rige por la <Text className="font-bold">Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</Text> de México.
              {"\n\n"}
              La información recopilada (respuestas, progreso, etc.) se considera <Text className="font-bold">información sensible</Text> y será utilizada únicamente para:
              {"\n"} a) Ofrecer un panorama sobre el estado emocional del niño al padre, madre o tutor.
              {"\n"} b) Personalizar la experiencia dentro de la aplicación.
              {"\n"} c) Fines de investigación interna para mejorar la efectividad de nuestras herramientas, siempre de forma <Text className="font-bold">agregada y anonimizada</Text>.
              {"\n\n"}
              <Text className="font-bold">Bajo ninguna circunstancia, los datos personales o de uso serán vendidos, compartidos o revelados a terceros</Text> con fines de marketing, publicidad o cualquier otro propósito ajeno al objetivo de la aplicación.
              {"\n\n"}
              <Text className="font-bold text-lg">4. Propiedad Intelectual</Text>
              {"\n"}
              El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de la Compañía y sus licenciantes.
              {"\n\n"}
              <Text className="font-bold text-lg">5. Limitación de Responsabilidad y Uso No Clínico</Text>
              {"\n"}
              Esta aplicación es una herramienta de apoyo y seguimiento emocional. <Text className="font-bold">No constituye un diagnóstico médico ni reemplaza la consulta, diagnóstico o tratamiento de un profesional de la salud mental cualificado</Text> (psicólogo, paidopsiquiatra, etc.). Si tienes preocupaciones serias sobre la salud de tu hijo(a), te recomendamos encarecidamente que busques la opinión de un especialista.
              {"\n\n"}
              <Text className="font-bold text-lg">6. Ley Aplicable y Jurisdicción</Text>
              {"\n"}
              Estos Términos se regirán e interpretarán de acuerdo con las <Text className="font-bold">leyes federales vigentes en los Estados Unidos Mexicanos.</Text> Cualquier disputa será sometida a la jurisdicción de los tribunales competentes en la Ciudad de México.
              {"\n\n"}
              Al hacer clic en "Aceptar y Continuar", confirmas que has leído, entendido y aceptado estos términos en su totalidad.
            </Text>
          </ScrollView>
        </View>

        <MainButton
          mainText="Continuar"
          onPress={() => router.push("/(mainPages)/home")}
          className="w-80 py-3 mt-6"
        />
      </View>
      
      <NavbarComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TermsAndConditions;