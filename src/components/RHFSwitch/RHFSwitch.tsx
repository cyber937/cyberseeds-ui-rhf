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
  /** @deprecated Use `onLabel` instead */
  onLable?: string;
  /** @deprecated Use `offLabel` instead */
  offLable?: string;
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
  onLable,
  offLable,
  rules,
}: RHFSwitchProps<T, K>) {
  const resolvedOnLabel = onLabel ?? onLable ?? "";
  const resolvedOffLabel = offLabel ?? offLable ?? "";

  if (process.env.NODE_ENV !== "production") {
    if (onLable !== undefined) {
      console.warn(
        "[cyberseeds-ui-rhf] RHFSwitch: `onLable` is deprecated. Use `onLabel` instead.",
      );
    }
    if (offLable !== undefined) {
      console.warn(
        "[cyberseeds-ui-rhf] RHFSwitch: `offLable` is deprecated. Use `offLabel` instead.",
      );
    }
  }

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
            <Switch
              checked={!!field.value}
              onClick={() => field.onChange(!field.value)}
              scale={scale}
              color={color}
              onLabel={resolvedOnLabel}
              offLabel={resolvedOffLabel}
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
