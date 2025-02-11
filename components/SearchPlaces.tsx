import "react-native-get-random-values";
import React, {
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { LocationContext } from "@/contexts/LocationProvider";

type Props = {
  customStyles?: object;
  onSelectedLocationChange?: (details: GooglePlaceDetail | null) => void;
  hide?: boolean;
};
const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;

const GooglePlacesScreen = ({
  customStyles,
  onSelectedLocationChange,
  hide,
}: Props) => {
  const route = useRoute();
  const inputRef = useRef<GooglePlacesAutocompleteRef>();
  const { status, setSelectedLocation } = useContext(LocationContext);

  return (
    <View
      style={[
        styles.container,
        customStyles,
        { display: hide ? "none" : "flex" },
      ]}
    >
      <GooglePlacesAutocomplete
        placeholder="Search area, street, name..."
        onPress={(data, details = null) => {
          status !== "granted" && setSelectedLocation(details!);
          onSelectedLocationChange?.(details);
          inputRef.current?.setAddressText("");
          route?.name !== "/confirm-location" &&
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
        ref={inputRef as LegacyRef<GooglePlacesAutocompleteRef>}
        keepResultsAfterBlur={false}
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
    width: "100%",
  },
  textInput: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 10,
    fontSize: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 0,
  },
});

export default GooglePlacesScreen;
