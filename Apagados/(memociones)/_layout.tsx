import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="memociones-main-page"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
