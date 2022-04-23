import type { NextPage } from "next";

type Props = {
  classroom: string;
  course: string;
  teacher: string;
};

const Card: NextPage<Props> = ({ classroom, course, teacher }) => {
  return (
    <div className="flex h-20">
      <div className="flex basis-1/6 flex-col justify-center rounded-l-sm border dark:border-0 dark:bg-[#1e1e1e]">
        <h1 className="text-center">14:00</h1>
        <h1 className="text-center">-</h1>
        <h1 className="text-center">18:00</h1>
      </div>
      <div className="flex grow flex-col justify-center rounded-r-xl border border-l-8 dark:border-0 dark:border-l-8 border-red-600 bg-gray-100 px-2 dark:bg-[#1e1e1e] drop-shadow dark:drop-shadow-none">
        <h1>{course}</h1>
        <h1>{classroom}</h1>
        <h1>{teacher}</h1>
      </div>
    </div>
  );
};

export default Card;
