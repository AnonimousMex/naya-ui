import React, { useEffect } from "react";
import { Modal, View, Image, Text, Dimensions } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  text: string;
  image?: any;
};

const AutoDismissModal = ({ visible, onClose, text, image }: Props) => {
  const screenWidth = Dimensions.get("window").width;

  // Saber si es el texto específico para ajustar estilos
  const isEmotionQuestion = text === "¿Qué emoción escuchaste?";

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <View className="items-center">
          {image && (
            <Image
              source={image}
              resizeMode="contain"
              style={{
                width: screenWidth * 0.5,
                height: screenWidth * 0.5,
                marginBottom: -50,
                marginLeft: screenWidth * 0.12,
                zIndex: 10,
              }}
            />
          )}
          <View
            className="bg-white rounded-[45px] items-center border-4 border-pink-600"
            style={{
              width: screenWidth * 0.76,
              height: isEmotionQuestion ? 140 : 220,
              paddingTop: isEmotionQuestion ? 20 : 40,
              paddingBottom: isEmotionQuestion ? 20 : 40,
              justifyContent: "center",
            }}
          >
            <Text
              className="font-UrbanistExtraBold text-center"
              style={{
                fontSize: image ? 24 : 30,
              }}
            >
              {text}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AutoDismissModal;
