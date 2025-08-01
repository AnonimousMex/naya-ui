// Home.tsx
import React, { useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
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
          router.push(nextRoute);
          setNextRoute(null);
          fetchEnergy();
        }
      },
      onError: () => {
        setEnergyAlertVisible(true);
      },
    });
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
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
            energy={energy}
          />
        </SafeAreaView>
      </View>

      <ScrollView className="px-7" showsVerticalScrollIndicator={false}>
        <View className="mt-24" />

        <LargePanel
          name="Detective"
          description="Explora, adivina y comprende cómo te sientes!"
          background={IMAGES.BACKGROUND_DETECTIVE_IMAGE}
          backgroundColor="bg-purple-300"
          animalImage={IMAGES.PANDA_SPIA_IMAGE}
          onPressButton={() => askToPlay("/(mainPages)/insignias")}
        />

        <View className="flex-row justify-between my-5">
          <ShortPanel
            name="Memociones"
            background={IMAGES.MEMOCIONES_IMAGE}
            onPressButton={() =>
              askToPlay("/(memociones)/memociones-main-page")
            }
          />
          <ShortPanel
            name="Emorganiza"
            background={IMAGES.EMORGANIZA_IMAGE}
            onPressButton={() => askToPlay("/(mainPages)/insignias")}
          />
        </View>

        <LargePanel
          name="Suena algo..."
          description="Escucha atentamente y descubrirás algo..."
          background={IMAGES.BACKGROUND_SUENA_ALGO_IMAGE}
          backgroundColor="bg-green-300"
          animalImage={IMAGES.SUENA_ALGO_IMAGE}
          onPressButton={() => askToPlay("/(y_ese_ruido)/y-ese-ruido-main")}
        />

        <View className="my-4 mb-16">
          <LargePanel comingSoon backgroundColor="bg-[#FF0000]" />
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
