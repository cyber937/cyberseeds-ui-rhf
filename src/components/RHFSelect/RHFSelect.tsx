import type { Scale } from "cyberseeds-ui";
import { Select, SelectOption } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface SelectCompatibleProps {
  className?: string;
  disabled?: boolean;
}

interface RHFSelectProps<T extends FieldValues, K extends Path<T>>
  extends SelectCompatibleProps {
  name: K;
  control: Control<T>;
  scale?: Scale;
  options: { label: string; value: PathValue<T, K> }[];
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFSelect<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  scale = "md",
  options = [],
  defaultValue,
  rules,
  ...props
}: RHFSelectProps<T, K>) {
  const safeOptions = Array.isArray(options) ? options : [];
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <div>
            <Select
              value={field.value ?? ""}
              onChange={field.onChange}
              scale={scale}
              isInvalid={fieldState.error !== undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              {...props}
            >
              {safeOptions.map((opt) => (
                <SelectOption
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Select>
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
