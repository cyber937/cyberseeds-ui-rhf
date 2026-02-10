import type { Color, Scale } from "cyberseeds-ui";
import { Switch } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFSwitchProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  defaultValue?: PathValue<T, K>;
  onLabel: string;
  offLabel: string;
  rules?: RegisterOptions<T, K>;
}

export function RHFSwitch<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  defaultValue,
  onLabel,
  offLabel,
  rules,
}: RHFSwitchProps<T, K>) {
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
            <Switch
              checked={!!field.value}
              onClick={() => field.onChange(!field.value)}
              scale={scale}
              color={color}
              onLabel={onLabel}
              offLabel={offLabel}
              aria-invalid={fieldState.error ? true : undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
            />
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
