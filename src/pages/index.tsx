import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Week from "@/components/Week";
import { trpc } from "@/utils/trpc";
import { Weekday } from "@/server/types";

type Day = {
  id: Weekday;
  name: string;
  abbreviation: string;
};

const Home: NextPage = () => {
  const days: Day[] = [
    { id: "monday", name: "Lunes", abbreviation: "L" },
    { id: "tuesday", name: "Martes", abbreviation: "M" },
    { id: "wednesday", name: "Miércoles", abbreviation: "X" },
    { id: "thursday", name: "Jueves", abbreviation: "J" },
    { id: "friday", name: "Viernes", abbreviation: "V" },
  ];

  const [currentDay, setCurrentDay] = useState<Weekday>("monday");

  const lectures = trpc.lecture.getByDay.useQuery({ day: currentDay });

  const updateCurrent = (weekday: Weekday) => {
    setCurrentDay(weekday);
  };

  return (
    <>
      <Navbar />
      <Week days={days} activeDay={currentDay} setDays={updateCurrent} />
      <div className="flex justify-center px-2">
        <div className="flex flex-col basis-full gap-y-2">
          {lectures.data && lectures.data.length != 0
            ? lectures.data.map((lecture, i) => (
              <Link
                key={i}
                href={{
                  pathname: "/lecture/[id]",
                  query: { id: Number(lecture.id) },
                }}
              >
                <Card {...lecture} />
              </Link>
            ))
            : (
              <>
                <div className="flex h-screen flex-col justify-center">
                  <div className="flex flex-row justify-center">
                    <h1 className="bg-blue-400 py-3 px-5 rounded">
                      ¡Felicidades, hoy no hay clases 🎉!
                    </h1>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
