import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextArea } from "./RHFTextArea";

type FormValues = {
  comment: string;
};

const MyForm = () => {

  const [formResult, setFormResult] = useState<FormValues>({ comment: "" })

  useEffect(() => {
  }, [formResult])

  const methods = useForm<FormValues>({
    defaultValues: { comment: "" },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(data)
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <div>
              <RHFTextArea
                label="Comment"
                name="comment"
                control={methods.control}
                rules={{ required: "Comment is required" }}
                placeholder="Plesae write your comment."
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>comment: {formResult.comment}</p>
      </GroupBox>
    </div>
  )
}

const meta: Meta<typeof RHFTextArea> = {
  title: "Components/RHFTextArea",
  component: RHFTextArea,
};

export default meta;
type Story = StoryObj<typeof RHFTextArea>;

export const Default: Story = {
  render: () => (
    <MyForm />
  ),
};