import React from "react";
import { View, Text, Image } from "react-native";
import { ICONS } from "@/constants/images";
import { SnackbarStatus } from "@/models/Snackbar";

type TAlertBox = {
  menssage: string;
  type: SnackbarStatus;
};

const ALERT_STYLES = {
  warning: {
    backgroundColor: "bg-[#FFEEE2]",
    border: "border-[#ED7E1C]",
    image: ICONS.WARNING_ICON,
  },
  error: {
    backgroundColor: "bg-[#FFE2E2]",
    border: "border-[#ED1C1C]",
    image: ICONS.ERROR_ICON,
  },
  success: {
    backgroundColor: "bg-[#E4FFEB]",
    border: "border-[#1CED3C]",
    image: ICONS.SUCCESS_ICON,
  },
};

export default function Alertbox({ menssage, type }: TAlertBox) {
  const { backgroundColor, border, image } = ALERT_STYLES[type];

  return (
    <View className="items-center justify-center w-full">
      <View
        className={`flex-row border ${border} p-3 py-4 items-center justify-start rounded-full ${backgroundColor} w-full`}
      >
        <Image source={image} className="w-6 h-6" />
        <Text className="ml-2 max-w-[306px] flex-shrink-0 font-Urbanist text-sm px-2">
          {menssage}
        </Text>
      </View>
    </View>
  );
}
