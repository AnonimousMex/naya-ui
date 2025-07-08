import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";

// Agrega callback opcional para cuando quieras vaciar el arreglo
export const useAppointmentsMutation = (onHandledError?: () => void) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (token: string) => THERAPIST_SERVICE.listAppointments(token),

    onError: (err) => {
      const { code } = formatError(err);

      if (code === ERRORS.E015.code ) {
        showSnackbar({
          message: ERRORS.E015.message,
          type: "warning",
        });
        if (onHandledError) onHandledError(); // Vacía el arreglo desde fuera
        return;
      }

      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
      });
    },
  });
};
