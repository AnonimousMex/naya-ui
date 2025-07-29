import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Vibration,
  ImageBackground,
} from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { IMAGES, ICONS } from "@/constants/images";
import { WrongAnswerComponent } from "@/components/WrongAnswerComponent";
import LottieView from "lottie-react-native";

// --- Tipado ---
type EmotionItem = {
  text: string;
  color: string;
  borderColor: string;
  image: any;
};

type ChoiceEmotionProps = {
  audioName: string; // ej: "/sounds/baby-cry-101477.mp3"
  onSelect?: (emotion: EmotionItem) => void;
};

// --- Mapeo de audios a imports (debes asegurarte que coincidan con los de soundMap) ---
const AUDIO_MAP: Record<string, any> = {
  "/sounds/baby-cry-101477.mp3": require("@/assets/sounds/baby-cry-101477.mp3"),
  "/sounds/baby-laugh-2-329754.mp3": require("@/assets/sounds/baby-laugh-2-329754.mp3"),
  "/sounds/child-laughing-90664.mp3": require("@/assets/sounds/child-laughing-90664.mp3"),
  "/sounds/mujer_llorando-209276.mp3": require("@/assets/sounds/mujer_llorando-209276.mp3"),
  "/sounds/small-dog-angry-growling-273007.mp3": require("@/assets/sounds/small-dog-angry-growling-273007.mp3"),
  "/sounds/yell-45985.mp3": require("@/assets/sounds/yell-45985.mp3"),
};

// --- Emociones disponibles ---
const EMOTIONS: EmotionItem[] = [
  {
    text: "Alegría",
    color: "#fbb6ce",
    borderColor: "#ec4899",
    image: IMAGES.HAPPY_AXOLOTL_HEAD,
  },
  {
    text: "Tristeza",
    color: "#60a5fa",
    borderColor: "#3b82f6",
    image: IMAGES.SAD_AXOLOTL_1,
  },
  {
    text: "Enojo",
    color: "#fb7185",
    borderColor: "#f43f5e",
    image: IMAGES.ANGRY_LION_1,
  },
  {
    text: "Temor",
    color: "#a78bfa",
    borderColor: "#7c3aed",
    image: IMAGES.SCARED_BUNNY_1,
  },
];


const getCorrectEmotion = (audioName: string): string | null => {
  const lower = audioName.toLowerCase();
  if (lower.includes("laugh")) return "Alegría";
  if (lower.includes("cry") || lower.includes("llorando")) return "Tristeza";
  if (lower.includes("angry") || lower.includes("growling") || lower.includes("yell")) return "Enojo";
  if (lower.includes("fear") || lower.includes("scared")) return "Temor";
  return null;
};

// --- Obtener emociones aleatorias para distractores ---
const getRandomEmotions = (count = 3, excludeTexts: string[] = []) => {
  const filtered = EMOTIONS.filter((e) => !excludeTexts.includes(e.text));
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ChoiceEmotionComponent = ({ audioName, onSelect }: ChoiceEmotionProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);
  const [emotions, setEmotions] = useState<EmotionItem[]>([]);
  const [correctEmotion, setCorrectEmotion] = useState<string | null>(null);

  const [showWrongModal, setShowWrongModal] = useState(false);
  const [selectedWrongEmotion, setSelectedWrongEmotion] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiRef = useRef<LottieView>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const deducedEmotion = getCorrectEmotion(audioName);
    setCorrectEmotion(deducedEmotion);

    const correct = EMOTIONS.find((e) => e.text === deducedEmotion);
    if (correct) {
      const randomTwo = getRandomEmotions(2, [correct.text]);
      setEmotions([correct, ...randomTwo].sort(() => 0.5 - Math.random()));
    } else {
      setEmotions(getRandomEmotions(3));
    }

    const loadAudio = async () => {
      try {
        const audioFile = AUDIO_MAP[audioName];
        if (!audioFile) {
          console.warn("Audio no encontrado en AUDIO_MAP:", audioName);
          return;
        }

        const { sound } = await Audio.Sound.createAsync(audioFile);
        setSound(sound);

        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? 1);
        }

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (!status.isLoaded) return;
          if ((status as AVPlaybackStatusSuccess).didJustFinish) {
            await sound.stopAsync();
            setIsPlaying(false);
            setProgress(0);
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        });
      } catch (error) {
        console.error("Error al cargar el audio:", error);
      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [audioName]);

  const togglePlayback = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
      intervalRef.current = setInterval(async () => {
        const s = await sound.getStatusAsync();
        if (s.isLoaded) {
          setProgress(s.positionMillis ?? 0);
          setDuration(s.durationMillis ?? 1);
        }
      }, 100);
    }
  };

  const handleSelect = (emotion: EmotionItem) => {
    if (emotion.text === correctEmotion) {
      setShowConfetti(true);
      confettiRef.current?.play();

      setTimeout(() => {
        setShowConfetti(false);
        onSelect?.(emotion);
      }, 750);
    } else {
      Vibration.vibrate(500);
      setSelectedWrongEmotion(emotion.text);
      setShowWrongModal(true);
    }
  };

  const progressPercentage = Math.min((progress / duration) * 100, 100);

  return (
    <View className="items-center">
      {showConfetti && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          pointerEvents="none"
        >
          <LottieView
            ref={confettiRef}
            source={require("@/assets/animations/correctChoice.json")}
            autoPlay
            loop={false}
            style={{ width: 800, height: 800 }}
          />
        </View>
      )}

      <View className="w-full px-8 items-center mb-5">
        <Text className="text-4xl font-UrbanistExtraBold text-center">
          ¿Qué emoción escuchaste?
        </Text>
      </View>

      <View className="flex-row items-center w-9/12 mb-6 relative rounded-3xl px-4 space-x-3 py-1 bg-white shadow-lg">
        <Image
          source={ICONS.HEADPHONES_ICON}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Pressable onPress={togglePlayback} className="p-2 rounded-full">
          <Image
            source={isPlaying ? ICONS.PLAY_ICON_2 : ICONS.PLAY_ICON_2}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Pressable>
        <View className="flex-1 h-2 rounded-full bg-black-20 ml-2">
          <View
            className="h-2 bg-pink-10 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
          <Image
            source={ICONS.BUNNY_ICON}
            style={{
              width: 17,
              height: 17,
              position: "absolute",
              top: -9,
              left: `${progressPercentage}%`,
              transform: [{ translateX: -9 }],
            }}
            resizeMode="contain"
          />
        </View>
      </View>

      <ImageBackground
        source={IMAGES.SOUNDS_BACKGROUND}
        resizeMode="cover"
        className="w-full mx-auto rounded-[70px] border-4 border-pink-600 px-9 py-9"
        style={{ overflow: "hidden" }}
      >
        <View className="space-y-24 w-full items-center">
          {emotions.map((emotion, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelect(emotion)}
              className="flex-row items-center px-6 py-4 rounded-[35px] w-10/12 mb-5"
              style={{
                backgroundColor: emotion.color,
                borderColor: emotion.borderColor,
                borderWidth: 4,
                minHeight: 100,
              }}
            >
              <Image
                source={emotion.image}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 12,
                  marginBottom: -13,
                }}
                resizeMode="contain"
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  className="text-4xl font-UrbanistExtraBold text-white"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {emotion.text}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {showWrongModal && correctEmotion && selectedWrongEmotion && (
          <WrongAnswerComponent
            visible={showWrongModal}
            onClose={() => setShowWrongModal(false)}
            correctOption={correctEmotion}
            wrongOption={selectedWrongEmotion}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default ChoiceEmotionComponent;
