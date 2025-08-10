import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import { SnackbarProvider } from "@/context";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { queryClient } from "@/config/reactQuery";
import "react-native-reanimated";
import "../global.css";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-ExtraLight": require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    "Urbanist-Light": require("../assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    Urbanist: require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useFocusEffect(
    useCallback(() => {
      const setupBars = async () => {
        await NavigationBar.setButtonStyleAsync("dark");
      };

      setupBars();

      return () => {};
    }, []),
  );

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(mainPages)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(therapistPages)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(parentsPages)"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(memociones)" options={{ headerShown: false }} />
          <Stack.Screen name="(emorganiza)" options={{ headerShown: false }} />
          <Stack.Screen name="(y_ese_ruido)/y-ese-ruido-main" options={{ headerShown: false }} />
          <Stack.Screen name="(test)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
