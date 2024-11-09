import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ProfileItemProps {
  icon: ProfileItemIconName;
  title: string;
  onPress: () => void;
  logout: boolean;
}

type ProfileItemIconName = "log-out" | "cog" | "help-with-circle";

const ProfileItem: React.FC<ProfileItemProps> = ({
  icon,
  title,
  onPress,
  logout,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.customerSupportContainer}>
      <View style={styles.leftContent}>
        <Entypo name={icon} size={27} color="black" />
        <Text style={styles.supportTitle}>{title}</Text>
      </View>
      {!logout ? <AntDesign name="right" size={24} color="black" /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customerSupportContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 23,
  },
  supportIcon: {
    width: 33,
    aspectRatio: 1,
  },
  supportTitle: {
    fontSize: 18,
    color: "rgba(33, 33, 33, 1)",
    fontWeight: "bold",
  },
  chevronIcon: {
    width: 24,
    aspectRatio: 0.96,
  },
});

export default ProfileItem;
