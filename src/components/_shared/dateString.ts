/**
 * "YYYY-MM-DD" ⇄ `Date` conversion using LOCAL date fields.
 *
 * Never use `toISOString()` or `new Date("YYYY-MM-DD")` for date-only
 * values — both are UTC-based, so in non-UTC timezones (e.g.
 * America/Denver) they shift the calendar day by one.
 */

/** Parses `"YYYY-MM-DD"` (or a `Date`) into a local-midnight `Date`, else `null`. */
export function parseDateInputString(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const date = new Date(year, month - 1, day);
  // Reject silent rollover (e.g. "2026-02-31" → Mar 3).
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/** Formats a `Date` as `"YYYY-MM-DD"` from its LOCAL date fields. */
export function formatDateInputString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
