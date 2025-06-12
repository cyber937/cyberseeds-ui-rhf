import type { Color, Scale } from "cyberseeds-ui";
import { Switch } from "cyberseeds-ui";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

interface RHFSwitchProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  defaultValue?: PathValue<T, K>;
  onLable: string;
  offLable: string;
}

export function RHFSwitch<T extends object, K extends Path<T>>({
  name,
  control,
  scale = "md",
  color = "blue",
  defaultValue,
  onLable,
  offLable,
}: RHFSwitchProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Switch
            checked={!!field.value}
            onClick={() => field.onChange(!field.value)}
            scale={scale}
            color={color}
            onLabel={onLable}
            offLabel={offLable}
          />
        );
      }}
    />
  );
}
