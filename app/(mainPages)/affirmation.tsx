import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGES } from "@/constants/images";
import { router } from "expo-router";
import { MainButton } from "@/components/MainButton";
import { AUTH_SERVICE } from "@/services/auth";

type TDailyMessage = {
  id: string;
  title: string;
  description: string;
};

const Affirmation = () => {
  const bgColors = [
    "#FFCE5C",
    "#4FA0FF",
    "#8978E3",
    "#8BDF4B",
    "#F77078",
  ] as const;

  const happyImages = Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("HAPPY_") && !key.includes("_HEAD"))
    .map(([_, value]) => value);

  const [affirmation, setAffirmation] = useState<TDailyMessage>({
    id: "",
    title: "",
    description: "",
  });

  const [bgColor, setBgColor] = useState<(typeof bgColors)[number]>(
    bgColors[0],
  );
  const [randomImage, setRandomImage] = useState(happyImages[0]);

  useEffect(() => {
    const loadAffirmationVisuals = async () => {
      const today = new Date().toDateString();

      const storedDate = await AsyncStorage.getItem("lastAffirmationDate");
      const storedImageIndex = await AsyncStorage.getItem(
        "lastAffirmationImageIndex",
      );
      const storedColorIndex = await AsyncStorage.getItem(
        "lastAffirmationColorIndex",
      );
      const storedAffirmation = await AsyncStorage.getItem(
        "lastAffirmationData",
      );

      if (
        storedDate === today &&
        storedImageIndex &&
        storedColorIndex &&
        storedAffirmation
      ) {
        setRandomImage(happyImages[parseInt(storedImageIndex)]);
        setBgColor(bgColors[parseInt(storedColorIndex)]);
        setAffirmation(JSON.parse(storedAffirmation));
      } else {
        const newImageIndex = Math.floor(Math.random() * happyImages.length);
        const newColorIndex = Math.floor(Math.random() * bgColors.length);

        try {
          const data = await AUTH_SERVICE.getDailyMessage();

          setRandomImage(happyImages[newImageIndex]);
          setBgColor(bgColors[newColorIndex]);
          setAffirmation(data);

          await AsyncStorage.setItem("lastAffirmationDate", today);
          await AsyncStorage.setItem(
            "lastAffirmationImageIndex",
            newImageIndex.toString(),
          );
          await AsyncStorage.setItem(
            "lastAffirmationColorIndex",
            newColorIndex.toString(),
          );
          await AsyncStorage.setItem(
            "lastAffirmationData",
            JSON.stringify(data),
          );
        } catch (error) {
          console.error("Error al cargar afirmación diaria:", error);
          // Podrías manejar un fallback aquí
        }
      }
    };

    loadAffirmationVisuals();
  }, []);

  return (
    <View
      className="flex-1 flex-col px-7 justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      <Image
        className="mb-10 self-center"
        source={randomImage}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
        }}
      />
      <Text className="text-3xl font-extrabold text-brown-700 text-center mb-8 text-white">
        {affirmation.title}
      </Text>
      <Text className="text-lg font-extrabold text-brown-700 text-center mb-8 text-white">
        {affirmation.description}
      </Text>
      <MainButton
        mainText="Continuar"
        onPress={() => router.push("/(mainPages)/home")}
        className="w-80 py-3 mt-6"
        style={{ backgroundColor: "#fff" }}
      />
    </View>
  );
};

export default Affirmation;
