import React from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function MapLoader() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 15,
      }}
    >
      <ActivityIndicator size="small" color="#EF6C00" />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, color: "#EF6C00", fontWeight: "bold" }}>
          Getting your current location
        </Text>
        <Text style={{ fontSize: 12, color: "#EF6C00" }}>
          You will be redirected in few seconds
        </Text>
      </View>
    </View>
  );
}

export default MapLoader;
