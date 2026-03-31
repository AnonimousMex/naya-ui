import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Modal,
  Pressable,
  Text,
} from "react-native";
import { HeaderTitleComponent } from "@/components/HeaderTitleComponent";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";
import { InsigniaComponent } from "@/components/InsigniaComponent";
import { InsigniaDescriptionComponent } from "@/components/InsigniaDescription";
import { NavbarComponent } from "@/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useListBadgesMutation } from "@/hooks/badges/useListBadgesMutation";

const Insignias = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState<{
    title: string;
    description?: string;
    image_path: string;
  } | null>(null);

  const { mutateAsync, data, isError } = useListBadgesMutation();

  useEffect(() => {
    mutateAsync();
  }, []);

  const openModal = (
    title: string,
    description: string | undefined,
    image_path: string
  ) => {
    setSelectedMedal({ title, description, image_path });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedal(null);
  };

  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Error cargando medallas</Text>
      </SafeAreaView>
    );
  }

  const badges = data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator
        >
          <View className="mt-16 px-7 mb-8">
            <HeaderTitleComponent mainText="Mis Medallas" />
          </View>

          {badges.length === 0 ? (
            <View className="px-7 items-center">
              <Text className="text-gray-500 text-2xl mt-10 font-UrbanistExtraBold text-center">
                Aún no has desbloqueado alguna medalla.
              </Text>
            </View>
          ) : (
            <InsigniaComponent badges={badges} onMedalPress={openModal} />
          )}

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
              description={selectedMedal.description ?? ""}
              medalImageName={selectedMedal.image_path}
              onClose={closeModal}
            />
          )}
        </View>
      </Modal>

      <SafeAreaView
        edges={["bottom"]}
        className="bg-white absolute bottom-0 left-0 right-0 z-50"
      >
        <NavbarComponent />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Insignias;
