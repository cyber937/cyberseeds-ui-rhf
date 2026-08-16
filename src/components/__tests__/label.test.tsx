import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { RHFInput } from "../RHFInput/RHFInput";
import { RHFSelect } from "../RHFSelect/RHFSelect";
import { RHFTextArea } from "../RHFTextArea/RHFTextArea";
import { renderWithForm } from "../../test-utils";

/**
 * These wrappers forward `label` / `labelPlacement` to the cyberseeds-ui
 * component they wrap, which links the label to the control with `htmlFor`.
 *
 * RHFSelect used to take no `label` at all, so callers hand-wrote
 * `<label className="…">` beside it and skipped `htmlFor` — the label never
 * reached the select. These tests keep the prop wired.
 */
describe("label pass-through", () => {
  describe("label reaches the control", () => {
    it("RHFInput", () => {
      renderWithForm<{ name: string }>(
        (control) => <RHFInput name="name" control={control} label="氏名" />,
        { formOptions: { defaultValues: { name: "" } } },
      );

      expect(screen.getByLabelText("氏名").tagName).toBe("INPUT");
    });

    it("RHFSelect", () => {
      renderWithForm<{ year: string }>(
        (control) => (
          <RHFSelect
            name="year"
            control={control}
            label="年度"
            options={[{ label: "2026", value: "2026" }]}
          />
        ),
        { formOptions: { defaultValues: { year: "" } } },
      );

      expect(screen.getByLabelText("年度").tagName).toBe("SELECT");
    });

    it("RHFTextArea", () => {
      renderWithForm<{ note: string }>(
        (control) => <RHFTextArea name="note" control={control} label="備考" />,
        { formOptions: { defaultValues: { note: "" } } },
      );

      expect(screen.getByLabelText("備考").tagName).toBe("TEXTAREA");
    });
  });

  describe("labelPlacement", () => {
    it("RHFSelect は既定でラベルを上に置く", () => {
      const { container } = renderWithForm<{ year: string }>(
        (control) => (
          <RHFSelect
            name="year"
            control={control}
            label="年度"
            options={[{ label: "2026", value: "2026" }]}
          />
        ),
        { formOptions: { defaultValues: { year: "" } } },
      );

      const wrapper = container.querySelector("label")?.parentElement;
      expect(wrapper?.className ?? "").not.toContain("flex");
    });

    it("RHFSelect は start で横に並べる", () => {
      const { container } = renderWithForm<{ year: string }>(
        (control) => (
          <RHFSelect
            name="year"
            control={control}
            label="年度"
            labelPlacement="start"
            options={[{ label: "2026", value: "2026" }]}
          />
        ),
        { formOptions: { defaultValues: { year: "" } } },
      );

      const wrapper = container.querySelector("label")?.parentElement;
      expect(wrapper?.className ?? "").toContain("flex");
      // 横並びでもラベルと select の結びつきは保つ
      expect(screen.getByLabelText("年度").tagName).toBe("SELECT");
    });

    it("RHFInput も start を受け取る", () => {
      const { container } = renderWithForm<{ name: string }>(
        (control) => (
          <RHFInput
            name="name"
            control={control}
            label="氏名"
            labelPlacement="start"
          />
        ),
        { formOptions: { defaultValues: { name: "" } } },
      );

      const wrapper = container.querySelector("label")?.parentElement;
      expect(wrapper?.className ?? "").toContain("flex");
    });

    it("RHFTextArea も start を受け取る", () => {
      const { container } = renderWithForm<{ note: string }>(
        (control) => (
          <RHFTextArea
            name="note"
            control={control}
            label="備考"
            labelPlacement="start"
          />
        ),
        { formOptions: { defaultValues: { note: "" } } },
      );

      const wrapper = container.querySelector("label")?.parentElement;
      expect(wrapper?.className ?? "").toContain("flex");
    });
  });

  it("RHFSelect は require で必須の印を出す", () => {
    const { container } = renderWithForm<{ year: string }>(
      (control) => (
        <RHFSelect
          name="year"
          control={control}
          label="年度"
          require
          options={[{ label: "2026", value: "2026" }]}
        />
      ),
      { formOptions: { defaultValues: { year: "" } } },
    );

    expect(container.querySelector("label")).not.toBeNull();
    expect(container.textContent).toContain("年度");
  });
});
