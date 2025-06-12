import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Modal } from "react-native";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";
import { BackButton } from "@/components/BackButton";
import { InsigniaComponent } from "@/components/InsigniaComponent";
import { InsigniaDescriptionComponent } from "@/components/InsigniaDescription";

const Insignias = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState<{
    title: string;
    imageIndex: number;
  } | null>(null);

  const openModal = (title: string, imageIndex: number) => {
    setSelectedMedal({ title, imageIndex });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedal(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator
        >
          <View className="mt-16 px-7 mb-8">
            <HeaderTitleComponent mainText="Mis Medallas" />
          </View>

          <InsigniaComponent onMedalPress={openModal} />

          <MainButton
            mainText="Ver logros"
            onPress={() => router.push("/(auth)/welcome")}
            className="w-80 py-3 mt-8 mb-16"
            style={{ height: 50 }}
          />
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          {selectedMedal && (
            <InsigniaDescriptionComponent
              title={selectedMedal.title}
              medalImageIndex={selectedMedal.imageIndex}
              onClose={closeModal}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Insignias;
