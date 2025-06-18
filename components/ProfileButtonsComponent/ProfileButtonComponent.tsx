import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { ICONS } from '@/constants/images';

export interface ProfileOptionButton {
    icon: any;
    text: string;
    onPress?: () => void;
}

interface ProfileButtonsColumnProps {
    options: ProfileOptionButton[];
}

const ProfileButtonComponent: React.FC<ProfileButtonsColumnProps> = ({ options }) => {
    return (
        <View className="w-full space-y-3 mb-5">
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={option.onPress}
                    className="bg-white rounded-full flex-row items-center px-4 py-4 mb-10 shadow-sm mr-2 ml-2"
                >
                    <View className="w-12 h-12 rounded-full bg-[#F5EFEC] items-center justify-center mr-7">
                        <Image
                            source={option.icon}
                            className="w-8 h-8"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-brown-800 text-lg font-UrbanistBold flex-1">
                        {option.text}
                    </Text>

                    <View className="w-10 h-10 rounded-full items-center justify-center mr-4">
                        <Image
                            source={ICONS.BACK_RIGHT_ICON}
                            className="w-8 h-8"
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ProfileButtonComponent;