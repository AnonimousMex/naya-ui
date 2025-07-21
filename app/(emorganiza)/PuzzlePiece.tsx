import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import {
  getRandomRotation,
  PIECES_DISTANCE,
  PIECE_SCALE,
  PUZZLE_PIECES,
  PUZZLE_PIECE_BOX_SIZE,
  PUZZLE_PIECE_SIZE,
  SVG_SIZE,
} from "../../constants/puzzleConstants";

import Shape from "./Shape";

type Props = {
  index: number;
  shape: string;
  shuffledPieces: number[];
  correctPieces: SharedValue<number>;
};

function PuzzlePiece({ index, shape, shuffledPieces, correctPieces }: Props) {
  const shuffledIndex = shuffledPieces[index];
  const piece = PUZZLE_PIECES[index];
  const shuffledPiece = PUZZLE_PIECES[shuffledIndex];
  const delay = 1150 + index * 150;
  const randomRotation = getRandomRotation();
  const safeSpacing = PUZZLE_PIECE_SIZE / 2;

  // Usar el mismo cálculo que PuzzleSpot para grid 3x3
  const initialX = Math.round(PUZZLE_PIECE_SIZE * piece.x);
  const initialY = Math.round(PUZZLE_PIECE_SIZE * piece.y);
  const shuffledX = Math.round(SVG_SIZE * shuffledPiece.x - PIECES_DISTANCE);
  const shuffledY = Math.round(SVG_SIZE * shuffledPiece.y);

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const z = useSharedValue(0);
  const isEnabled = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(delay, withSpring(shuffledX));
    translateY.value = withDelay(delay, withSpring(shuffledY));
    scale.value = withDelay(delay, withSpring(PIECE_SCALE));
    rotate.value = withDelay(delay, withSpring(randomRotation));
    isEnabled.value = withDelay(delay, withTiming(1));
  }, [shuffledPieces]);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      if (!isEnabled.value) return;
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
      scale.value = withSpring(1);
      rotate.value = withSpring(0);
      z.value = 1;
    },
    onEnd: () => {
      if (!isEnabled.value) return;
      const isCorrect =
        translateX.value >= initialX - safeSpacing &&
        translateX.value <= initialX + safeSpacing &&
        translateY.value <= initialY + safeSpacing &&
        translateY.value >= initialY - safeSpacing;
      translateX.value = withSpring(isCorrect ? initialX : shuffledX);
      translateY.value = withSpring(isCorrect ? initialY : shuffledY);
      scale.value = withSpring(isCorrect ? 1 : PIECE_SCALE);
      rotate.value = withSpring(isCorrect ? 0 : randomRotation);
      z.value = 0; // Set directly to 0 without animation
      if (isCorrect) {
        isEnabled.value = 0;
        correctPieces.value = correctPieces.value + 1;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: Math.round(translateX.value) },
      { translateY: Math.round(translateY.value) },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    zIndex: Math.round(z.value),
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Shape type="piece" shape={shape} piece={piece} />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: PUZZLE_PIECE_BOX_SIZE,
    height: PUZZLE_PIECE_BOX_SIZE,
  },
});

export default PuzzlePiece;
