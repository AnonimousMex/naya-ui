import { GameHeader } from '@/components/GameHeader';
import { MainButton } from '@/components/MainButton';
import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground';
import { HTTP } from '@/config/axios';
import { IMAGES } from '@/constants/images';
import { URL_PATHS } from '@/constants/urlPaths';
import { useScreenDimensions } from '@/utils/dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const useEnergy = () => {
  const [energy, setEnergy] = useState(0);

  const fetchEnergy = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('No auth token found');
      const { data } = await HTTP.get<{ current_energy: number }>(
        URL_PATHS.ENERGIES.GET_ENERGY,
        { headers: { Authorization: token } },
      );
      setEnergy(data.current_energy);
    } catch (e) {
      setEnergy(0);
    }
  };

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

type StoryAnswer = { id: string; name: string };
type StoryItem = {
  id: string;
  title: string;
  story: string;
  image_url: string;
  question_id: string;
  question: string;
  answers: StoryAnswer[];
};

const PsycometricTest = () => {
  const { width } = Dimensions.get('window');
  const fontSize = width * 0.06;
  const { height } = useScreenDimensions();

  const { energy, fetchEnergy } = useEnergy();

  // ----- Estado de datos / flujo -----
  const [loading, setLoading] = useState(true);
  const [testId, setTestId] = useState<string | null>(null);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<number>(STEP.INTRO);
  const [showStory, setShowStory] = useState(false)

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
      setShowStory(false)
    }, []),
  );

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('accessToken');
        const { data } = await HTTP.get<any>(URL_PATHS.TEST.INIT_TEST, {
          headers: { Authorization: token },
        });
        setTestId(data?.data?.test_id ?? null);
        setStories(Array.isArray(data?.data?.stories) ? data.data.stories : []);
        setCurrentStoryIndex(0);
        setCurrentStep(STEP.INTRO);
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
      await HTTP.post(
        URL_PATHS.TEST.SAVE_ANSWER,
        {
          test_id: testId,
          answer_id: answerId,
        },
      );
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
  const resolveImage = (key?: string) => {
  if (!key) return IMAGES.UNKNOWN_HEAD;                  
  return (IMAGES as any)[key] ?? IMAGES.UNKNOWN_HEAD;    
};
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
          <GameHeader energy={energy} name="Rodrigo" avatar={IMAGES.HAPPY_CAT_HEAD} />
        </SafeAreaView>
      </View>

      <View className={`mt-24 h-[${height}]`}>
        <View className="">
          <View className={`flex items-center `}>
            <TouchableOpacity onPress={() => setShowStory(true)}>
              <Image source={ resolveImage(currentStory?.image_url) } className="h-[25rem] mb-2 " resizeMode="contain"  />
            </TouchableOpacity>
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
                onPress={() => setCurrentStep(STEP.QUESTION_HEADER)}
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
              <Text
                className="mb-8 text-center px-5 font-UrbanistExtraBold text-brown-800 "
                style={{ fontSize: fontSize + 7 }}
                adjustsFontSizeToFit={true}
                minimumFontScale={1}
                maxFontSizeMultiplier={2.5}
                onPress={() => setShowStory(true)}
              >
                {currentStory.question }
              </Text>

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
                      {ans.name}
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
