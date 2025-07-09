import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { TSignInSchema } from "@/models/Auth";
import { AUTH_SERVICE } from "@/services/auth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";
import { SUCCESS_TEXTS } from "@/constants/successTexts";
import { TLoginTokens } from "@/models/Common";

type LoginOpts = {
  parental?: boolean;
};

export const useLoginMutation = (opts: LoginOpts = {}) => {
  const { parental = false } = opts;
  const { showSnackbar } = useSnackbar();

  return useMutation<TLoginTokens, unknown, TSignInSchema>({
    mutationFn: AUTH_SERVICE.login,

    onSuccess: async ({ access_token, refresh_token, user_type }) => {
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      let animal_id = null;
      try {
        const { jwtDecode } = await import("jwt-decode");
        const decoded: any = jwtDecode(access_token);
        animal_id = decoded.user?.animal_id ?? null;
      } catch (e) {
        showSnackbar({ type: "error", message: ERRORS.INTERNAL_SERVER_ERROR.message });
      }

      if (parental) {
        router.replace("/(parentsPages)/parents-profile");
      } else if (user_type === "THERAPIST") {
        router.replace("/(therapistPages)/therapist-home");
      } else if (!animal_id) {
        router.replace("/(auth)/profile-choice");
      } else {
        router.replace("/(mainPages)/home");
      }

      showSnackbar({ type: "success", message: SUCCESS_TEXTS.LOGIN_SUCCESS });
    },

    onError: (err: any) => {
      const { code } = formatError(err);

      if (code === ERRORS.E011.code) {
        showSnackbar({ type: "error", message: ERRORS.E011.message });
        router.replace("/(auth)/activate-account");
        throw err;
      }

      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
      });
      throw err;
    },
  });
};
