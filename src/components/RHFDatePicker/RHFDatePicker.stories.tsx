import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFDatePicker } from "./RHFDatePicker";

type FormValues = {
  startDate: string;
  birthday: Date | null;
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<string>("");

  const methods = useForm<FormValues>({
    defaultValues: { startDate: "", birthday: null },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <div>
            {/* "string" mode: the field holds "YYYY-MM-DD" — drop-in for
                native <input type="date"> + z.string() schemas. */}
            <RHFDatePicker
              label="開始日（valueAs=string）"
              name="startDate"
              control={methods.control}
              valueAs="string"
              rules={{ required: "開始日を選択してください" }}
            />
          </div>
          <div>
            {/* Default "date" mode: the field holds Date | null. */}
            <RHFDatePicker
              label="誕生日（valueAs=date）"
              name="birthday"
              control={methods.control}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <pre>{formResult}</pre>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFDatePicker> = {
  title: "Components/RHFDatePicker",
  component: RHFDatePicker,
};

export default meta;
type Story = StoryObj<typeof RHFDatePicker>;

export const Default: Story = {
  render: () => <MyForm />,
};
