import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";
import { ERRORS } from "@/constants/errors/errorList";
import { formatError } from "@/utils/errorHandler";
import { TRescheduleAppointment } from "@/models/Common";

export const useRescheduleAppointmentMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ token, ...body }: { token: string } & TRescheduleAppointment) =>
      THERAPIST_SERVICE.rescheduleAppointment(token, body),

    onSuccess: () => {
      showSnackbar({
        type: "success",
        message: "Cita reagendada correctamente.",
      });
    },

    onError: (err: any) => {
      const { code } = formatError(err);
      if (code === ERRORS.E018.code) {
        showSnackbar({
           type: "error", 
           message: ERRORS.E018.message });
      } else {
        showSnackbar({ 
          type: "error", 
          message: "Error al reagendar la cita." });
      }
    },
  });
};

