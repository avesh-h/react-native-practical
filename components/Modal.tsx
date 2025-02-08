import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";

type CustomModalProps = {
  visible?: boolean;
  onClose?: () => void;
  customStyles?: object;
};
export default function CustomModal({
  children,
  visible,
  onClose,
  customStyles,
}: PropsWithChildren & CustomModalProps) {
  return <View style={[styles.container, customStyles]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    paddingTop: 12,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});
