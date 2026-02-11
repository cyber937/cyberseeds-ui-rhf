# cyberseeds-ui-rhf Architecture

## Overview

`cyberseeds-ui-rhf` is a thin integration layer that bridges [cyberseeds-ui](https://github.com/cyber937/cyberseeds-ui) components with [React Hook Form](https://react-hook-form.com/). Each RHF component wraps a corresponding `cyberseeds-ui` component using RHF's `Controller`, providing type-safe form state management with zero boilerplate.

## Design Decisions

### Why Controller (not register)

React Hook Form offers two integration approaches:

1. **`register`** — Works with native HTML elements via ref forwarding
2. **`Controller`** — Works with any controlled component

We use `Controller` because `cyberseeds-ui` components are custom React components with non-standard value handling (e.g., `Switch` uses `onClick` toggle, `PhoneInput` has formatted value). `Controller` provides a consistent abstraction regardless of the underlying component's API.

### Wrapper Pattern

Every RHF component follows this structure:

```tsx
import { Controller, type Control, type FieldValues, type Path, type PathValue, type RegisterOptions } from "react-hook-form";
import { UIComponent } from "cyberseeds-ui";

interface RHFComponentProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  rules?: RegisterOptions<T, K>;
  defaultValue?: PathValue<T, K>;
  // ... component-specific props (scale, color, label, etc.)
}

export function RHFComponent<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  rules,
  defaultValue,
  ...rest
}: RHFComponentProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => {
        const errorId = `${name}-error`;
        return (
          <div className="space-y-1">
            <UIComponent
              {...field}
              {...rest}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? errorId : undefined}
            />
            <FieldError error={fieldState.error} id={errorId} />
          </div>
        );
      )}
    />
  );
}
```

### Type Safety Strategy

Generic type parameters ensure end-to-end type safety:

| Parameter | Purpose |
| --- | --- |
| `T extends FieldValues` | The form's data shape (e.g., `{ email: string; age: number }`) |
| `K extends Path<T>` | A valid field name within `T` (e.g., `"email"` or `"age"`) |
| `PathValue<T, K>` | The value type for field `K` (e.g., `string` for `"email"`) |
| `Control<T>` | Type-safe control object from `useForm<T>()` |
| `RegisterOptions<T, K>` | Validation rules typed to the specific field |

This means TypeScript catches mismatches at compile time — for example, passing `name="nonExistent"` or a `defaultValue` of the wrong type.

### Props Interface Patterns

Two patterns are used depending on the base component:

**Pattern A — HTML Attribute Extension** (RHFInput, RHFTextArea, RHFPhoneInput):

```tsx
interface RHFInputProps<T extends FieldValues, K extends Path<T>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: K;
  control: Control<T>;
  label?: string;
  scale?: Scale;
  color?: Color;
  require?: boolean;
  rules?: RegisterOptions<T, K>;
}
```

This allows passing any standard HTML input attribute (e.g., `placeholder`, `maxLength`, `autoFocus`).

**Pattern B — Custom Props** (RHFSelect, RHFRadioGroup, RHFCheckbox, RHFSwitch, RHFButtonGroup, RHFButtonTabs):

```tsx
interface RHFSelectProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  options: { label: string; value: PathValue<T, K> }[];
  rules?: RegisterOptions<T, K>;
}
```

Custom props are used when the component has a specialized API (e.g., `options` array) that doesn't map to HTML attributes.

## Component-to-Base Mapping

| RHF Component | Base Component | Field Binding |
| --- | --- | --- |
| `RHFInput` | `Input` | `value` / `onChange` (standard) |
| `RHFTextArea` | `TextArea` | `value` / `onChange` (standard) |
| `RHFCheckbox` | `Checkbox` | `checked` = `field.value` |
| `RHFSwitch` | `Switch` | `checked` = `field.value`, `onClick` toggle |
| `RHFSelect` | `Select` + `SelectOption` | `value` / `onChange` (standard) |
| `RHFRadioGroup` | `RadioGroup` + `RadioGroup.Option` | `value` / `onChange` (standard) |
| `RHFPhoneInput` | `PhoneInput` | `value` / custom `onChange(value: string)` |
| `RHFButtonGroup` | `ButtonGroup` + `ButtonGroup.Item` | `value` / `onChange` (string or string[]) |
| `RHFButtonTabs` | `ButtonTabs` + `ButtonTabs.List/Trigger` | `value` / `onChange` (string) |

## Error Display

Validation errors are rendered using the shared `FieldError` component (`src/components/_shared/FieldError.tsx`):

```tsx
import { FieldError } from "../_shared/FieldError";

// Inside Controller render:
const errorId = `${name}-error`;

<div className="space-y-1">
  <UIComponent
    {...field}
    aria-invalid={!!fieldState.error}
    aria-describedby={fieldState.error ? errorId : undefined}
  />
  <FieldError error={fieldState.error} id={errorId} />
</div>
```

The `FieldError` component renders:

- `role="alert"` for screen reader announcements
- `id={errorId}` linked to the input via `aria-describedby`
- Consistent styling: `text-xs text-red-600 ml-3`
- Returns `null` when no error is present

All 9 components now display validation errors and support `aria-invalid` + `aria-describedby`.

### Accessibility Pattern

Every RHF component follows this accessibility pattern:

1. **`aria-invalid`** — Set to `true` when `fieldState.error` exists
2. **`aria-describedby`** — Points to the error message element via `${name}-error` ID
3. **`role="alert"`** — On the error message element for live region announcements
4. **`isInvalid`** — Passed to base components that support it (e.g., `Select`)

## Dependency Graph

```text
cyberseeds-ui-rhf
├── cyberseeds-ui (peerDependency: ^1.1.0, devDependency: ^1.1.0)
│   └── Components: Input, TextArea, Checkbox, Switch, Select, RadioGroup, PhoneInput, ButtonGroup, ButtonTabs
├── react-hook-form (peerDependency: ^7.57.0)
│   └── Controller, useForm, FieldValues, Path, Control, RegisterOptions
├── react (peerDependency: ^19.1.0)
└── react-dom (peerDependency: ^19.1.0)
```

`cyberseeds-ui` is listed as both a peerDependency (`^1.1.0`, for consumers) and a devDependency (`^1.1.0`, for local workspace development). It is marked as external in the Vite/Rollup build and NOT bundled.

## Build Output

- **ESM**: `dist/cyberseeds-ui-rhf.js`
- **UMD**: `dist/cyberseeds-ui-rhf-umd.cjs`
- **Types**: `dist/index.d.ts`
- **CSS**: `dist/style.css`

React, ReactDOM, react-hook-form, and cyberseeds-ui are marked as external and NOT bundled.
