import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="psychometric-test"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
