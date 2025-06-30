import { router } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

type TShortPanel = {
    name: string,
    background: ImageSourcePropType,
    onPressButton: () => void,
}

const ShortPanel =({
    name,
    background,
    onPressButton
}: TShortPanel) => {
  return (
    <TouchableOpacity 
        onPress={onPressButton}
        className='w-[45%]'>
        <View>
            <View className='flex-col rounded-[1rem] h-60 w-full'>
                <Image source={background} className='w-full h-full'/>
            </View>
            <Text className='font-UrbanistExtraBold text-3xl text-center'>
                {name}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ShortPanel