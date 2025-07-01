import VerificationCodeComponent from "@/components/VerificationCode/VerificationCodeComponent";
import { router } from "expo-router";
import { View } from "react-native";
import { useVerifyAccountCodeMutation } from "@/hooks/auth/useVerifyAccountMutation";
import { TVerificationCodeSchema } from "@/models/Auth";
import { verificationCodeSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ActivateAccount = () => {
  const formMethods = useForm<TVerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    mode: "onSubmit",
  });
  const { setError } = formMethods;
  const authVerifyCodeMutation = useVerifyAccountCodeMutation(setError);

  const handleSubmit = (code: string, resetInputs: () => void) => {
    authVerifyCodeMutation.mutate(
      { code },
      {
        onSuccess: () => resetInputs(),
      },
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <VerificationCodeComponent
        title="Ingresa el código de verificación"
        onSubmit={handleSubmit}
        isLoading={authVerifyCodeMutation.isPending}
        focusedBgColor="bg-pink-300"
        unfocusedBgColor="bg-white"
        focusedTextColor="text-white"
        unfocusedTextColor="text-brown-800"
        borderColor="border-pink-30"
      />
    </View>
  );
};

export default ActivateAccount;
