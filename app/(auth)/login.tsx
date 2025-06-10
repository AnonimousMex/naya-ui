import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground';
import { ICONS, IMAGES } from '@/constants/images';
import { useScreenDimensions } from '@/utils/dimensions';
import React from 'react'
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
import { TLoginSchema } from '@/models/Auth';
import { loginSchema } from '@/schemas/authSchema';
import { loginDefaultValues } from '@/constants/defaultValues/auth';
import InputField from '@/components/InputField/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ERROR_TEXTS } from '@/constants/errors/errorTexts';
import { BackButton } from '@/components/BackButton';
import { router } from 'expo-router';

function Login() {
     
    const { sloganWidth, sloganHeight, axolotlLoginHeight, axolotlLoginWidth } =
        useScreenDimensions();

 const formMethods = useForm<TLoginSchema>({
  resolver: zodResolver(loginSchema), 
  mode: "onSubmit",
  defaultValues: loginDefaultValues,  
});


    const { control, handleSubmit, setError } = formMethods;
    const localPassword = "Naya1234*"
    const handleOnSubmit = (data: TLoginSchema) => {

        console.log("handleOnSubmit called with data:", data);
        if (data.password !== localPassword) {
            setError("password", {
                message: ERROR_TEXTS.INVALID_PASSWORDS_MATCH_FIELD,
            });            
            return;
        }        
    }

    const onInvalidForm = (errors: any) => {
        console.log("Form errors:", errors);
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
                                router.push("/(auth)/login");
                            }}
                        >
                            Olvidé mi contraseña
                        </Text>

                        <MainButton
                            mainText="Iniciar Sesión"
                            onPress={() => {
                                console.log("Button pressed");
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
                        source={IMAGES.HAPPY_AXOLOTL_HALF}
                        style={{          
                            width: axolotlLoginWidth,
                            height: axolotlLoginHeight,         
                            resizeMode: "contain",
                        }}
                    />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Login;