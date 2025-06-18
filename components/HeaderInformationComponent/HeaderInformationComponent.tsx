import React from "react";
import { View, Text } from "react-native";

const HeaderInformationComponent = ({
  borderColor = "#A47551",
  label = "27/Junio/2025",
  name = "Hilary Arroyo Martínez",
  type = "date",
  textColor = "#1E3A8A",
}) => {
  const displayText = type === "name" ? name : `Test ${label}`;

  return (
    <View
      className="flex-row items-center bg-white rounded-[50px] border-4"
      style={{ borderColor }}
    >
      <Text
        className="px-10 font-UrbanistExtraBold"
        style={{ color: textColor }}
      >
        {displayText}
      </Text>
    </View>
  );
};

export default HeaderInformationComponent;
