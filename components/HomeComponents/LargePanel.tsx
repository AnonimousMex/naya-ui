import { ExternalPathString, RelativePathString, router } from 'expo-router'
import React from 'react'
import { View, Image, Text, ImageSourcePropType, TouchableOpacity, Dimensions } from 'react-native'

type TLargePanel = {
    name?: string,
    description?: string,
    background?: ImageSourcePropType,
    backgroundColor?: string,
    animalImage?: ImageSourcePropType,
    onPressButton?: () => void,
    par?: boolean,
    comingSoon?: boolean
}
const LargePanel = ({
    name,
    description,
    background,
    backgroundColor,
    animalImage,
    onPressButton,
    par = false,
    comingSoon,
}: TLargePanel) => {

    const { width, height } = Dimensions.get("window");
    const fontSize = width * 0.06;

    return (
        <TouchableOpacity onPress={onPressButton}>
            {comingSoon ? (
                     <View className={`rounded-[2rem] h-44 w-full flex-row bg-gray-300 items-center justify-center`}>
                        <Text
                            className='font-UrbanistExtraBold text-[2rem] text-center text-white'
                            style={{ fontSize: fontSize + 7 }}
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}
                            minimumFontScale={0.8}
                            maxFontSizeMultiplier={1.5}
                        >
                            Proximamante...
                        </Text>
                     </View>
                ):(
                    <View className={`rounded-[2rem] h-44 w-full flex-row ${backgroundColor} `}>
                        <Image
                            source={background}
                            className='absolute w-full h-full rounded-[2rem]'
                        />
                        {par ? (
                            <></>
                        ) : (
                            <View className='w-[45%] flex justify-center items-center '>
                                <Image
                                    source={animalImage}
                                    className='h-full w-[70%] object-cover'
                                />
                            </View>
                        )}
                        <View className='w-[50%] flex-col items-center justify-center px-3'>
                            <View className='flex-col items-center'>
                                {name === "Detective" ? (
                                    <>
                                        <Text
                                            className='font-UrbanistExtraBold '
                                            style={{ fontSize: fontSize + 8 }}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit={true}
                                            minimumFontScale={0.8}
                                            maxFontSizeMultiplier={1.9}
                                        >
                                            Detective
                                        </Text>
                                        <Text className='font-UrbanistExtraBold'
                                            style={{ fontSize: fontSize + 6 }}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit={true}
                                            minimumFontScale={0.8}
                                            maxFontSizeMultiplier={1.9}
                                        >
                                            Emociones
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Text
                                            className='font-UrbanistExtraBold text-[2rem] text-center'
                                            style={{ fontSize: fontSize + 4 }}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit={true}
                                            minimumFontScale={0.8}
                                            maxFontSizeMultiplier={1.9}
                                        >
                                            {name}
                                        </Text>
                                    </>
                                )}
                            </View>
                            <Text
                                className='font-UrbanistBold flex text-center text-lg'
                                style={{ marginTop: fontSize - 15, lineHeight: fontSize - 7 }}
                                numberOfLines={2}
                                adjustsFontSizeToFit={true}
                                minimumFontScale={1}
                                maxFontSizeMultiplier={0.2}
                            >
                                {description}
                            </Text>
                        </View>
                        {par ? (
                            <View className='w-[45%] flex justify-center items-center '>
                                <Image
                                    source={animalImage}
                                    className='h-full w-[70%] object-cover'
                                />
                            </View>
                        ) : (<></>)}
                    </View>
        )}
        </TouchableOpacity>
    )
}

export default LargePanel