import React, {
  LegacyRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import GooglePlacesScreen from "@/components/SearchPlaces";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import LocationEnabler from "@/components/LocationEnabler";
import CurrentLocationButton from "@/components/CurrentLocationButton";
import * as Location from "expo-location";
import getGeoCodeAddress from "@/utils/getGeocodeAddress";

export default function ConfirmLocation() {
  const { status, selectedLocation, setSelectedLocation } =
    useContext(LocationContext);

  const mapRef = useRef<MapView | null>(null);

  const [region, setRegion] = useState<Region>({
    latitude: selectedLocation?.geometry?.location?.lat || 0,
    longitude: selectedLocation?.geometry?.location?.lng || 0,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const handleRegionChangeComplete = useCallback(async (newRegion: Region) => {
    // if (
    //   region?.latitude !== newRegion?.latitude ||
    //   region?.longitude !== newRegion?.longitude
    // ) {
    setRegion(newRegion);
    const details = await getGeoCodeAddress({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
    if (details) setSelectedLocation(details);
    // }
  }, []);

  const getUserLocation = useCallback(async () => {
    const currLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
    });
    if (currLocation) {
      const { latitude, longitude } = currLocation?.coords;
      mapRef.current!.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    }
  }, []);

  const onSelectPlace = useCallback((details: GooglePlaceDetail | null) => {
    const coords = details?.geometry?.location;
    mapRef.current?.animateToRegion({
      ...region,
      latitude: coords?.latitude || coords?.lat || 0,
      longitude: coords?.longitude || coords?.lng || 0,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.customSearch}>
        <GooglePlacesScreen
          customStyles={styles.search}
          onSelectedLocationChange={onSelectPlace}
        />
        {status !== "granted" && (
          <LocationEnabler customStyles={styles.enabler} />
        )}
      </View>
      {
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChangeComplete}
            loadingEnabled={true}
            ref={mapRef}
          />
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
      }
      <CurrentLocationButton getUserLocation={getUserLocation} />
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
    zIndex: 10,
  },
  search: {
    zIndex: 15,
  },
  enabler: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 35,
    boxShadow: "0px 4px 12 0 rgba(0, 0, 0, 0.17)",
    position: "relative",
    top: -25,
    zIndex: 11,
  },
  customSearch: {
    position: "absolute",
    paddingHorizontal: 10,
    alignItems: "center",
    top: 16,
    width: "100%",
  },
});
