import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="y-ese-ruido-main" options={{ headerShown: false }}/>
    </Stack>
  );
}
