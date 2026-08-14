import type { Color, Scale } from "cyberseeds-ui";
import { DatePicker, Label } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";
import {
  formatDateInputString,
  parseDateInputString,
} from "../_shared/dateString";

interface RHFDatePickerProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
  /**
   * Shape of the form value.
   * - `"date"` (default): the field holds `Date | null`.
   * - `"string"`: the field holds `"YYYY-MM-DD" | ""` — a drop-in
   *   replacement for native `<input type="date">` + `z.string()` schemas.
   *   Conversion uses LOCAL date fields (timezone-safe); clearing yields
   *   `""` so required validation behaves exactly like the native input.
   */
  valueAs?: "date" | "string";
  min?: Date;
  max?: Date;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

/**
 * react-hook-form wrapper for `DatePicker`.
 *
 * Note: `DatePicker` forwards its ref to the trigger button, so RHF's
 * focus-on-error works; `onBlur` is not forwarded (the base has no blur
 * passthrough), so `mode: "onBlur"` validation will not fire for this field.
 */
export function RHFDatePicker<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color,
  require = false,
  defaultValue,
  rules,
  valueAs = "date",
  min,
  max,
  disabled,
  placeholder,
  className,
}: RHFDatePickerProps<T, K>) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-datepicker`;
  const emptyValue = (valueAs === "string" ? "" : null) as PathValue<T, K>;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? emptyValue}
      render={({ field, fieldState }) => {
        const dateValue =
          valueAs === "string"
            ? parseDateInputString(field.value)
            : (field.value ?? null);
        return (
          <div>
            {label !== "" && (
              <Label
                text={label}
                htmlFor={fieldId}
                scale={scale}
                require={require}
              />
            )}
            <DatePicker
              ref={field.ref}
              id={fieldId}
              value={dateValue}
              onChange={(d) =>
                field.onChange(
                  (valueAs === "string"
                    ? d
                      ? formatDateInputString(d)
                      : ""
                    : d) as PathValue<T, K>,
                )
              }
              min={min}
              max={max}
              scale={scale}
              color={color}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
              isInvalid={fieldState.error !== undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
            />
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
