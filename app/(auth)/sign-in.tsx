import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground';
import { ICONS, IMAGES } from '@/constants/images';
import { useScreenDimensions } from '@/utils/dimensions';
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form';
import { MainButton } from "@/components/MainButton";
import {
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    Text
} from 'react-native'
import { TSignInSchema } from '@/models/Auth';
import { signInSchema } from '@/schemas/authSchema';
import { signInDefaultValues } from '@/constants/defaultValues/auth';
import InputField from '@/components/InputField/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ERROR_TEXTS } from '@/constants/errors/errorTexts';
import { BackButton } from '@/components/BackButton';
import { router } from 'expo-router';
import Snackbar from "@/components/Snackbar/Snackbar";
import React, { useState } from "react";

function Login() {

    const { sloganWidth, sloganHeight, axolotlLoginHeight, axolotlLoginWidth } =
        useScreenDimensions();

    const formMethods = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onSubmit",
        defaultValues: signInDefaultValues,
    });


    const { control, handleSubmit, setError } = formMethods;
    const localPassword = "Naya1234*"
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "warning" | "error">("success");

    const handleOnSubmit = (data: TSignInSchema) => {

        if (data.password !== localPassword) {
            setError("password", {
                message: ERROR_TEXTS.INVALID_PASSWORDS_MATCH_FIELD,
            });
            return;
        }
        router.push("/(auth)/activate-account")

    }


    const onInvalidForm = () => {
        setSnackbarMessage("Revisa los campos marcados");
        setSnackbarType("warning");
        setVisible(true);
    }


    return (
        <KeyboardAvoidingView
            className="flex-1 bg-pink-200"
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <CloudBackground />
            <SafeAreaView>
                <ScrollView className="mt-8 px-7" showsVerticalScrollIndicator={false}>
                    <View className="items-start">
                        <BackButton onPress={() => router.push("/(auth)/welcome")} />
                    </View>
                    <Image
                        className='mt-4 mb-8 self-center'
                        source={IMAGES.NAYA_SLOGAN}
                        style={{
                            width: sloganWidth,
                            height: sloganHeight,
                            resizeMode: "contain",
                        }}
                    />
                    <FormProvider {...formMethods}>

                        <InputField
                            name="email"
                            label='Email'
                            placeholder='Ingresa tu correo electronico'
                            control={control}
                            required
                            iconSrc={ICONS.EMAIL_ICON}
                        />
                        <InputField
                            name="password"
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            control={control}
                            iconSrc={ICONS.LOCK_ICON}
                            required
                            isPassword
                        />
                        <Text
                            className="font-UrbanistBold text-pink-700 underline text-s text-right p-2"
                            onPress={() => {
                                router.push("/(auth)/sign-in");
                            }}
                        >
                            Olvidé mi contraseña
                        </Text>

                        <MainButton
                            mainText="Iniciar Sesión"
                            onPress={() => {
                                handleSubmit(handleOnSubmit, onInvalidForm)();
                            }}
                            className="w-80 py-3 mt-11 mb-10"
                            style={{ height: 50 }}
                        />
                        <Text
                            className="font-UrbanistBold text-gray-730 text-s text-center"
                        >
                            ¿No tienes una cuenta todavia? {""}
                            <Text
                                className="text-pink-700 underline text-s"
                                onPress={() => router.push("/(auth)/sing-up")}
                            >
                                Registrarme
                            </Text>
                        </Text>

                    </FormProvider>
                    <Image
                        className='mb-0 self-center'
                        source={IMAGES.HAPPY_AXOLOTL_2}
                        style={{
                            width: axolotlLoginWidth,
                            height: axolotlLoginHeight,
                            resizeMode: "contain",
                        }}
                    />
                </ScrollView>
            </SafeAreaView>
            <Snackbar
                message={snackbarMessage}
                visible={visible}
                type={snackbarType}
                onDismiss={() => setVisible(false)}
                duration={3000}
            />
        </KeyboardAvoidingView>
    )
}

export default Login;