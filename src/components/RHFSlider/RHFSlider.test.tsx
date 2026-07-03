import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFSlider } from "./RHFSlider";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFSlider", () => {
  it("renders a slider with the label", () => {
    renderWithForm<{ volume: number }>(
      (control) => (
        <RHFSlider name="volume" control={control} label="音量" />
      ),
      { formOptions: { defaultValues: { volume: 20 } } },
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByText("音量")).toBeInTheDocument();
  });

  it("moving the slider stores a number in the form and submits it", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ volume: number }>(
      (control) => <RHFSlider name="volume" control={control} />,
      { formOptions: { defaultValues: { volume: 0 } }, onSubmit },
    );

    fireEvent.change(screen.getByRole("slider"), { target: { value: "30" } });
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(onSubmit.mock.calls[0][0]).toEqual({ volume: 30 });
  });

  it("defaults the field to min when no defaultValue is given", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ volume: number }>(
      (control) => <RHFSlider name="volume" control={control} min={10} />,
      { onSubmit },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(onSubmit.mock.calls[0][0]).toEqual({ volume: 10 });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ volume: number }>(
      (control) => (
        <RHFSlider name="volume" control={control} label="音量" />
      ),
      { formOptions: { defaultValues: { volume: 20 } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
