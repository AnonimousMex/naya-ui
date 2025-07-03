import { ICONS } from '@/constants/images';
import React from 'react'
import { Image, Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg';

type TNextDataView= {
    patientName: string,
    date: string,
    hours: number,
    minutes: number,
}

const NextDateview = ({patientName, date, hours, minutes}: TNextDataView) => {
    const progress = (hours+(minutes*0.01))/24
    const size = 60;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress * circumference);


  return (
    <View className='w-[90%] h-18 flex-row my-6'>
        <View className='w-[80%] h-full flex-row items-center'>
            <View className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center'>
                <Image 
                    source={ICONS.TIMER_ICON}
                    className='w-[55%] h-[55%]'
                />
            </View>
            <View className='flex-col h-full ml-7'>
                <Text className='text-brown-800 font-UrbanistExtraBold text-2xl'>
                    Próxima Consulta
                </Text>
                <Text className='text-brown-800 font-UrbanistSemiBold pt-[0.1rem]'>
                    {patientName}
                </Text>
                <Text className='text-brown-800 font-UrbanistLight '>
                    {date}
                </Text>
            </View>
        </View>
        <View className=' w-[20%]'>
            
            <View className="items-center justify-center">
                <View className="relative items-center justify-center">
                    <Svg width={size} height={size} className="absolute">
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgb(237, 233, 254)" 
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Círculo de progreso */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgb(167, 139, 250)" // bg-violet-400 equivalent
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                    </Svg>
                    
                    {/* Texto en el centro */}
                    <View className="absolute items-center justify-center">
                        <Text className="text-lg font-light text-gray-700 ">
                            {hours > 12 ? (
                                <>{(hours-12).toString()}:{minutes.toString().padStart(2,'0')}</>
                            ):(
                                <>{(hours).toString()}:{minutes.toString().padStart(2,'0')}</>
                            )}
                            {}
                        </Text>
                        <Text className="text-sm font-light text-gray-500 -mt-1">
                            {hours >= 12 ? (
                                <>PM</>
                            ):(
                                <>AM</>
                            )}
                        </Text>
                    </View>
                </View>
            </View>

        </View>
    </View>
  )
}

export default NextDateview