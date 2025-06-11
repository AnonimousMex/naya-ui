import { TSignUpSchema } from "@/models/Auth"
import { TSignInSchema } from "@/models/Auth";

export const singUpDefaultValues: TSignUpSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}
export const signInDefaultValues: TSignInSchema = {
  email: "",
  password: "",
};