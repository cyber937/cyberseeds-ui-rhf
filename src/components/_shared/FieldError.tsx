import type { FieldError as RHFFieldError } from "react-hook-form";

interface FieldErrorProps {
  error?: RHFFieldError;
  id?: string;
}

export function FieldError({ error, id }: FieldErrorProps) {
  if (!error?.message) return null;
  return (
    <p id={id} className="text-xs text-red-600 ml-2" style={{ marginTop: "4px" }} role="alert">
      {error.message}
    </p>
  );
}
