import type { Color, Scale } from "cyberseeds-ui";
import { TextArea } from "cyberseeds-ui";
import type {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface RHFTextAreaProps<T extends FieldValues, K extends Path<T>>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  defaultValue?: PathValue<T, K>;
  rules?: RegisterOptions<T, K>;
}

export function RHFTextArea<T extends object, K extends Path<T>>({
  name,
  control,
  label = "",
  scale = "md",
  color = "blue",
  require = false,
  defaultValue,
  rules,
  ...props
}: RHFTextAreaProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <div className="-space-y-1">
            <TextArea
              {...field}
              label={label}
              scale={scale}
              color={color}
              require={require}
              isInvalid={fieldState.error !== undefined}
              {...props}
            />
            {fieldState.error && (
              <p className="text-xs text-red-600 ml-3">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
