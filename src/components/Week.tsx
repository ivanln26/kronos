import { useEffect, useState } from "react";
import Button from "./Button";

const Week = () => {
  const initialDays = [
    { name: "L", active: false },
    { name: "M", active: false },
    { name: "X", active: false },
    { name: "J", active: false },
    { name: "V", active: false },
  ];

  const [days, setDays] = useState(initialDays);

  useEffect(() => {
    let days = [...initialDays];
    days[0].active = true;
    setDays(days);
  }, []);

  const handleClick = (i: number) => {
    let days = [...initialDays];
    days[i].active = true;
    setDays(days);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between p-2 rounded-md font-bold select-none bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        {days.map(({ name, active }, idx) => (
          <Button
            key={name}
            aspect={active ? "contained" : "text"}
            onClick={() => handleClick(idx)}
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
