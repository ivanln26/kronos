import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";

import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import Navbar from "@/components/Navbar";
import Week from "@/components/Week";
import { trpc } from "@/utils/trpc";
import { Weekday } from "@/server/types";

type Day = {
  id: Weekday;
  name: string;
  abbreviation: string;
};

function clampNumber(n: number, a: number, b: number): number {
  return Math.max(Math.min(n, Math.max(a, b)), Math.min(a, b));
}

const Home: NextPage = () => {
  const days: Day[] = [
    { id: "monday", name: "Lunes", abbreviation: "L" },
    { id: "tuesday", name: "Martes", abbreviation: "M" },
    { id: "wednesday", name: "Miércoles", abbreviation: "X" },
    { id: "thursday", name: "Jueves", abbreviation: "J" },
    { id: "friday", name: "Viernes", abbreviation: "V" },
  ];

  const [currentDay, setCurrentDay] = useState<Weekday>(() => {
    const date = new Date();
    const day_of_week = clampNumber(date.getDay(), 1, 5);
    return days[day_of_week - 1].id;
  });

  const lectures = trpc.lecture.getByDay.useQuery({ day: currentDay });

  const updateCurrent = (weekday: Weekday) => {
    setCurrentDay(weekday);
  };

  return (
    <>
      <Navbar />
      <Week days={days} activeDay={currentDay} setDays={updateCurrent} />
      <div className="px-2 flex flex-col gap-y-2">
        {lectures.status == "loading"
          ? Array(6).fill(null).map((_, i) => <CardSkeleton key={i} />)
          : lectures.status == "success" && lectures.data.length != 0
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
            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-center">
                <h1 className="bg-blue-400 py-3 px-5 rounded">
                  ¡Felicidades, hoy no hay clases 🎉!
                </h1>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
