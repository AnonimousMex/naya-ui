import { useSnackbar } from '../useSnackbar'
import { useMutation } from '@tanstack/react-query';
import { TSignUp, TSignUpSchema } from '@/models/Auth';
import { AUTH_SERVICE } from '@/services/auth';
import { SUCCESS_TEXTS } from '@/constants/successTexts';
import { router } from 'expo-router';
import { formatError } from '@/utils/errorHandler';
import { ERRORS } from '@/constants/errors/errorList';
import { UseFormSetError } from 'react-hook-form';

export const useSingUpMutation = (
  setError: UseFormSetError<TSignUpSchema>
) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn:(data: TSignUp) =>
        AUTH_SERVICE.singUp(data),
    
    onSuccess: () => {
      showSnackbar({
        message: SUCCESS_TEXTS.SING_UP,
        type: "success"
      });
      router.navigate("/(auth)/activate-account")
    },

    onError: (err) => {
      const { code } = formatError(err);

      if (code === ERRORS.E003.code){
        setError("email", { message: ERRORS.E003.message});
        return showSnackbar({
          type: "error",
          message: ERRORS.E003.message,
        });
      }
      if(code === ERRORS.E006.code){
        setError("password", {message: ERRORS.E006.message});
        setError("confirmPassword", {message: ERRORS.E006.message});
        return showSnackbar({
          type: "error",
          message: ERRORS.E006.message
        });
      }
      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message
      })
    }
  });
};
