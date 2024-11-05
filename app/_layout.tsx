import * as SecureStore from "expo-secure-store";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { Text } from "react-native";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";

const CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Text>Hello World!</Text>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
