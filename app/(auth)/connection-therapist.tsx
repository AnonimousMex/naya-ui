import VerificationCodeComponent from "@/components/VerificationCode/VerificationCodeComponent";
import { router } from "expo-router";
import { View } from "react-native";
import { useConnectionCodeMutation } from "@/hooks/auth/useConnectionCodeMutation";
import { TVerificationCodeSchema } from "@/models/Auth";
import { verificationCodeSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConnectTherapist = () => {
  const formMethods = useForm<TVerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    mode: "onSubmit",
  });
  const { setError } = formMethods;
  const authConnectionCodeMutation = useConnectionCodeMutation(setError);

  const handleSubmit = async (code: string, resetInputs: () => void) => {
  const token = await AsyncStorage.getItem("accessToken");
  authConnectionCodeMutation.mutate(
    { token: token!, code },
    {
      onSuccess: () => resetInputs(),
    },
  );
};

  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <VerificationCodeComponent
        title="Conéctate a tu psicólogo"
        onSubmit={handleSubmit}
        isLoading={authConnectionCodeMutation.isPending}
        focusedBgColor="bg-pink-300"
        unfocusedBgColor="bg-white"
        focusedTextColor="text-white"
        unfocusedTextColor="text-brown-800"
        borderColor="border-pink-30"
      />
    </View>
  );
};

export default ConnectTherapist;
