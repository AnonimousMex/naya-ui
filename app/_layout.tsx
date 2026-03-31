import * as Sentry from "@sentry/react-native";
import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useCallback } from "react";
import { SnackbarProvider } from "@/context";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { queryClient } from "@/config/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import "react-native-reanimated";
import "../global.css";

// Inicialización de Sentry
Sentry.init({
  dsn: "https://1ad48203ea3a520ed97384e4f1be5131@o4511136037470208.ingest.us.sentry.io/4511136043827200",
  debug: true,
  tracesSampleRate: 1.0,
});

function RootLayout() {
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
      // Descomenta la línea de abajo UNA VEZ para ver el error en el panel de Sentry
      // Sentry.captureException(new Error("Métrica de prueba: Conexión Naya-UI exitosa"));
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

  if (!loaded) return null;

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
<<<<<<< HEAD
          <Stack.Screen
            name="(y_ese_ruido)/y-ese-ruido-main"
            options={{ headerShown: false }}
          />
=======
          <Stack.Screen name="(emorganiza)" options={{ headerShown: false }} />
          <Stack.Screen name="(y_ese_ruido)/y-ese-ruido-main" options={{ headerShown: false }} />
          <Stack.Screen name="(detectiveEmociones)" options={{ headerShown: false }} />
          <Stack.Screen name="(test)" options={{ headerShown: false }} />
>>>>>>> origin/develop
          <Stack.Screen name="+not-found" />
        </Stack> 
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

// Exportación envuelta para Monitoreo
export default Sentry.wrap(RootLayout);
