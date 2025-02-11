import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ReciverForm from "./ReceiversDetails";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReceiversDetails, CompleteAddress } from "@/utils/types";
import { Button, Divider } from "react-native-paper";
import RHFTextField from "./hook-form/RHFTextField";
import StyledButton from "./Button";

import { Dimensions } from "react-native";
import { LocationContext } from "@/contexts/LocationProvider";
import { setNewAddress } from "@/database";
import { router } from "expo-router";
import { v4 as uuid } from "uuid";
const { height: screenHeight } = Dimensions.get("window"); // Get screen height

const AddressSchema = yup.object().shape({
  address: yup.object().shape({
    landmark: yup.string(),
    flatNo: yup.string(),
    buildingName: yup.string(),
    savedAs: yup.string(),
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

export default function AddressForm({
  setIsConfirm,
}: {
  setIsConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const { selectedLocation } = useContext(LocationContext);
  const [savedAs, setSavedAs] = useState<string>();
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      address: {
        flatNo: "",
        buildingName: "",
        landmark: "",
        savedAs: "",
      },
      receiversDetails: {
        name: "Avesh",
        phone: "6955124007",
        petName: "jepliya",
      },
    },
    resolver: yupResolver(AddressSchema),
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit: SubmitHandler<CompleteAddress & ReceiversDetails> = async (
    values: CompleteAddress & ReceiversDetails
  ) => {
    const res = await setNewAddress("my_addresses", {
      geocodeAddress: selectedLocation,
      id: uuid(),
      ...values,
    });
    reset({});
    setIsConfirm(false);
    console.log({ res });
    router.replace("/");
    //crud operation
  };

  const buttons = [
    {
      title: "Home",
      value: "Home",
      hide: savedAs === "Others",
      onClick: () => {
        setSavedAs("Home");
        setValue("address.savedAs", "Home");
      },
    },
    {
      title: "Office",
      value: "OfFice",
      hide: savedAs === "Others",
      onClick: () => {
        setSavedAs("Office");
        setValue("address.savedAs", "Office");
      },
    },
    {
      title: "Others",
      onClick: () =>
        setSavedAs((prev) => {
          if (prev === "Others") {
            setValue("address.savedAs", "Home");
            return "Home";
          } else {
            setValue("address.savedAs", "");
            return "Others";
          }
        }),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
      style={{ height: (4 / 7) * screenHeight }}
    >
      <FormProvider {...methods}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ rowGap: 13 }}>
            <Divider />
            <View style={{ rowGap: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Enter Complete address
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  rowGap: 8,
                }}
              >
                <RHFTextField
                  name={"address.flatNo"}
                  placeholder="House No./Flat No."
                />
                <RHFTextField
                  name={"address.buildingName"}
                  placeholder="Building name"
                />
                <RHFTextField
                  name={"address.landmark"}
                  placeholder="Landmark"
                />
              </View>
            </View>
            <View style={{ rowGap: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Save address as
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 8,
                  alignItems: "flex-end",
                }}
              >
                {buttons?.map(({ title, hide, onClick, value }) => (
                  <Button
                    key={title}
                    mode="outlined"
                    style={[
                      {
                        borderRadius: 4,
                        borderWidth: 0.4,
                        alignSelf: "flex-start",
                      },
                      { display: hide ? "none" : "flex" },
                    ]}
                    contentStyle={[
                      {
                        paddingVertical: 6,
                        paddingHorizontal: 8,
                      },
                      title === savedAs ? { backgroundColor: "#FFEEE6" } : {},
                    ]}
                    labelStyle={[
                      {
                        marginVertical: 0,
                        marginHorizontal: 0,
                        color: "#374151",
                        fontWeight: "300",
                      },
                      title === savedAs ? { color: "#EF6C00" } : {},
                    ]}
                    onPress={() => {
                      onClick();
                    }}
                  >
                    {title}
                  </Button>
                ))}
                {savedAs === "Others" && (
                  <RHFTextField
                    name="address.savedAs"
                    mode="flat"
                    placeholder="Save as"
                    style={{
                      backgroundColor: "#fff",
                      height: "auto",
                      paddingHorizontal: 0,
                      paddingVertical: 5,
                    }}
                  />
                )}
              </View>
            </View>
            <ReciverForm />
            <StyledButton
              label="Save Address"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
