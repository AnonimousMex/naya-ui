import React, { useState, useCallback, useMemo } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";

const EmorganizaMainPage = () => {
  const [puzzleImage, setPuzzleImage] = useState(IMAGES.HAPPY_AXOLOTL_HEAD);
  const dimensions = useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    return {
      screenWidth,
      screenHeight,
      containerSize: {
        width: screenWidth * 0.8 - 8,
        height: screenWidth * 0.8 - 8,
      }
    };
  }, []);
  const topBarHeight = 70;
  const titleHeight = 60;
  const navbarHeight = 90;
  const puzzleImageTop = topBarHeight + titleHeight + 20;
  const whiteContainerTop = dimensions.screenHeight - 350 - navbarHeight;
  const handlePuzzleComplete = useCallback(() => {
    Alert.alert(
      "¡Felicitaciones!",
      "Has completado el rompecabezas exitosamente",
      [
        {
          text: "Continuar",
          onPress: () => {
          },
        },
      ]
    );
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 min-h-screen bg-pink-200 relative">
        <PuzzleGame
          imageSource={puzzleImage}
          containerSize={dimensions.containerSize}
          onComplete={handlePuzzleComplete}
          puzzleImageTop={puzzleImageTop}
          whiteContainerTop={whiteContainerTop}
        />
        <View className="h-[70px] w-full" />
        <View className="flex flex-col items-center mt-0 mb-4">
          <Text className="text-[26px] font-UrbanistBold text-gray-730 tracking-wide">Emorganiza</Text>
        </View>
        <View className="flex justify-center items-center px-4">
          <View style={dimensions.containerSize} />
        </View>
        <View className="flex justify-center items-center mt-4">
          <View className="w-[280px] bg-white items-center py-3 rounded-full border-2 border-gray-50">
            <Text className="text-gray-90 font-UrbanistExtraBold text-[16px]">
              Arma el rompecabezas
            </Text>
          </View>
        </View>
        <View className="flex-1 flex flex-col justify-end">
          <View className="bg-white rounded-t-[50px] px-6 pt-6 pb-8 min-h-[300px] w-full mt-8 relative">
          </View>
        </View>
        <SafeAreaView
          edges={["bottom"]}
          className="bg-white absolute bottom-0 left-0 right-0 z-50"
        >
          <NavbarComponent />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

export default EmorganizaMainPage;
