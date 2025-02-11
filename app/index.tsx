import StyledButton from "@/components/Button";
import CustomModal from "@/components/Modal";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "@/contexts/LocationProvider";
import { router } from "expo-router";

function Index() {
  const { status, requestLocationPermission } = useContext(LocationContext);

  const redirectToMaps = async () => {
    if (status !== "granted") {
      const res = await requestLocationPermission?.();
      if (res?.granted) {
        router.push("/confirm-location");
      } else {
        router.push("/add-address");
      }
    } else {
      router.push("/confirm-location");
    }
  };

  return (
    <View style={styles.container}>
      <CustomModal>
        <StyledButton label="Add address" onPress={redirectToMaps} />
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FB",
  },
});

export default Index;
