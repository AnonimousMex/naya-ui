import { memo } from "react";
import Svg, {
  ClipPath,
  Defs,
  Path,
  Use,
  Image,
  Filter,
  FeGaussianBlur,
} from "react-native-svg";

import {
  COLORS,
  SVG_BOX_SIZE,
  SVG_SIZE,
} from "../../constants/puzzleConstants";

type Props = {
  type: "piece" | "spot";
  shape: string;
  piece: {
    x: number;
    y: number;
    path: string;
  };
  imageSource?: any;
};

function Shape({ type, shape, piece, imageSource }: Props) {
  const shapePathX = Math.round(-(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.x);
  const shapePathY = Math.round(-(SVG_SIZE / 2) - (SVG_SIZE / 2) * piece.y);

  const isPiece = type === "piece";

  const PUZZLE_BOARD_SIZE = SVG_SIZE * 3;
  const pieceOffset = (SVG_BOX_SIZE - SVG_SIZE) / 2;
  const normX = piece.x + 1;
  const normY = piece.y + 1;
  const imageX = pieceOffset - normX * SVG_SIZE;
  const imageY = pieceOffset - normY * SVG_SIZE;

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SVG_BOX_SIZE} ${SVG_BOX_SIZE}`}
    >
      <Defs>
        <ClipPath id="pieceClip">
          <Path d={piece.path} />
        </ClipPath>
        <Path id="puzzle" d={piece.path} />
        <ClipPath id="shape">
          <Path d={shape} x={shapePathX} y={shapePathY} />
        </ClipPath>
        <Filter id="heavyBlur">
          <FeGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur1" />
          <FeGaussianBlur in="blur1" stdDeviation="60" result="blur2" />
          <FeGaussianBlur in="blur2" stdDeviation="60" result="blur3" />
          <FeGaussianBlur in="blur3" stdDeviation="60" result="blur4" />
          <FeGaussianBlur in="blur4" stdDeviation="60" result="blur5" />
          <FeGaussianBlur in="blur5" stdDeviation="60" result="blur6" />
          <FeGaussianBlur in="blur6" stdDeviation="60" result="blur7" />
          <FeGaussianBlur in="blur7" stdDeviation="60" result="blur8" />
          <FeGaussianBlur in="blur8" stdDeviation="60" result="blur9" />
          <FeGaussianBlur in="blur9" stdDeviation="60" result="blur10" />
          <FeGaussianBlur in="blur10" stdDeviation="60" result="blur11" />
          <FeGaussianBlur in="blur11" stdDeviation="60" />
        </Filter>
      </Defs>

      {isPiece && imageSource ? (
        <Image
          href={imageSource}
          x={imageX}
          y={imageY}
          width={PUZZLE_BOARD_SIZE}
          height={PUZZLE_BOARD_SIZE}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#pieceClip)"
        />
      ) : (
        <>
          {type === "spot" && imageSource ? (
            <Image
              href={imageSource}
              x={imageX}
              y={imageY}
              width={PUZZLE_BOARD_SIZE}
              height={PUZZLE_BOARD_SIZE}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#pieceClip)"
              opacity={0.5}
              filter="url(#heavyBlur)"
            />
          ) : (
            <>
              {isPiece && <Use href="#puzzle" fill={COLORS.white} />}
              <Use
                href="#puzzle"
                fill={isPiece ? COLORS.primary : COLORS.lightGrey}
                clipPath="url(#shape)"
              />
            </>
          )}
        </>
      )}

      {/* Borde siempre visible */}
      <Use
        href="#puzzle"
        stroke={isPiece ? COLORS.black : COLORS.darkGrey}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default memo(Shape);
