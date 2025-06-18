import React from "react";
import { View } from "react-native";
import { AnswerComponent } from "@/components/AnswerComponent";

type AnswerListProps = {
  backgroundColor: string;
  textColor: string;
};

const answersText = [
  "Escuchar mi canción favorita",
  "Abrazar a alguien que quiero",
  "Reír a carcajadas",
  "Bailar libremente",
  "Disfrutar de un paseo al aire libre",
];

const AnswerDisplayComponent = ({
  backgroundColor = "#FFF27C",
  textColor = "#000000",
}: AnswerListProps) => {
  return (
    <View className="space-y-2 mt-6">
      {answersText.map((text, index) => (
        <AnswerComponent
          key={index}
          backgroundColor={backgroundColor}
          textColor={textColor}
          displayText={text}
          alignment={index % 2 === 0 ? "flex-start" : "flex-end"}
        />
      ))}
    </View>
  );
};

export default AnswerDisplayComponent;
