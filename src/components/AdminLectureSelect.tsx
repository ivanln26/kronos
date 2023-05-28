import type { Lecture } from "@prisma/client";

type StringLecture = {
    [k in keyof Lecture]: string;
};

type updateFormFunc = <R extends keyof StringLecture>(name: R, value: StringLecture[R]) => void;

interface AdminSelectProps {
    updateForm: updateFormFunc;
    formKey: keyof StringLecture,
    value: string;
    name: string;
    children: React.ReactNode;
}

export default function AdminLectureSelect({ updateForm, formKey, value, name, children }: AdminSelectProps) {
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

