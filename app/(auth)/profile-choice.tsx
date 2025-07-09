import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BackButton } from "@/components/BackButton";
import { MainButton } from "@/components/MainButton";
import { ProfileAvatarButton } from "@/components/ProfileChoice";
import { useListAnimalsMutation } from "@/hooks/animal/useListAnimalsMutation";
import { useSelectProfileMutation } from "@/hooks/auth/useSelectProfileMutation";
import { TAnimal } from "@/models/Animal";
import { SnackbarContext } from "@/context/SnackbarProvider";
import { ERRORS } from "@/constants/errors/errorList";

import { IMAGES } from "@/constants/images";

const ProfileChoice = () => {
  const { mutate, data } = useListAnimalsMutation();
  const selectProfileMutation = useSelectProfileMutation();
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [selected, setSelected] = useState<TAnimal | null>(null);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const snackbar = useContext(SnackbarContext);

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    let animalsList: TAnimal[] = [];
    if (Array.isArray(data)) {
      animalsList = data;
    } else if (data?.data && Array.isArray(data.data)) {
      animalsList = data.data;
    }
    if (animalsList.length > 0) {
      const mapped = animalsList.map((animal: any) => ({
        ...animal,
        animal_id: animal.animal_id || animal.id,
      }));
      setAnimals(mapped);
      setSelected(mapped[0]);
    } else if (data) {
      snackbar?.showSnackbar({ message: ERRORS.FETCH_ANIMALS_ERROR.message, type: "error" });
      router.replace("/(auth)/sign-in");
    }
  }, [data]);

  const imageSizePercentage =
    screenWidth > screenHeight - screenWidth ? 0.35 : 0.5;
  const imageSize = screenWidth * imageSizePercentage;

  const isSpecialLayoutCondition = screenWidth < screenHeight - screenWidth;
  const containerHeight = isSpecialLayoutCondition
    ? screenHeight * 0.55
    : screenWidth;

  const nameTextClass = isSpecialLayoutCondition
    ? "mt-4 text-2xl font-UrbanistBold text-center"
    : "mt-4 text-xl font-UrbanistBold text-center";
  const descriptionTextClass = isSpecialLayoutCondition
    ? "mt-1 text-xl text-gray-700 text-center font-UrbanistBold"
    : "mt-1 text-base text-gray-700 text-center font-UrbanistBold";

  const baseButtonClassName = "w-80 mt-16";
  const buttonPaddingClassName = isSpecialLayoutCondition ? "mb-8" : "mb-3";
  const finalButtonClassName = `${baseButtonClassName} ${buttonPaddingClassName}`;

  function handleSelectProfile() {
    if (!selected) {
      snackbar?.showSnackbar({ message: ERRORS.PROFILE_CHOICE_REQUIRED.message, type: "error" });
      return;
    }
    selectProfileMutation.mutate(String(selected.animal_id));
  }

  function getAnimalImage(animal: TAnimal) {
    const key = `HAPPY_${animal.animal_key.toUpperCase()}_HEAD`;
    return (IMAGES as Record<string, any>)[key] || (IMAGES as Record<string, any>)["UNKNOWN_HEAD"];
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-pink-200"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView edges={["top"]} className="bg-transparent z-10">
        <View className="mt-4 ml-5 self-start">
          <BackButton onPress={() => router.back()} />
        </View>
      </SafeAreaView>

      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="px-7"
      >
        <View
          className="rounded-full bg-white border-2 border-gray-100 p-2 "
          style={{ width: imageSize, height: imageSize }}
        >
          {selected && (
            <Image
              source={getAnimalImage(selected)}
              className="w-full h-full"
              style={{ resizeMode: "contain" }}
            />
          )}
        </View>
        <Text className={nameTextClass} numberOfLines={1} adjustsFontSizeToFit>
          <Text style={{ color: "black" }}>Soy </Text>
          <Text style={{ color: selected?.color_ui }}>
            {selected?.name ? selected.name.charAt(0).toUpperCase() + selected.name.slice(1) : ""}
          </Text>
        </Text>
        <Text className={descriptionTextClass}>{selected?.description}</Text>
      </View>

      <View
        className="bg-white rounded-t-[100px] px-6 pt-7 pb-5"
        style={{ height: containerHeight }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 96,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View className="flex-row flex-wrap justify-around">
            {animals.map((animal) => (
              <ProfileAvatarButton
                key={animal.animal_id}
                avatar={{
                  ...animal,
                  name: animal.name.charAt(0).toUpperCase() + animal.name.slice(1),
                  image: getAnimalImage(animal),
                  color: animal.color_ui,
                }}
                selected={selected?.animal_id === animal.animal_id}
                onPress={() => setSelected(animal)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="absolute bottom-8 left-0 right-0 pt-1 items-center px-6">
          <MainButton
            mainText="Seleccionar"
            onPress={handleSelectProfile}
            className={finalButtonClassName}
            disabled={!selected}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileChoice;
