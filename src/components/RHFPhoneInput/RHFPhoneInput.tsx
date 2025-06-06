import type { Color, Scale } from "cyberseeds-ui";
import { PhoneInput } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface RHFPhoneInputProps<T extends FieldValues, K extends Path<T>>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
  value?: string;
  onChange?: (value: string) => void;
}

export function RHFPhoneInput<T extends object, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color = "red",
  require = false,
  defaultValue,
  rules,
  ...props
}: RHFPhoneInputProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <div className="space-y-1">
            <PhoneInput
              label={label}
              scale={scale}
              color={color}
              value={field.value}
              onChange={field.onChange}
              require={require}
              isInvalid={fieldState.error !== undefined}
              {...props}
            />
            {fieldState.error && (
              <p className="text-xs text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
