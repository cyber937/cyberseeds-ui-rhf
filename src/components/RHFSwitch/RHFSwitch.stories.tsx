import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSwitch } from "./RHFSwitch";

type FormValues = {
  taggle: boolean;
};

const MyForm = () => {

  const [formResult, setFormResult] = useState<FormValues>({ taggle: false })

  useEffect(() => {
  }, [formResult])

  const methods = useForm<FormValues>({
    defaultValues: { taggle: false },
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
              <RHFSwitch
                name="taggle"
                control={methods.control}
                onLable="On"
                offLable="Off"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>taggle: {formResult.taggle ? "true" : "false"}</p>
      </GroupBox>
    </div>
  )
}

const meta: Meta<typeof RHFSwitch> = {
  title: "Components/RHFSwitch",
  component: RHFSwitch,
};

export default meta;
type Story = StoryObj<typeof RHFSwitch>;

export const Default: Story = {
  render: () => (
    <MyForm />
  ),
};