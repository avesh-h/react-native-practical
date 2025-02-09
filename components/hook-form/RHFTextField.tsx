import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

type Props = {
  name: string;
} & TextInputProps;

function RHFTextField({ name, ...props }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextInput
            error={!!error}
            {...field}
            mode="outlined"
            onChangeText={(e) => field.onChange(e)}
            autoFocus={false}
            {...props}
            style={styles.field}
            placeholderTextColor={"#959393"}
            outlineStyle={{
              borderWidth: 0,
              borderRadius: 0,
            }}
          />
          <HelperText visible={!!error?.message} type="error">
            {error?.message}
          </HelperText>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: "rgba(67, 71, 77, 0.08)",
    borderRadius: 16,
    overflow: "hidden",
    // shadowColor: "rgba(67, 71, 77, 0.08)",
    boxShadow: "0px 12px 60 rgba(67, 71, 77, 0.08)",
  },
});

export default RHFTextField;
