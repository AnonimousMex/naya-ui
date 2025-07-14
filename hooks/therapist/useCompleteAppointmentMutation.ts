import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";

export const useCompleteAppointmentMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (appointment_id: string ) =>
      THERAPIST_SERVICE.completeAppointment(appointment_id),

    onSuccess: () => {
      showSnackbar({ type: "success", message: "Cita completada correctamente." });
    },

    onError: () => {
      showSnackbar({ type: "error", message: "Error al completar la cita." });
    },
  });
};
