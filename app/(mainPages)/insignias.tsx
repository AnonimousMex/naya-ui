import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";
import { BackButton } from "@/components/BackButton";
import { InsigniaComponent } from "@/components/InsigniaComponent";

const Insignias = () => {
  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <View className="flex-1 ">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={true}
        >
          <View className="mt-16 px-7 mb-8">
            <BackButton onPress={() => router.push("/(auth)/welcome")} />
            <HeaderTitleComponent mainText="Mis Medallas" />
          </View>
          <InsigniaComponent />

          <MainButton
            mainText="Ver logros"
            onPress={() => router.push("/(mainPages)/insignias")}
            className="w-80 py-3 mt-8 mb-16"
            style={{ height: 50 }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Insignias;
