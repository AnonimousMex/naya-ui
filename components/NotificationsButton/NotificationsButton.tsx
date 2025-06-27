import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants/images";

interface NotificationsButtonProps {
  onPress?: () => void;
}

const NotificationsButton: React.FC<NotificationsButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={ICONS.NOTIFICATION_ICON} className="w-6 h-6" />
    </TouchableOpacity>
  );
};

export default NotificationsButton;
