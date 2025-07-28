import { GameHeader } from "@/components/GameHeader";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PuzzleSpot, PuzzlePiece } from "@/components/puzzle";
// Memoized components for optimization
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
  withDelay,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useCallback, useState, useEffect } from "react";

function EmorganizaMainPage() {
  // Estados principales
  const [currentShape, setCurrentShape] = useState(0);
  const [shuffledPieces, setShuffledPieces] = useState(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
  const [phase, setPhase] = useState<'puzzle' | 'emotion' | 'result'>('puzzle');
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  // Imagen dinámica por ronda (simulación, reemplaza por la que venga del backend)
  const [image, setImage] = useState(IMAGES.HAPPY_BUNNY_2);
  // Simulación: actualiza la imagen en cada ronda (aquí deberías hacer la petición al backend)
  useEffect(() => {
    // Aquí iría la lógica para obtener la imagen del backend
    // setImage(await fetchImage(currentRound));
    // Ejemplo: alterna entre dos imágenes
    setImage(currentRound % 2 === 1 ? IMAGES.HAPPY_BUNNY_2 : IMAGES.HAPPY_CAT_HEAD);
  }, [currentRound]);

  const shape = SHAPES[currentShape];
  const scale = useSharedValue(0);
  const correctPieces = useSharedValue(0);

  // Reinicia el puzzle para el siguiente round
  const handleReset = useCallback(() => {
    setCurrentShape((prev) => (prev + 1 === SHAPES.length ? 0 : prev + 1));
    setShuffledPieces(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
    correctPieces.value = 0;
    setSelectedEmotion(null);
    setPhase('puzzle');
  }, []);

  const triggerPhaseEmotion = () => {
    setTimeout(() => {
      setPhase('emotion');
    }, 350);
  };

  const handleResetAndPhase = () => {
    handleReset();
    setPhase('emotion');
  };

  useAnimatedReaction(
    () => correctPieces.value >= 9,
    (isDone) => {
      if (isDone && phase !== 'result') {
        scale.value = withTiming(0, {}, (isFinished) => {
          if (isFinished) {
            runOnJS(handleResetAndPhase)();
          }
        });
      }
    },
  );

  useEffect(() => {
    if (phase === 'puzzle') {
      scale.value = 0;
      scale.value = withSpring(1, { damping: 10, stiffness: 80, mass: 1, overshootClamping: false, restSpeedThreshold: 0.01, restDisplacementThreshold: 0.01 });
    }
  }, [phase, shuffledPieces]);

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    if (currentRound < 3) {
      setCurrentRound((prev) => prev + 1);
      handleReset();
    } else {
      setPhase('result');
    }
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
    <SafeAreaView className="w-full h-full bg-pink-200 pt-24 items-center">
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
        <Text className="text-gray-30 font-UrbanistExtraBold text-[18px]">Ronda {currentRound} de 3</Text>
      </View>

      {phase === 'puzzle' && (
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

          <View className="flex justify-center items-center mt-4" style={{ zIndex: -1 }}>
            <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
              <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">Arma el rompecabezas</Text>
            </View>
          </View>
        </>
      )}


      {phase === 'emotion' && (
        <>
          <View className="rounded-2xl w-10/12 aspect-square items-center justify-center">
            <Image
              source={image}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
          <View className="flex justify-center items-center mt-4" style={{ zIndex: -1 }}>
            <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
              <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">Arrastra aquí...</Text>
            </View>
          </View>
          <View className="flex flex-row flex-wrap justify-center items-center mt-4 gap-2">
            {['Temor', 'Alegría', 'Tristeza', 'Enojo', 'Vergüenza'].map((emotion) => (
              <TouchableOpacity
                key={emotion}
                className="px-4 py-2 rounded-full m-2"
                style={{ backgroundColor: emotion === selectedEmotion ? '#fbbf24' : '#e5e7eb' }}
                onPress={() => handleEmotionSelect(emotion)}
              >
                <Text className="font-UrbanistExtraBold text-[16px]">{emotion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {phase === 'result' && (
        <View className="flex flex-col items-center justify-center mt-8">
          <Text className="font-UrbanistExtraBold text-[22px] mb-4">¡Juego terminado!</Text>
          <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">Gracias por jugar las 3 rondas.</Text>
        </View>
      )}

      <View className="flex-1 flex flex-col justify-end w-full" style={{ zIndex: -2 }}>
        <View className="bg-white rounded-t-[50px] px-6 pt-6 pb-8 min-h-[350px] w-full mt-8 relative"></View>
      </View>

      <SafeAreaView edges={["bottom"]} className="bg-white absolute bottom-0 left-0 right-0 z-50">
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default EmorganizaMainPage;
