import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Speech from "expo-speech";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord: any) => {
    setNewWord(enteredWord);
  };

  const getInfo = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`;

    try {
      const response = await axios.get(url);
      const word = response.data[0].word;
      setCheckedWord(word);

      const def = response.data[0].meanings[0].definitions[0].definition;
      setDefinition(def);

      const eg = response.data[0].meanings[0].definitions[0].example;
      setExample(eg);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const speak = () => {
    Speech.speak(checkedWord);
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 42, marginTop: 20 }}>
            Dictionary
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="search a word"
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            textAlign="center"
            clearButtonMode="always"
            onChangeText={searchWord}
            value={newWord}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity style={styles.buttonDesign} onPress={getInfo}>
              <Text style={styles.buttonText}>Go !</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.textDesign}>
              Entered Word: {"\n"}
              {checkedWord}
            </Text>
            <Text style={styles.textDesign}>
              Definition :{"\n"} {definition}{" "}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    marginTop: 100,
    borderRadius: 20,
    fontSize: 23,
  },
  buttonDesign: {
    width: 120,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 5,
  },
  speakerButton: {
    width: 50,
    height: 40,
  },
  textDesign: {
    fontSize: 25,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});
