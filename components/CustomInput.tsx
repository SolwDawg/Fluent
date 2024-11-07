import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type InputProps = TextInputProps & {
  label: string;
  iconName: MaterialCommunityIconsName;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
};

type MaterialCommunityIconsName =
  | "email-outline"
  | "eye-outline"
  | "eye-off-outline"
  | "lock-outline";

const Input = ({
  label,
  iconName,
  error,
  password = false,
  onFocus = () => {},
  ...props
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? "red" : isFocused ? "#141718" : "#141718",
            alignItems: "center",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          style={{ color: "#111", fontSize: 28, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: "#C2C3CB", flex: 1 }}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: "#111", fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: "red", fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "#111",
  },
  inputContainer: {
    height: 60,
    backgroundColor: "#E2E2E2",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1.5,
  },
});

export default Input;
