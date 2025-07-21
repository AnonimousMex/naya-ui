import { GameHeader } from "@/components/GameHeader";
import { NavbarComponent } from "@/components/NavBar";
import { IMAGES } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

function EmorganizaMainPage() {
  return (
    <SafeAreaView className="w-full h-full bg-pink-200 pt-24">
      <View className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <SafeAreaView
          edges={["top"]}
          className="flex items-center justify-center mt-2"
        >
          <GameHeader
            energyActive={2}
            name="Rodrigo"
            avatar={IMAGES.HAPPY_CAT_HEAD}
          />
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="pt-5"
      >
        <View className="bg-gray-200 rounded-2xl w-10/12 aspect-square items-center justify-center shadow-md">
        
        </View>
        
        <View className="flex justify-center items-center mt-4">
          <View className="w-[280px] bg-white items-center py-3 rounded-full border-4 border-gray-20">
            <Text className="text-gray-30 font-UrbanistExtraBold text-[16px]">
              Arma el rompecabezas
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="flex-1 flex flex-col justify-end">
        <View className="bg-white rounded-t-[50px] px-6 pt-6 pb-8 min-h-[300px] w-full mt-8 relative"></View>
      </View>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default EmorganizaMainPage;
