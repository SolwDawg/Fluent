import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Message } from "@/utils/Interface";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";

const NewChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);

  const getCompletion = async (message: string) => {
    console.log("Getting completion for: ", message);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  return (
    <View>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={(styles.logoContainer, { marginTop: height / 2 - 100 })}>
            <Image
              source={require("@/assets/images/Logo.png")}
              style={styles.image}
            />
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSend={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewChat;

const styles = StyleSheet.create({
  logoContainer: {},
  image: {},
});
