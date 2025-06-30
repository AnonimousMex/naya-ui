import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants/images";

interface SettingsButtonProps {
  onPress?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={ICONS.GEAR_ICON} className="w-6 h-6" />
    </TouchableOpacity>
  );
};

export default SettingsButton;
