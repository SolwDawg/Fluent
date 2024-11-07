import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { Message, Role } from "@/utils/Interface";

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View>
      {role === Role.Bot ? (
        <View style={[styles.item, { backgroundColor: "#fff" }]}>
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.btnImage}
          />
        </View>
      ) : (
        <Image
          source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
          style={styles.avatar}
        />
      )}
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: "wrap",
    flex: 1,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: "center",
    height: 26,
    marginLeft: 14,
  },
});
