import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFButtonGroup } from "./RHFButtonGroup";

type FormValues = {
  size: string;
};

const sizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ size: "md" });

  const methods = useForm<FormValues>({
    defaultValues: { size: "md" },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(data);
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <div>
              <RHFButtonGroup
                options={sizeOptions}
                name="size"
                defaultValue="md"
                rules={{
                  validate: (value) =>
                    (value !== "" && value !== undefined) ||
                    "Please select a size",
                }}
                control={methods.control}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>size: {formResult.size}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFButtonGroup> = {
  title: "Components/RHFButtonGroup",
  component: RHFButtonGroup,
};

export default meta;
type Story = StoryObj<typeof RHFButtonGroup>;

export const Default: Story = {
  render: () => <MyForm />,
};
