import { GAME_SERVICE } from '@/services/game'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from '../useSnackbar'
import { ERRORS } from '@/constants/errors/errorList'

export const useGameListMutation = () => {
  const { showSnackbar } =useSnackbar();
  return useMutation({
    mutationFn:() => 
        GAME_SERVICE.listGames(),

    onError: (err) => {
        showSnackbar({
            type: "error",
            message: ERRORS.INTERNAL_SERVER_ERROR.message
        })
    }
  })
}
