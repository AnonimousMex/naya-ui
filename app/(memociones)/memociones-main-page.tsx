import React, { useState, useMemo, useEffect } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MemocionesCard } from "@/components/MemocionesCard.tsx";
import { CardData } from "@/components/MemocionesCard.tsx/MemocionesCard";
import { IMAGES } from "@/constants/images";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import LottieView from "lottie-react-native";
import { NavbarComponent } from "@/components/NavBar";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";

const RAW_PAIRS = [
  {
    pairId: 1,
    emotion: "Feliz",
    img: IMAGES.HAPPY_AXOLOTL_1,
    situation: "Cuando me regalan un helado 🍦",
  },
  {
    pairId: 2,
    emotion: "Triste",
    img: IMAGES.HAPPY_BUNNY_1,
    situation: "Cuando pierdo mi juguete favorito 😢",
  },
  {
    pairId: 3,
    emotion: "Enojo",
    img: IMAGES.HAPPY_CAT_1,
    situation: "Cuando alguien rompe mis cosas 😠",
  },
  {
    pairId: 4,
    emotion: "Temor",
    img: IMAGES.HAPPY_LION_1,
    situation: "Cuando escucho un trueno muy fuerte ⚡️",
  },
  {
    pairId: 5,
    emotion: "Vergüenza",
    img: IMAGES.HAPPY_PANDA_HEAD,
    situation: "Cuando se me cae la comida en público 🙈",
  },
  {
    pairId: 6,
    emotion: "Sorpresa",
    img: IMAGES.HAPPY_AXOLOTL_2,
    situation: "Cuando llega un invitado inesperado 😲",
  },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(): CardData[] {
  return shuffle(
    RAW_PAIRS.flatMap((p, i) => [
      {
        id: i * 2,
        pairId: p.pairId,
        kind: "emotion" as const,
        img: p.img,
        text: p.emotion,
      },
      {
        id: i * 2 + 1,
        pairId: p.pairId,
        kind: "situation" as const,
        text: p.situation,
      },
    ]),
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MemoramaScreen = () => {
  const DECK = useMemo(buildDeck, []);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleFlip = (card: CardData) => {
    if (flipped.length === 2 || flipped.includes(card.id)) return;
    setFlipped((prev) => {
      const now = [...prev, card.id];
      if (now.length === 2) {
        const [aId, bId] = now;
        const a = DECK.find((c) => c.id === aId);
        const b = DECK.find((c) => c.id === bId);
        if (a && b && a.pairId === b.pairId) {
          setMatched((m) => (m.includes(a.pairId) ? m : [...m, a.pairId]));
          setTimeout(() => setFlipped([]), 300);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
      return now;
    });
  };

  const allMatched = matched.length === RAW_PAIRS.length;

  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <CloudBackground />
      <FlatList
        data={DECK}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 12,
        }}
        contentContainerStyle={{ paddingVertical: 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MemocionesCard
            data={item}
            isFlipped={
              flipped.includes(item.id) || matched.includes(item.pairId)
            }
            matched={matched.includes(item.pairId)}
            disabled={matched.includes(item.pairId)}
            onPress={() => handleFlip(item)}
          />
        )}
      />

      {allMatched && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: windowWidth,
            height: windowHeight,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <LottieView
            source={require("@/assets/animations/victory.json")}
            autoPlay
            loop
            style={{ width: 300, height: 800 }}
          />
          <MainButton
            mainText="Continuar"
            onPress={() => router.push("/(mainPages)/home")}
            className="w-80 py-3 mt-6"
          />
        </View>
      )}

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-40"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default MemoramaScreen;
