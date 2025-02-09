import React from "react";
import { StyleSheet, View } from "react-native";
import LocationEnabler from "@/components/LocationEnabler";
import GooglePlacesScreen from "@/components/SearchPlaces";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <LocationEnabler />
      <GooglePlacesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
