import { memo } from "react";
import Svg, { ClipPath, Defs, Path, Use, Pattern, Image } from "react-native-svg";

import { COLORS, SVG_BOX_SIZE, SVG_SIZE } from "../../constants/puzzleConstants";

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
          {isPiece && <Use href="#puzzle" fill={COLORS.white} />}
          <Use
            href="#puzzle"
            fill={isPiece ? COLORS.primary : COLORS.lightGrey}
            clipPath="url(#shape)"
          />
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
