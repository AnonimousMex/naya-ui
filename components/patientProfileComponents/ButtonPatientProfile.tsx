import { ICONS } from '@/constants/images'
import { router } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'
import { nativeEnum } from 'zod'

type TButtonPatientProfile = {
    bg: string,
    name: string,
    icon: ImageSourcePropType,
    onPress: () => void,
}

const ButtonPatientProfile =({bg, name, icon, onPress}: TButtonPatientProfile) => {

    const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity onPress={onPress}>
      <View className={`${bg} px-8 py-4 rounded-full flex-row justify-center items-center max-w-[50%]`}>
          <Text 
              className='text-white font-UrbanistExtraBold text-2xl'
              adjustsFontSizeToFit={true}  
              numberOfLines={1}    
              minimumFontScale={0.9}
          >
              {name}
          </Text>
          <Image 
              source={icon} 
              style={{
                    marginLeft: 6,
                    width: width < 390 ? 22 : 24,
                    height: width < 390 ? 22 : 24,
                  }}
          />
      </View>
    </TouchableOpacity>
  )
}

export default ButtonPatientProfile