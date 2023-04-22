import type { NextPage } from "next";
import { useEffect, useState } from "react";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Week from "@/components/Week";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
  const lectures = trpc.lecture.get.useQuery({ day: "L" });

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

  const updateDays = (i: number) => {
    let days = [...initialDays];
    days[i].active = true;
    setDays(days);
  };

  return (
    <>
      <Navbar />
      <Week days={days} setDays={updateDays} />
      <div className="flex justify-center px-2">
        <div className="flex flex-col basis-full gap-y-2">
          {!lectures.isLoading && !lectures.isError &&
            lectures.data.map((lecture, i) => <Card key={i} {...lecture} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
