import { useMutation } from "@tanstack/react-query"
import { useSnackbar } from "../useSnackbar"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THERAPIST_SERVICE } from "@/services/therapist";
import { formatError } from "@/utils/errorHandler";
import { emptyListPatientsResponse } from "@/models/Common";

export const useListPatientsMutation = () => {
  const { showSnackbar } = useSnackbar();
  
  return useMutation({
    mutationFn: async () =>{
        const token = await AsyncStorage.getItem("accessToken")
        if (!token) throw new Error("No access token found");
        
        try {
            return await THERAPIST_SERVICE.listPatients(token);
        } catch (error) {
           return emptyListPatientsResponse
        }
    },
    onError: (err) => {
      const { code } = formatError(err)
      showSnackbar({
        type: "error",
        message: code
      })
    }
  })    
}
