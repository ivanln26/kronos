import type { NextPage } from "next";

type Props = {
  classroom: string;
  course: string;
  teacher: string;
};

const Card: NextPage<Props> = ({ classroom, course, teacher }) => {
  return (
    <div className="flex h-20">
      <div className="flex flex-col justify-center basis-1/6 border rounded-sm">
        <h1 className="text-center">14:00</h1>
        <h1 className="text-center">-</h1>
        <h1 className="text-center">18:00</h1>
      </div>
      <div className="flex grow flex-col justify-center px-2 bg-gray-100 border border-l-8 border-red-500 rounded-r-md">
        <h1>{course}</h1>
        <h1>{classroom}</h1>
        <h1>{teacher}</h1>
      </div>
    </div>
  );
};

export default Card;
