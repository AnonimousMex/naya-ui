import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGES } from "@/constants/images";
import { GameHeader } from "@/components/GameHeader";
import { router } from "expo-router";
import { AutoDismissModal } from "@/components/AutoDismissModal";
import { Audio } from "expo-av";
import { ChoiceEmotionComponent } from "@/components/ChoiceEmotionComponent";
import { CorrectAnswerComponent } from "@/components/CorrectAnswerComponent";
import LottieView from "lottie-react-native";
import {
  YEseRuidoSound,
  Y_ESE_RUIDO_SERVICE,
} from "@/services/y_ese_ruido";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Imports para insignia
import { useUnlockBadgeMutation } from "@/hooks/badges/useUnlockBadgeMutation";
import { formatError } from "@/utils/errorHandler";
import { InsigniaDescriptionComponent } from "@/components/InsigniaDescription";

const soundMap: Record<string, any> = {
  "/sounds/baby-cry-101477.mp3": require("@/assets/sounds/baby-cry-101477.mp3"),
  "/sounds/baby-laugh-2-329754.mp3": require("@/assets/sounds/baby-laugh-2-329754.mp3"),
  "/sounds/child-laughing-90664.mp3": require("@/assets/sounds/child-laughing-90664.mp3"),
  "/sounds/mujer_llorando-209276.mp3": require("@/assets/sounds/mujer_llorando-209276.mp3"),
  "/sounds/small-dog-angry-growling-273007.mp3": require("@/assets/sounds/small-dog-angry-growling-273007.mp3"),
  "/sounds/yell-45985.mp3": require("@/assets/sounds/yell-45985.mp3"),
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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

const YEseRuidoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<YEseRuidoSound | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sounds, setSounds] = useState<YEseRuidoSound[]>([]);
  const lottieRef = useRef<LottieView>(null);

  const responsiveBoxHeight = screenHeight * 0.6;
  const lottieSize = screenWidth * 0.55;
  const bunnySize = screenWidth * 0.35;
  const { energy, fetchEnergy } = useEnergy();

  const [selectedMedal, setSelectedMedal] = useState<{
    title: string;
    description: string;
    image_path: string;
  } | null>(null);
  const [showMedalModal, setShowMedalModal] = useState(false);

  const { mutateAsync: unlockBadge } = useUnlockBadgeMutation();

  useEffect(() => {
    fetchEnergy();
  }, []);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const response = await Y_ESE_RUIDO_SERVICE.getSounds();
        setSounds(response);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchSounds();
  }, []);

  useEffect(() => {
    if (!sounds[audioIndex]) return;

    let playbackSound: Audio.Sound | null = null;

    const start = async () => {
      setModalVisible(true);
      await new Promise((res) => setTimeout(res, 3000));

      const backendPath = sounds[audioIndex].audio_path;
      const localSound = soundMap[backendPath];

      if (!localSound) {
        setError(true);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(localSound);
      playbackSound = sound;

      setModalVisible(false);
      lottieRef.current?.play();
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if ((status as any).didJustFinish) {
          lottieRef.current?.reset();
          setEndModalVisible(true);
        }
      });
    };

    start();

    return () => {
      playbackSound?.unloadAsync();
    };
  }, [audioIndex, sounds]);

  const handleEndModalClose = () => {
    setEndModalVisible(false);
    setShowChoices(true);
  };

  const handleCorrectAnswerClose = async () => {
    setShowCorrectAnswer(false);
    setSelectedEmotion(null);
    setShowChoices(false);

    if (audioIndex < sounds.length - 1) {
      setAudioIndex(audioIndex + 1);
    } else {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) throw new Error("No auth token found");

        const { data } = await unlockBadge({
          token,
          badge_title: "Algo suena",
        });

        if (data?.title && data?.description && data?.image_path) {
          setSelectedMedal({
            title: data.title,
            description: data.description,
            image_path: data.image_path,
          });
          setShowMedalModal(true);
          return;
        }

        router.replace("/(mainPages)/home");
      } catch (err: any) {
        router.replace("/(mainPages)/home");
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-pink-100">
        <ActivityIndicator size="large" color="#D946EF" />
        <Text className="mt-4 font-bold text-lg">Cargando sonidos...</Text>
      </SafeAreaView>
    );
  }

  if (error || sounds.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-pink-100">
        <Text className="font-bold text-lg text-red-600">Error cargando sonidos</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pink-100">
      <View className="items-center px-4 mt-5">
        <GameHeader
          energy={energy}
          name="Hugo"
          avatar={IMAGES.HAPPY_AXOLOTL_HEAD}
        />
      </View>

      <View className="flex-1 items-center justify-center">
        {selectedEmotion && showCorrectAnswer ? (
          <CorrectAnswerComponent
            visible={showCorrectAnswer}
            onClose={handleCorrectAnswerClose}
            emotion={{
              text: selectedEmotion.emotion,
              title: selectedEmotion.title,
              body: selectedEmotion.body,
              tip: selectedEmotion.tip,
              highlight: selectedEmotion.highlight,
            }}
          />
        ) : showChoices ? (
          <ChoiceEmotionComponent
            audioName={sounds[audioIndex].audio_path}
            onSelect={() => {
              setSelectedEmotion(sounds[audioIndex]);
              setShowCorrectAnswer(true);
            }}
          />
        ) : (
          <View
            className="w-10/12 items-center justify-center border-4 border-pink-600 bg-white"
            style={{
              borderRadius: screenWidth * 0.12,
              height: responsiveBoxHeight,
            }}
          >
            <Text
              className="font-UrbanistExtraBold text-center"
              style={{
                fontSize: screenWidth * 0.07,
                width: "90%",
              }}
            >
              Escucha atentamente...
            </Text>

            <LottieView
              ref={lottieRef}
              source={require("@/assets/animations/sound.json")}
              loop
              style={{
                width: lottieSize,
                height: lottieSize,
                marginVertical: 20,
              }}
            />

            <Image
              source={IMAGES.CONFUSED_BUNNY_2}
              style={{
                position: "absolute",
                bottom: -bunnySize * 0.3,
                alignSelf: "center",
                width: bunnySize,
                height: bunnySize,
                resizeMode: "contain",
                marginLeft: 30,
              }}
            />
          </View>
        )}
      </View>

      {!showCorrectAnswer && (
        <>
          <AutoDismissModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            text="¡Vamos a jugar! Escucha muy bien. ¿Qué emoción escuchas?"
            image={IMAGES.CONFUSED_BUNNY_1}
          />
          <AutoDismissModal
            visible={endModalVisible}
            onClose={handleEndModalClose}
            text="¿Qué emoción escuchaste?"
          />
        </>
      )}

      <Modal
        visible={showMedalModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowMedalModal(false);
          router.replace("/(mainPages)/home");
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onPress={() => {
              setShowMedalModal(false);
              router.replace("/(mainPages)/home");
            }}
          />
          {selectedMedal && (
            <InsigniaDescriptionComponent
              title={selectedMedal.title}
              description={selectedMedal.description}
              medalImageName={selectedMedal.image_path}
              onClose={() => {
              setShowMedalModal(false);
              router.replace("/(mainPages)/home");
              }}
            />

          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default YEseRuidoScreen;
