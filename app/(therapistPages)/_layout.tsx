import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="test-results" options={{ headerShown: false }} />
      <Stack.Screen name="therapist-profile" options={{ headerShown: false }} />
    </Stack>
  );
}
