import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../useSnackbar";
import { UseFormSetError } from "react-hook-form";
import { TVerificationCodeSchema } from "@/models/Auth";
import { AUTH_SERVICE } from "@/services/auth";
import { SUCCESS_TEXTS } from "@/constants/successTexts";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useVerifyAccountCodeMutation = (
  setError: UseFormSetError<TVerificationCodeSchema>,
) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: TVerificationCodeSchema) =>
      AUTH_SERVICE.verifyAccountVerificationCode(data),
    onSuccess: async () => {
      showSnackbar({
        message: SUCCESS_TEXTS.VERIFIED_CODE,
        type: "success",
      });

      const tempCredentials = await AsyncStorage.getItem("tempCredentials");
      if (tempCredentials) {
        try {
          const { email, password } = JSON.parse(tempCredentials);
          const loginResponse = await AUTH_SERVICE.login({ email, password });
          
          await AsyncStorage.setItem("accessToken", loginResponse.access_token);
          await AsyncStorage.setItem("refreshToken", loginResponse.refresh_token);

          let animal_id = null;
          try {
            const { jwtDecode } = await import("jwt-decode");
            const decoded: any = jwtDecode(loginResponse.access_token);
            animal_id = decoded.user?.animal_id ?? null;
          } catch (e) {
            showSnackbar({ type: "error", message: ERRORS.INTERNAL_SERVER_ERROR.message });
          }

          if (loginResponse.user_type === "THERAPIST") {
            await AsyncStorage.removeItem("tempCredentials");
            router.replace("/(therapistPages)/therapist-home");
          } else if (!animal_id) {
            await AsyncStorage.setItem("tempPassword", password);
            await AsyncStorage.removeItem("tempCredentials");
            router.replace("/(auth)/profile-choice");
          } else {
            await AsyncStorage.removeItem("tempCredentials");
            router.replace("/(mainPages)/affirmation");
          }
        } catch (error) {
          await AsyncStorage.removeItem("tempCredentials");
          router.navigate("/(auth)/sign-in");
        }
      } else {
        router.navigate("/(auth)/sign-in");
      }
    },
    onError: (err) => {
      const { code } = formatError(err);

      if (code === ERRORS.E007.code || code === ERRORS.E008.code) {
        setError("code", { message: ERRORS.E007.message });
        return showSnackbar({
          message: ERRORS.E007.message,
          type: "error",
        });
      }
      showSnackbar({
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
        type: "error",
      });
    },
  });
};
