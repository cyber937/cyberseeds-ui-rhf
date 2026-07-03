import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComboboxOption } from "cyberseeds-ui";
import { Button, GroupBox } from "cyberseeds-ui";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFCombobox } from "./RHFCombobox";

type FormValues = {
  student: string | null;
};

const STUDENTS: ComboboxOption[] = [
  { value: "s1", label: "山田 太郎（小3）" },
  { value: "s2", label: "山本 花子（小5）" },
  { value: "s3", label: "佐藤 次郎（中1）" },
  { value: "s4", label: "鈴木 三郎（小1）" },
];

const MyForm = () => {
  const [formResult, setFormResult] = useState<string>("");

  const methods = useForm<FormValues>({
    defaultValues: { student: null },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(JSON.stringify(data));
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <RHFCombobox
            label="生徒"
            name="student"
            control={methods.control}
            options={STUDENTS}
            placeholder="名前で検索…"
            rules={{ required: "生徒を選択してください" }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <pre>{formResult}</pre>
      </GroupBox>
    </div>
  );
};

/**
 * Async/server-search recipe: the parent owns `options`, refreshed from an
 * API keyed off `onSearchChange`; `filter={() => true}` because the server
 * already filtered.
 */
const AsyncSearchForm = () => {
  const [formResult, setFormResult] = useState<string>("");
  const [query, setQuery] = useState("");

  // Stand-in for a debounced server fetch keyed off `query`.
  const options = useMemo(
    () =>
      STUDENTS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const methods = useForm<FormValues>({ defaultValues: { student: null } });

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((d) =>
            setFormResult(JSON.stringify(d)),
          )}
          className="space-y-3"
        >
          <RHFCombobox
            label="生徒（サーバ検索）"
            name="student"
            control={methods.control}
            options={options}
            filter={() => true}
            onSearchChange={setQuery}
            placeholder="名前で検索…"
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <pre>{formResult}</pre>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFCombobox> = {
  title: "Components/RHFCombobox",
  component: RHFCombobox,
};

export default meta;
type Story = StoryObj<typeof RHFCombobox>;

export const Default: Story = {
  render: () => <MyForm />,
};

export const AsyncSearch: Story = {
  render: () => <AsyncSearchForm />,
};
