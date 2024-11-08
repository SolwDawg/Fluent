import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/OnBoarding");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Image
          resizeMode="contain"
          source={require("@/assets/images/Logo.png")}
          style={styles.logo}
          accessibilityLabel="Fluent logo"
        />
        <Text style={styles.appName}>Fluent</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 40,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 79,
    paddingRight: 79,
    paddingTop: 200,
    paddingBottom: 75,
    flexDirection: "column",
    overflow: "hidden",
  },
  contentWrapper: {
    display: "flex",
    width: 119,
    maxWidth: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    borderRadius: 12,
    alignSelf: "stretch",
    position: "relative",
    display: "flex",
    width: "100%",
    marginBottom: 120,
  },
  appName: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 35,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: -0.7,
    marginTop: 243,
  },
  versionText: {
    color: "rgba(117, 113, 113, 1)",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 24,
    letterSpacing: -0.28,
    marginTop: 8,
  },
});
