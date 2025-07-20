import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";
import { ERRORS } from "@/constants/errors/errorList";
import { formatError } from "@/utils/errorHandler";
import { TCreateAppointmentRequest } from "@/models/Common";

export const useCreateAppointmentMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: TCreateAppointmentRequest) =>
      THERAPIST_SERVICE.createAppointment(data),

    onSuccess: () => {
      showSnackbar({
        type: "success",
        message: "Cita agendada correctamente.",
      });
    },

    onError: (err: any) => {
          const { code } = formatError(err);
    
          if (code === ERRORS.E018.code) {
            showSnackbar({ type: "error", message: ERRORS.E018.message });
            throw err;
          }
  
        },
  });
};
