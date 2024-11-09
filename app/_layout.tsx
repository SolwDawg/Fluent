import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

LogBox.ignoreLogs(["Clerk:"]);

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn === undefined) return;

    if (isSignedIn) {
      router.replace("/(home)/(tabs)/home");
    } else {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="SplashScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

function RootLayoutNav() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <GestureHandlerRootView>
          <InitialLayout />
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
