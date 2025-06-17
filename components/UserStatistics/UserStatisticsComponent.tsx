import React from 'react';
import { View, Text, Image } from 'react-native';
import { IMAGES } from '@/constants/images';

interface UserStatsRowProps {
  badges: number;
  streak: number;
  exp: number;
}

const UserStatsRow: React.FC<UserStatsRowProps> = ({ badges, streak, exp }) => {
  const stats = [
    {
      image: IMAGES.MEDAL_ICON,
      value: badges,
      label: 'Insignias',
    },
    {
      image: IMAGES.STREAK_ICON,
      value: `${streak} Días`,
      label: 'Racha',
    },
    {
      image: IMAGES.EXP_ICON,
      value: exp,
      label: 'EXP totales',
    },
  ];

  return (
    <View className="flex-row justify-around w-full px-3">
      {stats.map((stat, index) => (
        <View key={index} className="flex-1 items-center px-2">
          <Image source={stat.image} className="w-12 h-12 mb-1" resizeMode="contain" />
          <Text className="text-lg font-bold text-gray-900">{stat.value}</Text>
          <Text className="text-sm text-gray-500">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserStatsRow;
