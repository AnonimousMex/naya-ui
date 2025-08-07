// Home.tsx
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

import { GameHeader } from "@/components/GameHeader";
import { LargePanel, ShortPanel } from "@/components/HomeComponents";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";
import PlayAffirmation from "@/components/PlayAffirmation";
import { IMAGES } from "@/constants/images";
import { useConsumeEnergyMutation } from "@/hooks/games/useConsumeEnergyMutation";
import { useGameListMutation } from "@/hooks/games/useGameListMutation";
import { TGame } from "@/models/Common";
import EnergyAlert from "@/components/EnergyAlert";

const useEnergy = () => {
  const [energy, setEnergy] = useState(0);

  const fetchEnergy = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token found");

      const { data } = await HTTP.get<{ current_energy: number }>(
        URL_PATHS.ENERGIES.GET_ENERGY,
        {
          headers: { Authorization: token },
        },
      );
      setEnergy(data.current_energy);
    } catch (e) {
      console.error("Error al obtener energía:", e);
      setEnergy(0);
    }
  };

  return { energy, fetchEnergy };
};

function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [energyAlertVisible, setEnergyAlertVisible] = useState(false);
  const { mutate, data, isPending} = useGameListMutation()
  const [games, setGames] = useState<TGame[]>([]);

  const { energy, fetchEnergy } = useEnergy();
  const { mutate: consumeEnergy } = useConsumeEnergyMutation();

  useFocusEffect(
    useCallback(() => {
      fetchEnergy();
    }, []),
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
    consumeEnergy(undefined, {
      onSuccess: () => {
        if (nextRoute) {
          router.push(nextRoute as any);
          setNextRoute(null);
          fetchEnergy();
        }
      },
      onError: () => {
        setEnergyAlertVisible(true);
      },
    });
  };

  useEffect(() => {
    mutate();
  },[])

  useEffect(() => {
    if(data?.data){
      setGames(data.data);
    }
  },[data])

  if (isPending || games.length === 0) {
    return (
      <SafeAreaView className="w-full h-full bg-pink-200">
        <CloudBackground />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-2">Cargando juegos...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="w-full h-full bg-pink-200">
      <CloudBackground />

      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView
          edges={["top"]}
          className="flex items-center justify-center mt-2"
        >
          <GameHeader
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
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
            onPressButton={() => askToPlay("/(mainPages)/insignias")}
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
