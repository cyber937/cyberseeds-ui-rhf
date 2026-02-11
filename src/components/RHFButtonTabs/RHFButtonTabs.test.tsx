import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFButtonTabs } from "./RHFButtonTabs";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

const viewOptions = [
  { label: "Grid", value: "grid" },
  { label: "List", value: "list" },
  { label: "Table", value: "table" },
];

describe("RHFButtonTabs", () => {
  it("renders without error", () => {
    renderWithForm<{ view: string }>(
      (control) => (
        <RHFButtonTabs name="view" control={control} options={viewOptions} />
      ),
      { formOptions: { defaultValues: { view: "grid" } } },
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tab options", () => {
    renderWithForm<{ view: string }>(
      (control) => (
        <RHFButtonTabs name="view" control={control} options={viewOptions} />
      ),
      { formOptions: { defaultValues: { view: "grid" } } },
    );
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("selects tab on click", async () => {
    const user = userEvent.setup();
    renderWithForm<{ view: string }>(
      (control) => (
        <RHFButtonTabs name="view" control={control} options={viewOptions} />
      ),
      { formOptions: { defaultValues: { view: "grid" } } },
    );

    await user.click(screen.getByRole("tab", { name: "List" }));
    expect(screen.getByRole("tab", { name: "List" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("renders with default selected value", () => {
    renderWithForm<{ view: string }>(
      (control) => (
        <RHFButtonTabs name="view" control={control} options={viewOptions} />
      ),
      { formOptions: { defaultValues: { view: "list" } } },
    );

    expect(screen.getByRole("tab", { name: "List" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ view: string }>(
      (control) => (
        <RHFButtonTabs
          name="view"
          control={control}
          options={viewOptions}
          rules={{
            validate: (value) =>
              (value !== "" && value !== undefined) || "View is required",
          }}
        />
      ),
      { formOptions: { defaultValues: { view: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("View is required");
    });
  });
});
