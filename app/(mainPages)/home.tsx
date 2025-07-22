import { GameHeader } from "@/components/GameHeader";
import { LargePanel, ShortPanel } from "@/components/HomeComponents";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { useGameListMutation } from "@/hooks/games/useGameListMutation";
import { TGame } from "@/models/Common";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { mutate, data, isPending} = useGameListMutation()
  const [games, setGames] = useState<TGame[]>([]);

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
       {games[0] && (
          <LargePanel
            name={games[0].name}
            description={games[0].description}
            background={games[0].image_url}
            onPressButton={() => {
              router.push("/(mainPages)/insignias");
            }}
          />
        )}
        <View className="flex-row justify-between my-5 ">
          {games[1] && (
            <ShortPanel
              name={games[1].name}
              background={games[1].image_url}
              onPressButton={() => {
                router.push("/(memociones)/memociones-main-page");
              }}
            />
          )}
          {games[2] && (
            <ShortPanel
              name={games[2].name}
              background={games[2].image_url}
              onPressButton={() => {
                router.push("/(mainPages)/insignias");
              }}
            />
          )}
        </View>
        {games[3] && (
          <LargePanel
            name={games[3].name}
            description={games[3].description}
            background={games[3].image_url}
            onPressButton={() => {
              router.push("/(mainPages)/insignias");
            }}
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
    </SafeAreaView>
  );
}

export default Home;
