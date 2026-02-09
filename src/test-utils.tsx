import React from "react";
import { render } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import type { FieldValues, UseFormProps, Control } from "react-hook-form";

interface RenderWithFormOptions<T extends FieldValues> {
  formOptions?: UseFormProps<T>;
  renderOptions?: Parameters<typeof render>[1];
}

export function renderWithForm<T extends FieldValues>(
  ui: (control: Control<T>) => React.ReactElement,
  options: RenderWithFormOptions<T> = {},
) {
  const { formOptions, renderOptions } = options;

  function Wrapper() {
    const methods = useForm<T>(formOptions);
    return <FormProvider {...methods}>{ui(methods.control)}</FormProvider>;
  }

  return render(<Wrapper />, renderOptions);
}

interface RenderWithFormSubmitOptions<T extends FieldValues> {
  formOptions?: UseFormProps<T>;
  onSubmit?: (data: T) => void;
  renderOptions?: Parameters<typeof render>[1];
}

export function renderFormWithSubmit<T extends FieldValues>(
  ui: (control: Control<T>) => React.ReactElement,
  options: RenderWithFormSubmitOptions<T> = {},
) {
  const { formOptions, onSubmit = () => {}, renderOptions } = options;

  function Wrapper() {
    const methods = useForm<T>(formOptions);
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {ui(methods.control)}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    );
  }

  return render(<Wrapper />, renderOptions);
}
