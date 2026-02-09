import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFInput } from "./RHFInput";

type FormValues = {
  firstName: string;
  lastName: string;
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ firstName: "", lastName: "" });

  const methods = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "" },
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
              <RHFInput
                label="First Name"
                name="firstName"
                control={methods.control}
                rules={{ required: "First Name is required" }}
                placeholder="First Name"
              />
            </div>
            <div>
              <RHFInput
                label="Last Name"
                name="lastName"
                control={methods.control}
                rules={{ required: "Last Name is required" }}
                placeholder="Last Name"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>firstName: {formResult.firstName}</p>
        <p>lastName: {formResult.lastName}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFInput> = {
  title: "Components/RHFInput",
  component: RHFInput,
};

export default meta;
type Story = StoryObj<typeof RHFInput>;

export const Default: Story = {
  render: () => <MyForm />,
};
