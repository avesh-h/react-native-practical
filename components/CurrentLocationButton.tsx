import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

function CurrentLocationButton({
  getUserLocation,
  hide,
}: {
  getUserLocation: () => void;
  hide: boolean;
}) {
  return (
    <Pressable
      style={[{ display: hide ? "none" : "flex" }, styles.locationButton]}
      onPress={getUserLocation}
    >
      <Ionicons name="locate" size={24} color="#EF6C00" />
      <Text style={{ color: "#EF6C00" }}>Use Current Location</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignSelf: "center",
    borderWidth: 0.6,
    borderColor: "#EF6C00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    boxShadow: "0 4 9 1 rgba(0,0,0,0.25)",
    columnGap: 4,
  },
});

export default CurrentLocationButton;
