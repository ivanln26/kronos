import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Week from "@/components/Week";
import { trpc } from "@/utils/trpc";
import { Weekday } from "@/server/types";

const Home: NextPage = () => {
  const initialDays = [
    { name: "L", active: false },
    { name: "M", active: false },
    { name: "X", active: false },
    { name: "J", active: false },
    { name: "V", active: false },
  ];

  const mapWeekday = (i: number): Weekday => {
    switch (i) {
      case 0:
        return "monday";
      case 1:
        return "tuesday";
      case 2:
        return "wednesday";
      case 3:
        return "thursday";
      default:
        return "friday";
    }
  };

  const [currentDay, setCurrentDay] = useState<Weekday>("monday");
  const [days, setDays] = useState(initialDays);

  const lectures = trpc.lecture.get.useQuery({ day: currentDay });

  useEffect(() => {
    let days = [...initialDays];
    days[0].active = true;
    setDays(days);
  }, []);

  const updateDays = (i: number) => {
    let days = [...initialDays];
    days[i].active = true;
    setDays(days);
    setCurrentDay(mapWeekday(i));
  };

  return (
    <>
      <Navbar />
      <Week days={days} setDays={updateDays} />
      <div className="flex justify-center px-2">
        <div className="flex flex-col basis-full gap-y-2">
          {!lectures.isLoading && !lectures.isError &&
            lectures.data.map((lecture, i) => (
              <Link
                href={{
                  pathname: "/lecture/[id]",
                  query: { id: Number(lecture.id) },
                }}
              >
                <Card key={i} {...lecture} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
