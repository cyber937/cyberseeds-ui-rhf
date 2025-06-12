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

export function RHFRadioGroup<T extends object, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  options,
  defaultValue,
  rules,
  ...props
}: RHFRadioGroupProps<T, K>) {
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
              {options.map((opt) => (
                <RadioGroup.Option
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <p className="text-xs text-red-600">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
