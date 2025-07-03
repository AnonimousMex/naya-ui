import * as z from "zod";
import {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  REQUIRED_FIELD,
} from "./common";
import { REGEX_PATTERNS } from "@/utils/regexPatterns";
import { ERROR_TEXTS } from "@/constants/errors/errorTexts";

export const singUpSchema = z.object({
  name: REQUIRED_FIELD.min(4, MIN_LENGTH_MESSAGE(4))
    .max(30, MAX_LENGTH_MESSAGE(20))
    .regex(REGEX_PATTERNS.LETTERS, ERROR_TEXTS.INVALID_LETTERS_FIELD),
  email: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.EMAIL,
    ERROR_TEXTS.INVALID_EMAIL_FIELD,
  ).max(40, MAX_LENGTH_MESSAGE(40)),
  password: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.PASSWORD,
    ERROR_TEXTS.INVALID_PASSWORD_FIELD,
  ),
  confirmPassword: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.PASSWORD,
    ERROR_TEXTS.INVALID_PASSWORD_FIELD,
  ),
});
export const signInSchema = z.object({
  email: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.EMAIL,
    ERROR_TEXTS.INVALID_EMAIL_FIELD,
  ).max(40, MAX_LENGTH_MESSAGE(40)),
  password: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.PASSWORD,
    ERROR_TEXTS.INVALID_PASSWORD_FIELD,
  ),
});

export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(4, ERROR_TEXTS.GENERIC_INVALID_FIELD)
    .regex(/^\d{4}$/, ERROR_TEXTS.GENERIC_INVALID_FIELD),
});

export const requestPasswordResetSchema = z.object({
  email: REQUIRED_FIELD.regex(
    REGEX_PATTERNS.EMAIL,
    ERROR_TEXTS.INVALID_EMAIL_FIELD,
  ).max(40, MAX_LENGTH_MESSAGE(40)),
});
