import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Vibration,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { IMAGES, ICONS } from "@/constants/images";
import { WrongAnswerComponent } from "@/components/WrongAnswerComponent";
import LottieView from "lottie-react-native";

const { width: screenWidth } = Dimensions.get("window");

type EmotionItem = {
  text: string;
  color: string;
  borderColor: string;
  image: any;
};

type ChoiceEmotionProps = {
  audioName: string;
  onSelect?: (emotion: EmotionItem) => void;
};

const AUDIO_MAP: Record<string, any> = {
  "/sounds/baby-cry-101477.mp3": require("@/assets/sounds/baby-cry-101477.mp3"),
  "/sounds/baby-laugh-2-329754.mp3": require("@/assets/sounds/baby-laugh-2-329754.mp3"),
  "/sounds/child-laughing-90664.mp3": require("@/assets/sounds/child-laughing-90664.mp3"),
  "/sounds/mujer_llorando-209276.mp3": require("@/assets/sounds/mujer_llorando-209276.mp3"),
  "/sounds/small-dog-angry-growling-273007.mp3": require("@/assets/sounds/small-dog-angry-growling-273007.mp3"),
  "/sounds/yell-45985.mp3": require("@/assets/sounds/yell-45985.mp3"),
};


const EMOTIONS: EmotionItem[] = [
  {
    text: "Alegría",
    color: "#FFD700",
    borderColor: "#FFEA78",
    image: IMAGES.HAPPY_PANDA_1,
  },
  {
    text: "Tristeza",
    color: "#1E90FF",
    borderColor: "#7ABDFF",
    image: IMAGES.SAD_AXOLOTL_1,
  },
  {
    text: "Enojo",
    color: "#FF4500",
    borderColor: "#FFB99F",
    image: IMAGES.ANGRY_LION_1,
  },
  {
    text: "Temor",
    color: "#800080",
    borderColor: "#C34FC3",
    image: IMAGES.FEAR_BUNNY_3,
  },
];

const getCorrectEmotion = (audioName: string): string | null => {
  const lower = audioName.toLowerCase();
  if (lower.includes("laugh")) return "Alegría";
  if (lower.includes("cry") || lower.includes("llorando")) return "Tristeza";
  if (lower.includes("angry") || lower.includes("growling") || lower.includes("yell"))
    return "Enojo";
  if (lower.includes("fear") || lower.includes("scared")) return "Temor";
  return null;
};

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
        if (!audioFile) return;

        const { sound } = await Audio.Sound.createAsync(audioFile);
        setSound(sound);

        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? 1);
        }

        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          if ((status as AVPlaybackStatusSuccess).didJustFinish) {
            sound.stopAsync();
            setIsPlaying(false);
            setProgress(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        });
      } catch {

      }
    };

    loadAudio();

    return () => {
      sound?.unloadAsync();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [audioName]);

  const togglePlayback = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
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
    <View className="items-center w-full">
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
            style={{
              width: screenWidth * 1.8,
              height: screenWidth * 1.8,
            }}
          />
        </View>
      )}

      <Text
        className="text-center font-UrbanistExtraBold mt-5 mb-6"
        style={{ fontSize: screenWidth * 0.07 }}
      >
        ¿Qué emoción escuchaste?
      </Text>

      <View
        className="flex-row items-center bg-white rounded-3xl px-3 py-2 shadow-lg mb-6"
        style={{
          width: screenWidth * 0.75,
          maxWidth: 380,
        }}
      >
        <Image
          source={ICONS.HEADPHONES_ICON}
          style={{
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            resizeMode: "contain",
          }}
        />
        <Pressable onPress={togglePlayback} className="p-2 rounded-full">
          <Image
            source={isPlaying ? ICONS.PAUSE_ICON : ICONS.PLAY_ICON_2}
            style={{
              width: screenWidth * 0.072,
              height: screenWidth * 0.072,
              resizeMode: "contain",
            }}
          />
        </Pressable>
        <View className="flex-1 h-2 rounded-full bg-black-20 ml-2 relative">
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
              top: -8,
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
        className="rounded-[70px] border-4 border-pink-600"
        style={{
          width: screenWidth * 0.85,
          paddingHorizontal: screenWidth * 0.04,
          overflow: "hidden",
          minHeight: screenWidth * 1.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          className="w-full"
          style={{
            alignItems: "center",
            marginVertical: screenWidth * 0.05,
          }}
        >
          {emotions.map((emotion, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelect(emotion)}
              className="flex-row items-center rounded-[35px]"
              style={{
                width: "95%",
                backgroundColor: emotion.color,
                borderColor: emotion.borderColor,
                borderWidth: 4,
                minHeight: screenWidth * 0.3,
                marginBottom: index !== emotions.length - 1 ? 25 : 0,
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={emotion.image}
                style={{
                  width: screenWidth * 0.25,
                  height: screenWidth * 0.25,
                  marginRight: 10,
                  marginBottom: -10,
                  resizeMode: "contain",
                }}
              />
              <Text
                className="text-white font-UrbanistExtraBold"
                style={{ fontSize: screenWidth * 0.07 }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {emotion.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </ImageBackground>

      {showWrongModal && correctEmotion && selectedWrongEmotion && (
        <WrongAnswerComponent
          visible={showWrongModal}
          onClose={() => setShowWrongModal(false)}
          correctOption={correctEmotion}
          wrongOption={selectedWrongEmotion}
        />
      )}
    </View>
  );
};

export default ChoiceEmotionComponent;
