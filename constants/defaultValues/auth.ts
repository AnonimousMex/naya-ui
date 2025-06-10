import { TSignUpSchema } from "@/models/Auth"

export const singUpDefaultValues: TSignUpSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}