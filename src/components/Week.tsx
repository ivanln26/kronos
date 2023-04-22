import { useEffect, useState } from "react";
import Button from "./Button";

type Day = {
  name: string;
  active: boolean;
};

type WeekProps = {
  days: Day[];
  setDays: (i: number) => void;
};

const Week = ({ days, setDays }: WeekProps) => {
  return (
    <div className="p-2">
      <div className="flex justify-between p-2 rounded-md font-bold select-none bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        {days.map(({ name, active }, idx) => (
          <Button
            key={name}
            aspect={active ? "contained" : "text"}
            onClick={() => setDays(idx)}
            value={idx}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Week;
