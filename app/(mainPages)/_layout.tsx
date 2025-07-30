import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="insignias" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="achievements" options={{ headerShown: false }} />
      <Stack.Screen name="user-profile" options={{ headerShown: false }} />
      <Stack.Screen name="story-path" options={{ headerShown: false }} />
      <Stack.Screen name="affirmation" options={{ headerShown: false }} />
    </Stack>
  );
}
