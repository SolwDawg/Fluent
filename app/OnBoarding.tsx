import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

import Animated, {
  FadeIn,
  FadeOut,
  SlideOutLeft,
  SlideInRight,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    image: require("@/assets/images/OnBoarding/OnBoarding1.png"),
    title: " Unlock the Power Of  Future AI",
    description: `Chat with the smartest AI Future \n Experience power of AI with us`,
  },
  {
    image: require("@/assets/images/OnBoarding/OnBoarding2.png"),
    title: " Unlock the Power Of  Future AI",
    description: `Chat with the smartest AI Future \n Experience power of AI with us`,
  },
  {
    image: require("@/assets/images/OnBoarding/OnBoarding3.png"),
    title: " Unlock the Power Of  Future AI",
    description: `Chat with the smartest AI Future \n Experience power of AI with us`,
  },
];

export default function Onboarding() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    router.push("/(auth)/welcome");
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <View
        style={{
          width: "100%",
          display: "flex",
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={endOnboarding}
        >
          <Text style={{ fontSize: 18, color: "#676565" }}>Skip</Text>
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={swipes}>
        <View key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Image source={data.image} style={styles.robotImage} />
          </Animated.View>
          <View
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignContent: "center",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            {onboardingSteps.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.dots,
                  {
                    borderWidth: index === screenIndex ? 1 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles.dotsInside,
                    {
                      backgroundColor:
                        index === screenIndex
                          ? "#111"
                          : "rgba(35, 38, 47, 0.5)",
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <View>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <View style={styles.NavigatorContainer}>
                <View style={styles.buttonContainer}>
                  <AntDesign
                    name="left"
                    size={24}
                    style={styles.arrowButton}
                    color="black"
                    onPress={onBack}
                  />
                  <View style={styles.separator} />
                  <AntDesign
                    name="right"
                    size={24}
                    style={styles.arrowButton}
                    color="black"
                    onPress={onContinue}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 29,
    paddingRight: 29,
    paddingBottom: 38,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
  },
  robotImage: {
    position: "relative",
    display: "flex",
  },
  dotsContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  dots: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsInside: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  titleContainer: {},
  title: {
    color: "rgba(35, 38, 47, 1)",
    fontSize: 34,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 51,
    letterSpacing: -0.68,
  },
  descriptionContainer: {
    marginTop: 5,
  },
  description: {
    color: "rgba(142, 146, 149, 1)",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 29,
    textAlign: "center",
  },
  NavigatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#FCFCFD",
    display: "flex",
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    justifyContent: "center",
    flexDirection: "row",
  },
  arrowButton: {
    alignSelf: "stretch",
    position: "relative",
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    width: 24,
    flexShrink: 0,
    aspectRatio: 1,
  },
  separator: {
    borderRadius: 2,
    backgroundColor: "#E6E8EC",
    alignSelf: "stretch",
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    width: 2,
    flexShrink: 0,
    height: 24,
  },
});
