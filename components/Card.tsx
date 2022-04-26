import type { NextPage } from "next";

type Props = {
  classroom: string;
  course: string;
  teacher: string;
};

const Card: NextPage<Props> = ({ classroom, course, teacher }) => {
  return (
    <div className="flex h-20 select-none">
      <div className="flex basis-1/6 flex-col justify-center rounded-l-sm bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        <h1 className="text-center">14:00</h1>
        <h1 className="text-center">-</h1>
        <h1 className="text-center">18:00</h1>
      </div>
      <div className="flex grow flex-col justify-center rounded-r-xl px-2 border-l-8  border-red-600 bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:border-error-80 dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        <h1>{course}</h1>
        <h1>{classroom}</h1>
        <h1>{teacher}</h1>
      </div>
    </div>
  );
};

export default Card;
