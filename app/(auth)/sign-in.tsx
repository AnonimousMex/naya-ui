import {
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router"; // ★
import React from "react";

import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { useScreenDimensions } from "@/utils/dimensions";
import { IMAGES, ICONS } from "@/constants/images";
import { TSignInSchema } from "@/models/Auth";
import { signInSchema } from "@/schemas/authSchema";
import { signInDefaultValues } from "@/constants/defaultValues/auth";
import InputField from "@/components/InputField/InputField";
import { MainButton } from "@/components/MainButton";
import { BackButton } from "@/components/BackButton";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";

function Login() {
  const { sloganWidth, sloganHeight, axolotlLoginHeight, axolotlLoginWidth } =
    useScreenDimensions();
  const { showSnackbar } = useSnackbar();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isParental = mode === "parental";
  const loginMutation = useLoginMutation({ parental: isParental });

  const formMethods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: signInDefaultValues,
  });
  const { control, handleSubmit } = formMethods;

  const handleOnSubmit = (data: TSignInSchema) => {
    loginMutation.mutate(data);
  };

  const onInvalidForm = () =>
    showSnackbar({
      type: "warning",
      message: "Completa todos los campos marcados",
    });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-pink-200"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CloudBackground />

      <SafeAreaView edges={["bottom"]}>
        <ScrollView className="mt-8 px-7" showsVerticalScrollIndicator={false}>
          <View className="items-start">
            <BackButton onPress={() => router.push("/(auth)/welcome")} />
          </View>

          <Image
            className="mt-4 mb-8 self-center"
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
              label="Email"
              placeholder="Ingresa tu correo electrónico"
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
              onPress={() => router.push("/(auth)/request-password-reset")}
            >
              Olvidé mi contraseña
            </Text>

            <MainButton
              mainText={isParental ? "Acceder" : "Iniciar Sesión"}
              onPress={handleSubmit(handleOnSubmit, onInvalidForm)}
              isLoading={loginMutation.isPending}
              className="w-80 py-3 mt-11 mb-10"
              style={{ height: 50 }}
            />

            {!isParental && (
              <Text className="font-UrbanistBold text-gray-730 text-s text-center">
                ¿No tienes una cuenta todavía?{" "}
                <Text
                  className="text-pink-700 underline text-s"
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  Registrarme
                </Text>
              </Text>
            )}
          </FormProvider>

          <Image
            className="mb-0 self-center"
            source={IMAGES.HAPPY_AXOLOTL_2}
            style={{
              width: axolotlLoginWidth,
              height: axolotlLoginHeight,
              resizeMode: "contain",
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Login;
