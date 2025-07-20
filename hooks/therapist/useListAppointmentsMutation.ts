import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";
import { formatError } from "@/utils/errorHandler";
import { ERRORS } from "@/constants/errors/errorList";
import { TListAppointmentsRequest } from "@/models/Common";


export const useAppointmentsMutation = (onHandledError?: () => void) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ token, patient_id }: TListAppointmentsRequest) =>
    THERAPIST_SERVICE.listAppointments(token, patient_id),

    onError: (err) => {
      const { code } = formatError(err);

      if (code === ERRORS.E017.code ) {
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
