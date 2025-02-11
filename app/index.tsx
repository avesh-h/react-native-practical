import StyledButton from "@/components/Button";
import CustomModal from "@/components/Modal";
import React, { useContext, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { LocationContext } from "@/contexts/LocationProvider";
import { router } from "expo-router";
import { getAllAddress } from "@/database";
import { formatAddedAddress } from "@/utils/formatAddress";
import SelectedAddress from "@/components/SelectedAddress";
import { Divider } from "react-native-paper";
import { DetailsProps, SavedAddress } from "@/utils/types";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

function Index() {
  const { status, requestLocationPermission, setRegion, setSelectedLocation } =
    useContext(LocationContext);
  const [addressList, setAddressList] = useState<any[]>([]);

  const redirectToMaps = async () => {
    if (status !== "granted") {
      const res = await requestLocationPermission?.();
      if (res?.granted) {
        router.push("/confirm-location");
      } else {
        router.push("/add-address");
      }
    } else {
      router.push("/add-address");
    }
  };

  useLayoutEffect(() => {
    async function fetchAddress() {
      const res = await getAllAddress("my_addresses");
      setAddressList(res);
    }

    fetchAddress();
  }, []);

  const onSelectAddress = (item: SavedAddress) => {
    const { geocodeAddress: address } = item;
    setRegion({
      latitude:
        address?.geometry?.location?.latitude ||
        address?.geometry?.location?.lat,
      longitude:
        address?.geometry?.location?.longitude ||
        address?.geometry?.location?.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
    setSelectedLocation(address);
    router.push("/confirm-location");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        keyExtractor={(item: any) => item?.id}
        renderItem={({ item }: { item: SavedAddress }) => (
          <Pressable onPress={() => onSelectAddress(item)}>
            <SelectedAddress
              selectedLocation={
                item?.geocodeAddress as GooglePlaceDetail & DetailsProps
              }
              hideChangeOption={true}
            />
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ paddingVertical: 10 }}>
            <Divider />
          </View>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
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
