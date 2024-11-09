import { useAuth } from "@clerk/clerk-expo";
import SplashScreen from "./SplashScreen";
import { Redirect } from "expo-router";

export default function StartPage() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(home)/(tabs)" />;
  return <Redirect href="/SplashScreen" />;
}
