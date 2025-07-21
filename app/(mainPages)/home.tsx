import { GameHeader } from "@/components/GameHeader";
import { LargePanel, ShortPanel } from "@/components/HomeComponents";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  
  return (
    <SafeAreaView className="w-full h-full bg-pink-200">
      <CloudBackground />
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView edges={["top"]} className="flex items-center justify-center mt-2">
            <GameHeader
              energyActive={2}
              name="Rodrigo"
              avatar={IMAGES.HAPPY_CAT_HEAD}
            />
        </SafeAreaView>
      </View>
      <ScrollView className=" px-7" showsVerticalScrollIndicator={false}>
        <View className="mt-24"/>
        <LargePanel
          name="Detective"
          description="Explora, adivina y comprende cómo te sientes!"
          background={IMAGES.BACKGROUND_DETECTIVE_IMAGE}
          backgroundColor="bg-purple-300"
          animalImage={IMAGES.PANDA_SPIA_IMAGE}
          onPressButton={() => {
            router.push("/(mainPages)/insignias");
          }}
        />
        <View className="flex-row justify-between my-5 ">
          <ShortPanel
            name="Memociones"
            background={IMAGES.MEMOCIONES_IMAGE}
            onPressButton={() => {
              router.push("/(memociones)/memociones-main-page");
            }}
          />
          <ShortPanel
            name="Emorganiza"
            background={IMAGES.EMORGANIZA_IMAGE}
            onPressButton={() => {
              router.push("/(emorganiza)/emorganiza-main-page");
            }}
          />
        </View>
        <LargePanel
          name="Suena algo..."
          description="Escucha atentamente y descubrirás algo..."
          background={IMAGES.BACKGROUND_SUENA_ALGO_IMAGE}
          backgroundColor="bg-green-300"
          animalImage={IMAGES.SUENA_ALGO_IMAGE}
          onPressButton={() => {
            router.push("/(mainPages)/insignias");
          }}
          par
        />
        <View className="my-4 mb-16">
          <LargePanel
            comingSoon
            backgroundColor="bg-[#FF0000]"
          />
        </View>
      </ScrollView>
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default Home;
