import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFPhoneInput } from "./RHFPhoneInput";

type FormValues = {
  phoneNumber: string;
};

const MyForm = () => {

  const [formResult, setFormResult] = useState<FormValues>({ phoneNumber: "" })

  useEffect(() => {
  }, [formResult])

  const methods = useForm<FormValues>({
    defaultValues: { phoneNumber: "" },
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
              <RHFPhoneInput
                label="Phone Number"
                name="phoneNumber"
                rules={{ required: "Phone Number is required" }}
                control={methods.control}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>phoneNumber: {formResult.phoneNumber}</p>
      </GroupBox>
    </div>
  )
}

const meta: Meta<typeof RHFPhoneInput> = {
  title: "Components/RHFPhoneInput",
  component: RHFPhoneInput,
};

export default meta;
type Story = StoryObj<typeof RHFPhoneInput>;

export const Default: Story = {
  render: () => (
    <MyForm />
  ),
};