import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFCheckbox } from "./RHFCheckbox";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFCheckbox", () => {
  it("renders without error", () => {
    renderWithForm<{ agree: boolean }>(
      (control) => (
        <RHFCheckbox name="agree" control={control} label="I agree" />
      ),
      { formOptions: { defaultValues: { agree: false } } },
    );
    expect(screen.getByLabelText("I agree")).toBeInTheDocument();
  });

  it("toggles checked state on click", async () => {
    const user = userEvent.setup();
    renderWithForm<{ agree: boolean }>(
      (control) => (
        <RHFCheckbox name="agree" control={control} label="I agree" />
      ),
      { formOptions: { defaultValues: { agree: false } } },
    );

    const checkbox = screen.getByLabelText("I agree");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("renders with default checked state", () => {
    renderWithForm<{ agree: boolean }>(
      (control) => (
        <RHFCheckbox name="agree" control={control} label="I agree" />
      ),
      { formOptions: { defaultValues: { agree: true } } },
    );

    expect(screen.getByLabelText("I agree")).toBeChecked();
  });

  it("shows validation error with rules", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ agree: boolean }>(
      (control) => (
        <RHFCheckbox
          name="agree"
          control={control}
          label="I agree"
          rules={{ validate: (v) => v === true || "Must agree" }}
        />
      ),
      { formOptions: { defaultValues: { agree: false } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Must agree");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ agree: boolean }>(
      (control) => (
        <RHFCheckbox name="agree" control={control} label="I agree" />
      ),
      { formOptions: { defaultValues: { agree: false } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
