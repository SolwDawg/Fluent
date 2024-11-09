import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import SocialButton from "@/components/SocialButton";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Formik } from "formik";
import * as Yup from "yup";
import AntDesign from "@expo/vector-icons/AntDesign";

WebBrowser.maybeCompleteAuthSession();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .label("Password"),
});

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const onSignInPress = useCallback(
    async (values: any) => {
      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/(home)/(tabs)/home");
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [isLoaded]
  );

  async function onGoogleSignIn() {
    try {
      const redirectUrl = Linking.createURL("/(home)/(tabs)/home");
      const oAuthFlow = await googleOAuth.startOAuthFlow({
        redirectUrl: redirectUrl,
      });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
        console.log("Something went wrong during Google Sign-In.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 30, paddingLeft: 20 }}>
        <AntDesign
          name="left"
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
            backgroundColor: "#fff",
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => router.replace("/(auth)/welcome")}
          size={24}
          color="black"
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSignInPress}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login Your{"\n"}Account</Text>
              </View>
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                autoCapitalize="none"
                placeholder="Enter your email address"
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Password..."
                secureTextEntry={true}
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forget Password?</Text>
              </TouchableOpacity>
              <Button
                title="Login"
                onPress={handleSubmit}
                style={styles.loginButton}
                textStyle={styles.loginButtonText}
              />
            </View>
          )}
        </Formik>
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
            onPress={onGoogleSignIn}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    paddingBottom: 68,
    backgroundColor: "#EFEFEF",
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
    color: "rgba(50, 49, 66, 1)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
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
    borderRadius: 95.455,
    backgroundColor: "#141718",
    marginTop: 50,
    minHeight: 60,
    width: 315,
    paddingHorizontal: 15,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
  },
  signUpContainer: {
    marginTop: 39,
  },
  signUpText: {
    color: "rgba(203, 203, 203, 1)",
    fontSize: 16,
  },
  signUpLink: {
    color: "#323142",
    fontWeight: "bold",
    fontSize: 17,
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
    padding: 18,
    backgroundColor: "rgba(212, 70, 56, 0.25)",
  },
  googleButtonText: {
    color: "rgba(212, 70, 56, 1)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 2.55,
  },
  facebookButton: {
    width: 165,
    borderRadius: 10,
    padding: 18,
    backgroundColor: "rgba(66, 103, 178, 0.25)",
  },
  facebookButtonText: {
    color: "rgba(66, 103, 178, 1)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 2.55,
  },
});
