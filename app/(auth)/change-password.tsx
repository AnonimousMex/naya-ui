import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { ICONS, IMAGES } from "@/constants/images";
import { TSignUpSchema } from "@/models/Auth";
import { useScreenDimensions } from "@/utils/dimensions";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { MainButton } from "@/components/MainButton";
import {
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { singUpSchema } from "@/schemas/authSchema";
import { singUpDefaultValues } from "@/constants/defaultValues/auth";
import InputField from "@/components/InputField/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordFields from "@/components/SingUp/PasswordFields";
import { ERROR_TEXTS } from "@/constants/errors/errorTexts";
import { validatePasswordMatch } from "@/utils/auth";
import { BackButton } from "@/components/BackButton";
import { router } from "expo-router";
import { useSnackbar } from "@/hooks/useSnackbar";

function ChangePassword() {
  const { sloganWidth, sloganHeight } = useScreenDimensions();

  const formMethods = useForm<TSignUpSchema>({
    resolver: zodResolver(singUpSchema),
    mode: "onSubmit",
    defaultValues: singUpDefaultValues,
  });

  const { bunnyLoginHeight, bunnyLoginWidth } = useScreenDimensions();
  const { control, handleSubmit, setError } = formMethods;
  const { showSnackbar } = useSnackbar();

  const onInvalidForm = () => {
    showSnackbar({ type: "warning" });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-pink-200"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CloudBackground />
      <SafeAreaView>
        <ScrollView className="mt-8 px-7" showsVerticalScrollIndicator={false}>
          <Text className="text-5xl font-extrabold text-brown-700 text-center mb-8 text-pink-800">
            Nueva contraseña
          </Text>
          <FormProvider {...formMethods}>
            <PasswordFields />
            <Image
              className="mb-0 self-center"
              source={IMAGES.HAPPY_BUNNY_2}
              style={{
                width: bunnyLoginWidth,
                height: bunnyLoginHeight,
                resizeMode: "contain",
              }}
            />
            <MainButton
              mainText="Reestablecer"
              onPress={() => router.push("/(auth)/welcome")}
              className="w-80 py-3 mt-[-25px] mb-20"
              style={{ height: 50 }}
            />
          </FormProvider>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ChangePassword;
