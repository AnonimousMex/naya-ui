import { LargePanel, ShortPanel } from '@/components/HomeComponents'
import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground'
import { NavbarComponent } from '@/components/NavBar'
import { IMAGES } from '@/constants/images'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native'

function Home() {
    

  return (
    <>
     <CloudBackground/>
        <SafeAreaView className='w-full h-full bg-pink-200'>
            <CloudBackground />
            <ScrollView 
                className='mt-8 px-7' 
                showsVerticalScrollIndicator={false}
            >
            <LargePanel
                name='Detective'
                description='Explora, adivina y comprende cómo te sientes!'
                background={IMAGES.BACKGROUND_DETECTIVE_IMAGE}
                backgroundColor='bg-purple-300'
                animalImage={IMAGES.PANDA_SPIA_IMAGE}
                onPressButton={() => {router.push('/(mainPages)/insignias')}}
            />
            <View className='flex-row justify-between mt-5 mb-5'>
                <ShortPanel 
                    name='Memociones'
                    background={IMAGES.MEMOCIONES_IMAGE}
                    onPressButton={() => {router.push("/(mainPages)/insignias")}}
                />
                <ShortPanel 
                    name='Emorganiza'
                    background={IMAGES.EMORGANIZA_IMAGE}
                    onPressButton={() => {router.push("/(mainPages)/insignias")}}
                />
            </View>
            <LargePanel
                name='Suena algo...'
                description='Escucha atentamente y descubrirás algo...'
                background={IMAGES.BACKGROUND_SUENA_ALGO_IMAGE}
                backgroundColor='bg-green-300'
                animalImage={IMAGES.SUENA_ALGO_IMAGE}
                onPressButton={() => {router.push('/(mainPages)/insignias')}}
                par
            />
            </ScrollView>
            <NavbarComponent />
        </SafeAreaView>
    </>
  )
}

export default Home