import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  title: string;
  back?: () => void;
};

function Header({ title, back }: Props) {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={{ padding: 8 }} role="button" onPress={back}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 1,
    height: 48,
    borderBottomWidth: 0.4,
    borderBottomColor: "rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
});
export default Header;
