import { singUpSchema } from "@/schemas/authSchema";
import * as z from "zod";


export type TSignUp = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type TSignUpSchema = z.infer<typeof singUpSchema>;