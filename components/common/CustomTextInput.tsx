import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
  inputContainerStyle?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputContainerStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
});

export default CustomTextInput;
