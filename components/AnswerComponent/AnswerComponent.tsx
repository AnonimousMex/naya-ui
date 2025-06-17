import React from "react";
import { View, Text } from "react-native";

type AnswerProps = {
  backgroundColor: string;
  textColor: string;
  displayText: string;
  alignment?: "flex-start" | "flex-end";
};

const AnswerComponent = ({
  backgroundColor,
  textColor,
  displayText,
  alignment = "flex-start",
}: AnswerProps) => {
  return (
    <View
      className="flex-row items-center rounded-[50px] mb-5"
      style={{ backgroundColor, alignSelf: alignment }}
    >
      <Text
        className="px-10 py-2 font-UrbanistExtraBold"
        style={{ color: textColor }}
      >
        {displayText}
      </Text>
    </View>
  );
};

export default AnswerComponent;
