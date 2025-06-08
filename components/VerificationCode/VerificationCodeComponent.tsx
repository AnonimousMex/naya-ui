import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import CodeInput from "@/components/VerificationCode/CodeInput";
import { MainButton } from "@/components/MainButton";
import { router } from "expo-router";
import { CODE_LENGTH } from "@/constants/codeVerificationLength";
import { useSnackbar } from "@/hooks/useSnackbar";
import { BackButton } from "../BackButton";
import { IMAGES } from "@/constants/images";
import { CloudBackground } from "@/components/MainPanesComponents/CloudBackground";

type Props = {
  title: string;
  onSubmit: (code: string, resetInputs: () => void) => void;
  isLoading: boolean;
  focusedBgColor: string;
  unfocusedBgColor: string;
  focusedTextColor: string;
  unfocusedTextColor: string;
  borderColor: string;
};

const VerificationCodeComponent = ({
  title,
  onSubmit,
  isLoading,
  focusedBgColor,
  unfocusedBgColor,
  focusedTextColor,
  unfocusedTextColor,
  borderColor,
}: Props) => {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRefs = useRef(
    Array.from({ length: CODE_LENGTH }, () => React.createRef()),
  );

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonDisabled(false);
    }
  }, [seconds]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1].current?.focus();
    }
  };

  const handleFocus = (idx: number) => setFocusedIndex(idx);
  const handleBlur = () => setFocusedIndex(-1);

  const isCodeComplete = code.every((v) => v !== "");

  const resetInputs = () => {
    setCode(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0].current?.focus();
  };

  const handleSubmit = () => {
    if (!isCodeComplete) {
      showSnackbar({
        type: "error",
        message: `Completa los ${CODE_LENGTH} dígitos`,
      });
      return;
    }
    onSubmit(code.join(""), resetInputs);
  };

  const inputImages = [
    IMAGES.HAPPY_CAT_1,
    IMAGES.HAPPY_LION_1,
    IMAGES.HAPPY_BUNNY_1,
    IMAGES.HAPPY_AXOLOTL_1,
  ];

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-pink-200"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CloudBackground />
      <SafeAreaView>
        <ScrollView className="mt-28" showsVerticalScrollIndicator={false}>
          <View className="px-10">
            <View className="items-start mb-6">
              <BackButton onPress={() => router.push("/(auth)/welcome")} />
            </View>

            <Text className="text-4xl font-extrabold text-brown-700 text-center mb-2 text-pink-300">
              {title}
            </Text>

            <View className="flex-row justify-center items-center mt-32 mb-4 relative h-40">
              <View className="absolute w-full h-full flex-row justify-center items-center z-0 -mt-48">
                {inputImages.map((image, idx) => (
                  <View key={`img-${idx}`} style={{ width: 80, height: 80 }}>
                    <Image
                      source={image}
                      style={styles.backgroundImage}
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>

              <View className="flex-row z-10">
                {code.map((digit, idx) => (
                  <CodeInput
                    key={idx}
                    inputRef={inputRefs.current[idx]}
                    value={digit}
                    onChange={(val) => handleChange(val, idx)}
                    isFocused={focusedIndex === idx}
                    onFocus={() => handleFocus(idx)}
                    onBlur={handleBlur}
                    inputSize="w-20 h-36"
                    focusedBgColor={focusedBgColor}
                    unfocusedBgColor={unfocusedBgColor}
                    focusedTextColor={focusedTextColor}
                    unfocusedTextColor={unfocusedTextColor}
                    placeholderColor="#C9C7C5"
                    borderColor={borderColor}
                  />
                ))}
              </View>
            </View>

            <View className="w-full mt-12">
              <MainButton
                mainText="Continuar"
                onPress={handleSubmit}
                isLoading={isLoading}
                className="w-80 py-3 mt-16"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
});

export default VerificationCodeComponent;
