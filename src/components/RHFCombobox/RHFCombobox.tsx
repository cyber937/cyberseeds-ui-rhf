import type { Color, ComboboxOption, Scale } from "cyberseeds-ui";
import { Combobox, Label } from "cyberseeds-ui";
import type { ReactNode } from "react";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFComboboxProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
  options: ComboboxOption[];
  /** Custom option filter. See the async recipe below for server search. */
  filter?: (option: ComboboxOption, search: string) => boolean;
  /**
   * Fires with the search text on every keystroke.
   *
   * Async/server-driven recipe: keep `options` in parent state, fetch with
   * the query received here (debounced), and pass `filter={() => true}`
   * since the server already filtered.
   */
  onSearchChange?: (search: string) => void;
  placeholder?: string;
  emptyMessage?: ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * react-hook-form wrapper for `Combobox`. The field value is the selected
 * option's `value` (`string`) or `null` when cleared.
 */
export function RHFCombobox<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color,
  require = false,
  defaultValue,
  rules,
  options,
  filter,
  onSearchChange,
  placeholder,
  emptyMessage,
  clearable,
  disabled,
  className,
}: RHFComboboxProps<T, K>) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-combobox`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? (null as PathValue<T, K>)}
      render={({ field, fieldState }) => (
        <div>
          {label !== "" && (
            <Label
              text={label}
              htmlFor={fieldId}
              scale={scale}
              require={require}
            />
          )}
          <Combobox
            ref={field.ref}
            id={fieldId}
            options={options}
            value={field.value ?? null}
            onChange={field.onChange}
            filter={filter}
            onSearchChange={onSearchChange}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            clearable={clearable}
            scale={scale}
            color={color}
            disabled={disabled}
            className={className}
            isInvalid={fieldState.error !== undefined}
            aria-describedby={fieldState.error ? errorId : undefined}
          />
          <FieldError error={fieldState.error} id={errorId} />
        </div>
      )}
    />
  );
}
