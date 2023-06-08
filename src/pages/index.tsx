import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Card from "@/components/Card";
import Button from "@/components/Button";
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

const days: readonly Day[] = [
  { id: "monday", name: "Lunes", abbreviation: "L" },
  { id: "tuesday", name: "Martes", abbreviation: "M" },
  { id: "wednesday", name: "Miércoles", abbreviation: "X" },
  { id: "thursday", name: "Jueves", abbreviation: "J" },
  { id: "friday", name: "Viernes", abbreviation: "V" },
] as const;

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [currentDay, setCurrentDay] = useState<Weekday>("monday");
  const [currentView, setCurrentView] = useState<"general" | "favourites">(
    "general",
  );
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const date = new Date();
    const day_of_week = clampNumber(date.getDay(), 1, 5);
    setCurrentDay(days[day_of_week - 1].id);
    setEnabled(true);
  }, []);

  const lectures = trpc.lecture.getByDay.useQuery({ day: currentDay }, {
    enabled: enabled,
  });
  const favLectures = trpc.lecture.getFavouritesByDay.useQuery({
    day: currentDay,
    userId: Number(session?.user.id),
  }, {
    enabled: currentView === "favourites" && session !== null,
  });

  const updateCurrent = (weekday: Weekday) => {
    setCurrentDay(weekday);
  };

  return (
    <>
      <Navbar />
      {enabled && (
        <>
          <Week days={days} activeDay={currentDay} setDays={updateCurrent} />
          {session && session.user && (
            <section className="px-2 py-1 my-2">
              <ul className="flex gap-x-2">
                <li>
                  <Button
                    onClick={() => setCurrentView("general")}
                    aspect={currentView === "general" ? "contained" : "text"}
                    size="medium"
                  >
                    General
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => setCurrentView("favourites")}
                    aspect={currentView === "favourites" ? "contained" : "text"}
                    size="medium"
                  >
                    Favoritos
                  </Button>
                </li>
              </ul>
            </section>
          )}
          {currentView === "general" && (
            <div className="px-2 flex flex-col gap-y-2">
              {lectures.status === "loading"
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
                  <div className="flex justify-center mt-2">
                    <div className="py-3 px-5 rounded-xl text-white bg-primary-40 dark:text-primary-20 dark:bg-primary-80">
                      <h1 className="font-bold text-base md:text-2xl">
                        ¡Felicidades, hoy no hay clases &#x1F389;!
                      </h1>
                    </div>
                  </div>
                )}
            </div>
          )}
          {currentView === "favourites" && (
            <div className="px-2 flex flex-col gap-y-2">
              {favLectures.status === "loading"
                ? Array(6).fill(null).map((_, i) => <CardSkeleton key={i} />)
                : favLectures.status == "success" &&
                    favLectures.data.length != 0
                ? favLectures.data.map((lecture, i) => (
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
                  <div className="flex justify-center mt-2">
                    <div className="py-3 px-5 rounded-xl text-white bg-primary-40 dark:text-primary-20 dark:bg-primary-80">
                      <h1 className="font-bold text-base md:text-2xl">
                        ¡Felicidades, hoy no hay clases &#x1F389;!
                      </h1>
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
