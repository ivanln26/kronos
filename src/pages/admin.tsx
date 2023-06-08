import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import ScheduleAdmin from "@/components/ScheduleAdmin";
import LectureAdmin from "@/components/LectureAdmin";
import { trpc } from "@/utils/trpc";

type ItemId = "lecture" | "schedule";

export default function Admin() {
  const { data: session } = useSession();

  const schedules = trpc.schedules.getAll.useQuery();
  const lectures = trpc.lecture.getAll.useQuery();

  const [current, setCurrent] = useState<ItemId>("schedule");
  const [id, setId] = useState<string>("");

  return (
    <>
      {session && session.user.role === "admin"
        ? (
          <>
            <Navbar />
            <main className="flex flex-col md:flex-row">
              <section className="px-2 py-1 md:basis-1/4">
                <ul className="flex flex-col items-center px-2 py-4 gap-y-2 rounded-xl bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
                  <li className="flex gap-x-2">
                    <Button
                      onClick={() => setCurrent("schedule")}
                      size="medium"
                    >
                      Horarios
                    </Button>
                    <button
                      className="w-8 font-bold rounded bg-green-500 text-white dark:bg-green-300 dark:text-green-900"
                      onClick={() => {
                        setCurrent("schedule");
                        setId("");
                      }}
                    >
                      +
                    </button>
                  </li>
                  {current === "schedule" && schedules.data &&
                    schedules.data.map((schedule) => (
                      <li key={Number(schedule.id)}>
                        <button
                          onClick={() =>
                            setId(schedule.id.toString())}
                        >
                          {schedule.startTime} - {schedule.endTime} |{" "}
                          {schedule.course.name}{" "}
                          {schedule.type[0].toUpperCase()}
                        </button>
                      </li>
                    ))}
                  <hr className="w-full h-px my-1 border-0 bg-neutral-950 dark:bg-neutral-600" />
                  <li className="flex gap-x-2">
                    <Button onClick={() => setCurrent("lecture")} size="medium">
                      Lecciones
                    </Button>
                    <button
                      className="w-8 font-bold rounded bg-green-500 text-white dark:bg-green-300 dark:text-green-900"
                      onClick={() => {
                        setCurrent("lecture");
                        setId("");
                      }}
                    >
                      +
                    </button>
                  </li>
                  {current === "lecture" && lectures.data &&
                    lectures.data.map((lecture) => (
                      <li key={Number(lecture.id)}>
                        <button onClick={() => setId(lecture.id.toString())}>
                          {lecture.schedule.course.name}{" "}
                          {lecture.schedule.type[0].toUpperCase()} -{" "}
                          {lecture.date.toISOString().split("T")[0]}
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
              <section className="px-2 py-1 grow">
                <div className="flex flex-col px-2 py-4 rounded-xl bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
                  {current === "schedule" && <ScheduleAdmin id={id} />}
                  {current === "lecture" && <LectureAdmin id={id} />}
                </div>
              </section>
            </main>
          </>
        )
        : (
          <div className="flex flex-col justify-center gap-y-10 h-screen text-center">
            <h1 className="font-bold">Error</h1>
            <h2>
              No has iniciado sesión, asegurate de tener permisos de
              administrador.
            </h2>
            <div>
              <Button onClick={() => signIn()} size="medium">
                Iniciar Sesión
              </Button>
            </div>
          </div>
        )}
    </>
  );
}
