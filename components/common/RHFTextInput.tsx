// Usage with React Hook Form (when you add the library)
// RHFTextInput.tsx
import React from "react";
import { Control, Controller, Path, FieldValues } from "react-hook-form";
import CustomTextInput from "./CustomTextInput";

interface RHFTextInputProps<T extends FieldValues>
  extends Omit<
    React.ComponentProps<typeof CustomTextInput>,
    "value" | "onChangeText"
  > {
  control: Control<T>;
  name: Path<T>;
}

function RHFTextInput<T extends FieldValues>({
  control,
  name,
  ...props
}: RHFTextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomTextInput
          value={value}
          onChangeText={onChange}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}

export default RHFTextInput;
