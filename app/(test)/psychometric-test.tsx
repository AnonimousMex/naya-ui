import { GameHeader } from '@/components/GameHeader';
import { MainButton } from '@/components/MainButton';
import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground';
import { AudioButton } from '@/components/AudioButton';
import { IMAGES } from '@/constants/images';
import { LOCAL_PSYCHOMETRIC_TEST } from '@/constants/localData/psychometricTest';
import { STORY_AUDIOS, ANSWER_AUDIOS, AudioNumber } from '@/constants/audioConstants';
import { useScreenDimensions } from '@/utils/dimensions';
import { useUserHeaderData } from '@/hooks/useUserHeaderData';
import { useLocalUserInfo } from '@/hooks/useLocalUserInfo';
import { useAudio } from '@/hooks/useAudio';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TestAnswer, TestResult, calculatePredominantEmotion, saveTestResult } from '@/utils/psychometricTestStorage';

// Energía fija para modo local
const useEnergy = () => {
  const energy = 3;
  const fetchEnergy = () => {};
  return { energy, fetchEnergy };
};

/** -------------------------------
 *  PASOS DEL FLUJO
 *  0: Modal respuesta correcta (intro de historia)
 *  1: Este es el modal para la parte (texto de historia)
 *  2: Modal de pregunta (título/encabezado)
 *  3: Vista con opciones "¿Qué harías?" (usuario elige)
 *  4: Modal de salida (después de responder)
 *  ------------------------------- */
const STEP = {
  INTRO: 0,
  STORY: 1,
  QUESTION_HEADER: 2,
  OPTIONS: 3,
  OUTRO: 4,
} as const;

type StoryAnswer = { id: string; answer_text: string; emotion_id: string; emotion_name: string };
type StoryItem = {
  id: string;
  title: string;
  story: string;
  image_url: string;
  question: string;
  answers: StoryAnswer[];
};

const PsycometricTest = () => {
  const { width } = Dimensions.get('window');
  const fontSize = width * 0.06;
  const { height } = useScreenDimensions();

  const { energy, fetchEnergy } = useEnergy();
  const { userName, avatar } = useUserHeaderData();
  const { userInfo: localUserInfo } = useLocalUserInfo();

  // ----- Audio hooks -----
  const storyAudio = useAudio();
  const answerAudio = useAudio();

  // ----- Estado de datos / flujo -----
  const [loading, setLoading] = useState(true);
  const [testId, setTestId] = useState<string | null>(null);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<number>(STEP.INTRO);
  const [showStory, setShowStory] = useState(false);
  const [userAnswers, setUserAnswers] = useState<TestAnswer[]>([]);

  // Para limpiar timers al desmontar o cambiar paso:
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duraciones por paso (ms). null = no auto-avanza
  const STEP_DURATIONS = useMemo<(number | null)[]>(
    () => [
      5000, // 0 INTRO (Modal de respuesta correcta)
      null, // 1 STORY (Este es el modal para la parte)
      2000, // 2 QUESTION_HEADER (Modal de pregunta)
      null, // 3 OPTIONS (el usuario responde -> manual)
      2000, // 4 OUTRO (Modal de salida)
    ],
    [],
  );

  useFocusEffect(
    useCallback(() => {
      fetchEnergy();
      setShowStory(false);
      
      // Limpiar audios al entrar/salir de la pantalla
      return () => {
        storyAudio.stopAudio();
        answerAudio.stopAudio();
      };
    }, [storyAudio.stopAudio, answerAudio.stopAudio]),
  );

  useEffect(() => {
    const loadTest = () => {
      try {
        setLoading(true);
        // Usar datos locales del test psicométrico - seleccionar 5 historias aleatorias
        setTestId('local_test');
        
        // Mezclar el array y tomar solo las primeras 5 historias
        const shuffled = [...LOCAL_PSYCHOMETRIC_TEST].sort(() => 0.5 - Math.random());
        const selectedStories = shuffled.slice(0, 5);
        
        setStories(selectedStories);
        setCurrentStoryIndex(0);
        setCurrentStep(STEP.INTRO);
        setUserAnswers([]); // Resetear respuestas para nuevo test
      } catch (err) {
        console.error('Error loading test:', err);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, []);

  // ----- Auto avance por tiempos -----
  useEffect(() => {
    // limpiar timer anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (stories.length === 0) return;

    const duration = STEP_DURATIONS[currentStep];
    if (duration == null) return; // paso manual (OPTIONS)

    timerRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev === STEP.OUTRO) {
          // pasar a la siguiente historia o terminar
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex((i) => i + 1);
            return STEP.STORY;
          } else {
            // Llegaste al final del test: aquí puedes navegar o mostrar algo final
            return STEP.OUTRO; // se queda en OUTRO; puedes personalizar
          }
        }
        return prev + 1;
      });
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentStep, currentStoryIndex, stories, STEP_DURATIONS]);

  // ----- Manejo de respuesta del usuario -----
  const handleAnswer = async (answerId: string) => { 
    try {
      // Detener todos los audios al seleccionar una respuesta
      storyAudio.stopAudio();
      answerAudio.stopAudio();
      
      // Encontrar la respuesta seleccionada
      const selectedAnswer = currentStory.answers.find(ans => ans.id === answerId);
      
      if (selectedAnswer) {
        // Crear objeto de respuesta
        const testAnswer: TestAnswer = {
          storyId: currentStory.id,
          storyTitle: currentStory.title,
          answerId: selectedAnswer.id,
          answerText: selectedAnswer.answer_text,
          emotionName: selectedAnswer.emotion_name
        };
        
        // Agregar respuesta al array
        const updatedAnswers = [...userAnswers, testAnswer];
        setUserAnswers(updatedAnswers);
        
        console.log('Respuesta guardada:', testAnswer);
        
        // Si es la última historia, guardar todos los resultados
        if (currentStoryIndex === stories.length - 1) {
          await saveTestResults(updatedAnswers);
        }
      }
      
      await new Promise(res => setTimeout(res, 1000));
      // Mostrar "Modal de salida"
      setCurrentStep(STEP.OUTRO);
    } catch (e) {
      console.error('Error saving answer:', e);
      // Aún así mostramos el modal de salida para no bloquear UX
      setCurrentStep(STEP.OUTRO);
    }
  };

  const currentStory = stories[currentStoryIndex];
  
  // Función para obtener el número del audio basado en el ID
  const getAudioNumber = (storyId: string): AudioNumber | null => {
    const match = storyId.match(/test_(\d+)/);
    if (match) {
      const number = parseInt(match[1], 10);
      return (number >= 1 && number <= 10) ? (number as AudioNumber) : null;
    }
    return null;
  };

  // Función para guardar los resultados usando las utilidades importadas
  const saveTestResults = async (finalAnswers: TestAnswer[]) => {
    try {
      const { predominantEmotion, emotionCounts } = calculatePredominantEmotion(finalAnswers);
      
      const finalUserName = localUserInfo?.name || userName || 'Usuario Anónimo';
      
      const testResult: TestResult = {
        id: `test_${Date.now()}_${finalUserName}`,
        userName: finalUserName,
        date: new Date().toISOString(),
        answers: finalAnswers,
        predominantEmotion,
        emotionCounts
      };

      console.log('Guardando resultado del test:', testResult);

      await saveTestResult(testResult);
      console.log('Resultados guardados:', testResult);
    } catch (error) {
      console.error('Error guardando resultados:', error);
    }
  };

  const resolveImage = (key?: string) => {
    if (!key) return IMAGES.UNKNOWN_HEAD;                  
    return (IMAGES as any)[key] ?? IMAGES.UNKNOWN_HEAD;    
  };

  // Función para reproducir audio de historia
  const playStoryAudio = useCallback(async () => {
    if (!currentStory) return;
    
    const audioNumber = getAudioNumber(currentStory.id);
    if (audioNumber && STORY_AUDIOS[audioNumber]) {
      await storyAudio.playAudio(STORY_AUDIOS[audioNumber]);
    }
  }, [currentStory, storyAudio]);

  // Función para reproducir audio de respuestas
  const playAnswerAudio = useCallback(async () => {
    if (!currentStory) return;
    
    const audioNumber = getAudioNumber(currentStory.id);
    if (audioNumber && ANSWER_AUDIOS[audioNumber]) {
      await answerAudio.playAudio(ANSWER_AUDIOS[audioNumber]);
    }
  }, [currentStory, answerAudio]);

  // ----- Detener audios cuando cambie la historia -----
  useEffect(() => {
    // Parar audios anteriores cuando cambie de historia
    storyAudio.stopAudio();
    answerAudio.stopAudio();
  }, [currentStoryIndex, storyAudio.stopAudio, answerAudio.stopAudio]);

  // ----- UI -----
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pink-200 ">
      <CloudBackground />
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView edges={['top']} className="flex items-center justify-center mt-2">
          <GameHeader energy={energy} name={localUserInfo?.name || userName} avatar={avatar ? IMAGES[avatar as keyof typeof IMAGES] : IMAGES.HAPPY_CAT_HEAD} />
        </SafeAreaView>
      </View>

      <View className={`mt-24 h-[${height}]`}>
        <View className="">
          <View className={`flex items-center relative`}>
            <TouchableOpacity onPress={() => setShowStory(true)}>
              <Image source={ resolveImage(currentStory?.image_url) } className="h-[25rem] mb-2 " resizeMode="contain"  />
            </TouchableOpacity>
            {/* Botón de audio sobre la imagen */}
            <View style={{ position: 'absolute', top: 20, right: 20 }}>
              <AudioButton
                isPlaying={storyAudio.isPlaying}
                isLoading={storyAudio.isLoading}
                onPress={playStoryAudio}
                size={50}
              />
            </View>
          </View>
        </View> 

        <View className="flex h-[51%] items-center justify-center border-[4px] border-b-0 -mx-[5px] border-pink-90 bg-pink-50 rounded-t-[2rem]">
          
          {/* =========================================
              1) Este es el modal para la parte (STORY)
              ========================================= */}
          {currentStep === STEP.STORY && currentStory && (
            <View>
              <View className=" mx-8 bg-white px-6 py-5 rounded-3xl flex items-center mb-10 shadow-2xl">
                <Text
                  className={`font-UrbanistExtraBold text-center text-brown-800`}
                  style={{ fontSize: fontSize + 15 }}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={1}
                  maxFontSizeMultiplier={2.5}
                >
                  { currentStory.story}
                </Text>
              </View>

              <TouchableOpacity
                className="bg-white self-center px-10 py-2 rounded-full shadow-lg"
                onPress={() => {
                  // Detener audios al continuar
                  storyAudio.stopAudio();
                  answerAudio.stopAudio();
                  setCurrentStep(STEP.QUESTION_HEADER);
                }}
              >
                <Text
                  className="text-pink-90 font-UrbanistExtraBold text-center "
                  style={{ fontSize: fontSize + 2 }}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={1}
                  maxFontSizeMultiplier={2.5}
                >
                  Continuar...
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* =========================================
              2) Modal de pregunta (QUESTION_HEADER)
              ========================================= */}
          {currentStep === STEP.QUESTION_HEADER && currentStory && (
            <View>
              <View className=" mx-8 bg-white px-8 py-8 rounded-3xl flex items-center  shadow-2xl">
                <Text
                  className="font-UrbanistExtraBold text-center text-brown-800"
                  style={{ fontSize: fontSize + 28 }}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={1}
                  maxFontSizeMultiplier={2.5}
                >
                  {currentStory.question }
                </Text>
              </View>
            </View>
          )}

          {/* =========================================
              3) Vista con opciones (¿Qué harías?)
              ========================================= */}
          {currentStep === STEP.OPTIONS && currentStory && (
            <View >
              <View className="relative mb-8">
                <Text
                  className="text-center px-5 font-UrbanistExtraBold text-brown-800 "
                  style={{ fontSize: fontSize + 7 }}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={1}
                  maxFontSizeMultiplier={2.5}
                  onPress={() => setShowStory(true)}
                >
                  {currentStory.question }
                </Text>
                {/* Botón de audio para respuestas */}
                <View style={{ position: 'absolute', top: -30, right: 10 }}>
                  <AudioButton
                    isPlaying={answerAudio.isPlaying}
                    isLoading={answerAudio.isLoading}
                    onPress={playAnswerAudio}
                    size={40}
                  />
                </View>
              </View>

              <View className="mx-8 flex flex-row flex-wrap justify-between" style={{ gap: 12 }}>
                {currentStory.answers.map((ans) => (
                  <TouchableOpacity
                    key={ans.id}
                    className={`px-4 py-6 rounded-3xl flex items-center justify-center shadow-2xl bg-white `}
                    style={{ width: '48%' }}
                    onPress={() => handleAnswer(ans.id)}
                    activeOpacity={0.9}
                  >
                    <Text
                      className="font-UrbanistExtraBold text-center text-brown-800"
                      style={{ fontSize: fontSize - 2 }}
                      numberOfLines={3}
                      adjustsFontSizeToFit={true}
                      minimumFontScale={1}
                      maxFontSizeMultiplier={2.5}
                    >
                      {ans.answer_text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* =========================================
          4) Modal de respuesta correcta (INTRO)
          Debe ir al inicio antes de todas
          ========================================= */}
      <Modal visible={currentStep === STEP.INTRO} transparent animationType="fade">
        <View className="flex-1 items-center justify-center ">
          <Image source={IMAGES.BACKGROUND_PANDA_TEST} className="absolute" />
          <View
            className={`border-[5px] border-dashed border-pink-90 bg-white mx-4 h-[60%] rounded-[5rem] flex items-center justify-center`}
          >
            <Text
              className={`font-UrbanistExtraBold text-center text-green-700`}
              style={{ fontSize: fontSize + 19 }}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {currentStory ? `Lee las historias y decide qué harías... ` : 'Cargando historia...'}
            </Text>
            <Image source={IMAGES.HAPPY_PANDA_HEAD} className="h-24 my-4" resizeMode="contain" />
            <Text
              className="font-UrbanistExtraBold text-center "
              style={{ fontSize: fontSize + 19 }}
              numberOfLines={3}
              adjustsFontSizeToFit
            >
               {currentStory.title }
            </Text>
          </View>
        </View>
      </Modal>

      {/* =========================================
          5) Modal de salida (OUTRO)
          Se muestra al responder; luego auto-avanza
          ========================================= */}
      <Modal visible={currentStep === STEP.OUTRO} transparent animationType="fade">
        <View className="flex-1 items-center justify-center ">
          <Image source={IMAGES.BACKGROUND_PANDA_TEST} className="absolute" />
          <View
            className={`border-[5px] border-dashed border-pink-90 bg-white mx-4 px-4 h-[60%] rounded-[5rem] flex items-center justify-center`}
          >
            <Text
              className={`font-UrbanistExtraBold text-center text-blue-226 mb-10`}
              style={{ fontSize: fontSize + 19 }}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              ¡Tomaste una Decisión!
            </Text>
            <Text
              className="font-UrbanistExtraBold text-center "
              style={{ fontSize: fontSize + 19 }}
              numberOfLines={3}
              adjustsFontSizeToFit
            >
              Vamos a la siguiente Historia...
            </Text>
          </View>
        </View>
      </Modal>

      <Modal visible={showStory} transparent animationType="fade">
        <View className="flex-1 items-center justify-center  px-9 bg-black-100 ">
          <View className={`bg-white  w-full flex items-center justify-center rounded-[2rem]  border-pink-300 border-[6px] py-6`}>
            <Text className='font-UrbanistExtraBold text-center px-2' style={{fontSize: fontSize + 5}} numberOfLines={2} adjustsFontSizeToFit>
              {currentStory.story}
            </Text>
            <TouchableOpacity onPress={()=>setShowStory(false)} className=' bg-red-400 mt-3 p-3 px-10 rounded-3xl'>
              <Text className='text-white font-UrbanistExtraBold'>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      <Modal visible={currentStoryIndex === stories.length - 1 && currentStep === STEP.OUTRO} transparent animationType="fade">
        <View className="flex-1 items-center justify-center  px-9 bg-black-100 ">
          <View className={`bg-white h-[70%] w-full flex items-center justify-center rounded-[9rem]  border-yellow-40 border-[6px] py-6`}>
            <Image source={IMAGES.HAPPY_AXOLOTL_4} className="h-72 mb-6" resizeMode="contain" />
            <Text className='font-UrbanistExtraBold text-center' style={{fontSize: fontSize + 5}} numberOfLines={2} adjustsFontSizeToFit>
              ¡HAZ COMPLETADO EL JUEGO! 
            </Text>
            <Text className='font-UrbanistExtraBold text-center pt-6' style={{fontSize: fontSize - 5}} numberOfLines={2} adjustsFontSizeToFit>
              Sigue jugando, tu eres el <Text className='text-green-700'>¡MEJOR!</Text>
            </Text>
            <MainButton onPress={() => {router.replace("/(mainPages)/home")}} mainText='Siguiente' className='bg-yellow-40 mt-3 '/>
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

export default PsycometricTest;
