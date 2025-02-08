import React, { useCallback, useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import LocationEnabler from "@/components/LocationEnabler";
import GooglePlacesScreen from "@/components/SearchPlaces";

export default function MapScreen() {
  const { status } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      <LocationEnabler />
      <GooglePlacesScreen />
      {status === "granted" && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            // latitude: location?.coords?.latitude || 37.78825,
            // longitude: location?.coords?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 0,
              longitude: 0,
            }}
            style={{
              position: "sticky",
              left: "50%",
              top: "50%",
            }}
            // useLegacyPinView={true}
            title="you are here"
          />
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
