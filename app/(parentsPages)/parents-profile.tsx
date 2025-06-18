import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { ICONS } from "@/constants/images";
import { router } from "expo-router";
import { ProfileButtonComponent } from "@/components/ProfileButtonsComponent";

const ParentsProfile = () => {
    const userEmail = "@hugo.lemus"
    const profileButtons = [
        {
            icon: ICONS.PERSON_ICON,
            text: "Información personal",
            onPress: () => router.push("/(auth)/welcome"),
        },
        {
            icon: ICONS.LOCK_ICON,
            text: "Progreso del niño",
            onPress: () => router.push("/(auth)/welcome"),
        },
        {
            icon: ICONS.WEB_ICON,
            text: "Ver especialistas",
            onPress: () => router.push("/(auth)/welcome"),
        },
        {
            icon: ICONS.VERIFIED_ICON,
            text: "Terminos y condiciones",
            onPress: () => router.push("/(auth)/welcome"),
        },
    ]

    return (
        <SafeAreaViewContext className="flex-1 bg-[#F8F5F1]">
            <ScrollView
                showsVerticalScrollIndicator
            >
                <View className="bg-[#2D375B] px-4 pt-5 pb-20 rounded-b-[15] relative">
                    <View className="flex-row items-center justify-between mt-5 mb-5 px-0">
                        <Text className="text-white text-4xl font-UrbanistBold">
                            Mi perfil
                        </Text>
                        <View className="flex-row">
                            <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
                                <View className="rounded-full mr-2">
                                    <Image source={ICONS.NOTIFICATION_ICON} className="w-8 h-8" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
                                <View className="rounded-full">
                                    <Image source={ICONS.GEAR_ICON} className="w-7 h-7" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className="text-white text-sm leading-5 font-UrbanistBold">
                        Dentro de esta sección podrás gestionar toda tu información personal y configurar tu cuenta según tus preferencias.
                    </Text>
                </View>

                <View className="mt-8 items-center">
                    <Text className="text-brown-800 font-UrbanistBold text-xl mb-10">
                        {userEmail}
                    </Text>
                    <ProfileButtonComponent options={profileButtons} />
                    <TouchableOpacity
                        onPress={() => Linking.openURL("https://www.google.com")}
                        className="bg-white rounded-full border-blue-600 border-2 px-4 py-2 mb-5 shadow-sm  items-center justify-center w-4/5 self-center"
                    >
                        <Text className="text-blue-600 text-xl font-UrbanistBold"
                        >
                            Trabajar con Nayá
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/welcome")}
                        className="bg-red-74 rounded-full px-4 py-4 mb-10 shadow-sm  items-center justify-center w-4/5 self-center"
                    >
                        <Text className="text-white text-xl font-UrbanistBold"
                        >
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaViewContext>
    );
};

export default ParentsProfile;
