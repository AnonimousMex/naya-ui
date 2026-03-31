import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

interface SpecialtyItemProps {
  name: string;
  description?: string;
}

const SpecialtyItem: React.FC<SpecialtyItemProps> = ({ name, description }) => (
  <View style={{ backgroundColor: '#72CAFF' }} className="rounded-2xl px-4 py-3 mb-3 ">
    <Text className="font-bold text-base text-[#232B3B] text-center">{name}</Text>
    {description && description.trim() !== '' && (
      <Text className="text-xs text-[#232B3B] mt-1 text-center">{description}</Text>
    )}
  </View>
);

export default SpecialtyItem;
