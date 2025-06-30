import { router } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

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
        const { width, height } = Dimensions.get("window");
        const size = width * 0.06
        const fontSize = name.length >= 10 ? size + 3 : size + 5

  return (
    <TouchableOpacity
        onPress={onPressButton}
        className='w-[45%]'>
        <View>
            <View className='flex-col rounded-[1rem] h-60 w-full'>
                <Image source={background} className='w-full h-full'/>
            </View>
            <Text className='font-UrbanistExtraBold text-center'
                style={{ fontSize: fontSize}}
            >
                {name}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ShortPanel