import { View, TextInput, Image, StyleSheet } from "react-native";
import React from "react";


type FontistoName = "email" | "user-secret" | "locked";

interface InputFieldProps {
  icon: FontistoName;
  placeholder: string;
  secureTextEntry?: boolean;
  accessibilityLabel: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  secureTextEntry,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: icon }}
        style={styles.icon}
        accessibilityLabel={`${accessibilityLabel} icon`}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#141718",
    borderRadius: 12.84,
    paddingHorizontal: 24,
    paddingVertical: 23,
    marginBottom: 19,
  },
  icon: {
    width: 18,
    aspectRatio: 1,
    marginRight: 22,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#141718",
  },
});

export default InputField;
