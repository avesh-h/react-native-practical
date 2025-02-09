import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import * as Location from "expo-location";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

type ContextValueTypes = {
  status?: Location.PermissionStatus | undefined;
  requestLocationPermission?: () => Promise<Location.PermissionResponse>;
  userLocation?: Location.LocationObject | null;
  // getCurrentLocation?: () => Promise<void>;
  // setUserLocation?: Dispatch<SetStateAction<Location.LocationObject | null>>;
  setUserLocation?: (location: {
    latitude: number | undefined;
    longitude: number | undefined;
  }) => void;
  selectedLocation: GooglePlaceDetail | undefined;
  setSelectedLocation: Dispatch<GooglePlaceDetail>;
};

export const LocationContext = createContext<ContextValueTypes>({
  setSelectedLocation: () => {},
  selectedLocation: undefined,
});

function LocationProvider({ children }: PropsWithChildren) {
  const [permissions, requestStatus] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GooglePlaceDetail>();
  return (
    <LocationContext.Provider
      value={{
        status: permissions?.status,
        requestLocationPermission: requestStatus,
        userLocation,
        selectedLocation,
        setUserLocation: (location: any) => setUserLocation(location),
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
