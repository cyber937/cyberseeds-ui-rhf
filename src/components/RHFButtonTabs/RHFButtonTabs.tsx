import type { Color, Scale } from "cyberseeds-ui";
import { ButtonTabs } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface ButtonTabsCompatibleProps {
  className?: string;
}

interface RHFButtonTabsProps<T extends FieldValues, K extends Path<T>>
  extends ButtonTabsCompatibleProps {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  options: { label: string; value: string }[];
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFButtonTabs<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  options,
  defaultValue,
  rules,
  ...props
}: RHFButtonTabsProps<T, K>) {
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
            <ButtonTabs
              value={field.value ?? ""}
              onChange={(value) => field.onChange(value)}
              scale={scale}
              color={color}
              {...props}
            >
              <ButtonTabs.List>
                {safeOptions.map((opt) => (
                  <ButtonTabs.Trigger key={opt.value} value={opt.value}>
                    {opt.label}
                  </ButtonTabs.Trigger>
                ))}
              </ButtonTabs.List>
            </ButtonTabs>
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
