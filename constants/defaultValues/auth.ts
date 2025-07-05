import { TSignUpSchema } from "@/models/Auth"
import { TSignInSchema } from "@/models/Auth";
import { TRequestPasswordResetSchema } from "@/models/Auth";

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

export const requestPasswordResetDefaultValues: TRequestPasswordResetSchema = {
  email: "",
};