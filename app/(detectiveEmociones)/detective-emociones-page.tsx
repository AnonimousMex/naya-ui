import { ButtonAnswer } from '@/components/DectiveEmociones'
import { GameHeader } from '@/components/GameHeader'
import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground'
import { NavbarComponent } from '@/components/NavBar'
import { IMAGES } from '@/constants/images'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DetectiveEmocionesPage = () => {
    const { width } = Dimensions.get("window");
    const fontSize = width * 0.06;

    const [selected, setSelected] = useState<number | null>(null); 
    const [showModal, setShowModal] = useState(false); 
    const [showCorrect, setShowCorrect] = useState(false); 
    const [pressedIndexes, setPressedIndexes] = useState<number[]>([]);
    
    const handleAnswer = (index: number, isCorrect: boolean) => {
      if (isCorrect) {
        setSelected(index); 
        setShowCorrect(true)
        setTimeout(() => setShowCorrect(false), 4500);
      } else {
        setSelected(index)
        setPressedIndexes(prev => [...prev, index])
        setShowModal(true); 
        setTimeout(() => setShowModal(false), 3000);
      }
    };

  const closeModal = () => setShowModal(false);
    
  return (
    <SafeAreaView className="flex-1 bg-pink-200 ">
      <CloudBackground />
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView edges={["top"]} className="flex items-center justify-center mt-2">
            <GameHeader
              energyActive={3}
              name="Rodrigo"
              avatar={IMAGES.HAPPY_CAT_HEAD}
            />
        </SafeAreaView>
      </View>
      <View className={` mt-24 mb-12 h-[80%]`}>
        <Text 
          className='font-UrbanistExtraBold text-center  self-center '
          style={{ fontSize: fontSize + 5 }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.9}
        >
            ¿Como se siente el Conejo?
        </Text>
        <View className=' p-6'> 
            <View className={`bg-white h-auto flex items-center rounded-[3rem] ${selected === 1 ? 'border-green-600' : 'border-blue-600'} border-[6px] py-6 px-3`}>
                <Image 
                    source={IMAGES.HAPPY_BUNNY_2}
                    className="h-80 mb-6"
                    resizeMode="contain"
                /> 
                <Text 
                    className='font-UrbanistExtraBold text-center '
                    style={{fontSize: fontSize +5}}    
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.4}
                >
                    Le dijeron al conejo que se veia muy bien
                </Text>
            </View>
        </View>
        <View className='flex-row flex-wrap mt-4'>
            <ButtonAnswer
                backgroundColor={pressedIndexes.includes(0) ? '#fff' : '#FF4500'}
                borderColor={pressedIndexes.includes(0) ? '#fff' : '#FFB99F'}
                emotionName='Enojado'
                onPress={() => handleAnswer(0, false)}
                disable={pressedIndexes.includes(0) ? true : false}
            />
            <ButtonAnswer
                backgroundColor='#FFD700'
                borderColor={selected === 1 ? '#16A34A' : '#FFEA78'}
                emotionName='Feliz'
                onPress={() => handleAnswer(1, true)}
            />
            <ButtonAnswer
                backgroundColor={pressedIndexes.includes(2) ? '#fff' : '#1E90FF'}
                borderColor={pressedIndexes.includes(2) ? '#fff' : '#7ABDFF'}
                emotionName='Triste'
                onPress={() => handleAnswer(2, false)}
                disable={pressedIndexes.includes(2) ? true : false}
            />
            <ButtonAnswer
                backgroundColor={pressedIndexes.includes(3) ? '#fff' : '#800080'}
                borderColor={pressedIndexes.includes(3) ? '#fff' : '#C34FC3'}
                emotionName='Miedoso'
                onPress={() => handleAnswer(3, false)}
                disable={pressedIndexes.includes(3) ? true : false}
            />
        </View>
      </View>
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <TouchableOpacity 
            className="flex-1 items-center pt-16"
            onPress={closeModal}
           >
            <View className="bg-[#FF0000] rounded-3xl w-[80%] items-center ">
              <Text className="text-2xl font-bold text-center px-9 py-6 text-white">
                ¡Ups! Revisa muy bien su carita, mira como esta parado
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          visible={showCorrect}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View 
            className="flex-1 items-center pt-16 bg-black-100"
           >
            <View className={`bg-white h-auto w-full flex items-center rounded-[3rem] ${selected === 1 ? 'border-green-600' : 'border-blue-600'} border-[6px] py-6 `}>
                <Image 
                    source={IMAGES.HAPPY_BUNNY_2}
                    className="h-80 mb-6"
                    resizeMode="contain"
                /> 
                <Text 
                    className='font-UrbanistExtraBold text-center '
                    style={{fontSize: fontSize +5}}    
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.4}
                >
                    Le dijeron al conejo que se veia muy bien
                </Text>
            </View>
            <LottieView
                source={require("@/assets/animations/victory.json")}
                autoPlay
                loop
                style={{ width: 400, height: 520, position: "absolute"}}
            />
            <Text 
                    className='font-UrbanistExtraBold text-center bg-white px-5 py-3 rounded-3xl mt-2 border-green-600'
                    style={{fontSize: fontSize +5}}    
                    numberOfLines={2}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.4}
                >
                    El Conejo se sintió...
            </Text>
            <View className='items-center '>
                <ButtonAnswer
                    backgroundColor='#FFD700'
                    borderColor={selected === 1 ? '#16A34A' : '#FFEA78'}
                    emotionName='Feliz'
                    onPress={() => handleAnswer(1, true)}
                />
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}
// rodrigo@hotmail.com
export default DetectiveEmocionesPage