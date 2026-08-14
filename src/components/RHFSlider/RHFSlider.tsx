import type { Color, Scale } from "cyberseeds-ui";
import { Slider } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFSliderProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  /** Passed to the base `Slider` label (renders its own association). */
  label?: string;
  scale?: Scale;
  color?: Color;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

/**
 * react-hook-form wrapper for `Slider`. The field value is `number`.
 * A range input always holds a valid value, so there is no invalid styling;
 * `rules` errors still render below via the shared error element.
 */
export function RHFSlider<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label,
  scale = "md",
  color,
  defaultValue,
  rules,
  min = 0,
  max = 100,
  step,
  showValue,
  formatValue,
  disabled,
  className,
}: RHFSliderProps<T, K>) {
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? (min as PathValue<T, K>)}
      render={({ field, fieldState }) => (
        <div>
          <Slider
            ref={field.ref}
            value={field.value ?? min}
            onChange={field.onChange}
            label={label}
            min={min}
            max={max}
            step={step}
            showValue={showValue}
            formatValue={formatValue}
            scale={scale}
            color={color}
            disabled={disabled}
            className={className}
          />
          <FieldError error={fieldState.error} id={errorId} />
        </div>
      )}
    />
  );
}
