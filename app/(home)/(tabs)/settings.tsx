import Button from "@/components/Button";
import { SignedIn, useClerk, useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "@/components/ProfileItem";

export default function settings() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();

  const onPressSignout = () => {
    signOut();
    router.push("/(auth)/welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderTitle}>Profile</Text>
        <Image
          source={require("@/assets/images/User.png")}
          style={styles.profileImage}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="Profile picture"
        />
        <Text style={styles.userName}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
        <Text>{user?.username}</Text>
        <Text style={styles.userName}>{user?.username}</Text>
      </View>
      <ProfileItem
        icon="cog"
        title="Preferences"
        onPress={() => router.push("/(home)/profile")}
        logout={false}
      />
      <ProfileItem
        icon="help-with-circle"
        title="Customer Support"
        onPress={() => {}}
        logout={false}
      />
      <ProfileItem
        icon="log-out"
        title="Logout"
        onPress={onPressSignout}
        logout={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    maxWidth: 370,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    marginTop: 40,
  },
  HeaderContainer: {
    alignItems: "center",
    marginBottom: 56,
  },
  HeaderTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "rgba(20, 23, 24, 1)",
    marginBottom: 22,
  },
  profileImage: {
    width: 100,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "rgba(33, 33, 33, 1)",
  },
});
