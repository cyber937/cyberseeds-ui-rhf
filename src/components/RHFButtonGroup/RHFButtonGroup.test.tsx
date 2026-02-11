import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFButtonGroup } from "./RHFButtonGroup";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

const sizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

describe("RHFButtonGroup", () => {
  it("renders without error", () => {
    renderWithForm<{ size: string }>(
      (control) => (
        <RHFButtonGroup name="size" control={control} options={sizeOptions} />
      ),
      { formOptions: { defaultValues: { size: "" } } },
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders all options", () => {
    renderWithForm<{ size: string }>(
      (control) => (
        <RHFButtonGroup name="size" control={control} options={sizeOptions} />
      ),
      { formOptions: { defaultValues: { size: "" } } },
    );
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("selects option on click", async () => {
    const user = userEvent.setup();
    renderWithForm<{ size: string }>(
      (control) => (
        <RHFButtonGroup name="size" control={control} options={sizeOptions} />
      ),
      { formOptions: { defaultValues: { size: "" } } },
    );

    await user.click(screen.getByText("Medium"));
    expect(screen.getByText("Medium").closest("button")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("renders with default selected value", () => {
    renderWithForm<{ size: string }>(
      (control) => (
        <RHFButtonGroup name="size" control={control} options={sizeOptions} />
      ),
      { formOptions: { defaultValues: { size: "md" } } },
    );

    expect(screen.getByText("Medium").closest("button")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ size: string }>(
      (control) => (
        <RHFButtonGroup
          name="size"
          control={control}
          options={sizeOptions}
          rules={{
            validate: (value) =>
              (value !== "" && value !== undefined) || "Size is required",
          }}
        />
      ),
      { formOptions: { defaultValues: { size: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Size is required");
    });
  });

  it("supports multiple selection mode", async () => {
    const user = userEvent.setup();
    renderWithForm<{ sizes: string[] }>(
      (control) => (
        <RHFButtonGroup
          name="sizes"
          control={control}
          options={sizeOptions}
          multiple
        />
      ),
      { formOptions: { defaultValues: { sizes: [] } } },
    );

    expect(screen.getByRole("group")).toBeInTheDocument();

    await user.click(screen.getByText("Small"));
    await user.click(screen.getByText("Large"));

    expect(screen.getByText("Small").closest("button")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByText("Large").closest("button")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
