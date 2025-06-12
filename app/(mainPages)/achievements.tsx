import { View, SafeAreaView, ScrollView } from "react-native";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { BackButton } from "@/components/BackButton";
import { router } from "expo-router";
import { AchievementsComponent } from "@/components/AchievementsComponent";

const Achievements = () => {
  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator
        >
          <View className="mt-16 px-7 mb-8">
            <HeaderTitleComponent mainText="Mis Logros" />
          </View>
          <AchievementsComponent />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Achievements;
