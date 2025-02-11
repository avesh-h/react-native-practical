import React from "react";
import { View, Text } from "react-native";
import RHFTextField from "./hook-form/RHFTextField";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function ReceiversDetails() {
  return (
    <View
      style={{
        rowGap: 8,
      }}
    >
      <RHFTextField
        name="receiversDetails.name"
        placeholder="Receiver's name"
        left={<FontAwesome6 name="user" size={24} color="black" />}
      />
      <RHFTextField
        name="receiversDetails.phone"
        placeholder="Receiver's phone number"
      />
      <RHFTextField name="receiversDetails.petName" placeholder="Pet's name" />
    </View>
  );
}

export default ReceiversDetails;
