import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFBooleanSelect } from "./RHFBooleanSelect";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

type Form = { doesBring?: boolean };

describe("RHFBooleanSelect", () => {
  it("renders three options", () => {
    renderWithForm<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: {} } },
    );
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("starts unselected when the value is undefined", () => {
    renderWithForm<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: {} } },
    );
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("shows the stored boolean", () => {
    renderWithForm<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: { doesBring: false } } },
    );
    expect(screen.getByRole("combobox")).toHaveValue("false");
  });

  // 保存が壊れないことの要。文字列ではなく真偽値がフォームに入る。
  it("submits a boolean, not a string", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: {} }, onSubmit },
    );
    await user.selectOptions(screen.getByRole("combobox"), "true");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ doesBring: true }),
      expect.anything(),
    );
  });

  it("submits false when the negative option is chosen", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: { doesBring: true } }, onSubmit },
    );
    await user.selectOptions(screen.getByRole("combobox"), "false");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ doesBring: false }),
      expect.anything(),
    );
  });

  // 未選択は "" ではなく undefined。"" だと必須検証の文言が出せない。
  it("turns the placeholder back into undefined", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<Form>(
      (control) => <RHFBooleanSelect name="doesBring" control={control} />,
      { formOptions: { defaultValues: { doesBring: true } }, onSubmit },
    );
    await user.selectOptions(screen.getByRole("combobox"), "");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ doesBring: undefined }),
      expect.anything(),
    );
  });

  it("uses custom labels", () => {
    renderWithForm<Form>(
      (control) => (
        <RHFBooleanSelect
          name="doesBring"
          control={control}
          placeholder="選択してください"
          trueLabel="持参する"
          falseLabel="持参しない"
        />
      ),
      { formOptions: { defaultValues: {} } },
    );
    expect(screen.getByRole("option", { name: "持参する" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "持参しない" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "選択してください" }),
    ).toBeInTheDocument();
  });
});
