import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { isSpeakingAsync, speak, stop } from "expo-speech";
import ChatBubble from "./ChatBubble";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: "user" | "model";
  parts: ChatPart[];
}

const Chatbot: React.FC = () => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const API_KEY = "AIzaSyB6ulH9bTyRhVTFTLQh9sLn02CmFcjvVFo";

  const handleUserInput = async () => {
    const updatedChat: ChatMessage[] = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      console.log("Gemini Pro API Response: ", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        const updatedChatWithModel: ChatMessage[] = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error: any) {
      console.log("Error gemini api: ", error);
      console.log("error response: ", error.response);
      setError("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handlleSpeech = async (text: string) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }: { item: ChatMessage }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handlleSpeech(item.parts[0].text)}
    />
  );

  return (
    <View style={styles.container}>
      {chat.length === 0 && (
        <Image
          style={{
            marginLeft: 120,
          }}
          source={require("@/assets/images/Logo.png")}
        />
      )}
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
          <Text style={styles.buttonText}>
            <Ionicons name="send" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    padding: 8,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Chatbot;
