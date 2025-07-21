import { GameHeader } from "@/components/GameHeader";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PuzzleSpot, PuzzlePiece } from "@/components/puzzle";
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
  const [currentShape, setCurrentShape] = useState(0);
  const [shuffledPieces, setShuffledPieces] = useState(() =>
    shuffle([...Array(PUZZLE_PIECES.length).keys()]),
  );

  const shape = SHAPES[currentShape];

  const scale = useSharedValue(0);
  const correctPieces = useSharedValue(0);

  const handleReset = useCallback(() => {
    setCurrentShape((prev) => (prev + 1 === SHAPES.length ? 0 : prev + 1));
    setShuffledPieces(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
    correctPieces.value = 0;
  }, []);

  useEffect(() => {
    scale.value = withSpring(1);
  }, [shuffledPieces]);

  useAnimatedReaction(
    () => correctPieces.value >= 9, // Cambiado de 4 a 9 para 3x3
    (isDone) => {
      if (isDone) {
        scale.value = withDelay(
          1000,
          withTiming(0, {}, (isFinished) => {
            if (isFinished) runOnJS(handleReset)();
          }),
        );
      }
    },
  );

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
      width: 3 * 240, // 3x3 grid: 3 * PIECES_DISTANCE
      height: 3 * 240, // 3x3 grid: 3 * PIECES_DISTANCE
      alignSelf: "center",
      marginTop: 40,
      backgroundColor: "white", // Optional: for debugging visibility
    },
  });

  return (
    <SafeAreaView className="w-full h-full bg-pink-200 pt-24">
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView
          edges={["top"]}
          className="flex items-center justify-center mt-2"
        >
          <GameHeader
            energyActive={2}
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
          />
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="pt-5"
      >
        <View className="bg-gray-200 rounded-2xl w-10/12 aspect-square items-center justify-center shadow-md">
          <Animated.View
            style={[{ width: "100%", height: "100%" }, boardAnimatedStyle]}
            className="bg-gray-200 rounded-2xl w-10/12 aspect-square items-center justify-center shadow-md"
          >
            {PUZZLE_PIECES.map((_, i) => (
              <PuzzleSpot key={`spot-${i}`} index={i} shape={shape} />
            ))}
            {PUZZLE_PIECES.map((_, i) => (
              <PuzzlePiece
                key={`spot-${i}`}
                index={i}
                shape={shape}
                shuffledPieces={shuffledPieces}
                correctPieces={correctPieces}
              />
            ))}
          </Animated.View>
        </View>

        <View className="flex justify-center items-center mt-4">
          <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
            <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">
              Arma el rompecabezas
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="flex-1 flex flex-col justify-end">
        <View className="bg-white rounded-t-[50px] px-6 pt-6 pb-8 min-h-[300px] w-full mt-8 relative"></View>
      </View>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default EmorganizaMainPage;
