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
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white p-6 rounded-2xl items-center w-[90%] h-auto">
          <Text className="text-lg font-bold mb-4 text-center">
            ¿Quieres comenzar el juego?
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-4">
            Se descontará 1 energía.
          </Text>
          <View className="flex-row gap-4">
            <Pressable
              onPress={onCancel}
              className="bg-gray-300 px-6 py-2 rounded-full"
            >
              <Text className="text-black">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className="bg-orange-400 px-6 py-2 rounded-full"
            >
              <Text className="text-white">Jugar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlayAffirmation;
