import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../useSnackbar";
import { UseFormSetError } from "react-hook-form";
import { TVerificationCodeSchema } from "@/models/Auth";
import { AUTH_SERVICE } from "@/services/auth";
import { SUCCESS_TEXTS } from "@/constants/successTexts";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";
import { router } from "expo-router";

export const useVerifyAccountCodeMutation = (
  setError: UseFormSetError<TVerificationCodeSchema>,
) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: TVerificationCodeSchema) =>
      AUTH_SERVICE.verifyAccountVerificationCode(data),
    onSuccess: () => {
      showSnackbar({
        message: SUCCESS_TEXTS.VERIFIED_CODE,
        type: "success",
      });
      router.navigate("/(auth)/profile-choice");
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
