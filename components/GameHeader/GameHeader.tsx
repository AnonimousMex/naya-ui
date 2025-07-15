import { ICONS, IMAGES } from '@/constants/images'
import { useColorAnimal } from '@/hooks/animals/useColorAnimal'
import React from 'react'
import { View, Image, Text, Dimensions, ImageSourcePropType } from 'react-native'

type TGameHeader = {
    energyActive: number,
    name: string,
    avatar: ImageSourcePropType,
}

const GameHeader = ({
    energyActive,
    name,
    avatar,
}: TGameHeader) => {
  const { width, height } = Dimensions.get("window");
  const fontSize = width * 0.06;
  const energyInactive = 3-energyActive
  const boderColor = useColorAnimal(avatar) 
  
  return (
    <View className={`p-[0.7rem] rounded-[3rem] w-[93%] ${boderColor}`}>
      <View
        className="flex flex-row justify-between items-center p-1 rounded-full bg-white px-2"
      >
        <Image 
          source={avatar}
          className="w-16 h-12"
          resizeMode='contain'
        />
        <Text 
          className="font-UrbanistExtraBold text-2xl text-center"
          style={{ fontSize: fontSize - 3 }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
          maxFontSizeMultiplier={1.1}  
        >
          {name}
        </Text>
        <View className="flex flex-row mr-1">
            {[...Array(energyActive)].map((_,index) =>(
                <Image 
                  key={index}
                  source={ICONS.ENERGY_ACTIVE_ICON}
                  className="w-8 h-8 object-contain"
                />    
            ))}
           {[...Array(energyInactive)].map((_,index) =>(
               <Image 
                 key={index}
                 source={ICONS.ENERGY_INACTIVE_ICON}
                 className="w-7 h-7 object-contain"
               />    
           ))}
        </View>
      </View>
    </View>
  )
}
export default GameHeader
