import React from "react";
import { useSnackbar } from "../useSnackbar";
import { useMutation } from "@tanstack/react-query";
import { TConnectionCode, TSignUp, TSignUpSchema } from "@/models/Auth";
import { AUTH_SERVICE } from "@/services/auth";
import { SUCCESS_TEXTS } from "@/constants/successTexts";
import { router } from "expo-router";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";
import { UseFormSetError } from "react-hook-form";

export const useConnectionCodeMutation = (
  setError: UseFormSetError<TConnectionCode>,
) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: TConnectionCode) =>
      AUTH_SERVICE.connectionPatientWithTherapist(data),
    onSuccess: () => {
      showSnackbar({
        message: SUCCESS_TEXTS.CODE_CONNECTION_VERIFIED,
        type: "success",
      });
      router.navigate("/(mainPages)/home");
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
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
      });

      if (code === ERRORS.E015.code) {
        setError("code", { message: ERRORS.E015.message });
        return showSnackbar({
          message: ERRORS.E015.message,
          type: "error",
        });
      }
      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
      });
    },
  });
};
