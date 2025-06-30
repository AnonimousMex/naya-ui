import React, { useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";
import { InsigniaComponent } from "@/components/InsigniaComponent";
import { InsigniaDescriptionComponent } from "@/components/InsigniaDescription";
import { NavbarComponent } from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const { height } = Dimensions.get("window");

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }} //this is the navbar space
          showsVerticalScrollIndicator
        >
          <View className="mt-16 px-7 mb-8">
            <HeaderTitleComponent mainText="Mis Medallas" />
          </View>

          <InsigniaComponent onMedalPress={openModal} />

          <MainButton
            mainText="Ver logros"
            onPress={() => router.push("/(mainPages)/achievements")}
            className="w-80 py-3 mt-8 mb-16"
            style={{ height: 50 }}
          />
        </ScrollView>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            onPress={closeModal}
          />

          {selectedMedal && (
            <InsigniaDescriptionComponent
              title={selectedMedal.title}
              medalImageIndex={selectedMedal.imageIndex}
              onClose={closeModal}
            />
          )}
        </View>
      </Modal>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-slate-100 absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Insignias;
