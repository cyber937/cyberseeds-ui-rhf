import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFFileUpload } from "./RHFFileUpload";

type FormValues = {
  attachments: File[];
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<string>("");
  const [rejectMessage, setRejectMessage] = useState<string>("");

  const methods = useForm<FormValues>({
    defaultValues: { attachments: [] },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(
      data.attachments.map((f) => `${f.name} (${f.size} B)`).join(", ") ||
        "(なし)",
    );
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <RHFFileUpload
            label="添付ファイル"
            name="attachments"
            control={methods.control}
            multiple
            accept=".pdf,application/pdf"
            maxSize={5 * 1024 * 1024}
            dropzoneLabel="クリックしてPDFを選択、またはドラッグ&ドロップ"
            hint="PDF・5MB まで"
            onReject={() => setRejectMessage("PDF（5MB以下）を選択してください")}
            rules={{
              validate: (f: File[]) =>
                f.length > 0 || "ファイルを選択してください",
            }}
          />
          {rejectMessage && (
            <p className="text-xs text-red-600">{rejectMessage}</p>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>{formResult}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFFileUpload> = {
  title: "Components/RHFFileUpload",
  component: RHFFileUpload,
};

export default meta;
type Story = StoryObj<typeof RHFFileUpload>;

export const Default: Story = {
  render: () => <MyForm />,
};
