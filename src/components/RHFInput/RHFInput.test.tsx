import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFInput } from "./RHFInput";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFInput", () => {
  it("renders without error", () => {
    renderWithForm<{ name: string }>(
      (control) => <RHFInput name="name" control={control} label="Name" />,
      { formOptions: { defaultValues: { name: "" } } },
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    renderWithForm<{ name: string }>(
      (control) => (
        <RHFInput
          name="name"
          control={control}
          label="Name"
          placeholder="Enter name"
        />
      ),
      { formOptions: { defaultValues: { name: "" } } },
    );
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("updates form value on user input", async () => {
    const user = userEvent.setup();
    renderWithForm<{ name: string }>(
      (control) => <RHFInput name="name" control={control} label="Name" />,
      { formOptions: { defaultValues: { name: "" } } },
    );

    const input = screen.getByLabelText("Name");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ name: string }>(
      (control) => (
        <RHFInput
          name="name"
          control={control}
          label="Name"
          rules={{ required: "Name is required" }}
        />
      ),
      { formOptions: { defaultValues: { name: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Name is required");
    });
  });

  it("sets aria-describedby when error exists", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ name: string }>(
      (control) => (
        <RHFInput
          name="name"
          control={control}
          label="Name"
          rules={{ required: "Name is required" }}
        />
      ),
      { formOptions: { defaultValues: { name: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const input = screen.getByLabelText("Name");
      expect(input).toHaveAttribute("aria-describedby", "name-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ name: string }>(
      (control) => <RHFInput name="name" control={control} label="Name" />,
      { formOptions: { defaultValues: { name: "" } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
