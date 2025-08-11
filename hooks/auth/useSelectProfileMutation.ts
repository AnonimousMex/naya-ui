import { useMutation } from "@tanstack/react-query";
import { AUTH_SERVICE } from "@/services/auth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { router } from "expo-router";
import { ERRORS } from "@/constants/errors/errorList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export function useSelectProfileMutation() {
  const { showSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: async (animal_id: string) => {
      const token = await AsyncStorage.getItem("accessToken");
      let user_id, user_email;
      if (token) {
        const decoded: any = jwtDecode(token);
        user_id = decoded.user?.user_id;
        user_email = decoded.user?.email;
      }
      
      await AUTH_SERVICE.selectProfile({ user_id, id_animal: animal_id });
      
      if (user_email) {
        const storedPassword = await AsyncStorage.getItem("tempPassword");
        if (storedPassword) {
          const loginResponse = await AUTH_SERVICE.login({
            email: user_email,
            password: storedPassword
          });
          await AsyncStorage.removeItem("tempPassword");
          return loginResponse;
        }
      }
      
      return null;
    },
    onSuccess: async (loginResponse) => {
      if (loginResponse?.access_token) {
        await AsyncStorage.setItem("accessToken", loginResponse.access_token);
        await AsyncStorage.setItem("refreshToken", loginResponse.refresh_token);
      }
      router.push("/(mainPages)/home");
    },
    onError: () => {
      showSnackbar({ message: ERRORS.INTERNAL_SERVER_ERROR.message, type: "error" });
    },
  });
}
