import type { NextPage } from "next";

type Props = {
  classroom: string;
  course: string;
  teacher: string;
  startDate: string;
  endDate: string;
  color: string;
};

const Card: NextPage<Props> = (
  { classroom, course, teacher, startDate, endDate, color },
) => {
  return (
    <div className="flex h-20 md:h-28 text-base md:text-2xl rounded-xl bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
      <div className="flex basis-1/5 md:basis-1/6 flex-col justify-center">
        <h1 className="text-center">{startDate}</h1>
        <h1 className="text-center">-</h1>
        <h1 className="text-center">{endDate}</h1>
      </div>
      <div
        className={`flex grow flex-col justify-center px-2 border-l-8 border-blue-500 ${color}`}
      >
        <h1>{course}</h1>
        <h1>{classroom}</h1>
        <h1>{teacher}</h1>
      </div>
    </div>
  );
};

export default Card;
