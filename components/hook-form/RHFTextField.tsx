import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

type Props = {
  name: string;
  fieldStyle?: object;
  Icon?: React.ReactNode;
} & TextInputProps;

function RHFTextField({ name, fieldStyle, Icon, ...props }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <View style={{ flex: 1 }}>
          <TextInput
            error={!!error}
            style={{
              ...styles.field,
              ...fieldStyle,
            }}
            {...field}
            mode="outlined"
            onChangeText={(e) => field.onChange(e)}
            autoFocus={false}
            {...props}
            placeholderTextColor={"#959393"}
            outlineStyle={{
              borderWidth: 0,
              borderRadius: 0,
            }}
            contentStyle={{
              padding: 0,
            }}
            left={Icon}
          />
          {!!error && (
            <HelperText type="error" visible={!!error?.message}>
              {error?.message}
            </HelperText>
          )}
        </View>
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
    fontSize: 12,
    boxShadow: "0px 12px 60 rgba(67, 71, 77, 0.08)",
  },
});

export default RHFTextField;
