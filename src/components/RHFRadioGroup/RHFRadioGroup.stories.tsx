import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFRadioGroup } from "./RHFRadioGroup";

type FormValues = {
  fruit: string;
};

const radioButtonOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ fruit: "apple" });

  const methods = useForm<FormValues>({
    defaultValues: { fruit: "apple" },
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
              <RHFRadioGroup
                options={radioButtonOptions}
                name="fruit"
                defaultValue="apple"
                rules={{ required: "Fruit is required" }}
                control={methods.control}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>fruit: {formResult.fruit}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFRadioGroup> = {
  title: "Components/RHFRadioGroup",
  component: RHFRadioGroup,
};

export default meta;
type Story = StoryObj<typeof RHFRadioGroup>;

export const Default: Story = {
  render: () => <MyForm />,
};
