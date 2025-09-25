import { GameHeader } from "@/components/GameHeader";
import { useUserHeaderData } from "@/hooks/useUserHeaderData";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { View, Text, Image } from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PuzzleSpot, PuzzlePiece } from "@/components/puzzle";
import { EmorganizaEmotionsPanel } from "@/components/EmorganizaEmotionsPanel";
import { router } from "expo-router";
import { MainButton } from "@/components/MainButton";
import { RoundedEmotionImage } from "@/components/RoundedEmotionImage";
import { InsigniaDescriptionComponent } from "@/components/InsigniaDescription";
import { Modal, Pressable } from "react-native";
import { LOCAL_BADGES } from "@/constants/localData/badges";
import { LOCAL_USERS, LOCAL_ANIMALS } from "@/constants/localData";
import { getAnimalHeadImage } from "@/utils/animalAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MemoPuzzleSpot = React.memo(PuzzleSpot);
const MemoPuzzlePiece = React.memo(PuzzlePiece);
import {
  PUZZLE_PIECES,
  SHAPES,
  shuffle,
} from "@/constants/puzzleConstants";
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import { useCallback, useState, useEffect } from "react";

export type EmotionKey =
  | "feliz"
  | "triste"
  | "enojo"
  | "temor"
  | "vergüenza";

export const emotionsWithColors: { key: EmotionKey; color: string }[] = [
  { key: "temor", color: "#8B008B" },
  { key: "feliz", color: "#FFD700" },
  { key: "triste", color: "#1E90FF" },
  { key: "enojo", color: "#FF4500" },
  { key: "vergüenza", color: "#FF69B4" },
];

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
};

function getRandomEmotionImage(): { image: any; emotion: EmotionKey } {
  const emotions = Object.keys(EMOTION_IMAGES) as EmotionKey[];
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const images = EMOTION_IMAGES[emotion];
  const image = images[Math.floor(Math.random() * images.length)];
  return { image, emotion };
}

function EmorganizaMainPage() {
  const [energy, setEnergy] = useState(3);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  const shakeX = useSharedValue(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [currentShape, setCurrentShape] = useState(0);
  const [shuffledPieces, setShuffledPieces] = useState(() =>
    shuffle([...Array(PUZZLE_PIECES.length).keys()]),
  );
  const [phase, setPhase] = useState<"puzzle" | "emotion" | "result">("puzzle");
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const [roundResults, setRoundResults] = useState<{ image: any; emotion: EmotionKey }[]>([]);

  const [image, setImage] = useState<any>(IMAGES.HAPPY_BUNNY_2);
  const [roundEmotion, setRoundEmotion] = useState<EmotionKey | null>(null);
  const [isPuzzleLoading, setIsPuzzleLoading] = useState(false);
  const [isPuzzleTransitioning, setIsPuzzleTransitioning] = useState(false);

  const [selectedMedal, setSelectedMedal] = useState<{
    title: string;
    description: string;
    image_path: string;
  } | null>(null);
  const [showMedalModal, setShowMedalModal] = useState(false);

  useEffect(() => {
    const { image, emotion } = getRandomEmotionImage();
    setImage(image);
    setRoundEmotion(emotion);
  }, [currentRound]);

  useEffect(() => {
    if (phase === "result") {
      // Mostrar badge local de Emorganiza al completar el juego
      const emorganizaBadge = LOCAL_BADGES.find(badge => 
        badge.title.toLowerCase().includes("emorganiza") || 
        badge.description.toLowerCase().includes("emorganiza")
      );
      
      if (emorganizaBadge) {
        setSelectedMedal({
          title: emorganizaBadge.title,
          description: emorganizaBadge.description,
          image_path: emorganizaBadge.image_path,
        });
        setShowMedalModal(true);
      }
    }
  }, [phase]);

  const shape = SHAPES[currentShape];
  const scale = useSharedValue(0);
  const correctPieces = useSharedValue(0);


  const [puzzleLayout, setPuzzleLayout] = useState<{ y: number, height: number }>({ y: 0, height: 0 });
  const [containerLayout, setContainerLayout] = useState<{ y: number, height: number }>({ y: 0, height: 0 });

  let PIECES_DISTANCE = screenWidth * 0.4; // Más espacio entre piezas
  let puzzleScale = 1.2; // Hacer las piezas más grandes por defecto
  
  const layoutReady = puzzleLayout.height > 0 && containerLayout.height > 0 && navbarHeight > 0;
  if (layoutReady) {
    const availableSpace = (screenHeight - navbarHeight - 100) - (puzzleLayout.y + puzzleLayout.height);
    const maxDistance = Math.max(screenWidth * 0.3, Math.min(availableSpace / 2.5, screenWidth * 0.5));
    PIECES_DISTANCE = maxDistance;
    // Mantener escala más grande y responsive
    puzzleScale = Math.max(1.0, Math.min(1.3, screenWidth / 400));
  }


  const handleReset = useCallback(() => {
    setIsPuzzleLoading(true);
    setTimeout(() => {
      setCurrentShape((prev) => (prev + 1 === SHAPES.length ? 0 : prev + 1));
      setShuffledPieces(() => shuffle([...Array(PUZZLE_PIECES.length).keys()]));
      correctPieces.value = 0;
      setSelectedEmotion(null);
      setIsPuzzleLoading(false);
      setIsPuzzleTransitioning(false);
    }, 300);
  }, []);

  const handleResetAndPhase = () => {
    setPhase("emotion");
  };

  useAnimatedReaction(
    () => correctPieces.value,
    (currentValue) => {
      if (currentValue === 9 && !isPuzzleTransitioning) {
        runOnJS(setIsPuzzleTransitioning)(true);
        runOnJS(handleResetAndPhase)();
      }
    },
    [isPuzzleTransitioning]
  );

  useEffect(() => {
    if (phase === "puzzle" && !isPuzzleLoading) {
      scale.value = 0;
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 80,
        mass: 1,
        overshootClamping: false,
      });
    }
  }, [phase, shuffledPieces, isPuzzleLoading]);


  const handleEmotionSelect = (emotion: EmotionKey) => {
    setSelectedEmotion(emotion);
    const isCorrect = emotion.toLowerCase() === roundEmotion;

    if (isCorrect) {
      setRoundResults((prev) => [...prev, { image, emotion: roundEmotion as EmotionKey }]);
      if (currentRound < 3) {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        setTimeout(() => {
          handleReset();
          setPhase("puzzle");
        }, 60);
      } else {
        setPhase("result");
      }
    } else {
      shakeX.value = withSequence(
        withTiming(-12, { duration: 40 }),
        withRepeat(withSequence(
          withTiming(12, { duration: 80 }),
          withTiming(-12, { duration: 80 })
        ), 2, true),
        withTiming(0, { duration: 40 })
      );
      setTimeout(() => {
        setSelectedEmotion(null);
      }, 500);
    }
  };
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: PIECES_DISTANCE / 2 }, { scale: scale.value }],
  }));

  const boardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: screenWidth * 0.9,
      height: screenWidth * 0.9,
      alignSelf: "center",
      marginTop: screenHeight * 0.05,
      backgroundColor: "white",
    },
    puzzlePanel: {
      borderRadius: 24,
      width: screenWidth * 0.95, // Más ancho
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: screenWidth * 0.025, // Centrado
    },
    emotionPanel: {
      borderRadius: 40,
      width: screenWidth * 0.95, // Más ancho
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#ededed',
      borderColor: '#d2d2d2',
      borderWidth: 6,
      marginHorizontal: screenWidth * 0.025, // Centrado
    },
    infoPanel: {
      width: screenWidth * 0.8,
      backgroundColor: "white",
      alignItems: "center",
      paddingVertical: screenHeight * 0.015,
      borderRadius: 999,
      borderWidth: 4,
      borderColor: "#e5e7eb",
    },
    resultPanel: {
      width: screenWidth * 0.9,
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 24,
      padding: 20,
      marginTop: screenHeight * 0.02,
    },
    resultImagesContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      width: '100%',
    },
    bottomImagesContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: -screenWidth * 0.08,
    }
  });



  return (
    <SafeAreaView className="w-full h-full bg-pink-200 items-center" edges={["top", "bottom"]}>

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

      {phase !== 'result' && (
        <View style={{ marginTop: screenHeight * 0.08, marginBottom: screenHeight * 0.01 }}>
          <Text className="text-gray-30 font-UrbanistExtraBold" style={{ fontSize: screenWidth * 0.045 }}>
            Ronda {currentRound} de 3
          </Text>
        </View>
      )}

      {phase === "puzzle" && (
        isPuzzleLoading ? (
          <View style={{ flex: 1, width: "100%", backgroundColor: "#FCF6F1", justifyContent: "center", alignItems: "center" }}>
            <LottieView
              source={require("../../assets/animations/HorizontalLoading.json")}
              autoPlay
              loop
              style={{ width: 120, height: 120 }}
            />
          </View>
        ) : (
          <>
            <View
              style={[styles.puzzlePanel, { transform: [{ scale: puzzleScale }] }]}
              onLayout={e => setPuzzleLayout({
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height
              })}
            >
              <Animated.View style={[boardAnimatedStyle, styles.puzzlePanel, { transform: [{ scale: puzzleScale }] }]}>
                {PUZZLE_PIECES.map((_, i) => (
                  <MemoPuzzleSpot
                    key={`spot-${i}`}
                    index={i}
                    shape={shape}
                    imageSource={image}
                  />
                ))}
                {layoutReady && PUZZLE_PIECES.map((_, i) => (
                  <MemoPuzzlePiece
                    key={`piece-${i}`}
                    index={i}
                    shape={shape}
                    shuffledPieces={shuffledPieces}
                    correctPieces={correctPieces}
                    imageSource={image}
                    piecesDistance={PIECES_DISTANCE}
                  />
                ))}
              </Animated.View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: screenHeight * 0.02, marginBottom: screenHeight * 0.01, zIndex: -1 }}>
              <View style={[styles.infoPanel, { paddingVertical: screenHeight * 0.012, minHeight: screenHeight * 0.05 }]}>
                <Text className="text-gray-30 font-UrbanistExtraBold" style={{ fontSize: screenWidth * 0.042 }}>
                  Arma el rompecabezas
                </Text>
              </View>
            </View>

            <View
              style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", width: "100%", zIndex: -2 }}
              onLayout={e => setContainerLayout({
                y: e.nativeEvent.layout.y,
                height: e.nativeEvent.layout.height
              })}
            >
              <View style={{ 
                backgroundColor: "white", 
                borderTopLeftRadius: 50, 
                borderTopRightRadius: 50, 
                paddingHorizontal: screenWidth * 0.06, 
                paddingTop: screenHeight * 0.02, 
                paddingBottom: 0, // Sin padding bottom para pegarlo al navbar
                minHeight: screenHeight * 0.3, // Más altura
                width: "100%", 
                marginTop: 0, // Sin margin top
                position: "relative",
                marginBottom: -24 // Conectar con el navbar
              }} />
            </View>
          </>
        )
      )}

      {phase === "emotion" && (
        <>
          <Animated.View style={[styles.emotionPanel, shakeStyle]}>
            <Image
              source={image}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </Animated.View>
          <View style={{ 
            justifyContent: "center", 
            alignItems: "center", 
            marginTop: screenHeight * 0.02, 
            marginBottom: screenHeight * 0.02, 
            zIndex: 10,
            paddingHorizontal: screenWidth * 0.05
          }}>
            <View style={[styles.infoPanel, { 
              paddingVertical: screenHeight * 0.012, 
              minHeight: screenHeight * 0.05,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5
            }]}>
              <Text className="text-gray-30 font-UrbanistExtraBold" style={{ fontSize: screenWidth * 0.042 }}>
                Selecciona la emoción
              </Text>
            </View>
          </View>
          <View style={{ 
            width: "100%", 
            flex: 1, 
            justifyContent: "flex-end", 
            paddingBottom: 0, // Sin navbar, sin necesidad de padding
            marginTop: -screenHeight * 0.01
          }}>
            <EmorganizaEmotionsPanel
              emotions={emotionsWithColors}
              onEmotionSelect={handleEmotionSelect}
              selectedEmotion={selectedEmotion}
            />
          </View>
        </>
      )}

      {phase === "result" && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: navbarHeight }}>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
            <LottieView
              source={require("@/assets/animations/victory.json")}
              autoPlay
              loop={false}
              style={{ width: 500, height: 500 }}
            />
          </View>
          <Text className="text-blue-900 font-UrbanistExtraBold" style={{ fontSize: screenWidth * 0.08, marginBottom: screenHeight * 0.02 }}>
            Emorganiza
          </Text>
          <View style={styles.resultPanel}>
            <Text className="font-UrbanistExtraBold text-yellow-40" style={{ fontSize: screenWidth * 0.08 }}>
              🎉 ¡Lo lograste! 🎉
            </Text>
            <Text className="text-yellow-40 font-UrbanistBold text-center" style={{ fontSize: screenWidth * 0.04, marginTop: 4 }}>
              Has clasificado todas las emociones correctamente. ✨
            </Text>
            <Text className="text-gray-800 font-UrbanistSemiBold text-center" style={{ fontSize: screenWidth * 0.045, marginTop: 20, lineHeight: screenWidth * 0.06, paddingHorizontal: 10 }}>
              Si sientes mucha emoción: respira, piensa y actúa tranquilo. Habla, juega o haz algo divertido para sentirte mejor.
            </Text>
            <View style={styles.resultImagesContainer}>
              {roundResults[0] && <RoundedEmotionImage image={roundResults[0].image} color={emotionsWithColors.find(e => e.key === roundResults[0].emotion)?.color || ''} />}
              <View style={styles.bottomImagesContainer}>
                {roundResults[1] && <RoundedEmotionImage image={roundResults[1].image} color={emotionsWithColors.find(e => e.key === roundResults[1].emotion)?.color || ''} />}
                {roundResults[2] && <RoundedEmotionImage image={roundResults[2].image} color={emotionsWithColors.find(e => e.key === roundResults[2].emotion)?.color || ''} />}
              </View>
            </View>
          </View>
          <MainButton
            mainText="Continuar"
            onPress={() => router.push("/(mainPages)/home")}
            className="w-80 py-3 mt-6"
          />
        </View>
      )}

      {phase !== "emotion" && (
        <SafeAreaView
          edges={["bottom"]}
          className="bg-white absolute bottom-0 left-0 right-0 z-50 pb-6"
          onLayout={e => setNavbarHeight(e.nativeEvent.layout.height)}
        >
          <NavbarComponent />
        </SafeAreaView>
      )}
      <Modal
        visible={showMedalModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
        setShowMedalModal(false);
        router.push("/(mainPages)/home");
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
          onPress={() => {
            setShowMedalModal(false);
            router.push("/(mainPages)/home");
          }}
        >
          {selectedMedal && (
            <InsigniaDescriptionComponent
              title={selectedMedal.title}
              description={selectedMedal.description}
              medalImageName={selectedMedal.image_path}
              onClose={() => {
                setShowMedalModal(false);
                router.push("/(mainPages)/home");
              }}
            />
          )}
        </Pressable>
      </Modal>

    </SafeAreaView>

  );
}

export default EmorganizaMainPage;
