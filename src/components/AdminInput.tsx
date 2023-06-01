import type { Schedule } from "@prisma/client";

type StringSchedule = {
  [k in keyof Schedule]: string;
};

interface AdminInputProps {
  updateForm: <K extends keyof StringSchedule>(
    name: K,
    value: StringSchedule[K],
  ) => void;
  formKey: keyof StringSchedule;
  value: string;
  name: string;
  pattern: string;
}

export default function AdminInput(
  { updateForm, formKey, value, name, pattern = "" }: AdminInputProps,
) {
  return (
    <div className="flex flex-col justify-items-center mx-6 my-4">
      <label className="mr-2 block mx-5">{name}</label>
      <input
        title="Eight or more characters"
        className="text-black border rounded p-1 mx-5"
        onChange={(e) => updateForm(formKey, e.target.value)}
        value={value}
        pattern={pattern}
        required
      />
    </div>
  );
}
