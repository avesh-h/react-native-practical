import { Pressable, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

type Props = {
  label: string;
  labelStyles?: object;
  customStyles?: object;
  onPress?: () => void;
};

export default function StyledButton({
  label,
  labelStyles,
  onPress,
  customStyles,
}: Props) {
  return (
    <Pressable style={[styles.button, customStyles]} onPress={onPress}>
      <Text style={[styles.text, labelStyles]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    backgroundColor: "#EF6C00",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 16,
  },
});
