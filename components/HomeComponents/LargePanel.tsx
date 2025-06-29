import { ExternalPathString, RelativePathString, router } from 'expo-router'
import React from 'react'
import { View, Image, Text, ImageSourcePropType, TouchableOpacity, Dimensions} from 'react-native'

type TLargePanel= {
    name: string,
    description: string,
    background: ImageSourcePropType,
    backgroundColor: string,
    animalImage: ImageSourcePropType,
    onPressButton: () => void,
    par?: boolean
}
const LargePanel = ({
    name,
    description,
    background,
    backgroundColor,
    animalImage,
    onPressButton,
    par = false,
}: TLargePanel) =>{

    const { width, height } = Dimensions.get("window");
    const fontSize = width * 0.06;

    return (
        <TouchableOpacity onPress={onPressButton}>
                <View className={`rounded-[2rem] h-44 w-full flex-row ${backgroundColor}`}>
                    <Image 
                        source={background}
                        className='absolute w-full h-full rounded-[2rem]'
                    />
                    {par ? (
                        <></>
                    ): (
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
                                        style={{ fontSize: fontSize + 6 }}
                                    >
                                        Detective
                                    </Text>
                                    <Text className='font-UrbanistExtraBold'
                                        style={{ fontSize: fontSize + 6}}
                                    >
                                        Emociones 
                                    </Text>
                                </>
                            ):(
                                <>
                                <Text className='font-UrbanistExtraBold text-[2rem] text-center'
                                    style={{ fontSize: fontSize + 4}}
                                >
                                    {name} 
                                </Text>
                                </>
                            )}
                        </View>
                        <Text className='font-UrbanistBold flex text-center text-base'
                            style={{ marginTop: fontSize -15, lineHeight: fontSize -7}}
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
                    ): (<></>)}
                </View>
        </TouchableOpacity>
  )
}

export default LargePanel