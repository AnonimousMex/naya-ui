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

      if (!token) {
        throw new Error("No access token found");
      }

      try {
        const response = await BADGES_SERVICE.getBadges(token);
        return response; 
      } catch (error) {
        throw error;
      }
    },
    onError: (err) => {
      const { code } = formatError(err);
      showSnackbar({ type: "error", message: code });
    },
  });
};

