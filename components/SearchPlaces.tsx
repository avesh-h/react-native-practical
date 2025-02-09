import "react-native-get-random-values";
import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { LocationContext } from "@/contexts/LocationProvider";
import { router } from "expo-router";

const GooglePlacesScreen = () => {
  const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;
  const { setSelectedLocation } = useContext(LocationContext);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search area, street, name..."
        onPress={(data, details = null) => {
          setSelectedLocation?.(details!);
          router.push("/confirm-location");
        }}
        query={{
          key: apiKey,
          language: "en",
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        styles={{
          textInput: styles.textInput,
        }}
        // renderLeftButton={() => (
        //   <View>
        //     <Ionicons name="search-sharp" size={18} color="#9CA3AF" />
        //   </View>
        // )}
        debounce={500}
        renderRow={(options) => {
          return <Text>{options.description}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 10,
    fontSize: 12,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default GooglePlacesScreen;
