import type { Color, Scale } from "cyberseeds-ui";
import { Label, TagInput } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFTagInputProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
  placeholder?: string;
  dedupe?: boolean;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
}

/** react-hook-form wrapper for `TagInput`. The field value is `string[]`. */
export function RHFTagInput<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color,
  require = false,
  defaultValue,
  rules,
  placeholder,
  dedupe,
  maxTags,
  disabled,
  className,
}: RHFTagInputProps<T, K>) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-taginput`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ([] as PathValue<T, K>)}
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
          <TagInput
            ref={field.ref}
            id={fieldId}
            value={field.value ?? []}
            onChange={field.onChange}
            placeholder={placeholder}
            dedupe={dedupe}
            maxTags={maxTags}
            scale={scale}
            color={color}
            disabled={disabled}
            className={className}
            isInvalid={fieldState.error !== undefined}
            aria-describedby={fieldState.error ? errorId : undefined}
            aria-label={label !== "" ? label : undefined}
          />
          <FieldError error={fieldState.error} id={errorId} />
        </div>
      )}
    />
  );
}
