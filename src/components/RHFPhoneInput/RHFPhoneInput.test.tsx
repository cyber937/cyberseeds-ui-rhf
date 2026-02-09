import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFPhoneInput } from "./RHFPhoneInput";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFPhoneInput", () => {
  it("renders without error", () => {
    renderWithForm<{ phone: string }>(
      (control) => (
        <RHFPhoneInput name="phone" control={control} label="Phone" />
      ),
      { formOptions: { defaultValues: { phone: "" } } },
    );
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  it("accepts numeric input", async () => {
    const user = userEvent.setup();
    renderWithForm<{ phone: string }>(
      (control) => (
        <RHFPhoneInput name="phone" control={control} label="Phone" />
      ),
      { formOptions: { defaultValues: { phone: "" } } },
    );

    const input = screen.getByLabelText("Phone");
    await user.type(input, "1234567890");
    // PhoneInput formats to (123) 456-7890
    expect(input).toHaveValue("(123) 456-7890");
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ phone: string }>(
      (control) => (
        <RHFPhoneInput
          name="phone"
          control={control}
          label="Phone"
          rules={{ required: "Phone is required" }}
        />
      ),
      { formOptions: { defaultValues: { phone: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Phone is required",
      );
    });
  });

  it("sets aria-describedby when error exists", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ phone: string }>(
      (control) => (
        <RHFPhoneInput
          name="phone"
          control={control}
          label="Phone"
          rules={{ required: "Phone is required" }}
        />
      ),
      { formOptions: { defaultValues: { phone: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const input = screen.getByLabelText("Phone");
      expect(input).toHaveAttribute("aria-describedby", "phone-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ phone: string }>(
      (control) => (
        <RHFPhoneInput name="phone" control={control} label="Phone" />
      ),
      { formOptions: { defaultValues: { phone: "" } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
