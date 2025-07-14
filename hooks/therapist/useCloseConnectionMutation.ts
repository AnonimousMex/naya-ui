import { TCloseConnection } from '@/models/therapist'
import { THERAPIST_SERVICE } from '@/services/therapist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from '../useSnackbar'
import { SUCCESS_TEXTS } from '@/constants/successTexts'
import { formatError } from '@/utils/errorHandler'
import { ERRORS } from '@/constants/errors/errorList'
import { router } from 'expo-router'

export const useCloseConnectionMutation = () => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (data: TCloseConnection) => {
        const token = await AsyncStorage.getItem("accessToken")
        if (!token) throw new Error("No access token found1")
        return await THERAPIST_SERVICE.closeConnection(token, data);
    },

    onSuccess: () => {
      showSnackbar({
        type: "success",
        message: SUCCESS_TEXTS.CLOSE_CONNECTION
      })
      router.push("/(therapistPages)/therapist-home")
    },
    onError: (err) => {
      const { code } = formatError(err)

      if(code === ERRORS.E014.code){
        return showSnackbar({
          type: "error",
          message: ERRORS.E014.message
        })
      }
      showSnackbar({
        type: "error",
        message: ERRORS.INTERNAL_SERVER_ERROR.message
      })
    }


  })
}
