import React from 'react'
import { TouchableOpacity, Text, Dimensions } from 'react-native'

type TButtonAnswer ={
    borderColor: string,
    backgroundColor: string,
    emotionName: string,
    disable?: boolean
    onPress: any
}

const ButtonAnswer = ({
    borderColor,
    backgroundColor,
    emotionName,
    disable,
    onPress
}: TButtonAnswer) => {
    const { width, height } = Dimensions.get("window");
    const fontSize = width * 0.06;
  return (
    <TouchableOpacity 
        className={`border-[4px] bg-[${backgroundColor}] self-start p-5 px-10 rounded-[1.5rem] m-2 w-[45%]`}
        style={{borderColor: `${borderColor}`, backgroundColor: `${backgroundColor}`}}
        onPress={onPress}
        disabled={disable}
    >
        <Text 
            className='self-center text-white text-3xl font-UrbanistBold'
            style={{fontSize: fontSize +2}}    
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
            maxFontSizeMultiplier={1.4}
        >
           {emotionName}
        </Text>
    </TouchableOpacity>
  )
}

export default ButtonAnswer