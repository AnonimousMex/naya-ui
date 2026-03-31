import { IMAGES } from '@/constants/images'
import { router } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, PixelRatio, Text, TouchableOpacity, View } from 'react-native'

type TShortPanel = {
    name: string,
    background: string,
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
    const getImage = (image: string) => {
            const imageKey = image.replace('IMAGES.', '');
            return IMAGES[imageKey as keyof typeof IMAGES]
        };
    const sourceImage = getImage(background)


  return (
    <TouchableOpacity
        onPress={onPressButton}
        className='w-[45%]'>
        <View>
            <View className='flex-col rounded-[1rem] h-60 w-full'>
                <Image source={sourceImage} className='w-full h-full rounded-[1rem]'/>
            </View>
            <Text 
                className='font-UrbanistExtraBold text-center'
                style={{ fontSize: fontSize}}
                numberOfLines={1} 
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8} 
                maxFontSizeMultiplier={1.9}
            >
                {name}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ShortPanel