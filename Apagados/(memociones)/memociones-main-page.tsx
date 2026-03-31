import React, { useState, useEffect } from "react";
import { View, FlatList, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

import { MemocionesCard } from "@/components/MemocionesCard.tsx";
import { CardData } from "@/components/MemocionesCard.tsx/MemocionesCard";
import { IMAGES } from "@/constants/images";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";
import { NavbarComponent } from "@/components/NavBar";
import { MainButton } from "@/components/MainButton";
import { MEMOCIONES_SERVICE, TMemocionPair } from "@/services/memociones";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type EmotionKey =
  | "feliz"
  | "triste"
  | "enojo"
  | "temor"
  | "vergüenza"
  | "sorpresa";

const EMOTION_IMAGES: Record<EmotionKey, any[]> = {
  feliz: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("HAPPY_") && !key.includes("HEAD"))
    .map(([, value]) => value),
  triste: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("SAD_"))
    .map(([, value]) => value),
  enojo: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("ANGRY_"))
    .map(([, value]) => value),
  temor: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("FEAR_"))
    .map(([, value]) => value),
  vergüenza: Object.entries(IMAGES)
    .filter(([key]) => key.startsWith("SHAME_"))
    .map(([, value]) => value),
  sorpresa: [IMAGES.HAPPY_AXOLOTL_2],
};

function getEmotionImage(emotion: string) {
  const key = emotion.toLowerCase() as EmotionKey;
  const images = EMOTION_IMAGES[key];

  if (!images || images.length === 0) return IMAGES.NAYA_LOGO;

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function buildDeckFromAPI(pairs: TMemocionPair[]): CardData[] {
  return shuffle(
    pairs.flatMap((p, i) => [
      {
        id: i * 2,
        pairId: p.pairId,
        kind: "emotion" as const,
        img: getEmotionImage(p.emotion),
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
  const [rawPairs, setRawPairs] = useState<TMemocionPair[]>([]);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const pairs = await MEMOCIONES_SERVICE.getPairs();
        setRawPairs(pairs);
        setDeck(buildDeckFromAPI(pairs));
        setLoading(false);
      } catch (e) {
        console.error("Error fetching memorama pairs:", e);
        setError(true);
        setLoading(false);
      }
    };
    fetchPairs();
  }, []);

  const handleFlip = (card: CardData) => {
    if (flipped.length === 2 || flipped.includes(card.id)) return;

    setFlipped((prev) => {
      const now = [...prev, card.id];

      if (now.length === 2) {
        const [aId, bId] = now;
        const a = deck.find((c) => c.id === aId);
        const b = deck.find((c) => c.id === bId);

        if (a && b && a.pairId === b.pairId) {
          setTimeout(() => {
            setMatched((m) => (m.includes(a.pairId) ? m : [...m, a.pairId]));
            setFlipped([]);
          }, 300);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }

      return now;
    });
  };

  const allMatched = matched.length === rawPairs.length;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200">
        <Text className="text-xl font-semibold text-gray-700">
          Cargando memorama...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-pink-200">
        <Text className="text-xl font-semibold text-red-600">
          Error al cargar el juego 😢
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <CloudBackground />

      <FlatList
        data={deck}
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
            style={{ width: 300, height: 500 }}
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
