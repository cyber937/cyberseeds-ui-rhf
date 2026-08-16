import type { Color, LabelPlacement, Scale } from "cyberseeds-ui";
import { TextArea } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFTextAreaProps<T extends FieldValues, K extends Path<T>>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "color"> {
  name: K;
  control: Control<T>;
  label?: string;
  /** Where the label sits. Defaults to above the field. */
  labelPlacement?: LabelPlacement;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFTextArea<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label = "",
  labelPlacement,
  scale = "md",
  color,
  require = false,
  defaultValue,
  rules,
  ...props
}: RHFTextAreaProps<T, K>) {
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ("" as PathValue<T, K>)}
      render={({ field, fieldState }) => {
        return (
          <div>
            <TextArea
              {...field}
              label={label}
              labelPlacement={labelPlacement}
              scale={scale}
              color={color}
              require={require}
              isInvalid={fieldState.error !== undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              {...props}
            />
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      }}
    />
  );
}
