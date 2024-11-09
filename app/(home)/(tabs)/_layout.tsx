import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const TabStructure = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 82,
          paddingBottom: 10,
          display: route.name === "Chat" ? "none" : "flex",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          marginTop: -14,
          marginBottom: 10,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Dictionary",
          headerShown: false,
          tabBarActiveTintColor: "#141718",
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          headerShown: true,
          tabBarActiveTintColor: "#141718",
          tabBarIcon: ({ color }) => (
            <Fontisto name="search" size={24} color={color} />
          ),
          headerShadowVisible: false,
          header: () => {
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  height: 90,
                  paddingTop: 50,
                  paddingLeft: 20,
                  backgroundColor: "#fff",
                }}
              >
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Translate"
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#141718",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarActiveTintColor: "#141718",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="g-translate" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabStructure;

const styles = StyleSheet.create({});
