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
  imageSource?: any;
  piecesDistance: number;
};

function PuzzlePiece({ index, shape, shuffledPieces, correctPieces, imageSource, piecesDistance }: Props) {
  useEffect(() => {
    if (isEnabled.value) {
      translateX.value = Math.round(SVG_SIZE * shuffledPiece.x);
      translateY.value = Math.round(SVG_SIZE * shuffledPiece.y + 2 * piecesDistance);
    }
  }, [piecesDistance, shuffledPieces]);
  const shuffledIndex = shuffledPieces[index];
  const piece = PUZZLE_PIECES[index];
  const shuffledPiece = PUZZLE_PIECES[shuffledIndex];
  const randomRotation = getRandomRotation();
  const safeSpacing = PUZZLE_PIECE_SIZE / 2;

  const spotX = Math.round(PUZZLE_PIECE_SIZE * piece.x);
  const spotY = Math.round(PUZZLE_PIECE_SIZE * piece.y);
  const initialX = Math.round(SVG_SIZE * shuffledPiece.x);
  const initialY = Math.round(SVG_SIZE * shuffledPiece.y + 2 * piecesDistance);

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(PIECE_SCALE);
  const rotate = useSharedValue(randomRotation);
  const z = useSharedValue(0);
  const isEnabled = useSharedValue(1);

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
        translateX.value >= spotX - safeSpacing &&
        translateX.value <= spotX + safeSpacing &&
        translateY.value <= spotY + safeSpacing &&
        translateY.value >= spotY - safeSpacing;
      translateX.value = withSpring(isCorrect ? spotX : initialX);
      translateY.value = withSpring(isCorrect ? spotY : initialY);
      scale.value = withSpring(isCorrect ? 1 : PIECE_SCALE);
      rotate.value = withSpring(isCorrect ? 0 : randomRotation);
      z.value = 0; 
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
        <Shape type="piece" shape={shape} piece={piece} imageSource={imageSource} />
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
