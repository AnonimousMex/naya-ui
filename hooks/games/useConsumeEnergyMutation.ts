import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HTTP } from "@/config/axios";

export const useConsumeEnergyMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation<number, unknown, void>({
    mutationFn: async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token found");

      const response = await HTTP.put("/energy/consume", undefined, {
        headers: { Authorization: token },
      });
      return response.data;
    },
    onSuccess: (newEnergy) => {
      showSnackbar({ type: "success", message: "Energía consumida." });
    },
    onError: (err: any) => {
      showSnackbar({ type: "error", message: "Error al consumir energía." });
      throw err;
    },
  });
};
