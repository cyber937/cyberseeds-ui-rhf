import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, UIColorProvider } from "cyberseeds-ui";
import { FormProvider, useForm } from "react-hook-form";
import { RHFCheckbox } from "./RHFCheckbox/RHFCheckbox";
import { RHFInput } from "./RHFInput/RHFInput";
import { RHFPhoneInput } from "./RHFPhoneInput/RHFPhoneInput";
import { RHFRadioGroup } from "./RHFRadioGroup/RHFRadioGroup";
import { RHFSelect } from "./RHFSelect/RHFSelect";
import { RHFSwitch } from "./RHFSwitch/RHFSwitch";
import { RHFTextArea } from "./RHFTextArea/RHFTextArea";

type FormValues = {
  firstName: string;
  lastName: string;
  isStudent: boolean;
  comment: string;
  fruit: string;
  language: string;
  toggle: boolean;
  phoneNumber: string;
};

const Form = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      lastName: "",
      firstName: "",
      isStudent: false,
      comment: "",
      fruit: "",
      language: "",
      toggle: false,
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data);
  };

  const radioButtonOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ];

  const selectOptions = [
    { label: "Please select", value: "" },
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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
        <RHFCheckbox
          label="Is Student?"
          name="isStudent"
          control={methods.control}
        />
        <div>
          <RHFTextArea
            label="Comment"
            name="comment"
            control={methods.control}
            rules={{ required: "Comment is required" }}
            placeholder="Please write your comment."
          />
        </div>
        <div>
          <RHFRadioGroup
            options={radioButtonOptions}
            name="fruit"
            rules={{ required: "Fruit is required" }}
            control={methods.control}
          />
        </div>
        <div>
          <RHFSelect
            options={selectOptions}
            name="language"
            rules={{
              validate: (value) =>
                value !== "" || "Please select a language",
            }}
            control={methods.control}
          />
        </div>
        <div>
          <RHFSwitch
            name="toggle"
            control={methods.control}
            onLabel="On"
            offLabel="Off"
          />
        </div>
        <div>
          <RHFPhoneInput
            label="Phone Number"
            name="phoneNumber"
            rules={{ required: "Phone Number is required" }}
            control={methods.control}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <UIColorProvider initialColor="red">
      <Form />
    </UIColorProvider>
  ),
};
