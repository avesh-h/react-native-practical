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

type ContextValueTypes = {
  status?: Location.PermissionStatus | undefined;
  requestLocationPermission?: () => Promise<Location.PermissionResponse>;
  // userLocation?: Location.LocationObjectCoords | undefined;
  // setUserLocation?: Dispatch<
  //   | Location.LocationObjectCoords
  //   | ((location: Location.LocationObjectCoords) => void)
  // >;
  selectedLocation: GooglePlaceDetail | undefined;
  setSelectedLocation: Dispatch<
    GooglePlaceDetail | ((location: GooglePlaceDetail) => void)
  >;
};

export const LocationContext = createContext<ContextValueTypes>({
  setSelectedLocation: () => {},
  selectedLocation: undefined,
});

function LocationProvider({ children }: PropsWithChildren) {
  const [permissions, requestStatus] = Location.useForegroundPermissions();
  const [selectedLocation, setSelectedLocation] = useState<GooglePlaceDetail>();

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        setSelectedLocation({
          geometry: {
            location: {
              lat: location?.coords?.latitude || 0,
              lng: location?.coords?.longitude || 0,
            },
          },
        } as GooglePlaceDetail);
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
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
