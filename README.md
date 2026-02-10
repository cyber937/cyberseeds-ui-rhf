# 📦 cyberseeds-ui-rhf

**cyberseeds-ui-rhf** is an extension package of [cyberseeds-ui](https://github.com/cyber937/cyberseeds-ui) that provides form components integrated with [React Hook Form](https://react-hook-form.com/).  
Designed for TypeScript + Tailwind CSS + Zod environments, this library helps you build accessible, styled, and type-safe forms with minimal effort.

[![Storybook](https://img.shields.io/badge/Storybook-online-orange?logo=storybook)](https://cyber937.github.io/cyberseeds-ui-rhf/?path=/story/form--default) Please check the interactive UI catalog 👉

---

## ✅ Features

- Prebuilt, reusable form components compatible with `react-hook-form`
- First-class support for `zod` schema validation
- Fully styled with `cyberseeds-ui` design system
- Type-safe, testable, and DX-friendly

## 🚀 Installation

```bash
npm install cyberseeds-ui cyberseeds-ui-rhf react-hook-form zod
# or
yarn add cyberseeds-ui cyberseeds-ui-rhf react-hook-form zod
```

### Peer Dependencies

| Package | Required Version |
| --- | --- |
| `react` | `^19.1.0` |
| `react-dom` | `^19.1.0` |
| `react-hook-form` | `^7.57.0` |
| `cyberseeds-ui` | `^1.0.0` |

### Version Compatibility

| cyberseeds-ui-rhf | cyberseeds-ui | react-hook-form |
| --- | --- | --- |
| `1.0.x` | `1.0.x` | `7.x` |
| `0.2.x` | `0.3.x` | `7.x` |
| `0.1.x` | `0.2.x – 0.3.x` | `7.x` |

## 🧱 Components

| Component       | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `RHFCheckbox`   | A controlled checkbox component integrated with React Hook Form.              |
| `RHFInput`      | A text input field wired to React Hook Form with validation support.          |
| `RHFPhoneInput` | A phone number input component styled and connected to React Hook Form.       |
| `RHFRadioGroup` | A group of radio buttons managed by React Hook Form.                          |
| `RHFSelect`     | A select dropdown component that works seamlessly with React Hook Form.       |
| `RHFSwitch`     | A toggle switch component linked to a boolean field in React Hook Form.       |
| `RHFTextArea`   | A textarea component bound to React Hook Form for multi-line input.           |
