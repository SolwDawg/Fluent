import { Stack } from "expo-router/stack";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          header: () => {
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  height: 90,
                  paddingTop: 50,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                }}
              >
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      ></Stack.Screen>
    </Stack>
  );
}
