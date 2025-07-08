import React, { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MemocionesCard } from "@/components/MemocionesCard.tsx";
import { CardData } from "@/components/MemocionesCard.tsx/MemocionesCard";
import { IMAGES } from "@/constants/images";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";

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

const MemoramaScreen = () => {
  const DECK = useMemo(buildDeck, []);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  const handleFlip = (card: CardData) => {
    if (flippedIds.length === 2 || flippedIds.includes(card.id)) return;

    setFlippedIds((prev) => [...prev, card.id]);

    if (flippedIds.length === 1) {
      const firstCard = DECK.find((c) => c.id === flippedIds[0])!;
      if (firstCard.pairId === card.pairId) {
        setMatchedPairs((prev) => [...prev, card.pairId]);
        setTimeout(() => setFlippedIds([]), 600);
      } else {
        setTimeout(() => setFlippedIds([]), 1000);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <CloudBackground />

      {/* TABLERO */}
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
              flippedIds.includes(item.id) || matchedPairs.includes(item.pairId)
            }
            disabled={matchedPairs.includes(item.pairId)}
            onPress={() => handleFlip(item)}
          />
        )}
      />

      {/* NAVBAR */}
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default MemoramaScreen;
