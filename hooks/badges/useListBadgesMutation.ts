import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../useSnackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatError } from "@/utils/errorHandler";

import { BADGES_SERVICE } from "@/services/badges";
export const useListBadgesMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async () => {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Token obtenido de AsyncStorage:", token);

      if (!token) {
        console.error("No access token found");
        throw new Error("No access token found");
      }

      try {
        const response = await BADGES_SERVICE.getBadges(token);
        console.log("Respuesta del servicio BADGES_SERVICE.getBadges:", response);
        console.log("Datos (response.data):", response);
        return response; // Devuelve el arreglo de badges directamente
      } catch (error) {
        console.error("Error en la petición getBadges:", error);
        throw error;
      }
    },
    onError: (err) => {
      const { code } = formatError(err);
      console.error("Error en la mutación useListBadgesMutation:", err);
      showSnackbar({ type: "error", message: code });
    },
  });
};

