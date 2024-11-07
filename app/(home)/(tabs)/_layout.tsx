import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabStructure = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          backgroundColor: "rgba(9,16,87,0.9)",
          display: route.name === "newChat" ? "none" : "flex",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
          marginTop: -10,
          marginBottom: 8,
        },
      })}
    >
      <Tabs.Screen name="newChat" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabStructure;

const styles = StyleSheet.create({});
