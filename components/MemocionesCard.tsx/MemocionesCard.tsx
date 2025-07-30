import React from "react";
import { Pressable, View } from "react-native";
import { MemocionesBackCard } from "../MemocionesBackCard";
import { MemocionesFrontCard } from "../MemocionesFrontCard";

export type CardData = {
  id: number;
  pairId: string;
  kind: "emotion" | "situation";
  img?: any;
  text: string;
};

interface Props {
  data: CardData;
  isFlipped: boolean;
  matched: boolean;
  disabled: boolean;
  onPress: () => void;
}

const MemocionesCard: React.FC<Props> = ({
  data,
  isFlipped,
  matched,
  disabled,
  onPress,
}) => (
  <Pressable onPress={disabled ? undefined : onPress} className="mb-4 relative">
    <View>
      {isFlipped ? (
        <MemocionesFrontCard kind={data.kind} img={data.img} text={data.text} />
      ) : (
        <MemocionesBackCard />
      )}

      {matched && (
        <View
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        />
      )}
    </View>
  </Pressable>
);

export default MemocionesCard;
