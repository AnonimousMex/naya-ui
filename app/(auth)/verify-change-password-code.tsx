import VerificationCodeComponent from "@/components/VerificationCode/VerificationCodeComponent";
import { router } from "expo-router";
import { View } from "react-native";
import { TVerificationCodeSchema } from "@/models/Auth";
import { verificationCodeSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "@/hooks/useSnackbar";

const VerifyChangePassword = () => {
  const formMethods = useForm<TVerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    mode: "onSubmit",
  });
  const { setError } = formMethods;

  const handleSubmit = (_code: string, resetInputs: () => void) => {
    resetInputs();
  };

  return (
    <View className="flex-1 bg-pink-200">
      <VerificationCodeComponent
        title="Verifica tu código"
        onSubmit={handleSubmit}
        isLoading={false}
        focusedBgColor="bg-pink-300"
        unfocusedBgColor="bg-white"
        focusedTextColor="text-white"
        unfocusedTextColor="text-brown-800"
        borderColor="border-pink-300"
      />
    </View>
  );
};

export default VerifyChangePassword;
