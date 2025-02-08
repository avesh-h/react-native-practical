import React, { useCallback, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [permissions, requestStatus] = Location.useForegroundPermissions({});

  useEffect(() => {
    async function getCurrentLocation() {
      if (permissions?.status !== "granted") {
        const res = await requestStatus();
        if (res?.granted) {
          console.log("here granted");
          const currPosition = await Location.getLastKnownPositionAsync({
            // accuracy:
            //   Location.Accuracy.Balanced ||
            //   Location.Accuracy.Low ||
            //   Location.Accuracy.High ||
            //   Location.Accuracy.Lowest,
            // requiredAccuracy: Location.Accuracy.Balanced,
          });
          console.log({ currPosition });
          setLocation(currPosition);
        } else {
          console.log("here denied");
          // alert("request not granted");
        }
      }
    }
    getCurrentLocation();
  }, []);

  console.log(location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // zoomControlEnabled
      />
      <View style={styles.button}>
        <Button
          title="Request"
          onPress={async () => {
            await requestStatus();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: "50%",
  },
  button: {
    flex: 1 / 3,
  },
});
