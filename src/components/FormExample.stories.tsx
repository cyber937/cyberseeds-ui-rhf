import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "cyberseeds-ui";
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
  gender: string;
  fruit: string | undefined;
  taggle: boolean;
  phoneNumber: string;
};

const MyForm = () => {
  const methods = useForm<FormValues>({
    defaultValues: { lastName: "" },
  });

  const isStudent = methods.watch("isStudent");
  const fruit = methods.watch("fruit");
  const taggle = methods.watch("taggle");

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data);
  };

  const radioButtonOptions = [
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
    { label: "その他", value: "other" },
  ];

  const selectOptions = [
    { label: "選んでください", value: undefined },
    { label: "りんご", value: "apple" },
    { label: "みかん", value: "orange" },
    { label: "バナナ", value: "banana" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div>
            <RHFInput
              label="First Name"
              color="blue"
              name="firstName"
              control={methods.control}
              rules={{ required: "First Name is required" }}
              placeholder="First Name"
            />
          </div>
          <div>
            <RHFInput
              label="Last Name"
              color="blue"
              name="lastName"
              control={methods.control}
              rules={{ required: "Last Name is required" }}
              placeholder="Last Name"
            />
          </div>
        </div>
        <RHFCheckbox
          label="Is Student?"
          color="blue"
          name="isStudent"
          control={methods.control}
        />
        {isStudent && <div>Yes, Student</div>}
        <div>
          <RHFTextArea
            label="Comment"
            color="blue"
            name="comment"
            control={methods.control}
            rules={{ required: "Comment is required" }}
            placeholder="Plesae write your comment."
          />
        </div>
        <div>
          <RHFRadioGroup
            color="blue"
            options={radioButtonOptions}
            name="gender"
            defaultValue="female"
            rules={{ required: "Gender is required" }}
            control={methods.control}
          />
        </div>
        <div>
          <RHFSelect
            color="blue"
            options={selectOptions}
            name="fruit"
            rules={{ required: "Fruit is required" }}
            control={methods.control}
          />
          <div>{fruit}</div>
        </div>
        <div>
          <RHFSwitch
            color="blue"
            name="taggle"
            control={methods.control}
            onLable="オン"
            offLable="オフ"
          />
          <div>{taggle}</div>
        </div>
        <div>
          <RHFPhoneInput
            label="Phone Number"
            color="blue"
            name="phoneNumber"
            rules={{ required: "Phone Number is required" }}
            control={methods.control}
          />
        </div>
        <Button type="submit" color="blue">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof RHFInput> = {
  title: "Components/Form",
  component: RHFInput,
};

export default meta;
type Story = StoryObj<typeof RHFInput>;

export const Default: Story = {
  render: () => <MyForm />,
};
