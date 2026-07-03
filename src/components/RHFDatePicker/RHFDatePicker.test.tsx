import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFDatePicker } from "./RHFDatePicker";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFDatePicker", () => {
  it("renders the trigger and the field label", () => {
    renderWithForm<{ date: string }>(
      (control) => (
        <RHFDatePicker
          name="date"
          control={control}
          label="日付"
          valueAs="string"
        />
      ),
      { formOptions: { defaultValues: { date: "" } } },
    );
    expect(screen.getByText("日付")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Select a date" }),
    ).toBeInTheDocument();
  });

  it('valueAs="string": picking day N submits "YYYY-MM-DD" with day N (TZ regression)', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ date: string }>(
      (control) => (
        <RHFDatePicker name="date" control={control} valueAs="string" />
      ),
      {
        formOptions: { defaultValues: { date: "2026-06-10" } },
        onSubmit,
      },
    );

    // Trigger shows the parsed local date (not shifted a day).
    await user.click(screen.getByRole("button", { name: "Jun 10, 2026" }));
    await user.click(screen.getByRole("button", { name: "20" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(onSubmit.mock.calls[0][0]).toEqual({ date: "2026-06-20" });
  });

  it('valueAs="date": picking day N submits a Date with local day N', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ date: Date | null }>(
      (control) => <RHFDatePicker name="date" control={control} />,
      {
        formOptions: { defaultValues: { date: new Date(2026, 5, 10) } },
        onSubmit,
      },
    );

    await user.click(screen.getByRole("button", { name: "Jun 10, 2026" }));
    await user.click(screen.getByRole("button", { name: "20" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    const submitted = onSubmit.mock.calls[0][0].date as Date;
    expect(submitted.getFullYear()).toBe(2026);
    expect(submitted.getMonth()).toBe(5);
    expect(submitted.getDate()).toBe(20);
  });

  it('valueAs="string": clearing yields "" so required semantics match native inputs', async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ date: string }>(
      (control) => (
        <RHFDatePicker
          name="date"
          control={control}
          valueAs="string"
          rules={{ required: "日付を選択してください" }}
        />
      ),
      { formOptions: { defaultValues: { date: "2026-06-10" } } },
    );

    await user.click(screen.getByRole("button", { name: "Jun 10, 2026" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "日付を選択してください",
      );
    });
  });

  it("marks the trigger invalid and links the error via aria-describedby", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ date: string }>(
      (control) => (
        <RHFDatePicker
          name="date"
          control={control}
          valueAs="string"
          rules={{ required: "必須です" }}
        />
      ),
      { formOptions: { defaultValues: { date: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const trigger = screen.getByRole("button", { name: "Select a date" });
      expect(trigger).toHaveAttribute("aria-invalid", "true");
      expect(trigger).toHaveAttribute("aria-describedby", "date-error");
      expect(screen.getByRole("alert")).toHaveTextContent("必須です");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ date: string }>(
      (control) => (
        <RHFDatePicker
          name="date"
          control={control}
          label="日付"
          valueAs="string"
        />
      ),
      { formOptions: { defaultValues: { date: "2026-06-10" } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
