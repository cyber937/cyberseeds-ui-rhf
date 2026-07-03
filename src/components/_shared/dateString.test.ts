import { describe, it, expect } from "vitest";
import { formatDateInputString, parseDateInputString } from "./dateString";

describe("dateString helpers (timezone-safe, local fields)", () => {
  it("parses YYYY-MM-DD into a local-midnight Date", () => {
    const d = parseDateInputString("2026-06-15");
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2026);
    expect(d!.getMonth()).toBe(5);
    expect(d!.getDate()).toBe(15);
    expect(d!.getHours()).toBe(0);
  });

  it("formats a Date from its LOCAL fields (no UTC shift)", () => {
    expect(formatDateInputString(new Date(2026, 5, 15))).toBe("2026-06-15");
    // Late evening local time — toISOString() would flip the day in
    // west-of-UTC timezones; local-field formatting must not.
    expect(formatDateInputString(new Date(2026, 0, 1, 23, 30))).toBe(
      "2026-01-01",
    );
  });

  it("pads single-digit month/day", () => {
    expect(formatDateInputString(new Date(2026, 2, 5))).toBe("2026-03-05");
  });

  it("round-trips parse → format", () => {
    expect(formatDateInputString(parseDateInputString("2026-11-03")!)).toBe(
      "2026-11-03",
    );
  });

  it("rejects rollover dates like 2026-02-31", () => {
    expect(parseDateInputString("2026-02-31")).toBeNull();
  });

  it("returns null for garbage and empty strings", () => {
    expect(parseDateInputString("")).toBeNull();
    expect(parseDateInputString("not-a-date")).toBeNull();
    expect(parseDateInputString(undefined)).toBeNull();
    expect(parseDateInputString(null)).toBeNull();
  });

  it("passes a valid Date through and rejects an invalid one", () => {
    const d = new Date(2026, 5, 15);
    expect(parseDateInputString(d)).toBe(d);
    expect(parseDateInputString(new Date("invalid"))).toBeNull();
  });
});
