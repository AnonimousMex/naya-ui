import { TSignUpSchema } from "@/models/Auth"
import { TLoginSchema } from "@/models/Auth";

export const singUpDefaultValues: TSignUpSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}
export const loginDefaultValues: TLoginSchema = {
  email: "",
  password: "",
};