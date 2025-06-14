import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { NavbarComponent } from "@/components/NavBar";

const Insignias = () => {
  return (
      <SafeAreaView className="mt-8 px-2">
        <ScrollView  showsVerticalScrollIndicator={false}>
        <View className="absolute bottom-0 left-0 right-0">
          <NavbarComponent/>
        </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Insignias;
