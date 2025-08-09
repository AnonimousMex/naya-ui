import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";

export const useListAllAppointmentsMutation = (onHandledError?: () => void) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (token: string) =>
      THERAPIST_SERVICE.listAppointments(token),

    onError: (err) => {
      const { code } = formatError(err);

      if (code === ERRORS.E017.code) {
        showSnackbar({
          message: ERRORS.E017.message,
          type: "warning",
        });
        if (onHandledError) onHandledError();
        return;
      }

      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message,
      });
    },
  });
};
