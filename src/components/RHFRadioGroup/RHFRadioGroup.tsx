import type { Color, Scale } from "cyberseeds-ui";
import { RadioGroup } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RadioGroupCompatibleProps {
  className?: string;
  disabled?: boolean;
}

interface RHFRadioGroupProps<T extends FieldValues, K extends Path<T>>
  extends RadioGroupCompatibleProps {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  options: { label: string; value: PathValue<T, K> }[];
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFRadioGroup<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  options,
  defaultValue,
  rules,
  ...props
}: RHFRadioGroupProps<T, K>) {
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
            <RadioGroup
              value={field.value as string}
              onChange={field.onChange}
              scale={scale}
              color={color}
              {...props}
            >
              {safeOptions.map((opt) => (
                <RadioGroup.Option
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </RadioGroup>
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
