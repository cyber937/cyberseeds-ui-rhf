import type { Color, Scale } from "cyberseeds-ui";
import { ButtonGroup } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface ButtonGroupCompatibleProps {
  className?: string;
  disabled?: boolean;
}

interface RHFButtonGroupProps<T extends FieldValues, K extends Path<T>>
  extends ButtonGroupCompatibleProps {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  options: { label: string; value: string }[];
  multiple?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFButtonGroup<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  options,
  multiple = false,
  defaultValue,
  rules,
  ...props
}: RHFButtonGroupProps<T, K>) {
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
            <ButtonGroup
              value={field.value ?? (multiple ? [] : "")}
              onChange={(value) => field.onChange(value)}
              scale={scale}
              color={color}
              multiple={multiple}
              {...props}
            >
              {safeOptions.map((opt) => (
                <ButtonGroup.Item key={opt.value} value={opt.value}>
                  {opt.label}
                </ButtonGroup.Item>
              ))}
            </ButtonGroup>
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
