import React, { useCallback, useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import LocationEnabler from "@/components/LocationEnabler";
import GooglePlacesScreen from "@/components/SearchPlaces";
import * as Location from "expo-location";

export default function ConfirmLocation() {
  const { status, selectedLocation } = useContext(LocationContext);
  console.log(selectedLocation);
  return (
    <View style={styles.container}>
      {/* <LocationEnabler /> */}
      {/* <GooglePlacesScreen /> */}
      {(status === "granted" || !!selectedLocation?.geometry) && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: selectedLocation?.geometry?.location?.lat || 37.78825,
            longitude: selectedLocation?.geometry?.location?.lng || 122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.geometry.location.longitude | 0,
                longitude: selectedLocation.geometry.location.latitude | 0,
              }}
              style={{
                position: "sticky",
                left: "50%",
                top: "50%",
              }}
              // useLegacyPinView={true}
              title="you are here"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  map: {
    flex: 1,
    position: "relative",
  },
});
