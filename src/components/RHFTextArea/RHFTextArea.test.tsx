import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RHFTextArea } from "./RHFTextArea";
import { renderFormWithSubmit, renderWithForm } from "../../test-utils";

expect.extend(toHaveNoViolations);

describe("RHFTextArea", () => {
  it("renders without error", () => {
    renderWithForm<{ comment: string }>(
      (control) => (
        <RHFTextArea name="comment" control={control} label="Comment" />
      ),
      { formOptions: { defaultValues: { comment: "" } } },
    );
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
  });

  it("updates form value on user input", async () => {
    const user = userEvent.setup();
    renderWithForm<{ comment: string }>(
      (control) => (
        <RHFTextArea name="comment" control={control} label="Comment" />
      ),
      { formOptions: { defaultValues: { comment: "" } } },
    );

    const textarea = screen.getByLabelText("Comment");
    await user.type(textarea, "Hello World");
    expect(textarea).toHaveValue("Hello World");
  });

  it("shows validation error message", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ comment: string }>(
      (control) => (
        <RHFTextArea
          name="comment"
          control={control}
          label="Comment"
          rules={{ required: "Comment is required" }}
        />
      ),
      { formOptions: { defaultValues: { comment: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Comment is required",
      );
    });
  });

  it("sets aria-describedby when error exists", async () => {
    const user = userEvent.setup();
    renderFormWithSubmit<{ comment: string }>(
      (control) => (
        <RHFTextArea
          name="comment"
          control={control}
          label="Comment"
          rules={{ required: "Comment is required" }}
        />
      ),
      { formOptions: { defaultValues: { comment: "" } } },
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const textarea = screen.getByLabelText("Comment");
      expect(textarea).toHaveAttribute("aria-describedby", "comment-error");
    });
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithForm<{ comment: string }>(
      (control) => (
        <RHFTextArea name="comment" control={control} label="Comment" />
      ),
      { formOptions: { defaultValues: { comment: "" } } },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
