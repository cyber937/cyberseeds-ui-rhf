# cyberseeds-ui-rhf Component Guide

## Setup

All RHF components require a `control` object from React Hook Form's `useForm` hook:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string(),
  bio: z.string().max(500),
  phone: z.string(),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark"]),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      bio: "",
      phone: "",
      notifications: false,
      theme: "light",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* RHF components here */}
    </form>
  );
}
```

## Components

### RHFInput

Text input with label, validation, and error display.

```tsx
import { RHFInput } from "cyberseeds-ui-rhf";

<RHFInput
  name="email"
  control={control}
  label="Email"
  type="email"
  placeholder="you@example.com"
  scale="md"
  color="blue"
  require
  rules={{ required: "Email is required" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name (type-safe) |
| `control` | `Control<T>` | Form control from `useForm` |
| `label` | `string` | Input label text |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `require` | `boolean` | Show required indicator (`*`) |
| `rules` | `RegisterOptions` | Validation rules |
| `defaultValue` | `string` | Initial value |
| `...rest` | `InputHTMLAttributes` | Standard HTML input props |

### RHFTextArea

Multiline text input with label and validation.

```tsx
import { RHFTextArea } from "cyberseeds-ui-rhf";

<RHFTextArea
  name="bio"
  control={control}
  label="Biography"
  rows={4}
  scale="md"
  color="indigo"
  rules={{ maxLength: { value: 500, message: "Max 500 characters" } }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `label` | `string` | TextArea label |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `require` | `boolean` | Required indicator |
| `rules` | `RegisterOptions` | Validation rules |
| `...rest` | `TextareaHTMLAttributes` | Standard HTML textarea props |

### RHFSelect

Dropdown select with typed options.

```tsx
import { RHFSelect } from "cyberseeds-ui-rhf";

<RHFSelect
  name="role"
  control={control}
  scale="md"
  options={[
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" },
    { label: "Viewer", value: "viewer" },
  ]}
  rules={{ required: "Please select a role" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `options` | `{ label: string; value: PathValue<T, K> }[]` | Select options |
| `rules` | `RegisterOptions` | Validation rules |
| `defaultValue` | `PathValue<T, K>` | Initial value |

### RHFRadioGroup

Radio button group with typed options.

```tsx
import { RHFRadioGroup } from "cyberseeds-ui-rhf";

<RHFRadioGroup
  name="theme"
  control={control}
  scale="md"
  color="violet"
  options={[
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ]}
  rules={{ required: "Please select a theme" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `options` | `{ label: string; value: PathValue<T, K> }[]` | Radio options |
| `rules` | `RegisterOptions` | Validation rules |

### RHFCheckbox

Boolean checkbox field with validation support.

```tsx
import { RHFCheckbox } from "cyberseeds-ui-rhf";

<RHFCheckbox
  name="notifications"
  control={control}
  label="Enable notifications"
  scale="md"
  color="teal"
  rules={{ validate: (v) => v === true || "You must agree" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `label` | `string` | Checkbox label |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `rules` | `RegisterOptions` | Validation rules |

### RHFSwitch

Toggle switch for boolean fields with validation support.

```tsx
import { RHFSwitch } from "cyberseeds-ui-rhf";

<RHFSwitch
  name="notifications"
  control={control}
  onLabel="ON"
  offLabel="OFF"
  scale="md"
  color="sky"
  rules={{ validate: (v) => v === true || "Must be enabled" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `onLabel` | `string` | Label when ON |
| `offLabel` | `string` | Label when OFF |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `rules` | `RegisterOptions` | Validation rules |

> **Migration note (v0.2.0):** `onLable`/`offLable` props were renamed to `onLabel`/`offLabel`. The old names still work but are deprecated and will be removed in a future version.

### RHFPhoneInput

US phone number input with automatic formatting.

```tsx
import { RHFPhoneInput } from "cyberseeds-ui-rhf";

<RHFPhoneInput
  name="phone"
  control={control}
  label="Phone Number"
  scale="md"
  color="cyan"
  rules={{ required: "Phone is required" }}
/>
```

| Prop | Type | Description |
| --- | --- | --- |
| `name` | `Path<T>` | Field name |
| `control` | `Control<T>` | Form control |
| `label` | `string` | Input label |
| `scale` | `"sm"` \| `"md"` | Size variant |
| `color` | `Color` | Tailwind color |
| `require` | `boolean` | Required indicator |
| `rules` | `RegisterOptions` | Validation rules |

## Complete Form Example

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UIColorProvider } from "cyberseeds-ui";
import "cyberseeds-ui/style.css";
import {
  RHFInput,
  RHFTextArea,
  RHFSelect,
  RHFRadioGroup,
  RHFCheckbox,
  RHFSwitch,
  RHFPhoneInput,
} from "cyberseeds-ui-rhf";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Enter a valid phone"),
  role: z.string().min(1, "Select a role"),
  bio: z.string().max(300),
  theme: z.enum(["light", "dark"]),
  agree: z.boolean(),
  newsletter: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationForm() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      bio: "",
      theme: "light",
      agree: false,
      newsletter: false,
    },
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <UIColorProvider initialColor="indigo">
      <form onSubmit={handleSubmit(onSubmit)} className="cs:space-y-4">
        <RHFInput name="name" control={control} label="Name" require />
        <RHFInput name="email" control={control} label="Email" type="email" require />
        <RHFPhoneInput name="phone" control={control} label="Phone" />
        <RHFSelect
          name="role"
          control={control}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ]}
        />
        <RHFTextArea name="bio" control={control} label="Bio" rows={3} />
        <RHFRadioGroup
          name="theme"
          control={control}
          options={[
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ]}
        />
        <RHFCheckbox name="agree" control={control} label="I agree to terms" />
        <RHFSwitch name="newsletter" control={control} onLabel="ON" offLabel="OFF" />
        <button type="submit">Submit</button>
      </form>
    </UIColorProvider>
  );
}
```

## Available Colors

All `cyberseeds-ui` colors are supported: `red` `orange` `amber` `yellow` `lime` `green` `emerald` `teal` `cyan` `sky` `blue` `indigo` `violet` `purple` `fuchsia` `pink` `rose` `slate` `gray` `zinc` `neutral` `stone`
