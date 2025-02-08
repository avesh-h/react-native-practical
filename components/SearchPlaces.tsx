import "react-native-get-random-values";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

const GooglePlacesScreen = () => {
  const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey;

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for places"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: apiKey,
          language: "en",
        }}
        enablePoweredByContainer={false}
        // suppressDefaultStyles={true}
        fetchDetails={true}
        listViewDisplayed={false}
        styles={{
          textInput: styles.textInput,
        }}
        debounce={500}
        // renderRow={(options) => {
        //   console.log(options);
        //   return <Text>{options.description}</Text>;
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    flex: 1,
    top: 80,
  },
  textInput: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default GooglePlacesScreen;
