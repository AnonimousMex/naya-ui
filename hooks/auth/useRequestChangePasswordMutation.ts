import { TRequestPasswordResetSchema } from "@/models/Auth"
import { useMutation } from "@tanstack/react-query"
import { UseFormSetError } from "react-hook-form"
import { useSnackbar } from "../useSnackbar"
import { AUTH_SERVICE } from "@/services/auth"
import { SUCCESS_TEXTS } from "@/constants/successTexts"
import { router } from "expo-router"
import { formatError } from "@/utils/errorHandler"
import { ERRORS } from "@/constants/errors/errorList"


export const useRequestChangePasswordMutation = (
    setError: UseFormSetError<TRequestPasswordResetSchema>
) => {
    const { showSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: (data: TRequestPasswordResetSchema) => 
            AUTH_SERVICE.requesChangePassword(data),
        
        onSuccess: () => {
            showSnackbar({
                message: SUCCESS_TEXTS.CODE_SENT,
                type:"success"
            })
            router.navigate("/home")
        },

        onError: (err) => {
            const { code } = formatError(err);

            if (code === ERRORS.E010.code){
                setError("email", {message: ERRORS.E010.message});
                return showSnackbar({
                    type: "error",
                    message: ERRORS.E010.message
                })
            }
            return showSnackbar({
                message: ERRORS.INTERNAL_SERVER_ERROR.message,
                type: "error"
            })
        }
    })
}
