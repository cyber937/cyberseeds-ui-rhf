import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFTagInput } from "./RHFTagInput";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFTagInput", () => {
  it("renders with the field label as the input's accessible name", () => {
    renderWithForm<{ tags: string[] }>(
      (control) => (
        <RHFTagInput name="tags" control={control} label="タグ" />
      ),
      { formOptions: { defaultValues: { tags: [] } } },
    );
    expect(screen.getByLabelText("タグ")).toBeInTheDocument();
  });

  it("adding tags stores string[] in the form and submits it", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ tags: string[] }>(
      (control) => (
        <RHFTagInput name="tags" control={control} label="タグ" />
      ),
      { formOptions: { defaultValues: { tags: [] } }, onSubmit },
    );

    const field = screen.getByLabelText("タグ");
    await user.type(field, "国語{Enter}");
    await user.type(field, "算数{Enter}");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(onSubmit.mock.calls[0][0]).toEqual({ tags: ["国語", "算数"] });
  });

  it("shows a validation error and links it via aria-describedby", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ tags: string[] }>(
      (control) => (
        <RHFTagInput
          name="tags"
          control={control}
          label="タグ"
          rules={{
            validate: (v: string[]) =>
              v.length > 0 || "1件以上入力してください",
          }}
        />
      ),
      { formOptions: { defaultValues: { tags: [] } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "1件以上入力してください",
      );
      const field = screen.getByLabelText("タグ");
      expect(field).toHaveAttribute("aria-invalid", "true");
      expect(field).toHaveAttribute("aria-describedby", "tags-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ tags: string[] }>(
      (control) => (
        <RHFTagInput name="tags" control={control} label="タグ" />
      ),
      { formOptions: { defaultValues: { tags: ["a"] } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
