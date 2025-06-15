import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFCheckbox } from "./RHFCheckbox";

type FormValues = {
  isStudent: boolean;
};

const MyForm = () => {

  const [formResult, setFormResult] = useState<FormValues>({ isStudent: false })

  useEffect(() => {
  }, [formResult])

  const methods = useForm<FormValues>({
    defaultValues: { isStudent: false },
  });

  const isStudent = methods.watch("isStudent");

  const onSubmit = (data: FormValues) => {
    setFormResult(data)
    console.log("Submitted:", data);
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <RHFCheckbox
              label="Is Student?"
              name="isStudent"
              control={methods.control}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>isStudent: {formResult.isStudent ? "true" : "false"}</p>
      </GroupBox>
    </div>
  )
}

const meta: Meta<typeof RHFCheckbox> = {
  title: "Components/RHFCheckbox",
  component: RHFCheckbox,
};

export default meta;
type Story = StoryObj<typeof RHFCheckbox>;

export const Default: Story = {
  render: () => (
    <MyForm />
  ),
};