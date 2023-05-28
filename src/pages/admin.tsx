import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import ScheduleAdmin from "@/components/ScheduleAdmin";

import { trpc } from "@/utils/trpc";
import LectureAdmin from "@/components/LectureAdmin";

const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: undefined, hour12: false };

export default function Admin() {
  type currentType = {
    id: string,
    model: string
  };
  const schedules = trpc.schedules.getAll.useQuery();
  const lectures = trpc.lecture.getAll.useQuery();

  const [sideBar, setSideBar] = useState<[boolean, boolean]>([false, false]);

  const [current, setCurrent] = useState<currentType>({ id: "", model: "" });

  const [triggerRefetch, setTriggerRefetch] = useState<boolean>(false)

  useEffect(()=>{
    schedules.refetch()
    setTriggerRefetch(false)
  }, [triggerRefetch])

  return (
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
                          {schedule.startTime.toLocaleTimeString(undefined, timeOptions)} - {schedule.endTime.toLocaleTimeString(undefined, timeOptions)} | {schedule.course.name}
                        </button>
                      </li>
                    ))}
                </ul>
                <hr className="mx-4" />
              </>}
            <li onClick={() => { setSideBar([sideBar[0], !sideBar[1]]) }}>Lecciones</li>
            {
              sideBar[1] &&
              <>
                <hr className="mx-4" />
                {lectures.data &&
                    lectures.data.map((lecture, i) => (
                      <li key={Number(lecture.id)}>
                        <button
                          className="bg-primary"
                          onClick={() => { setCurrent({ id: lecture.id.toString(), model: "lecture" }) }}>
                          {Number(lecture.schedule)} - {lecture.date.toLocaleDateString()}
                        </button>
                      </li>
                    ))}
              </>
            }
          </ul>

        </section>
        <section className="h-full flex flex-col md:w-screen bg-gray-500 mx-5 md:mx-2 my-5 rounded-xl
                    bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
          {current.model === "schedule" && <ScheduleAdmin id={current.id} setTriggerRefetch={setTriggerRefetch}  />}
          {current.model === "lecture" && <LectureAdmin id={current.id} setTriggerRefetch={setTriggerRefetch}  />}
        </section>
      </main>
    </>
  );
}
