import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import getGeoCodeAddress from "@/utils/getGeocodeAddress";
import { Region } from "react-native-maps";

type ContextValueTypes = {
  status?: Location.PermissionStatus | undefined;
  requestLocationPermission?: () => Promise<Location.PermissionResponse>;
  // userLocation?: Location.LocationObjectCoords | undefined;
  // setUserLocation?: Dispatch<
  //   | Location.LocationObjectCoords
  //   | ((location: Location.LocationObjectCoords) => void)
  // >;
  region: Region | undefined;
  selectedLocation: GooglePlaceDetail | undefined;
  setRegion: Dispatch<Region | undefined>;
  setSelectedLocation: Dispatch<GooglePlaceDetail | undefined>;
  loading?: boolean;
};

export const LocationContext = createContext<ContextValueTypes>({
  setSelectedLocation: () => {},
  setRegion: () => {},
  selectedLocation: undefined,
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  },
});

function LocationProvider({ children }: PropsWithChildren) {
  const [permissions, requestStatus] = Location.useForegroundPermissions();
  const [selectedLocation, setSelectedLocation] = useState<GooglePlaceDetail>();
  const [region, setRegion] = useState<Region>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (permissions?.granted) {
        setLoading(true);
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        const details = await getGeoCodeAddress({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        });
        setSelectedLocation(details as GooglePlaceDetail);
        setLoading(false);
      }
    };
    getCurrentLocation();
  }, [permissions?.granted]);

  return (
    <LocationContext.Provider
      value={{
        status: permissions?.status,
        requestLocationPermission: requestStatus,
        selectedLocation,
        region,
        setRegion,
        setSelectedLocation,
        loading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
