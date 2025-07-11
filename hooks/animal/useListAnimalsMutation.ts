import { useMutation } from "@tanstack/react-query";
import { ANIMAL_SERVICE } from "@/services/animal";
import { emptyListAnimalsResponse } from "@/models/Common";
import { useSnackbar } from "@/hooks/useSnackbar";
import { ERRORS } from "@/constants/errors/errorList";

export const useListAnimalsMutation = () => {
  const { showSnackbar } = useSnackbar();
  const errorMessage = ERRORS.E012.message;

  return useMutation({
    mutationFn: async () => {
      try {
        const data = await ANIMAL_SERVICE.listAnimals();
        return data;
      } catch (error) {
        showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message
        });
        return emptyListAnimalsResponse.data;
      }
    },
  });
};
