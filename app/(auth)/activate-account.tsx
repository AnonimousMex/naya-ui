import VerificationCodeComponent from "@/components/VerificationCode/VerificationCodeComponent";
import { router } from "expo-router";

import { View } from "react-native";

const ActivateAccount = () => {
  return (
    <View className="flex-1 justify-center items-center bg-pink-200">
      <VerificationCodeComponent
        title="Conéctate a tu psicólogo"
        onSubmit={() => { router.push("/(mainPages)/home")}}
        isLoading={false}
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
