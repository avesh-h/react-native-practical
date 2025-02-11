import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import LocationEnabler from "@/components/LocationEnabler";
import GooglePlacesScreen from "@/components/SearchPlaces";
import { LocationContext } from "@/contexts/LocationProvider";
import StyledButton from "@/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

export default function Address() {
  const { status, setRegion } = useContext(LocationContext);
  const onSelectPlace = useCallback((details: GooglePlaceDetail | null) => {
    const coords = details?.geometry?.location;
    setRegion({
      latitude: coords?.latitude || coords?.lat || 0,
      longitude: coords?.longitude || coords?.lng || 0,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  }, []);

  return (
    <View style={styles.container}>
      {status !== "granted" && (
        <LocationEnabler title1={"Use Current Location"} />
      )}
      <GooglePlacesScreen
        customStyles={styles.places}
        onSelectedLocationChange={onSelectPlace}
      />
      <StyledButton
        label="Add address Manually"
        customStyles={styles.button}
        labelStyles={styles.text}
        startIcon={
          <MaterialIcons name="add-location" size={24} color="#EF6C00" />
        }
        onPress={() => router.push("/manual-address")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FB",
    position: "relative",
  },
  places: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  button: {
    backgroundColor: "#fff",
    boxShadow: "0px -4px 23 rgba(0,0,0,0.1)",
  },
  text: {
    color: "#EF6C00",
    fontSize: 14,
    fontWeight: "300",
  },
});
