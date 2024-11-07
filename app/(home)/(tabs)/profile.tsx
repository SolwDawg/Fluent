import Button from "@/components/Button";
import { SignedIn, useClerk, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

import { useRouter } from "expo-router";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();

  const onPressSignout = () => {
    signOut();
    router.push("/sign-in");
  };

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <Button title="Sign out" onPress={onPressSignout} />
      {}
    </View>
  );
}
