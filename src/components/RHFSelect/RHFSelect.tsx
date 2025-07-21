import type { Color, Scale } from "cyberseeds-ui";
import { Select, SelectOption } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface SelectCompatibleProps {
  className?: string;
  disabled?: boolean;
}

interface RHFSelectProps<T extends FieldValues, K extends Path<T>>
  extends SelectCompatibleProps {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  options: { label: string; value: PathValue<T, K> }[];
  rules?: RegisterOptions<T, K>;
}

export function RHFSelect<T extends object, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  options,
  rules,
  ...props
}: RHFSelectProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div>
            <Select
              value={field.value ?? ""}
              onChange={field.onChange}
              scale={scale}
              color={color}
              {...props}
            >
              {options.map((opt) => (
                <SelectOption
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Select>
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
