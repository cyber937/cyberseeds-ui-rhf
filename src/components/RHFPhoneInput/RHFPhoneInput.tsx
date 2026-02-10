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
import { FieldError } from "../_shared/FieldError";

interface RHFPhoneInputProps<T extends FieldValues, K extends Path<T>>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "color"
  > {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFPhoneInput<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color = "blue",
  require = false,
  defaultValue,
  rules,
  ...props
}: RHFPhoneInputProps<T, K>) {
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ("" as PathValue<T, K>)}
      render={({ field, fieldState }) => {
        return (
          <div>
            <PhoneInput
              label={label}
              scale={scale}
              color={color}
              value={field.value}
              onChange={field.onChange}
              require={require}
              isInvalid={fieldState.error !== undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              {...props}
            />
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
