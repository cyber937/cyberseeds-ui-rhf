# cyberseeds-ui-rhf Development Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Workspace dependencies installed from the monorepo root

## Getting Started

```bash
# From monorepo root (/packages/)
npm install

# Start dev server
npm run dev -w cyberseeds-ui-rhf

# Start Storybook
npm run storybook -w cyberseeds-ui-rhf
```

## Project Structure

```text
cyberseeds-ui-rhf/
├── src/
│   ├── components/
│   │   ├── _shared/
│   │   │   └── FieldError.tsx         # Shared error display component
│   │   ├── RHFCheckbox/
│   │   │   ├── RHFCheckbox.tsx
│   │   │   ├── RHFCheckbox.test.tsx
│   │   │   ├── RHFCheckbox.stories.tsx
│   │   │   └── index.tsx
│   │   ├── RHFInput/
│   │   ├── RHFPhoneInput/
│   │   ├── RHFRadioGroup/
│   │   ├── RHFSelect/
│   │   ├── RHFSwitch/
│   │   ├── RHFTextArea/
│   │   ├── FormExample.stories.tsx    # Full form demo story
│   │   └── index.tsx                  # Barrel export
│   ├── test-setup.ts                  # Vitest setup (jest-dom, mocks)
│   ├── test-utils.tsx                 # renderWithForm() helpers
│   └── index.css                      # Tailwind CSS entry
├── docs/                              # Documentation
├── dist/                              # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.workspace.ts               # Unit + Storybook test projects
└── README.md
```

## Adding a New RHF Component

### 1. Create the directory

```bash
mkdir -p src/components/RHFNewComponent
```

### 2. Create the component file

`src/components/RHFNewComponent/RHFNewComponent.tsx`:

```tsx
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  type RegisterOptions,
} from "react-hook-form";
import { NewComponent, type Scale, type Color } from "cyberseeds-ui";
import { FieldError } from "../_shared/FieldError";

interface RHFNewComponentProps<T extends FieldValues, K extends Path<T>> {
  name: K;
  control: Control<T>;
  scale?: Scale;
  color?: Color;
  rules?: RegisterOptions<T, K>;
  defaultValue?: PathValue<T, K>;
  // Add component-specific props here
}

export function RHFNewComponent<T extends FieldValues, K extends Path<T>>({
  name,
  control,
  rules,
  defaultValue,
  scale,
  color,
  ...rest
}: RHFNewComponentProps<T, K>) {
  const errorId = `${name}-error`;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <NewComponent
            {...field}
            {...rest}
            scale={scale}
            color={color}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? errorId : undefined}
          />
          <FieldError error={fieldState.error} id={errorId} />
        </div>
      )}
    />
  );
}
```

### 3. Create the barrel export

`src/components/RHFNewComponent/index.tsx`:

```tsx
export { RHFNewComponent } from "./RHFNewComponent";
```

### 4. Register the export

Add to `src/components/index.tsx`:

```tsx
export { RHFNewComponent } from "./RHFNewComponent";
```

### 5. Add Storybook stories

`src/components/RHFNewComponent/RHFNewComponent.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { RHFNewComponent } from "./RHFNewComponent";

const meta: Meta = {
  title: "RHF/RHFNewComponent",
  component: RHFNewComponent,
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const { control } = useForm({ defaultValues: { field: "" } });
    return <RHFNewComponent name="field" control={control} />;
  },
};
```

### 6. Add tests

`src/components/RHFNewComponent/RHFNewComponent.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFNewComponent } from "./RHFNewComponent";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFNewComponent", () => {
  it("renders without error", () => {
    renderWithForm<{ field: string }>(
      (control) => <RHFNewComponent name="field" control={control} />,
      { formOptions: { defaultValues: { field: "" } } },
    );
    // Assert the component is in the document
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ field: string }>(
      (control) => (
        <RHFNewComponent
          name="field"
          control={control}
          rules={{ required: "Field is required" }}
        />
      ),
      { formOptions: { defaultValues: { field: "" } } },
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Field is required");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ field: string }>(
      (control) => <RHFNewComponent name="field" control={control} />,
      { formOptions: { defaultValues: { field: "" } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Build

```bash
# Full build (TypeScript → Vite → CSS)
npm run build -w cyberseeds-ui-rhf

# Build CSS only
npm run build:css -w cyberseeds-ui-rhf
```

Build output is written to `dist/`:

| File | Format |
| --- | --- |
| `cyberseeds-ui-rhf.js` | ESM |
| `cyberseeds-ui-rhf-umd.cjs` | UMD |
| `index.d.ts` | TypeScript declarations |
| `style.css` | CSS bundle |

### Externals

The following are NOT bundled (peer/external dependencies):

- `react`
- `react-dom`
- `react-hook-form`
- `cyberseeds-ui`

Consumers must install these themselves.

## Storybook

```bash
# Dev mode
npm run storybook -w cyberseeds-ui-rhf

# Build static site
npm run storybook:build -w cyberseeds-ui-rhf

# Deploy to GitHub Pages
npm run storybook:deploy -w cyberseeds-ui-rhf
```

## Testing

```bash
# Run tests once
npm run test:run -w cyberseeds-ui-rhf

# Watch mode
npm run test -w cyberseeds-ui-rhf

# Coverage report
npm run test:coverage -w cyberseeds-ui-rhf
```

### Test Architecture

Tests use a **Vitest workspace** with two projects:

- **`unit`** — Component tests using jsdom (`src/**/*.test.{ts,tsx}`)
- **`storybook`** — Storybook interaction tests using Playwright browser mode

The `--project unit` flag is used in package.json scripts to run only unit tests.

### Test Utilities

`src/test-utils.tsx` provides two helpers:

- **`renderWithForm<T>(renderFn, options?)`** — Renders a component inside a `useForm` + `FormProvider` wrapper
- **`renderFormWithSubmit<T>(renderFn, options?)`** — Same as above but includes a Submit button (for validation tests)

### Test File Conventions

- Place test files alongside components: `RHFInput/RHFInput.test.tsx`
- Test files are excluded from the TypeScript build via `tsconfig.json`
- Each test should cover: render, user interaction, validation error, accessibility (`aria-invalid`, `aria-describedby`, `jest-axe`)

### Coverage Targets

- Statements: 90%+
- Branches: 85%+

## Linting

```bash
npm run lint -w cyberseeds-ui-rhf
```

## Conventions

- **Named exports only** — no default exports for components
- **Generic type parameters** — always `<T extends FieldValues, K extends Path<T>>`
- **Error display** — use the shared `FieldError` component from `_shared/FieldError.tsx`
- **Accessibility** — always add `aria-invalid` and `aria-describedby` linked to the error element
- **Wrapper** — wrap component + error in `<div className="space-y-1">`
- **Props interface** — define in the same file as the component
- **File structure** — one component per directory with `.tsx`, `.stories.tsx`, and `index.tsx`
- **Naming** — prefix all component names with `RHF` (e.g., `RHFInput`, `RHFSelect`)
- **CSS** — use Tailwind CSS utility classes; avoid inline styles

## Relationship with cyberseeds-ui

This package depends on `cyberseeds-ui` as both a **peerDependency** (`^0.3.0`) and a **devDependency** (`^0.3.1`). When building:

1. Ensure `cyberseeds-ui` is built first (or available in `node_modules`)
2. Import components and types directly from `"cyberseeds-ui"`
3. `cyberseeds-ui` is marked as external — it is NOT bundled into the output
4. Consumers must install both packages: `npm install cyberseeds-ui cyberseeds-ui-rhf`
