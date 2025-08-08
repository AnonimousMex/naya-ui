import { ButtonAnswer } from '@/components/DectiveEmociones'
import { GameHeader } from '@/components/GameHeader'
import { MainButton } from '@/components/MainButton'
import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground'
import { NavbarComponent } from '@/components/NavBar'
import { HTTP } from '@/config/axios'
import { IMAGES } from '@/constants/images'
import { URL_PATHS } from '@/constants/urlPaths'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import { router, useFocusEffect } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { useCallback, useState } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Mapeo de emociones a colores
const EMOTION_COLORS: Record<string, { bg: string; border: string }> = {
  'Felicidad': { bg: '#FFD700', border: '#FFEA78' },
  'Tristeza': { bg: '#1E90FF', border: '#7ABDFF' },
  'Enojo': { bg: '#FF4500', border: '#FFB99F' },
  'Miedo': { bg: '#800080', border: '#C34FC3' },
  'Verguenza': { bg: '#FF69B4', border: '#FFB6C1' }
}

// Mapeo de títulos a imágenes
const STORY_IMAGES: Record<string, any> = {
  'Bambú lejano': IMAGES.ANGRY_AXOLOTL_2,
  'Susto repentino': IMAGES.CONFUSED_BUNNY_2,
  'Bambú fresco': IMAGES.ANGRY_BUNNY_1,
  'Nado alegre': IMAGES.ANGRY_LION_2
}

const useEnergy = () => {
  const [energy, setEnergy] = useState(0);

  const fetchEnergy = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token found");
      const { data } = await HTTP.get<{ current_energy: number }>(
        URL_PATHS.ENERGIES.GET_ENERGY,
        {
          headers: { Authorization: token },
        },
      );
      setEnergy(data.current_energy);
    } catch (e) {
      setEnergy(0);
    }
  };

  return { energy, fetchEnergy };
};

const DetectiveEmocionesPage = () => {
  const { width } = Dimensions.get("window");
  const fontSize = width * 0.06;

  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false)
  const [pressedIndexes, setPressedIndexes] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { energy, fetchEnergy } = useEnergy();

  // Fetch questions from backend
  const { data: questionsData, isLoading, error } = useQuery({
  queryKey: ['emotionQuestions'], 
  queryFn: async () => {
    const response = await HTTP.get(URL_PATHS.GAMES.GET_DETECTIVE);
    return response.data.data;
  }
});

  const handleAnswer = (index: number) => {
    if (!questionsData || !questionsData[currentQuestionIndex]) return;
    
    const isCorrect = questionsData[currentQuestionIndex].options[index].isCorrect;
    
    if (isCorrect) {
      setSelected(index);
      setShowCorrect(true);      
      setTimeout(() => {
        setShowCorrect(false);
        goToNextQuestion();
      }, 4500);
    } else {
      setSelected(index);
      setPressedIndexes(prev => [...prev, index]);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  const goToNextQuestion = () => {
    if (questionsData && currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelected(null);
      setPressedIndexes([]);
    } else {
      setGameCompleted(true);
    }
  };
  const closeGame = () => {
    setGameCompleted(false)
    router.push('/(mainPages)/home')
  }
  const closeModal = () => setShowModal(false);

  

  useFocusEffect(
    useCallback(() => {
      fetchEnergy();
    }, []),
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-pink-200 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error || !questionsData || questionsData.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-pink-200 justify-center items-center">
        <Text className="text-lg">Error al cargar las preguntas</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = questionsData[currentQuestionIndex];
  const getImage = (image: string) => {
        return IMAGES[image as keyof typeof IMAGES]
    };
  const sourceImage = getImage(currentQuestion.image)
  return (
    <SafeAreaView className="flex-1 bg-pink-200 ">
      <CloudBackground />
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView edges={["top"]} className="flex items-center justify-center mt-2">
          <GameHeader
            energy={energy}
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
          />
        </SafeAreaView>
      </View>
      <View className={`mt-24 mb-12 h-[80%]`}>
        <Text 
          className='font-UrbanistExtraBold text-center self-center'
          style={{ fontSize: fontSize + 5 }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          ¿Cómo se siente el personaje?
        </Text>
        <View className='p-6'> 
          <View className={`bg-white h-auto flex items-center rounded-[3rem] ${
            selected !== null && currentQuestion.options[selected].isCorrect 
              ? 'border-green-600' 
              : 'border-blue-600'
          } border-[6px] py-6 px-3`}>
            <Image 
              source={ sourceImage || IMAGES.UNKNOWN_HEAD}
              className="h-80 mb-6"
              resizeMode="contain"
            /> 
            <Text 
              className='font-UrbanistExtraBold text-center'
              style={{fontSize: fontSize + 5}}    
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {currentQuestion.story}
            </Text>
          </View>
        </View>
        <View className='flex-row flex-wrap mt-4 justify-center'>
          {currentQuestion.options.map((option: any, index: number) => {
            const emotionColors = EMOTION_COLORS[option.name] || { bg: '#DDDDDD', border: '#AAAAAA' };
            
            return (
              <ButtonAnswer
                key={option.id}
                backgroundColor={pressedIndexes.includes(index) ? '#fff' : emotionColors.bg}
                borderColor={pressedIndexes.includes(index) ? '#fff' : emotionColors.border}
                emotionName={option.name}
                onPress={() => handleAnswer(index)}
                disable={pressedIndexes.includes(index)}
              />
            );
          })}
        </View>
      </View>
      
      {/* Modal de respuesta incorrecta */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={closeModal}>
        <TouchableOpacity 
          className="flex-1 items-center pt-16"
          onPress={closeModal}
        >
          <View className="bg-[#FF0000] rounded-3xl w-[80%] items-center">
            <Text className="text-2xl font-bold text-center px-9 py-6 text-white">
              ¡Ups! Revisa muy bien su carita, mira como esta parado
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Modal de respuesta correcta */}
      <Modal visible={showCorrect} transparent animationType="fade">
        <View className="flex-1 items-center pt-16 bg-black-100">
          <View className={`bg-white h-auto w-full flex items-center rounded-[3rem] border-green-600 border-[6px] py-6`}>
            <Image 
              source={sourceImage || IMAGES.UNKNOWN_HEAD}
              className="h-80 mb-6"
              resizeMode="contain"
            /> 
            <Text 
              className='font-UrbanistExtraBold text-center'
              style={{fontSize: fontSize + 5}}    
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {currentQuestion.story}
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
            style={{fontSize: fontSize + 5}}    
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            ¡Correcto! El personaje se sintió...
          </Text>
          <View className='items-center'>
            {currentQuestion.options.map((option: any, index: number) => (
              option.isCorrect && (
                <ButtonAnswer
                  key={option.id}
                  backgroundColor={EMOTION_COLORS[option.name]?.bg || '#FFD700'}
                  borderColor="#16A34A"
                  emotionName={option.name}
                  onPress={() => {}}
                />
              )
            ))}
          </View>
        </View>
      </Modal>
      {/* Se completo el juego*/}
      <Modal visible={gameCompleted} transparent animationType="fade" onRequestClose={closeGame}>
        <View className="flex-1 items-center justify-center  px-9 bg-black-100 ">
          <View className={`bg-white h-[70%] w-full flex items-center justify-center rounded-[9rem]  border-yellow-40 border-[6px] py-6`}>
            <Image 
              source={IMAGES.PANDA_SPIA_IMAGE}
              className="h-72 mb-6"
              resizeMode="contain"
            /> 
            <Text 
              className='font-UrbanistExtraBold text-center'
              style={{fontSize: fontSize + 5}}    
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              ¡HAZ COMPLETADO EL JUEGO!
            </Text>
            <Text 
              className='font-UrbanistExtraBold text-center pt-6'
              style={{fontSize: fontSize - 5}}    
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              Sigue jugando, tu eres el <Text className='text-green-700'>¡MEJOR!</Text>
            </Text>
            <MainButton onPress={closeGame} mainText='Siguiente' className='bg-yellow-40 mt-3 '/>
          </View>
          <LottieView
            source={require("@/assets/animations/victory.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300, position: "absolute"}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DetectiveEmocionesPage;