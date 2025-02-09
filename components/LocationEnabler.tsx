import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StyledButton from "./Button";

type Props = { title1?: string; customStyles?: object };

function LocationEnabler({ title1, customStyles }: Props) {
  return (
    <View style={[styles.container, customStyles]}>
      <MaterialIcons name="location-off" size={26} color="black" />
      <View style={styles.description}>
        <Text style={styles.text1}>
          {title1 ? title1 : "Enable location permission"}
        </Text>
        <Text style={styles.text2}>
          Your precise location helps us deliver on time
        </Text>
      </View>
      <StyledButton
        label="Enable"
        customStyles={styles.button}
        labelStyles={{ fontSize: 12, fontWeight: "400" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    maxWidth: "100%",
    backgroundColor: "rgba(255, 246, 247, 1)",
    flexDirection: "row",
    position: "relative",
    top: 0,
    columnGap: 8,
    zIndex: 10,
  },
  description: {
    rowGap: 2,
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  text1: {
    color: "#1B281B",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
  },
  text2: {
    color: "rgba(20, 46, 21, 0.62)",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 14,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 8,
  },
});

export default LocationEnabler;
