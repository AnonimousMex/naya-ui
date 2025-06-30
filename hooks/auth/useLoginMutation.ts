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

export const useLoginMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation<TLoginTokens, unknown, TSignInSchema>({
    mutationFn: AUTH_SERVICE.login,

    onSuccess: async ({ access_token, refresh_token }) => {
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      showSnackbar({ type: "success", message: SUCCESS_TEXTS.LOGIN_SUCCESS });
      router.replace("/(mainPages)/home");
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
