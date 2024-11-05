import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Define the props interface
interface InputProps extends TextInputProps {
  label?: string;
  iconName: MaterialCommunityIcons;
  error?: string;
  password?: boolean;
  onFocus?: () => void;
}

type MaterialCommunityIcons = "email-outline" | "lock-outline";

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  password = false,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState<boolean>(password);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? "red" : isFocused ? "blue" : "#ccc",
            alignItems: "center",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          style={{ color: "blue", fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: "blue", flex: 1 }}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye" : "eye-off"}
            style={{ color: "blue", fontSize: 22 }}
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
    color: "#ccc",
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#ccc",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default Input;
