import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { ICONS, IMAGES } from "@/constants/images";
import { TRequestPasswordResetSchema } from "@/models/Auth";
import { useScreenDimensions } from "@/utils/dimensions";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { MainButton } from "@/components/MainButton";
import {
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Dimensions,
  Keyboard,
} from "react-native";
import { requestPasswordResetSchema } from "@/schemas/authSchema";
import { requestPasswordResetDefaultValues } from "@/constants/defaultValues/auth";
import InputField from "@/components/InputField/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/BackButton";
import { router } from "expo-router";
import { useSnackbar } from "@/hooks/useSnackbar";

function RequestPasswordReset() {
  const { height } = Dimensions.get('window');
  const isSmallScreen = height < 700;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  const formMethods = useForm<TRequestPasswordResetSchema>({
    resolver: zodResolver(requestPasswordResetSchema),
    mode: "onSubmit",
    defaultValues: requestPasswordResetDefaultValues,
  });

  const { control, handleSubmit } = formMethods;
  const { showSnackbar } = useSnackbar();

  const handleOnSubmit = (data: TRequestPasswordResetSchema) => {
    router.push("/(auth)/verify-change-password-code");
  };
  
  const onInvalidForm = () => {
    showSnackbar({ type: "warning" });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-pink-200"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <CloudBackground />
      <SafeAreaView className="flex-1">
        <View className="px-7 pt-8">
          <View className="items-start">
            <BackButton onPress={() => router.push("/(auth)/welcome")} />
          </View>
        </View>
        
        <View className={`px-7 flex-1 ${Platform.OS === 'android' && isKeyboardVisible ? 'justify-start pt-4' : 'justify-center'}`}>
          <Text className={`${isSmallScreen || (Platform.OS === 'android' && isKeyboardVisible) ? 'text-3xl' : 'text-5xl'} font-bold text-pink-800 text-center ${isSmallScreen || (Platform.OS === 'android' && isKeyboardVisible) ? 'mb-4' : 'mb-10'}`}>
            Cambio de contraseña
          </Text>
          
          <View className={`items-center ${isSmallScreen || (Platform.OS === 'android' && isKeyboardVisible) ? 'mb-3' : 'mb-6'}`}>
            <Image 
              source={IMAGES.CHANGE_PASSWORD_LION} 
              style={{ 
                width: isSmallScreen || (Platform.OS === 'android' && isKeyboardVisible) ? '50%' : '80%', 
                height: isSmallScreen || (Platform.OS === 'android' && isKeyboardVisible) ? 120 : 300 
              }}
              resizeMode="contain"
            />
          </View>
          
          <FormProvider {...formMethods}>
            <InputField
              name="email"
              label="Email"
              placeholder="Ingresa tu correo electronico"
              control={control}
              required
              iconSrc={ICONS.EMAIL_ICON}
            />
            <MainButton
              mainText="Solicitar código"
              onPress={handleSubmit(handleOnSubmit, onInvalidForm)}
              className={`w-80 py-3 ${Platform.OS === 'android' && isKeyboardVisible ? 'mt-4 mb-2' : isSmallScreen ? 'mt-8 mb-4' : 'mt-16 mb-8'}`}
              style={{ height: 50 }}
            />
          </FormProvider>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default RequestPasswordReset;
