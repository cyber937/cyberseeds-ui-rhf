import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFFileUpload } from "./RHFFileUpload";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

function getFileInput(): HTMLInputElement {
  // The hidden <input type="file"> has no accessible role.
  return document.querySelector('input[type="file"]') as HTMLInputElement;
}

describe("RHFFileUpload", () => {
  it("renders the dropzone and the field label", () => {
    renderWithForm<{ files: File[] }>(
      (control) => (
        <RHFFileUpload
          name="files"
          control={control}
          label="添付ファイル"
          dropzoneLabel="ここにドロップ"
        />
      ),
      { formOptions: { defaultValues: { files: [] } } },
    );
    expect(screen.getByText("添付ファイル")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ここにドロップ" }),
    ).toBeInTheDocument();
  });

  it("selecting a file stores File[] in the form and submits it", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderFormWithSubmit<{ files: File[] }>(
      (control) => <RHFFileUpload name="files" control={control} />,
      { formOptions: { defaultValues: { files: [] } }, onSubmit },
    );

    const file = new File(["x"], "report.pdf", { type: "application/pdf" });
    fireEvent.change(getFileInput(), { target: { files: [file] } });
    expect(screen.getByText("report.pdf")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    const submitted = onSubmit.mock.calls[0][0].files as File[];
    expect(submitted).toHaveLength(1);
    expect(submitted[0].name).toBe("report.pdf");
  });

  it("shows a rules.validate error and marks the dropzone invalid", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ files: File[] }>(
      (control) => (
        <RHFFileUpload
          name="files"
          control={control}
          dropzoneLabel="Zone"
          rules={{
            validate: (f: File[]) =>
              f.length > 0 || "ファイルを選択してください",
          }}
        />
      ),
      { formOptions: { defaultValues: { files: [] } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "ファイルを選択してください",
      );
      const zone = screen.getByRole("button", { name: "Zone" });
      expect(zone).toHaveAttribute("aria-invalid", "true");
      expect(zone).toHaveAttribute("aria-describedby", "files-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ files: File[] }>(
      (control) => (
        <RHFFileUpload name="files" control={control} label="添付ファイル" />
      ),
      { formOptions: { defaultValues: { files: [] } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
