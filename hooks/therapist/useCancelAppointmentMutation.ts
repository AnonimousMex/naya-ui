import { useMutation } from "@tanstack/react-query";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { useSnackbar } from "@/hooks/useSnackbar";

export const useCancelAppointmentMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (appointment_id: string ) =>
      THERAPIST_SERVICE.cancelAppointment(appointment_id),

    onSuccess: () => {
      showSnackbar({ type: "success", message: "Cita cancelada correctamente." });
    },

    onError: () => {
      showSnackbar({ type: "error", message: "Error al cancelar la cita." });
    },
  });
};
