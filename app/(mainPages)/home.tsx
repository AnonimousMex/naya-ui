// Home.tsx
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GameHeader } from "@/components/GameHeader";
import { LargePanel, ShortPanel } from "@/components/HomeComponents";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";
import PlayAffirmation from "@/components/PlayAffirmation";
import { IMAGES } from "@/constants/images";
import { TGame } from "@/models/Common";
import EnergyAlert from "@/components/EnergyAlert";
import { LOCAL_USERS, LOCAL_ANIMALS } from "@/constants/localData";
import { getAnimalHeadImage } from "@/utils/animalAssets";


function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [energyAlertVisible, setEnergyAlertVisible] = useState(false);
  const [games, setGames] = useState<TGame[]>([]);
  const [energy, setEnergy] = useState(3);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  // Usando datos locales de la base de datos

  // Juegos locales con el formato correcto que esperan los componentes
  const localGames: TGame[] = [
    {
      id: "1",
      name: "Detective 'Emoción'",
      description: "Explora, adivina y comprende cómo te sientes! 'Es divertido!'",
      image_url: "IMAGES.BACKGROUND_DETECTIVE_IMAGE",
    },
    {
      id: "2", 
      name: "Memociones",
      description: "Ve, piensa y memoriza las emociones",
      image_url: "IMAGES.MEMOCIONES_IMAGE",
    },
    {
      id: "3",
      name: "Emorganiza",
      description: "Arma el rompecabezas y adivina qué sentimiento se esconde",
      image_url: "IMAGES.EMORGANIZA_IMAGE",
    },
    {
      id: "4",
      name: "Suena algo...",
      description: "Escucha atentamente y descubrirás algo...",
      image_url: "IMAGES.BACKGROUND_SUENA_ALGO_IMAGE",
    },
  ];

  const fetchUserData = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const user = LOCAL_USERS.find(u => u.id === userId);
        if (user) {
          setUserName(user.name);
          
          // Si el usuario tiene un animal asignado, mostrar su avatar
          if (user.animal_id) {
            const animal = LOCAL_ANIMALS.find(a => a.id === user.animal_id);
            if (animal) {
              setAvatar(getAnimalHeadImage(animal.animal_key));
            } else {
              setAvatar(IMAGES.UNKNOWN_HEAD);
            }
          } else {
            setAvatar(IMAGES.UNKNOWN_HEAD);
          }
        }
      }
      setEnergy(3); // Siempre 3 energías
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      setGames(localGames);
    }, [fetchUserData]),
  );

  const askToPlay = (route: `/${string}`) => {
    if (energy <= 0) {
      setEnergyAlertVisible(true);
      return;
    }
    setNextRoute(route);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    if (nextRoute) {
      router.push(nextRoute as any);
      setNextRoute(null);
    }
  };
  return (
    <SafeAreaView className="w-full h-full bg-pink-200">
      <CloudBackground />

      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView
          edges={["top"]}
          className="flex items-center justify-center mt-2"
        >
          <GameHeader
            name={userName}
            avatar={avatar ?? IMAGES.UNKNOWN_HEAD}
            energy={energy}
          />
        </SafeAreaView>
      </View>
      <ScrollView className=" px-7" showsVerticalScrollIndicator={false}>
        <View className="mt-24"/>
       {games[0] && (
          <LargePanel
            name={games[0].name}
            description={games[0].description}
            background={games[0].image_url}
            onPressButton={() => askToPlay("/(detectiveEmociones)/detective-emociones-page")}
          />
        )}
        <View className="flex-row justify-between my-5 ">
          {games[1] && (
            <ShortPanel
              name={games[1].name}
              background={games[1].image_url}
              onPressButton={() =>
              askToPlay("/(memociones)/memociones-main-page")
            }
            />
          )}
          {games[2] && (
            <ShortPanel
              name={games[2].name}
              background={games[2].image_url}
              onPressButton={() => askToPlay("/(emorganiza)/emorganiza-main-page")}
            />
          )}
        </View>
        {games[3] && (
          <LargePanel
            name={games[3].name}
            description={games[3].description}
            background={games[3].image_url}
            onPressButton={() => askToPlay("/(y_ese_ruido)/y-ese-ruido-main")}
          />
        )}

        <View className="my-4 mb-16">
          <LargePanel
            comingSoon
          />
        </View>
      </ScrollView>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>

      <PlayAffirmation
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setNextRoute(null);
        }}
        onConfirm={handleConfirm}
      />

      <EnergyAlert
        visible={energyAlertVisible}
        onClose={() => setEnergyAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

export default Home;
