import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { FieldError } from "./FieldError";

expect.extend(toHaveNoViolations);

describe("FieldError", () => {
  it("renders nothing when no error is provided", () => {
    const { container } = render(<FieldError />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when error has no message", () => {
    const { container } = render(
      <FieldError error={{ type: "required" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message with role='alert'", () => {
    render(
      <FieldError error={{ type: "required", message: "Name is required" }} />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Name is required");
  });

  it("passes id to the error element", () => {
    render(
      <FieldError
        error={{ type: "required", message: "Required" }}
        id="name-error"
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "name-error");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FieldError
        error={{ type: "required", message: "Field is required" }}
        id="test-error"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
