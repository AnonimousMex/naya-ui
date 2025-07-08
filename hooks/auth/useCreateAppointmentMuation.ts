import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE, TCreateAppointmentRequest } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";

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

    onError: () => {
      showSnackbar({
        type: "error",
        message: "Hubo un error al agendar la cita.",
      });
    },
  });
};
