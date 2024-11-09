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
import { useOAuth, useSignUp } from "@clerk/clerk-expo";

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  async function onGoogleSignIn() {
    try {
      const redirectUrl = Linking.createURL("/(home)");
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

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(home)");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
      {!pendingVerification && (
        <View style={{ alignItems: "center" }}>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={onSignUpPress}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Create Your{"\n"}Account</Text>
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
                <TextInput
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password..."
                  secureTextEntry={true}
                  style={styles.input}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forget Password?
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Register"
                  onPress={handleSubmit}
                  style={styles.loginButton}
                  textStyle={styles.loginButtonText}
                />
              </View>
            )}
          </Formik>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already account ?{" "}
              <Link href="/sign-in" style={styles.signUpLink}>
                Sign in
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
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
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
