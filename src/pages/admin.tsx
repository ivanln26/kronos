import { useState, useEffect } from "react";

import { type Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import ScheduleAdmin from "@/components/ScheduleAdmin";

import { trpc } from "@/utils/trpc";
import LectureAdmin from "@/components/LectureAdmin";

const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: undefined, hour12: false };

export default function Admin() {
  const { data: session } = useSession();

  type currentType = {
    id: string,
    model: string
  };
  const schedules = trpc.schedules.getAll.useQuery();
  const lectures = trpc.lecture.getAll.useQuery();

  const [sideBar, setSideBar] = useState<[boolean, boolean]>([false, false]);

  const [current, setCurrent] = useState<currentType>({ id: "", model: "" });

  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false)

  useEffect(() => {
    schedules.refetch()
    lectures.refetch()
    setTriggerRefetch(false)
  }, [triggerRefetch])

  console.log()

  return (
    <>
      {session && new Date(session?.expires) > new Date() && session.user.role !== "admin" ?
        <>
          <Navbar />
          <main className="flex flex-col md:flex-row ">
            <section className="flex-none md:h-screen my-5 md:w-80 mx-5 md:mx-2 text-center rounded-xl font-black
                bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
              <ul>
                <li onClick={() => { setSideBar([!sideBar[0], sideBar[1]]) }}>Horarios</li>
                <hr className="mx-4" />
                {sideBar[0] &&
                  <>
                    <ul>
                      <li>
                        <button className="bg-primary"
                          onClick={() => { setCurrent({ id: "", model: "schedule" }) }}>
                          --- Nuevo horario ---
                        </button>
                      </li>
                      {schedules.data &&
                        schedules.data.map((schedule, i) => (
                          <li key={Number(schedule.id)}>
                            <button
                              className="bg-primary"
                              onClick={() => { setCurrent({ id: schedule.id.toString(), model: "schedule" }) }}>
                              {schedule.startTime} - {schedule.endTime} | {schedule.course.name} {schedule.type[0].toUpperCase()}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </>}
                <li onClick={() => { setSideBar([sideBar[0], !sideBar[1]]) }}>Lecciones</li>
                {
                  sideBar[1] &&
                  <>
                    <hr className="mx-4" />
                    <ul>
                      <li>
                        <button className="bg-primary"
                          onClick={() => { setCurrent({ id: "", model: "lecture" }) }}>
                          --- Nueva lección ---
                        </button>
                      </li>
                      {lectures.data &&
                        lectures.data.map((lecture, i) => (
                          <li key={Number(lecture.id)}>
                            <button
                              className="bg-primary"
                              onClick={() => { setCurrent({ id: lecture.id.toString(), model: "lecture" }) }}>
                              {lecture.schedule.course.name} {lecture.schedule.type[0].toUpperCase()} - {lecture.date.toISOString().split("T")[0]}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </>
                }
              </ul>

            </section>
            <section className="h-full flex flex-col md:w-screen bg-gray-500 mx-5 md:mx-2 my-5 rounded-xl
                    bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
              {current.model === "schedule" && <ScheduleAdmin id={current.id} setTriggerRefetch={setTriggerRefetch} />}
              {current.model === "lecture" && <LectureAdmin id={current.id} setTriggerRefetch={setTriggerRefetch} />}
            </section>
          </main>
        </>
        :
        <>
          <div className="flex flex-col w-screen justify-center text-center gap-10 h-screen align-items-center">

            <h1 className="font-bold">Error</h1>
            <h2>No has iniciado sesión, asegurate de tener permisos de administrador.</h2>
            <div>
              <button className="bg-blue-300 px-5 rounded py-2" onClick={() => { signIn() }}>login</button>
            </div>
          </div>
        </>}
    </>);
}
