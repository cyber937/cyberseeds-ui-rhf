import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFRadioGroup } from "./RHFRadioGroup";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

describe("RHFRadioGroup", () => {
  it("renders without error", () => {
    renderWithForm<{ fruit: string }>(
      (control) => (
        <RHFRadioGroup
          name="fruit"
          control={control}
          options={fruitOptions}
        />
      ),
      { formOptions: { defaultValues: { fruit: "" } } },
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders all radio options", () => {
    renderWithForm<{ fruit: string }>(
      (control) => (
        <RHFRadioGroup
          name="fruit"
          control={control}
          options={fruitOptions}
        />
      ),
      { formOptions: { defaultValues: { fruit: "" } } },
    );
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("selects option on click", async () => {
    const user = userEvent.setup();
    renderWithForm<{ fruit: string }>(
      (control) => (
        <RHFRadioGroup
          name="fruit"
          control={control}
          options={fruitOptions}
        />
      ),
      { formOptions: { defaultValues: { fruit: "" } } },
    );

    const appleRadio = screen.getByLabelText("Apple");
    await user.click(appleRadio);
    expect(appleRadio).toBeChecked();
  });

  it("renders with default selected value", () => {
    renderWithForm<{ fruit: string }>(
      (control) => (
        <RHFRadioGroup
          name="fruit"
          control={control}
          options={fruitOptions}
        />
      ),
      { formOptions: { defaultValues: { fruit: "banana" } } },
    );

    expect(screen.getByLabelText("Banana")).toBeChecked();
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ fruit: string }>(
      (control) => (
        <RHFRadioGroup
          name="fruit"
          control={control}
          options={fruitOptions}
          rules={{ required: "Fruit is required" }}
        />
      ),
      { formOptions: { defaultValues: { fruit: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Fruit is required",
      );
    });
  });
});
