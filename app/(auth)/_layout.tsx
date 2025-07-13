import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="activate-account" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="profile-choice" options={{ headerShown: false }} />
      <Stack.Screen name="change-password" options={{ headerShown: false }} />
      <Stack.Screen name="request-password-reset" options={{ headerShown: false }} />
      <Stack.Screen name="verify-change-password-code" options={{ headerShown: false }} />
      <Stack.Screen name="connection-therapist" options={{ headerShown: false }} />
    </Stack>
  );
}
