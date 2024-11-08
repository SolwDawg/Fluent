import { Text, View, StyleSheet, Image } from "react-native";
import Button from "@/components/Button";
import SocialButton from "@/components/SocialButton";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const welcome = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@/assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to{"\n"}Fluent</Text>
      <Button
        title="Log in"
        onPress={() => {
          router.replace("/sign-in");
        }}
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
      />
      <Button
        title="Sign up"
        onPress={() => {
          router.push("/sign-up");
        }}
        style={styles.signupButton}
        textStyle={styles.signupButtonText}
      />
      <Text style={styles.continueText}>Continue With Accounts</Text>
      <View style={styles.socialButtonsContainer}>
        <SocialButton
          title="Google"
          onPress={() => {}}
          style={styles.googleButton}
          textStyle={styles.googleButtonText}
        />
        <SocialButton
          title="Facebook"
          onPress={() => {}}
          style={styles.facebookButton}
          textStyle={styles.facebookButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderRadius: 40,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 12,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 8,
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "700",
  },
  logo: {
    borderRadius: 16,
    position: "relative",
    display: "flex",
    marginTop: 97,
    width: 154,
    maxWidth: "100%",
    aspectRatio: 0.84,
  },
  welcomeText: {
    color: "#141718",
    textAlign: "center",
    fontSize: 40,
    lineHeight: 64,
    marginTop: 8,
    width: 382,
  },
  loginButton: {
    alignSelf: "center",
    flex: 1,
    flexShrink: 1,
    borderRadius: 95.455,
    backgroundColor: "#141718",
    marginTop: 50,
    minHeight: 60,
    width: 315,
    maxWidth: 315,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 16,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 0.2,
    lineHeight: 28.8,
  },
  signupButton: {
    alignSelf: "center",
    flex: 1,
    flexShrink: 1,
    borderRadius: 95,
    marginTop: 17,
    minHeight: 60,
    width: "100%",
    maxWidth: 315,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 17,
    paddingBottom: 17,
    backgroundColor: "#B1B1B1",
  },
  signupButtonText: {
    fontSize: 17,
    color: "#E3E3E3",
    textAlign: "center",
    letterSpacing: 0.19,
    lineHeight: 27.2,
  },
  continueText: {
    color: "#ACADB9",
    fontSize: 16,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    letterSpacing: -0.16,
    marginTop: 35,
  },
  socialButtonsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginTop: 25,
  },
  googleButton: {
    width: 165,
    borderRadius: 10,
    paddingLeft: 47,
    paddingRight: 47,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "rgba(212, 70, 56, 0.25)",
  },
  googleButtonText: {
    color: "rgba(212, 70, 56, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2.55,
  },
  facebookButton: {
    width: 165,
    borderRadius: 10,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "rgba(66, 103, 178, 0.25)",
  },
  facebookButtonText: {
    color: "rgba(66, 103, 178, 1)",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2.55,
  },
});
