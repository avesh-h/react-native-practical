import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import * as Location from "expo-location";

type ContextValueTypes = {
  status?: Location.PermissionStatus | undefined;
  requestLocationPermission?: () => Promise<Location.PermissionResponse>;
  userLocation?: Location.LocationObject | null;
  // getCurrentLocation?: () => Promise<void>;
  setUserLocation?: Dispatch<SetStateAction<Location.LocationObject | null>>;
};

export const LocationContext = createContext<ContextValueTypes>({});

function LocationProvider({ children }: PropsWithChildren) {
  const [permissions, requestStatus] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);

  // async function getCurrentLocation() {
  //   if (permissions?.status !== "granted") {
  //     const res = await requestStatus();
  //     if (res?.granted) {
  //       const currPosition = await Location.getLastKnownPositionAsync({});
  //       setUserLocation(currPosition);
  //     } else {
  //       alert("request not granted");
  //     }
  //   }
  // }

  return (
    <LocationContext.Provider
      value={{
        status: permissions?.status,
        requestLocationPermission: requestStatus,
        userLocation,
        // getCurrentLocation,
        setUserLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
