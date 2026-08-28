import type { Color, LabelPlacement, Scale } from "cyberseeds-ui";
import { Select, SelectOption } from "cyberseeds-ui";
import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../_shared/FieldError";

interface RHFBooleanSelectProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  /** Rendered above (or beside) the select and linked by `htmlFor`. */
  label?: string;
  /** Where the label sits. Defaults to above the select. */
  labelPlacement?: LabelPlacement;
  /** Shows the required marker on the label. */
  require?: boolean;
  /** Label for `true`. Defaults to "はい". */
  trueLabel?: string;
  /** Label for `false`. Defaults to "いいえ". */
  falseLabel?: string;
  /** Label for the unselected option. Defaults to "選択してください". */
  placeholder?: string;
  color?: Color;
  scale?: Scale;
  /** Stretch to the parent's width. See `Select`'s `fullWidth`. */
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  rules?: RegisterOptions<T, K>;
}

/**
 * 真偽値の項目を「未選択 / はい / いいえ」の3択で聞く。
 *
 * ⚠️ `RHFSelect` はこの用途に使えない。`onChange={field.onChange}` が
 * `<select>` のイベントをそのまま流すため、`<select>` の値（必ず文字列）が
 * 真偽値の項目に入る。型は `PathValue` なので**コンパイルは通り**、
 * 保存の瞬間に壊れる。
 *
 * ⚠️ 未選択は `undefined` にする。`""` にすると、zod の `z.boolean()` を
 * すり抜けずに「文字列が来た」というエラーになり、必須の文言が出せない。
 *
 * スイッチと違い、初期値がどちらかに倒れていない。
 * 「いいえと答えた」のか「見ていない」のかを、値そのもので区別できる。
 */
export function RHFBooleanSelect<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  label,
  labelPlacement,
  require = false,
  trueLabel = "はい",
  falseLabel = "いいえ",
  placeholder = "選択してください",
  color,
  scale = "md",
  fullWidth,
  rules,
  ...props
}: RHFBooleanSelectProps<T, K>) {
  const errorId = `${name}-error`;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div>
          <Select
            value={
              field.value === undefined || field.value === null
                ? ""
                : String(field.value)
            }
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : e.target.value === "true"
              )
            }
            onBlur={field.onBlur}
            ref={field.ref}
            label={label}
            labelPlacement={labelPlacement}
            require={require}
            color={color}
            scale={scale}
            fullWidth={fullWidth}
            isInvalid={fieldState.error !== undefined}
            aria-describedby={fieldState.error ? errorId : undefined}
            {...props}
          >
            <SelectOption value="" label={placeholder} />
            <SelectOption value="true" label={trueLabel} />
            <SelectOption value="false" label={falseLabel} />
          </Select>
          <FieldError error={fieldState.error} id={errorId} />
        </div>
      )}
    />
  );
}
