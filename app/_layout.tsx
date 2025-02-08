import Header from "@/components/Header";
import LocationProvider from "@/contexts/LocationProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="map-screen"
          options={{
            headerShown: true,
            header: (options) => {
              return (
                <Header
                  title={"Confirm Location"}
                  back={options.navigation.goBack}
                />
              );
            },
          }}
        />
      </Stack>
    </LocationProvider>
  );
}
