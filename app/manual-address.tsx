import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Checkbox } from "react-native-paper";

const AddressSchema = yup.object().shape({
  pincode: yup.string().required("Pincode is required"),
  city: yup.string().required("City is required"),
});

function ManualAdress() {
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { pincode: "", city: "" },
    resolver: yupResolver(AddressSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {
    //crud operation
  };

  //create this page according to figma design using RHFTextField
  return (
    <ScrollView style={styles.container}>
      <FormProvider {...methods}>
        <View>
          <Text style={styles.sectionTitle}>Address</Text>
          <RHFTextField name="pincode" placeholder="Pincode" />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 10,
              paddingTop: 12,
            }}
          >
            <RHFTextField
              name="city"
              placeholder="City"
              fieldStyle={{ width: "50%" }}
            />
            <RHFTextField
              name="state"
              placeholder="State"
              fieldStyle={{ width: "50%" }}
            />
          </View>
          <RHFTextField
            name="flatNo"
            placeholder="House/Flat no"
            fieldStyle={{ marginTop: 10 }}
          />
          <RHFTextField
            name="buildingNo"
            placeholder="Building no"
            fieldStyle={{ marginTop: 10 }}
          />
          <RHFTextField
            name="buildingNo"
            multiline={true}
            numberOfLines={16}
            placeholder="Road Name/ Area / Colony"
            fieldStyle={{ marginTop: 10, padding: 12 }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Receiver's details</Text>
          <RHFTextField
            name="receiverName"
            placeholder="Receiver's name"
            fieldStyle={{ marginTop: 12 }}
          />
          <RHFTextField
            name="receiverPhone"
            placeholder="Receiver's phone number"
            fieldStyle={{ marginTop: 12 }}
          />
          <RHFTextField
            name="petName"
            placeholder="Pet's name"
            fieldStyle={{ marginTop: 12 }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={"checked"}
            color="black"
            onPress={() => {
              // setChecked(!checked);
            }}
          />
          <Text>Set as default address</Text>
          <TouchableOpacity
            onPress={
              () => {}
              // setAddress((prev) => ({
              //   ...prev,
              //   isDefaultAddress: !prev.isDefaultAddress,
              // }))
            }
          ></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </FormProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
