import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const Translate = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("VietNamese");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const API_KEY = "AIzaSyB6ulH9bTyRhVTFTLQh9sLn02CmFcjvVFo";

  const translateText = async () => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          prompt: `Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"`,
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const translatedText = response.data.candidates[0].content.parts[0].text;
      setTranslatedText(translatedText);

      Keyboard.dismiss();
    } catch (error: any) {
      console.log("Error translating text: ", error.response.data);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header: Language picker */}
        <View style={styles.header}>
          <DropDownPicker
            open={openFrom}
            value={fromLanguage}
            setOpen={setOpenFrom}
            setValue={setFromLanguage}
            containerStyle={{ flex: 1, alignItems: "center" }}
            items={[
              { label: "English", value: "English" },
              { label: "Vietnamese", value: "Vietnamese" },
            ]}
            onChangeValue={(value: string | null) => {
              if (value) setFromLanguage(value);
            }}
          />
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <FontAwesome5 name="exchange-alt" size={24} color="gray" />
          </View>
          <DropDownPicker
            open={openTo}
            value={toLanguage}
            setOpen={setOpenTo}
            setValue={setToLanguage}
            containerStyle={{ flex: 1, alignItems: "center" }}
            items={[
              { label: "Vietnamese", value: "Vietnamese" },
              { label: "English", value: "English" },
            ]}
            onChangeValue={(value: string | null) => {
              if (value) setToLanguage(value);
            }}
          />
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter text"
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              style={styles.textInput}
              multiline
              maxLength={5000}
            />
            <TouchableOpacity onPress={translateText}>
              <FontAwesome5
                name="arrow-circle-right"
                size={24}
                color="royalblue"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.charCountRow}>
            <FontAwesome5 name="microphone" size={18} color="dimgray" />
            <Text style={styles.charCountText}>{inputText.length} / 5,000</Text>
          </View>
        </View>

        {/* Output */}
        {translatedText && (
          <View style={styles.outputContainer}>
            <Text style={styles.outputText}>{translatedText}</Text>
            <View style={styles.outputIconsRow}>
              <FontAwesome5 name="volume-up" size={18} color="dimgray" />
              <FontAwesome5 name="copy" size={18} color="dimgray" />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default Translate;

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    alignSelf: "center",
    width: "100%",
    maxWidth: "90%",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  languageText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1e3a8a", // blue-600
  },
  inputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#d1d5db", // gray-300
  },
  inputRow: {
    flexDirection: "row",
  },
  textInput: {
    minHeight: 96,
    flex: 1,
    fontSize: 18,
  },
  charCountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  charCountText: {
    fontSize: 14,
    color: "#6b7280", // gray-600
  },
  outputContainer: {
    padding: 16,
    backgroundColor: "#e5e7eb", // gray-200
  },
  outputText: {
    minHeight: 96,
    fontSize: 18,
  },
  outputIconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
