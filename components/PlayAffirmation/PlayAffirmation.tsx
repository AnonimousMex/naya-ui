import React from "react";
import { View, Text, Modal, Pressable } from "react-native";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const PlayAffirmation = ({ visible, onConfirm, onCancel }: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 bg-black/40 justify-center items-center px-5">
        <View className="bg-pink-50 px-6 py-8 rounded-3xl items-center w-full max-w-[380px] shadow-lg shadow-black/20 border border-pink-300">
          <Text className="text-xl font-UrbanistExtraBold text-pink-800 text-center mb-3">
            ¿Listo para jugar?
          </Text>

          <Text className="text-base font-UrbanistMedium text-gray-60 text-center mb-6">
            🔋 Esto consumirá 1 energía
          </Text>

          <View className="flex-row justify-between w-full px-2 gap-4">
            <Pressable
              onPress={onCancel}
              className="flex-1 bg-purple-200 py-3 rounded-full items-center"
            >
              <Text className="text-black font-UrbanistSemiBold text-base">
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 bg-sky-400 py-3 rounded-full items-center shadow-md shadow-orange-300/50"
            >
              <Text className="text-white font-UrbanistExtraBold text-base">
                Jugar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlayAffirmation;
