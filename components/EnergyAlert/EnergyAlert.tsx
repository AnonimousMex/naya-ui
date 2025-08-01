import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const EnergyAlert = ({ visible, onClose }: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="w-full max-w-[340px] bg-white rounded-3xl border border-red-200 shadow-lg overflow-hidden">
          <View className="bg-red-500 py-5 px-6 rounded-b-3xl items-center">
            <Text className="text-white text-xl font-UrbanistExtraBold">
              ¡Sin energía!
            </Text>
            <Text className="text-white text-sm font-UrbanistMedium mt-1">
              😴 No tienes energía suficiente para jugar.
            </Text>
          </View>
          <View className="px-6 py-5 bg-rose-50 items-center">
            <Pressable
              onPress={onClose}
              className="bg-red-400 px-5 py-3 rounded-xl"
            >
              <Text className="text-white text-base font-UrbanistBold">
                Entendido
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EnergyAlert;
