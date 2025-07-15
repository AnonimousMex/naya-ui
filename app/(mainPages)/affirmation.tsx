import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGES } from "@/constants/images";
import { router } from "expo-router";
import { MainButton } from "@/components/MainButton";

const Affirmation = () => {
  const bgColors = [
    "#FFCE5C",
    "#4FA0FF",
    "#8978E3",
    "#8BDF4B",
    "#F77078",
  ] as const;

  const affirmations = [
    {
      title: "Confío en mí mismo",
      description:
        "Hoy elijo confiar en mí. Soy capaz de aprender cosas nuevas, hacer amigos y resolver problemas. Mi corazón es valiente y mi mente es fuerte.",
    },
    {
      title: "Soy valiente",
      description:
        "No importa si algo es difícil. Yo puedo intentarlo con todo mi corazón y dar lo mejor de mí cada día.",
    },
    {
      title: "Merezco ser feliz",
      description:
        "Mi felicidad es importante. Puedo disfrutar de las cosas pequeñas y grandes que me rodean.",
    },
  ];

  const happyImages = Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("HAPPY_") && !key.includes("_HEAD"))
    .map(([_, value]) => value);

  const [affirmation, setAffirmation] = useState(affirmations[0]);
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
      const storedAffirmationIndex = await AsyncStorage.getItem(
        "lastAffirmationIndex",
      );

      if (
        storedDate === today &&
        storedImageIndex &&
        storedColorIndex &&
        storedAffirmationIndex
      ) {
        setRandomImage(happyImages[parseInt(storedImageIndex)]);
        setBgColor(bgColors[parseInt(storedColorIndex)]);
        setAffirmation(affirmations[parseInt(storedAffirmationIndex)]);
      } else {
        const newImageIndex = Math.floor(Math.random() * happyImages.length);
        const newColorIndex = Math.floor(Math.random() * bgColors.length);
        const newAffirmationIndex = Math.floor(
          Math.random() * affirmations.length,
        );

        setRandomImage(happyImages[newImageIndex]);
        setBgColor(bgColors[newColorIndex]);
        setAffirmation(affirmations[newAffirmationIndex]);

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
          "lastAffirmationIndex",
          newAffirmationIndex.toString(),
        );
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
