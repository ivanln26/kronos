import type { Schedule } from "@prisma/client";

type StringSchedule = {
    [k in keyof Schedule]: string;
};

interface AdminSelectProps {
    updateForm: <K extends keyof StringSchedule>(name: K, value: StringSchedule[K]) => void;
    formKey: keyof StringSchedule,
    value: string;
    name: string;
    children: React.ReactNode;
}

export default function AdminSelect({ updateForm, formKey, value, name, children }: AdminSelectProps) {
    return (
        <div className="flex flex-col justify-items-center mx-6 my-4">

            <label className="mr-2 block mx-5">{name}</label>
            <select
                className="text-black border rounded p-1 mx-5"
                onChange={(e) => updateForm(formKey, e.target.value)}
                value={value}
            >
                <option value="">------</option>
                {children}

            </select>
        </div>
    );
};


