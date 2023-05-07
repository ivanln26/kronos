import type { Schedule } from "@prisma/client";
import { useState } from "react";

import { trpc } from "@/utils/trpc";

const ScheduleAdmin = () => {
  type StringSchedule = {
    [k in keyof Schedule]: string;
  };

  const { data: schedules } = trpc.schedules.get.useQuery();
  const create = trpc.schedules.create.useMutation();
  const update = trpc.schedules.update.useMutation();
  const [formData, setFormData] = useState<StringSchedule>({
    id: "",
    courseId: "",
    classroomId: "",
    professorId: "",
    weekday: "",
    modality: "",
    type: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = formData as any; 
    if (formData.id === "") {
      create.mutate(data);
    } else {
      update.mutate(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="hidden"
          onChange={() => {}}
          value={formData.id}
          type="text"
        />
        <label>Dia de semana:</label>
        <select
          className="text-black"
          onChange={(e) =>
            setFormData((prev) => {
              return { ...prev, weekday: e.target.value };
            })}
          value={formData.weekday}
        >
          <option value="monday">Lunes</option>
          <option value="tuesday">Martes</option>
          <option value="wednesday">Miercoles</option>
          <option value="thursday">Jueves</option>
          <option value="friday">Viernes</option>
        </select>
        <select
          className="text-black"
          onChange={(e) =>
            setFormData((prev) => {
              return { ...prev, modality: e.target.value };
            })}
          value={formData.modality}
        >
          <option value="f2f">Presencial</option>
          <option value="virtual">Virtual</option>
          <option value="hybrid">Hibrido</option>
        </select>
        <button type="submit">{formData.id === "" ? "Crear" : "Actualizar"}</button>
      </form>

      <ul>
        {schedules &&
          schedules.map((schedule, i) => (
            <li key={i}>
              <button
                onClick={() =>
                  setFormData({
                    id: schedule.id.toString(),
                    courseId: schedule.courseId.toString(),
                    classroomId: schedule.classroomId.toString(),
                    professorId: schedule.professorId.toString(),
                    weekday: schedule.weekday,
                    modality: schedule.modality,
                    type: schedule.type,
                    startTime: schedule.startTime.toString(),
                    endTime: schedule.endTime.toString(),
                  })}
              >
                {Number(schedule.id)}
              </button>
              {schedule.weekday}
              {schedule.modality}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ScheduleAdmin;
