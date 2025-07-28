import { GameHeader } from "@/components/GameHeader";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PuzzleSpot, PuzzlePiece } from "@/components/Puzzle";
import { EmorganizaEmotionsPanel } from "@/components/EmorganizaEmotionsPanel";
const MemoPuzzleSpot = React.memo(PuzzleSpot);
const MemoPuzzlePiece = React.memo(PuzzlePiece);
import {
  PIECES_DISTANCE,
  PUZZLE_PIECES,
  SHAPES,
  shuffle,
} from "@/constants/puzzleConstants";
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useCallback, useState, useEffect } from "react";

export type EmotionKey =
  | "feliz"
  | "triste"
  | "enojo"
  | "temor"
  | "vergüenza"

const emotionsWithColors: { key: EmotionKey; color: string }[] = [
  { key: "temor", color: "#8B008B" },
  { key: "feliz", color: "#FFD700" },
  { key: "triste", color: "#1E90FF" },
  { key: "enojo", color: "#FF4500" },
  { key: "vergüenza", color: "#FF69B4" },
];

const EMOTION_IMAGES: Record<EmotionKey, any[]> = {
  feliz: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("HAPPY_") && !key.includes("HEAD"))
    .map(([, value]) => value),
  triste: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("SAD_"))
    .map(([, value]) => value),
  enojo: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("ANGRY_"))
    .map(([, value]) => value),
  temor: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("FEAR_"))
    .map(([, value]) => value),
  vergüenza: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("SHAME_"))
    .map(([, value]) => value),
};

function getRandomEmotionImage(): { image: any; emotion: EmotionKey } {
  const emotions = Object.keys(EMOTION_IMAGES) as EmotionKey[];
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const images = EMOTION_IMAGES[emotion];
  const image = images[Math.floor(Math.random() * images.length)];
  return { image, emotion };
}

function EmorganizaMainPage() {
  // Estados principales
  const [currentShape, setCurrentShape] = useState(0);
  const [shuffledPieces, setShuffledPieces] = useState(() =>
    shuffle([...Array(PUZZLE_PIECES.length).keys()]),
  );
  const [phase, setPhase] = useState<"puzzle" | "emotion" | "result">("puzzle");
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(
    null,
  );

  const [image, setImage] = useState<any>(IMAGES.HAPPY_BUNNY_2);
  const [roundEmotion, setRoundEmotion] = useState<EmotionKey | null>(null);

  useEffect(() => {
    const { image, emotion } = getRandomEmotionImage();
    setImage(image);
    setRoundEmotion(emotion);
  }, [currentRound]);

  const shape = SHAPES[currentShape];
  const scale = useSharedValue(0);
  const correctPieces = useSharedValue(0);

  const handleReset = useCallback(() => {
    setCurrentShape((prev) => (prev + 1 === SHAPES.length ? 0 : prev + 1));
    setShuffledPieces(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
    correctPieces.value = 0;
    setSelectedEmotion(null);
    setPhase("puzzle");
  }, []);

  const triggerPhaseEmotion = () => {
    setTimeout(() => {
      setPhase("emotion");
    }, 350);
  };

  const handleResetAndPhase = () => {
    handleReset();
    setPhase("emotion");
  };

  useAnimatedReaction(
    () => correctPieces.value >= 9,
    (isDone) => {
      if (isDone && phase !== "result") {
        scale.value = withTiming(0, {}, (isFinished) => {
          if (isFinished) {
            runOnJS(handleResetAndPhase)();
          }
        });
      }
    },
  );

  useEffect(() => {
    if (phase === "puzzle") {
      scale.value = 0;
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 80,
        mass: 1,
        overshootClamping: false,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.01,
      });
    }
  }, [phase, shuffledPieces]);

  const handleEmotionSelect = (emotion: EmotionKey) => {
    setSelectedEmotion(emotion);
    const isCorrect = emotion.toLowerCase() === roundEmotion;

    setTimeout(() => {
      if (isCorrect) {
        if (currentRound < 3) {
          setCurrentRound((prev) => prev + 1);
          handleReset();
        } else {
          setPhase("result");
        }
      } else {
        setSelectedEmotion(null);
      }
    }, 500); 
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: PIECES_DISTANCE / 2 }, { scale: scale.value }],
  }));

  const boardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: 3 * 240,
      height: 3 * 240,
      alignSelf: "center",
      marginTop: 40,
      backgroundColor: "white",
    },
  });

  return (
    <SafeAreaView className="w-full h-full bg-pink-200 pt-24 items-center" edges={["top", "bottom"]}>
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView
          edges={["top"]}
          className="flex items-center justify-center mt-2"
        >
          <GameHeader
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
            energy={3}
          />
        </SafeAreaView>
      </View>

      <View className="mt-2 mb-2">
        <Text className="text-gray-30 font-UrbanistExtraBold text-[18px]">
          Ronda {currentRound} de 3
        </Text>
      </View>

      {phase === "puzzle" && (
        <>
          <View className="rounded-2xl w-10/12 aspect-square items-center justify-center">
            <Animated.View
              style={[boardAnimatedStyle]}
              className="w-10/12 aspect-square items-center justify-center"
            >
              {PUZZLE_PIECES.map((_, i) => (
                <MemoPuzzleSpot
                  key={`spot-${i}`}
                  index={i}
                  shape={shape}
                  imageSource={image}
                />
              ))}
              {PUZZLE_PIECES.map((_, i) => (
                <MemoPuzzlePiece
                  key={`piece-${i}`}
                  index={i}
                  shape={shape}
                  shuffledPieces={shuffledPieces}
                  correctPieces={correctPieces}
                  imageSource={image}
                />
              ))}
            </Animated.View>
          </View>

          <View
            className="flex justify-center items-center mt-4"
            style={{ zIndex: -1 }}
          >
            <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
              <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">
                Arma el rompecabezas
              </Text>
            </View>
          </View>

          <View
            className="flex-1 flex flex-col justify-end w-full"
            style={{ zIndex: -2 }}
          >
            <View className="bg-white rounded-t-[50px] px-6 pt-6 pb-8 min-h-[350px] w-full mt-8 relative"></View>
          </View>
        </>
      )}

      {phase === "emotion" && (
        <>
            <View 
              className="rounded-[40px] w-10/12 aspect-square items-center justify-center"
              style={{ backgroundColor: '#ededed', borderColor: '#d2d2d2', borderWidth: 6 }}
            >
              <Image
              source={image}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
          <View
            className="flex justify-center items-center mt-4"
            style={{ zIndex: -1 }}
          >
            <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
              <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">
                Selecciona la emoción
              </Text>
            </View>
          </View>
          <View
            className="flex-1 flex flex-col justify-end w-full"
            style={{ zIndex: -2 }}
          >
            <EmorganizaEmotionsPanel
              emotions={emotionsWithColors}
              onEmotionSelect={handleEmotionSelect}
              selectedEmotion={selectedEmotion}
            />
          </View>
        </>
      )}

      {phase === "result" && (
        <View className="flex flex-col items-center justify-center mt-8">
          <Text className="font-UrbanistExtraBold text-[22px] mb-4">
            ¡Juego terminado!
          </Text>
          <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">
            Gracias por jugar las 3 rondas.
          </Text>
        </View>
      )}

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50 pb-6"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default EmorganizaMainPage;
