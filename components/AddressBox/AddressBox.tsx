import React from 'react';
import { View, Text } from 'react-native';

interface AddressBoxProps {
  address: string;
}

const AddressBox: React.FC<AddressBoxProps> = ({ address }) => (
  <View className="bg-pink-300 rounded-2xl py-4 px-[18px] items-center mt-6">
    <Text className="text-pink-90 font-bold text-base text-center">{address}</Text>
  </View>
);

export default AddressBox;
