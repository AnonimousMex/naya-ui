import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="test-results" options={{ headerShown: false }} />
      <Stack.Screen name="parents-profile" options={{ headerShown: false }} />
      <Stack.Screen name="therapists-list" options={{ headerShown: false }} />
      <Stack.Screen name="therapist-cv" options={{ headerShown: false }} />
    </Stack>
  );
}
