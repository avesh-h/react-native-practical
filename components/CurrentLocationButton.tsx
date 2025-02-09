import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

function CurrentLocationButton({
  getUserLocation,
}: {
  getUserLocation: () => void;
}) {
  return (
    <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
      <Ionicons name="locate" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    padding: 12,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CurrentLocationButton;
