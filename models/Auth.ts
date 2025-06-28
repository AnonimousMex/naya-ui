import {
  singUpSchema,
  signInSchema,
  verificationCodeSchema,
} from "@/schemas/authSchema";
import * as z from "zod";

export type TSignUp = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TSingIn = {
  email: string;
  password: string;
};

export type TVerificationCode = {
  code: string;
};

export type TSignUpSchema = z.infer<typeof singUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
export type TVerificationCodeSchema = z.infer<typeof verificationCodeSchema>;
