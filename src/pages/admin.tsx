import { useState } from "react";

import Navbar from "@/components/Navbar";
import ScheduleAdmin from "@/components/ScheduleAdmin";

export default function Admin() {
  type model = "schedule" | "lecture";

  const models: { name: model }[] = [
    { name: "schedule" },
    { name: "lecture" },
  ];

  const [current, setCurrent] = useState<model>("schedule");

  return (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row">
        <section className="h-min md:h-screen md:basis-1/5 bg-red-500">
          <ul>
            {models.map((model, i) => (
              <li key={i}>
                <button onClick={() => setCurrent(model.name)}>
                  {model.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="h-min md:h-screen md:basis-4/5 bg-blue-500">
          {current === "schedule" && <ScheduleAdmin />}
        </section>
      </main>
    </>
  );
}
