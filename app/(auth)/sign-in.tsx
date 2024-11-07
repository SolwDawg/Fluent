import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import SocialButton from "@/components/SocialButton";
import CustomInput from "@/components/CustomInput";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(home)/new");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login Your{"\n"}Account</Text>
        </View>
        <TextInput
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          value={emailAddress}
          autoCapitalize="none"
          placeholder="Enter your email address"
        />
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forget Password ?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Login"
        onPress={onSignInPress}
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
      />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>
          Create New Account?{" "}
          <Link href="/sign-up" style={styles.signUpLink}>
            Sign up
          </Link>
        </Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.continueWithText}>Continue With Accounts</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    paddingTop: 68,
    paddingBottom: 68,
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    alignSelf: "stretch",
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginTop: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: "600",
    lineHeight: 48,
    letterSpacing: -1.52,
    color: "rgba(50, 49, 66, 1)",
  },
  forgotPassword: {
    marginTop: 14,
    alignSelf: "flex-start",
  },
  forgotPasswordText: {
    color: "rgba(50, 49, 66, 1)",
  },
  loginButton: {
    alignSelf: "center",
    flexShrink: 1,
    borderRadius: 95.455,
    backgroundColor: "#141718",
    marginTop: 50,
    minHeight: 60,
    width: 315,
    maxWidth: 315,
    paddingLeft: 15,
    paddingRight: 15,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 0.2,
    lineHeight: 28.8,
  },
  signUpContainer: {
    marginTop: 39,
  },
  signUpText: {
    color: "rgba(203, 203, 203, 1)",
    letterSpacing: -0.28,
    fontSize: 16,
    gap: 30,
  },
  signUpLink: {
    color: "#323142",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
  },
  divider: {
    borderColor: "rgba(194, 195, 203, 1)",
    borderWidth: 1,
    width: "100%",
    marginTop: 34,
  },
  continueWithText: {
    color: "rgba(172, 173, 185, 1)",
    fontSize: 16,
    letterSpacing: -0.16,
    marginTop: 26,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 23,
    width: "100%",
    maxWidth: 344,
    justifyContent: "space-between",
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
