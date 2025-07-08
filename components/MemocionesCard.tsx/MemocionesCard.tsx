import React from "react";
import { Pressable } from "react-native";
import { MemocionesBackCard } from "../MemocionesBackCard";
import { MemocionesFrontCard } from "../MemocionesFrontCard";

export type CardData = {
  id: number;
  pairId: number;
  kind: "emotion" | "situation";
  img?: any;
  text: string;
};

interface Props {
  data: CardData;
  isFlipped: boolean;
  disabled: boolean;
  onPress: () => void;
}

const MemocionesCard: React.FC<Props> = ({
  data,
  isFlipped,
  disabled,
  onPress,
}) => (
  <Pressable onPress={disabled ? undefined : onPress} className="mb-4">
    {isFlipped ? (
      <MemocionesFrontCard kind={data.kind} img={data.img} text={data.text} />
    ) : (
      <MemocionesBackCard />
    )}
  </Pressable>
);

export default MemocionesCard;
