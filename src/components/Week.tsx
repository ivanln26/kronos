import { Weekday } from "@prisma/client";
import { Roboto_Mono } from "next/font/google";

import Button from "./Button";

type Day = {
  id: Weekday;
  name: string;
};

type WeekProps = {
  days: Day[];
  activeDay: Weekday;
  setDays: (i: Weekday) => void;
};

const robotoMono = Roboto_Mono({
  weight: "700",
  subsets: ["latin"],
});

const Week = ({ days, activeDay, setDays }: WeekProps) => {
  return (
    <div className={`p-2 ${robotoMono.className}`}>
      <div className="flex justify-between p-2 rounded-md font-bold select-none bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        {days.map(({ id, name }) => (
          <Button
            key={id}
            aspect={activeDay == id ? "contained" : "text"}
            size="large"
            onClick={() => setDays(id)}
            value={id}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Week;
