import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

interface ExperienceItemProps {
  title: string;
  years: string;
  description: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, years, description }) => (
  <View style={{ backgroundColor: '#CEFF72' }} className="rounded-2xl px-4 py-3 mb-3 ">
    <View className="flex-row justify-between items-center mb-1">
      <Text className="font-bold text-base text-[#232B3B]">{title}</Text>
      <Text className="font-semibold text-xs text-[#232B3B]">{years}</Text>
    </View>
    <Text className="text-xs text-[#232B3B] mt-1">{description}</Text>
  </View>
);

export default ExperienceItem;
