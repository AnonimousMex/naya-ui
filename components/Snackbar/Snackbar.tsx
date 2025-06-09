import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { AlertBox } from "../AlertBox";
import { SnackbarStatus } from "@/models/Snackbar";

type SnackbarProps = {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  type?: SnackbarStatus;
  duration?: number;
};

const Snackbar = ({
  message,
  visible,
  onDismiss,
  type = "success",
  duration = 3000,
}: SnackbarProps) => {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim, onDismiss, duration]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{ transform: [{ translateY: slideAnim }] }}
      className="absolute bottom-10 left-6 right-6 p-4"
    >
      <AlertBox menssage={message} type={type} />
    </Animated.View>
  );
};

export default Snackbar;
