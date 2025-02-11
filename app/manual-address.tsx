import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Checkbox, CheckboxProps } from "react-native-paper";
import CustomModal from "@/components/Modal";
import StyledButton from "@/components/Button";
import "react-native-get-random-values";
import getGeoCodeAddress from "@/utils/getGeocodeAddress";
import { LocationContext } from "@/contexts/LocationProvider";
import { router } from "expo-router";
import { DetailsProps } from "@/utils/types";
import ReceiversDetails from "@/components/ReceiversDetails";

const AddressSchema = yup.object().shape({
  address: yup.object().shape({
    pincode: yup.string().required("Pincode is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    flatNo: yup
      .string()
      .required("House no. is required")
      .min(1, "Flat no. is required")
      .nullable(),
    buildingNo: yup.string(),
    area: yup.string().required("Area is required"),
  }),
  receiversDetails: yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .min(10, "phone number is invalid")
      .max(10, "Cannot add more than 10 digits")
      .required("Phone number is required"),
    petName: yup.string().nullable(),
  }),
});

function ManualAdress() {
  const { setRegion, setSelectedLocation } = useContext(LocationContext);
  const [check, setChecked] = useState<
    "checked" | "unchecked" | "indeterminate"
  >("unchecked");
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      address: {
        pincode: "394210",
        city: "Surat",
        state: "Gujarat",
        flatNo: "104",
        buildingNo: "",
        area: "Aman Soicety",
      },
      receiversDetails: {
        name: "Avesh",
        phone: "6955124007",
        petName: "jepliya",
      },
    },
    resolver: yupResolver(AddressSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<DetailsProps> = async (
    values: DetailsProps
  ) => {
    const address = await getGeoCodeAddress({
      details: { ...values },
    });
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
    router.replace("/confirm-location");
  };

  //create this page according to figma design using RHFTextField
  return (
    <FormProvider {...methods}>
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingBottom: 150,
            paddingHorizontal: 16,
            rowGap: 20,
          }}
        >
          <View>
            <Text style={styles.sectionTitle}>Address</Text>
            <RHFTextField name="address.pincode" placeholder="Pincode" />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                columnGap: 10,
                paddingTop: 12,
              }}
            >
              <RHFTextField name="address.city" placeholder="City" />
              <RHFTextField name="address.state" placeholder="State" />
            </View>
            <RHFTextField
              name="address.flatNo"
              placeholder="House/Flat no"
              fieldStyle={{ marginTop: 10 }}
            />
            <RHFTextField
              name="address.buildingNo"
              placeholder="Building no"
              fieldStyle={{ marginTop: 10 }}
            />
            <RHFTextField
              name="address.area"
              multiline={true}
              numberOfLines={16}
              placeholder="Road Name/ Area / Colony"
              fieldStyle={{ marginTop: 10, padding: 12 }}
            />
          </View>
          <ReceiversDetails />
        </View>
      </ScrollView>
      <CustomModal
        customStyles={{ paddingHorizontal: 24, paddingVertical: 16 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={check}
            color="black"
            onPress={() => {
              setChecked((prev: "checked" | "unchecked" | "indeterminate") =>
                prev === "unchecked" ? "checked" : "unchecked"
              );
            }}
          />
          <Text style={{ fontWeight: "400", fontSize: 14, lineHeight: 21 }}>
            Set as default address
          </Text>
        </View>
        <StyledButton label="Save Address" onPress={handleSubmit(onSubmit)} />
      </CustomModal>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    flex: 1,
    backgroundColor: "#F5F6FB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#EF6C00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ManualAdress;
