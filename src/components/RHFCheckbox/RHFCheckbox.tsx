import type { Color, Scale } from "cyberseeds-ui";
import { Checkbox } from "cyberseeds-ui";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

interface RHFCheckboxProps<T extends FieldValues, K extends Path<T>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  defaultValue?: PathValue<T, K>;
}

export function RHFCheckbox<T extends object, K extends Path<T>>({
  name,
  control,
  label = "checkbox",
  scale = "md",
  color = "red",
  defaultValue,
  ...props
}: RHFCheckboxProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Checkbox
            {...field}
            label={label}
            scale={scale}
            color={color}
            {...props}
          />
        );
      }}
    />
  );
}
