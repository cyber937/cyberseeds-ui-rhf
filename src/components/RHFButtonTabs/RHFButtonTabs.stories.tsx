import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, GroupBox } from "cyberseeds-ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFButtonTabs } from "./RHFButtonTabs";

type FormValues = {
  view: string;
};

const viewOptions = [
  { label: "Grid", value: "grid" },
  { label: "List", value: "list" },
  { label: "Table", value: "table" },
];

const MyForm = () => {
  const [formResult, setFormResult] = useState<FormValues>({ view: "grid" });

  const methods = useForm<FormValues>({
    defaultValues: { view: "grid" },
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
              <RHFButtonTabs
                options={viewOptions}
                name="view"
                defaultValue="grid"
                rules={{
                  validate: (value) =>
                    (value !== "" && value !== undefined) ||
                    "Please select a view",
                }}
                control={methods.control}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <GroupBox label="Form Result:">
        <p>view: {formResult.view}</p>
      </GroupBox>
    </div>
  );
};

const meta: Meta<typeof RHFButtonTabs> = {
  title: "Components/RHFButtonTabs",
  component: RHFButtonTabs,
};

export default meta;
type Story = StoryObj<typeof RHFButtonTabs>;

export const Default: Story = {
  render: () => <MyForm />,
};
