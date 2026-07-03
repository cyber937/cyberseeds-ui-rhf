import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSlider } from "./RHFSlider";

type FormValues = {
  fontSize: number;
};

const MyForm = () => {
  const [formResult, setFormResult] = useState<string>("");

  const methods = useForm<FormValues>({
    defaultValues: { fontSize: 14 },
  });

  const onSubmit = (data: FormValues) => {
    setFormResult(`fontSize: ${data.fontSize}`);
  };

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
          <RHFSlider
            label="文字サイズ"
            name="fontSize"
            control={methods.control}
            min={10}
            max={24}
            step={1}
            showValue
            formatValue={(v) => `${v}px`}
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

const meta: Meta<typeof RHFSlider> = {
  title: "Components/RHFSlider",
  component: RHFSlider,
};

export default meta;
type Story = StoryObj<typeof RHFSlider>;

export const Default: Story = {
  render: () => <MyForm />,
};
