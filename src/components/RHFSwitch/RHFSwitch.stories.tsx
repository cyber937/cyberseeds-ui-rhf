import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSwitch } from "./RHFSwitch";

type FormValues = {
  toggle: boolean;
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ toggle: false });

  const methods = useForm<FormValues>({
    defaultValues: { toggle: false },
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
              <RHFSwitch
                name="toggle"
                control={methods.control}
                onLabel="On"
                offLabel="Off"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>toggle: {formResult.toggle ? "true" : "false"}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFSwitch> = {
  title: "Components/RHFSwitch",
  component: RHFSwitch,
};

export default meta;
type Story = StoryObj<typeof RHFSwitch>;

export const Default: Story = {
  render: () => <MyForm />,
};
