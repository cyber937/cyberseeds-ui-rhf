import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { UIColorProvider } from "cyberseeds-ui";

import { RHFInput } from "../RHFInput/RHFInput";
import { RHFCheckbox } from "../RHFCheckbox/RHFCheckbox";
import { RHFSwitch } from "../RHFSwitch/RHFSwitch";
import { RHFTextArea } from "../RHFTextArea/RHFTextArea";
import { renderWithForm } from "../../test-utils";

/**
 * These wrappers forward `color` to the cyberseeds-ui component they wrap.
 *
 * From cyberseeds-ui v2.0.0 an explicit `color` outranks `UIColorProvider`. A
 * default value on the wrapper therefore reaches the inner component as an
 * *explicit* prop and pins the whole subtree — the provider stops working.
 *
 * v1.3.0 shipped `color = "blue"` on all twelve wrappers, which would have
 * frozen every RHF field at blue no matter what theme the app set. The
 * defaults are gone; these tests keep them gone.
 */

/** Read the base colour off the innermost element carrying the CSS vars. */
function baseVar(container: HTMLElement) {
  const holders = Array.from(container.querySelectorAll<HTMLElement>("[style]")).filter(
    (el) => el.style.getPropertyValue("--cs-ui-base") !== "",
  );
  return holders.at(-1)?.style.getPropertyValue("--cs-ui-base") ?? "";
}

describe("colour pass-through", () => {
  describe("no default pins the provider", () => {
    it("RHFInput follows UIColorProvider", () => {
      const { container } = renderWithForm<{ name: string }>(
        (control) => (
          <UIColorProvider initialColor="red">
            <RHFInput name="name" control={control} label="Name" />
          </UIColorProvider>
        ),
        { formOptions: { defaultValues: { name: "" } } },
      );
      // A leftover `color = "blue"` default would win here and this would be
      // blue's base instead.
      const provider = container.querySelector<HTMLElement>("[style]");
      expect(provider?.style.getPropertyValue("--cs-ui-base")).not.toBe("");
      expect(baseVar(container)).toBe(
        provider?.style.getPropertyValue("--cs-ui-base"),
      );
    });

    it("RHFCheckbox follows UIColorProvider", () => {
      const { container } = renderWithForm<{ agree: boolean }>(
        (control) => (
          <UIColorProvider initialColor="red">
            <RHFCheckbox name="agree" control={control} label="Agree" />
          </UIColorProvider>
        ),
        { formOptions: { defaultValues: { agree: false } } },
      );
      const provider = container.querySelector<HTMLElement>("[style]");
      expect(baseVar(container)).toBe(
        provider?.style.getPropertyValue("--cs-ui-base"),
      );
    });

    it("RHFSwitch follows UIColorProvider", () => {
      const { container } = renderWithForm<{ on: boolean }>(
        (control) => (
          <UIColorProvider initialColor="red">
            <RHFSwitch name="on" control={control} label="On" />
          </UIColorProvider>
        ),
        { formOptions: { defaultValues: { on: false } } },
      );
      const provider = container.querySelector<HTMLElement>("[style]");
      expect(baseVar(container)).toBe(
        provider?.style.getPropertyValue("--cs-ui-base"),
      );
    });

    it("RHFTextArea follows UIColorProvider", () => {
      const { container } = renderWithForm<{ note: string }>(
        (control) => (
          <UIColorProvider initialColor="red">
            <RHFTextArea name="note" control={control} label="Note" />
          </UIColorProvider>
        ),
        { formOptions: { defaultValues: { note: "" } } },
      );
      const provider = container.querySelector<HTMLElement>("[style]");
      expect(baseVar(container)).toBe(
        provider?.style.getPropertyValue("--cs-ui-base"),
      );
    });
  });

  it("an explicit color still wins over the provider", () => {
    const { container } = renderWithForm<{ name: string }>(
      (control) => (
        <UIColorProvider initialColor="red">
          <RHFInput name="name" control={control} label="Name" color="green" />
        </UIColorProvider>
      ),
      { formOptions: { defaultValues: { name: "" } } },
    );
    const provider = container.querySelector<HTMLElement>("[style]");
    // Passing color explicitly is still supported — it just isn't the default.
    expect(baseVar(container)).not.toBe(
      provider?.style.getPropertyValue("--cs-ui-base"),
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
});
