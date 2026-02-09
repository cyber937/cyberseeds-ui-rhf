import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSelect } from "./RHFSelect";

type FormValues = {
  language: string;
};

const selectOptions = [
  { label: "Please select", value: "" },
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
];

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ language: "" });

  const methods = useForm<FormValues>({
    defaultValues: { language: "" },
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
              <RHFSelect
                options={selectOptions}
                name="language"
                rules={{ validate: (value) => value !== "" || "Please select a language" }}
                control={methods.control}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>language: {formResult.language}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFSelect> = {
  title: "Components/RHFSelect",
  component: RHFSelect,
};

export default meta;
type Story = StoryObj<typeof RHFSelect>;

export const Default: Story = {
  render: () => <MyForm />,
};
