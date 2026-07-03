import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import type { ComboboxOption } from "cyberseeds-ui";
import { RHFCombobox } from "./RHFCombobox";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

const FRUITS: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("RHFCombobox", () => {
  it("renders the searchbox and the field label", () => {
    renderWithForm<{ fruit: string | null }>(
      (control) => (
        <RHFCombobox
          name="fruit"
          control={control}
          label="くだもの"
          options={FRUITS}
        />
      ),
      { formOptions: { defaultValues: { fruit: null } } },
    );
    expect(screen.getByText("くだもの")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("selecting an option submits its value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ fruit: string | null }>(
      (control) => (
        <RHFCombobox name="fruit" control={control} options={FRUITS} />
      ),
      { formOptions: { defaultValues: { fruit: null } }, onSubmit },
    );

    await user.click(screen.getByRole("searchbox"));
    await user.click(await screen.findByRole("option", { name: "Banana" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(onSubmit.mock.calls[0][0]).toEqual({ fruit: "banana" });
  });

  it("forwards onSearchChange (async/server-search hook point)", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    renderWithForm<{ fruit: string | null }>(
      (control) => (
        <RHFCombobox
          name="fruit"
          control={control}
          options={FRUITS}
          onSearchChange={onSearchChange}
        />
      ),
      { formOptions: { defaultValues: { fruit: null } } },
    );

    await user.type(screen.getByRole("searchbox"), "ap");
    expect(onSearchChange).toHaveBeenCalledWith("a");
    expect(onSearchChange).toHaveBeenCalledWith("ap");
  });

  it("shows a validation error and links it via aria-describedby", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ fruit: string | null }>(
      (control) => (
        <RHFCombobox
          name="fruit"
          control={control}
          options={FRUITS}
          rules={{ required: "選択してください" }}
        />
      ),
      { formOptions: { defaultValues: { fruit: null } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("選択してください");
      const input = screen.getByRole("searchbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "fruit-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ fruit: string | null }>(
      (control) => (
        <RHFCombobox
          name="fruit"
          control={control}
          label="くだもの"
          options={FRUITS}
        />
      ),
      { formOptions: { defaultValues: { fruit: null } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
