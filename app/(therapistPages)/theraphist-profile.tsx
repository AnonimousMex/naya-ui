import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";
import { ICONS } from "@/constants/images";
import { router } from "expo-router";
import { NavbarComponent } from "@/components/NavBar";
import { ProfileButtonComponent } from "@/components/ProfileButtonsComponent";

const TheraphistProfile = () => {
    const userEmail = "fermed@naya.com"
    const profileButtons = [
        {
            icon: ICONS.PERSON_ICON,
            text: "Información personal",
            onPress: () => router.push("/(auth)/welcome"),
        },
        {
            icon: ICONS.LOCK_ICON,
            text: "Seguridad",
            onPress: () => router.push("/(auth)/welcome"),
        },
        {
            icon: ICONS.VERIFIED_ICON,
            text: "Términos y condiciones",
            onPress: () => router.push("/(auth)/welcome"),
        },
    ]

    return (
        <SafeAreaViewContext className="flex-1 bg-[#F8F5F1]">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
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
                        onPress={() => router.push("/(auth)/welcome")}
                        className="bg-red-74 rounded-full px-4 py-6 mb-10 shadow-sm w-full items-center justify-center"
                    >
                        <Text className="text-white text-xl font-UrbanistBold"
                        >
                            Cerrar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <SafeAreaViewContext
                edges={["bottom"]}
                className="bg-slate-100 absolute bottom-0 left-0 right-0 z-50"
            >
                <NavbarComponent />
            </SafeAreaViewContext>
        </SafeAreaViewContext>
    );
};

export default TheraphistProfile;
