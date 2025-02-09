import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/components/hook-form/RHFTextField";

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
    <View style={styles.container}>
      <FormProvider {...methods}>
        <RHFTextField name="pincode" placeholder="Pincode" />
        <RHFTextField name="city" placeholder="City" />
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    flex: 1,
    backgroundColor: "#F5F6FB",
  },
});

export default ManualAdress;
