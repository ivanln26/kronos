import { useState, useEffect } from "react";

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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Verificar si estamos en el navegador antes de agregar el event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const translateWeekday = (weekday: Weekday) => {
    switch (weekday) {
      case "monday":
        return "Lunes";
      case "tuesday":
        return "Martes";
      case "wednesday":
        return "Miércoles";
      case "thursday":
        return "Jueves";
      case "friday":
        return "Viernes";
    }
  }

  return (
    <div className={`p-2 ${robotoMono.className}`}>
      <div className="flex justify-between p-2 rounded-md font-bold select-none bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        {days.map(({ id, name }) => (
          <>
            <Button
              key={id}
              aspect={activeDay == id ? "contained" : "text"}
              size="large"
              onClick={() => setDays(id)}
              value={id}
            >
              {windowSize.width <= 500 ? name : translateWeekday(id)}
            </Button>
          </>
        ))}
      </div>
    </div>
  );
};

export default Week;
