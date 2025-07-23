import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="detective-emociones-page"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}