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
import { Ionicons } from "@expo/vector-icons";
import { LocationContext } from "@/contexts/LocationProvider";
import { router, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { boolean } from "yup";

type Props = { customStyles?: object; onSelectedLocationChange?: () => void };
const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;

const GooglePlacesScreen = ({ customStyles }: Props) => {
  const { setSelectedLocation } = useContext(LocationContext);
  const route = useRoute();
  const inputRef = useRef<GooglePlacesAutocompleteRef>();
  // const [clear, setClear] = useState<boolean>(false);

  return (
    <View style={[styles.container, customStyles]}>
      <GooglePlacesAutocomplete
        placeholder="Search area, street, name..."
        onPress={(data, details = null) => {
          setSelectedLocation?.(details!);
          // setClear(true);
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
        // textInputProps={{
        //   value: clear && "",
        //   onBlur: () => setClear(false),
        // }}
        ref={inputRef as LegacyRef<GooglePlacesAutocompleteRef>}
        keepResultsAfterBlur={true}
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
