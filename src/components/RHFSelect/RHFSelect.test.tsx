import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFSelect } from "./RHFSelect";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

const options = [
  { label: "Please select", value: "" },
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
];

describe("RHFSelect", () => {
  it("renders without error", () => {
    renderWithForm<{ language: string }>(
      (control) => (
        <RHFSelect name="language" control={control} options={options} />
      ),
      { formOptions: { defaultValues: { language: "" } } },
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all options", () => {
    renderWithForm<{ language: string }>(
      (control) => (
        <RHFSelect name="language" control={control} options={options} />
      ),
      { formOptions: { defaultValues: { language: "" } } },
    );
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("updates value on selection change", async () => {
    const user = userEvent.setup();
    renderWithForm<{ language: string }>(
      (control) => (
        <RHFSelect name="language" control={control} options={options} />
      ),
      { formOptions: { defaultValues: { language: "" } } },
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "english");
    expect(select).toHaveValue("english");
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ language: string }>(
      (control) => (
        <RHFSelect
          name="language"
          control={control}
          options={options}
          rules={{
            validate: (value) =>
              value !== "" || "Please select a language",
          }}
        />
      ),
      { formOptions: { defaultValues: { language: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Please select a language",
      );
    });
  });
});
