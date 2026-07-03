import type { FileRejection, Scale } from "cyberseeds-ui";
import { FileUpload, Label } from "cyberseeds-ui";
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

interface RHFFileUploadProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  /** Field label rendered above the dropzone. */
  label?: string;
  scale?: Scale;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  /** Validation via `rules.validate`, e.g. `(f: File[]) => f.length > 0 || "…"`. */
  rules?: RegisterOptions<T, K>;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onReject?: (rejections: FileRejection[]) => void;
  /** Call-to-action text inside the dropzone (base `label` prop). */
  dropzoneLabel?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/**
 * react-hook-form wrapper for `FileUpload`. The field value is `File[]`.
 *
 * Note: the base dropzone exposes no ref, so RHF's focus-on-error is a
 * no-op for this field (the error message still renders and is announced).
 */
export function RHFFileUpload<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  require = false,
  defaultValue,
  rules,
  accept,
  multiple,
  maxSize,
  onReject,
  dropzoneLabel,
  hint,
  disabled,
  className,
}: RHFFileUploadProps<T, K>) {
  const errorId = `${name}-error`;
  const fieldId = `${name}-fileupload`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ([] as PathValue<T, K>)}
      render={({ field, fieldState }) => (
        <div>
          {label !== "" && (
            <Label text={label} scale={scale} require={require} />
          )}
          <FileUpload
            id={fieldId}
            value={field.value ?? []}
            onChange={field.onChange}
            accept={accept}
            multiple={multiple}
            maxSize={maxSize}
            onReject={onReject}
            label={dropzoneLabel}
            hint={hint}
            scale={scale}
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
