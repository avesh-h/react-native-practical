import React, { useCallback, useContext, useMemo } from "react";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import GooglePlacesScreen from "@/components/SearchPlaces";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import LocationEnabler from "@/components/LocationEnabler";

export default function ConfirmLocation() {
  const { status, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);

  const region = useMemo(() => {
    return {
      latitude: selectedLocation?.geometry?.location?.lat || 0,
      longitude: selectedLocation?.geometry?.location?.lng || 0,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    };
  }, [selectedLocation?.geometry?.location]);

  const handleRegionChangeComplete = useCallback((newRegion: Region) => {
    setSelectedLocation((prev: GooglePlaceDetail) => {
      if (!prev) return {} as GooglePlaceDetail;
      const newRes = JSON.parse(JSON.stringify(prev));
      newRes.geometry.location.latitude = newRegion?.latitude;
      newRes.geometry.location.longitude = newRegion?.longitude;
      return newRes;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.customSearch}>
        <GooglePlacesScreen customStyles={styles.search} />
        <LocationEnabler customStyles={styles.enabler} />
      </View>
      {(status === "granted" || !!selectedLocation?.geometry) && (
        <>
          {/* <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}
            loadingEnabled={true}
          /> */}
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
  search: {
    zIndex: 10,
  },
  enabler: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 30,
    boxShadow: "0px 4px 12 0 rgba(0, 0, 0, 0.17)",
  },
  customSearch: {
    position: "absolute",
    paddingHorizontal: 10,
    alignItems: "center",
    rowGap: 0,
  },
});
