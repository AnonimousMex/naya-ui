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
      let user_id;
      if (token) {
        const decoded: any = jwtDecode(token);
        user_id = decoded.user?.user_id;
      }
      return AUTH_SERVICE.selectProfile({ user_id, id_animal: animal_id });
    },
    onSuccess: () => {
      router.push("/(mainPages)/home");
    },
    onError: () => {
      showSnackbar({ message: ERRORS.INTERNAL_SERVER_ERROR.message, type: "error" });
    },
  });
}
