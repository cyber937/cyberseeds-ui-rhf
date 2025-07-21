import type { Color, Scale } from "cyberseeds-ui";
import { Input } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface RHFInputProps<T extends FieldValues, K extends Path<T>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFInput<T extends object, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color = "blue",
  require = false,
  defaultValue,
  rules,
  ...props
}: RHFInputProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ("" as PathValue<T, K>)}
      render={({ field, fieldState }) => {
        return (
          <div className="space-y-1">
            <Input
              {...field}
              value={field.value ?? ""}
              label={label}
              scale={scale}
              color={color}
              require={require}
              isInvalid={fieldState.error !== undefined}
              {...props}
            />
            {fieldState.error && (
              <p className="text-xs text-red-600 ml-3">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
