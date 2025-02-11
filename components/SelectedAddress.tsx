import { LocationContext } from "@/contexts/LocationProvider";
import { Image } from "expo-image";
import React, { useContext, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { formatAddedAddress, formatAddress } from "@/utils/formatAddress";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { router } from "expo-router";
import { DetailsProps } from "@/utils/types";

function SelectedAddress({
  customStyles,
  selectedLocation,
  hideChangeOption,
  onChangeAddress,
}: {
  customStyles?: object;
  selectedLocation: (GooglePlaceDetail & DetailsProps) | undefined;
  hideChangeOption?: boolean;
  onChangeAddress?: () => void;
}) {
  const identity = useMemo(
    () =>
      selectedLocation?.address_components
        ? selectedLocation?.address_components?.find(
            (item: any) =>
              item?.types?.includes("premise") ||
              item?.types?.includes("point_of_interest") ||
              item?.types?.includes("establishment") ||
              item?.types?.includes("political") ||
              item?.types?.includes("locality") ||
              item?.types?.includes("neighborhood") ||
              item?.types?.includes("country")
          )?.long_name || "N/A"
        : selectedLocation?.address
        ? selectedLocation?.address?.area
        : "N/A",
    [selectedLocation]
  );

  return (
    <View
      style={[
        { flexDirection: "row", width: "100%", columnGap: 27 },
        customStyles,
      ]}
    >
      <View style={{ flexDirection: "row", flex: 1, columnGap: 7 }}>
        <Image
          source={require("@/assets/images/location.svg")}
          style={{ height: 24, width: 24 }}
        />
        <View style={{ rowGap: 6, flex: 1 }}>
          <Text style={{ lineHeight: 22, fontWeight: 400, fontSize: 18 }}>
            {identity}
          </Text>
          <Text
            style={{
              color: "#6B7280",
              lineHeight: 17,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            {selectedLocation?.address_components
              ? formatAddress(selectedLocation)
              : selectedLocation?.address
              ? formatAddedAddress(selectedLocation)
              : "N/A"}
          </Text>
        </View>
      </View>
      {!hideChangeOption && (
        <Button
          mode={"contained-tonal"}
          style={{
            alignSelf: "flex-start",
            borderRadius: 6,
          }}
          contentStyle={{
            paddingHorizontal: 8,
            paddingVertical: 6,
            backgroundColor: "#FFEEE6",
          }}
          labelStyle={{
            marginVertical: 0,
            marginHorizontal: 0,
            color: "#EF6C00",
            fontWeight: "400",
          }}
          onPress={() => {
            onChangeAddress?.();
            router.push("/add-address");
          }}
        >
          Change
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default SelectedAddress;
