import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTagInput } from "./RHFTagInput";

type FormValues = {
  subjects: string[];
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<string>("");

  const methods = useForm<FormValues>({
    defaultValues: { subjects: ["国語"] },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(JSON.stringify(data.subjects));
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <RHFTagInput
            label="科目"
            name="subjects"
            control={methods.control}
            placeholder="科目を追加…"
            maxTags={5}
            rules={{
              validate: (v: string[]) =>
                v.length > 0 || "1件以上入力してください",
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>{formResult}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFTagInput> = {
  title: "Components/RHFTagInput",
  component: RHFTagInput,
};

export default meta;
type Story = StoryObj<typeof RHFTagInput>;

export const Default: Story = {
  render: () => <MyForm />,
};
