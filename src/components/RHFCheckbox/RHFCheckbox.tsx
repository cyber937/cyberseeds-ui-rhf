import type { Color, Scale } from "cyberseeds-ui";
import { Checkbox } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFCheckboxProps<T extends FieldValues, K extends Path<T>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFCheckbox<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label,
  scale = "md",
  color = "blue",
  defaultValue,
  rules,
  ...props
}: RHFCheckboxProps<T, K>) {
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div className="space-y-1">
            <Checkbox
              {...field}
              checked={field.value}
              label={label}
              scale={scale}
              color={color}
              aria-invalid={fieldState.error ? true : undefined}
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
