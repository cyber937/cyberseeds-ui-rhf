import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RHFSwitch } from "./RHFSwitch";
import { renderWithForm } from "../../test-utils";

describe("RHFSwitch", () => {
  it("renders without error", () => {
    renderWithForm<{ toggle: boolean }>(
      (control) => (
        <RHFSwitch
          name="toggle"
          control={control}
          onLabel="On"
          offLabel="Off"
        />
      ),
      { formOptions: { defaultValues: { toggle: false } } },
    );
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    renderWithForm<{ toggle: boolean }>(
      (control) => (
        <RHFSwitch
          name="toggle"
          control={control}
          onLabel="On"
          offLabel="Off"
        />
      ),
      { formOptions: { defaultValues: { toggle: false } } },
    );

    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "false");

    await user.click(switchEl);
    expect(switchEl).toHaveAttribute("aria-checked", "true");

    await user.click(switchEl);
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("renders with default checked state", () => {
    renderWithForm<{ toggle: boolean }>(
      (control) => (
        <RHFSwitch
          name="toggle"
          control={control}
          onLabel="On"
          offLabel="Off"
        />
      ),
      { formOptions: { defaultValues: { toggle: true } } },
    );

    expect(screen.getByRole("switch")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
