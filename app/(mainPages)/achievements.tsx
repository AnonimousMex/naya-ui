import { View, SafeAreaView, ScrollView } from "react-native";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { AchievementsComponent } from "@/components/AchievementsComponent";
import { BackButton } from "@/components/BackButton";
import { NavbarComponent } from "@/components/NavBar";
import { router } from "expo-router";
import { SafeAreaView as SafeAreaViewContext } from "react-native-safe-area-context";

const Achievements = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }} // espacio para navbar
          showsVerticalScrollIndicator
        >
          <View className="mt-16 px-7 mb-8">
            <BackButton onPress={() => router.push("/(mainPages)/insignias")} />
            <HeaderTitleComponent mainText="Mis Logros" />
          </View>
          <AchievementsComponent />
        </ScrollView>
      </View>

      <SafeAreaViewContext
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaViewContext>
    </SafeAreaView>
  );
};

export default Achievements;
