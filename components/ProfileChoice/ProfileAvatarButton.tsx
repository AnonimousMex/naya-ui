import React from "react";
import { Pressable, View, Image, Text, Dimensions } from "react-native";
import { ProfileAvatar } from "@/constants/profileAvatars";

interface ProfileAvatarButtonProps {
  avatar: ProfileAvatar;
  selected: boolean;
  onPress: (avatar: ProfileAvatar) => void;
}

const ProfileAvatarButton: React.FC<ProfileAvatarButtonProps> = ({ avatar, selected, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const avatarSize = screenWidth * 0.215;

  return (
    <Pressable
      onPress={() => onPress(avatar)}
      className="items-center w-[30%] mb-6"
    >
      <View
        style={[
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
          selected && {
            borderColor: avatar.color,
            borderWidth: 3,
          },
        ]}
        className="w-24 h-24 rounded-full bg-pink-200 border-2 border-gray-200 p-1.5"
      >
        <Image
          source={avatar.image}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
      <Text
        className="mt-2 text-sm text-gray-700 text-center font-UrbanistBold"
        style={[
          selected && {
            color: avatar.color,
          },
        ]}
      >
        {avatar.name}
      </Text>
    </Pressable>
  );
};

export default ProfileAvatarButton;
