import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ContactInfoButtonProps {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const ContactInfoButton: React.FC<ContactInfoButtonProps> = ({ label, onPress, style }) => (
  <TouchableOpacity
    className="items-center rounded-3xl bg-blue-80 px-6 py-3.5 mx-2 my-1"
    style={[{ paddingHorizontal: 16, paddingVertical: 8, minWidth: 140 }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text className="text-center text-xl font-bold text-white tracking-[1px]">{label}</Text>
  </TouchableOpacity>
);

export default ContactInfoButton;
