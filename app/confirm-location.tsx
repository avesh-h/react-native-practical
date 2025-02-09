import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import GooglePlacesScreen from "@/components/SearchPlaces";
import { MaterialIcons } from "@expo/vector-icons";

export default function ConfirmLocation() {
  const { status, selectedLocation } = useContext(LocationContext);

  const [region, setRegion] = useState({
    latitude: selectedLocation?.geometry?.location?.lat || 37.78825,
    longitude: selectedLocation?.geometry?.location?.lng || 122.4324,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      {/* <GooglePlacesScreen /> */}
      {(status === "granted" || !!selectedLocation?.geometry) && (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChangeComplete}
          ></MapView>
          {selectedLocation && (
            <>
              <View style={styles.markerFixed}>
                <View style={styles.outer}>
                  <View style={styles.inner} />
                </View>
              </View>
            </>
          )}
        </>
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
  },
  outer: {
    height: 38,
    width: 38,
    backgroundColor: "#DAFF6F",
    borderRadius: 19,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  inner: {
    height: 12,
    width: 12,
    backgroundColor: "#7E953C",
    borderRadius: 6,
    opacity: 0.5,
  },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -19,
    marginTop: -19,
    zIndex: 30,
    elevation: 10,
  },
});
