import {
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
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
import { LOCAL_USERS } from "@/constants/localData";


function Login() {
  const { sloganWidth, sloganHeight, axolotlLoginHeight, axolotlLoginWidth } =
    useScreenDimensions();
  const { showSnackbar } = useSnackbar();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isParental = mode === "parental";

  const formMethods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: signInDefaultValues,
  });
  const { control, handleSubmit } = formMethods;

  const handleOnSubmit = (data: TSignInSchema) => {
    const user = LOCAL_USERS.find(
      (u) => u.email === data.email && u.password === data.password && u.active
    );
    if (!user) {
      showSnackbar({
        type: "error",
        message: "Credenciales incorrectas o usuario inactivo",
      });
      return;
    }
    // Guardar usuario en localStorage (AsyncStorage)
    import("@react-native-async-storage/async-storage").then((AsyncStorage) => {
      AsyncStorage.default.setItem("userId", user.id);
      AsyncStorage.default.setItem("userType", user.user_type);
      if (user.animal_id) {
        AsyncStorage.default.setItem("animalId", user.animal_id);
      }
    });
    // Redirigir según tipo de usuario
    if (isParental) {
      router.replace("/(parentsPages)/parents-profile");
    } else if (user.user_type === "THERAPIST") {
      router.replace("/(therapistPages)/therapist-home");
    } else {
      router.replace("/(mainPages)/affirmation");
    }
    showSnackbar({ type: "success", message: "Inicio de sesión exitoso" });
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              formMethods.setValue("email", "fernanda@gmail.com");
              formMethods.setValue("password", "Hola123*");
            }}
            accessibilityLabel="Botón secreto ajolote"
          >
            <Image
              className="mt-4 mb-8 self-center"
              source={IMAGES.NAYA_SLOGAN}
              style={{
                width: sloganWidth,
                height: sloganHeight,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>

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
              isLoading={false}
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              formMethods.setValue("email", "daniel@gmail.com");
              formMethods.setValue("password", "Hola123*");
            }}
            accessibilityLabel="Botón secreto ajolote"
          >
            <Image
              className="mb-0 self-center"
              source={IMAGES.HAPPY_AXOLOTL_2}
              style={{
                width: axolotlLoginWidth,
                height: axolotlLoginHeight,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Login;
