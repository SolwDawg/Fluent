import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React, { useState } from "react";
import MessageInput from "@/components/MessageInput";
import { Message, Role } from "@/utils/Interface";
import { defaultStyles } from "@/constants/Styles";
import MessageIdeas from "@/components/MessageIdeas";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";

const DUMMY_MESSAGE: Message[] = [
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
  { content: "Hello, how can i help you today?", role: Role.Bot },
  {
    content:
      "I need help with my React native app. need help with my react native app i need help react native app",
    role: Role.User,
  },
];

const newChat = () => {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGE);
  const [height, setHeight] = useState(0);

  const getCompletion = async (message: string) => {
    console.log("Getting completion for: ", message);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.page} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/Logo.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
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

export default newChat;

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
});
