import React, { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { ICONS } from "@/constants/images";
import { Text, View } from "react-native";
import { useFormContext } from "react-hook-form";
import { TSignUpSchema } from "@/models/Auth";
import { REGEX_PATTERNS } from "@/utils/regexPatterns";

type ValidationOptions = {
  length: boolean;
  specialChar: boolean;
  upperAndLower: boolean;
  number: boolean;
};

type ValidOptionsState = {
  password: ValidationOptions;
  confirmPassword: ValidationOptions;
};

const PasswordFields = () => {
  const {
    control,
    watch,
    formState: { dirtyFields },
  } = useFormContext<TSignUpSchema>();

  const passwordWatcher = watch("password") || "";
  const confirmPasswordWatcher = watch("confirmPassword") || "";

  const [validOptions, setValidOptions] = useState<ValidOptionsState>({
    password: {
      length: false,
      specialChar: false,
      upperAndLower: false,
      number: false,
    },
    confirmPassword: {
      length: false,
      specialChar: false,
      upperAndLower: false,
      number: false,
    },
  });

  const validatePassword = (password: string): ValidationOptions => ({
    length: password.length >= 8 && password.length <= 20,
    specialChar: REGEX_PATTERNS.HAS_SPECIAL_CHAR.test(password),
    upperAndLower: REGEX_PATTERNS.HAS_UPPERCASE_AND_LOWERCASE.test(password),
    number: REGEX_PATTERNS.HAS_NUMBER.test(password),
  });

  useEffect(() => {
    setValidOptions((prevOptions) => ({
      ...prevOptions,
      password: validatePassword(passwordWatcher),
      confirmPassword: validatePassword(confirmPasswordWatcher),
    }));
  }, [passwordWatcher, confirmPasswordWatcher]);

  const getValidationTextColor = (
    field: keyof ValidOptionsState,
    option: keyof ValidationOptions,
  ): string =>
    !dirtyFields[field]
      ? "text-gray-600"
      : validOptions[field][option]
        ? "text-green-500"
        : "text-orange-500";

  return (
    <>
      <InputField
        name="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        control={control}
        iconSrc={ICONS.LOCK_ICON}
        required
        isPassword
      />
      <View className="ml-2">
        <Text
          className={`mt-1 text-s ${getValidationTextColor("password", "length")}`}
        >
          - 8 a 20 caracteres
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("password", "specialChar")}`}
        >
          - Un carácter especial @$!%*?&
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("password", "upperAndLower")}`}
        >
          - Una mayúscula y una minúscula
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("password", "number")}`}
        >
          - Un número
        </Text>
      </View>

      <InputField
        name="confirmPassword"
        label="Confirmar contraseña"
        placeholder="Confirma tu contraseña"
        control={control}
        iconSrc={ICONS.LOCK_ICON}
        required
        isPassword
      />
      <View className="ml-2">
        <Text
          className={`mt-1 text-s ${getValidationTextColor("confirmPassword", "length")}`}
        >
          - 8 a 20 caracteres
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("confirmPassword", "specialChar")}`}
        >
          - Un carácter especial @$!%*?&
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("confirmPassword", "upperAndLower")}`}
        >
          - Una mayúscula y una minúscula
        </Text>
        <Text
          className={`mt-1 text-s ${getValidationTextColor("confirmPassword", "number")}`}
        >
          - Un número
        </Text>
      </View>
    </>
  );
};

export default PasswordFields;
