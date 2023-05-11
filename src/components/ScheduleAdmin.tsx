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

  const { data: courses } = trpc.courses.get.useQuery();
  const { data: classrooms } = trpc.classrooms.get.useQuery();
  const { data: professors } = trpc.users.getTeachers.useQuery();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = formData as any;
    if (formData.id === "") {
      create.mutate(data);
    } else {
      update.mutate(data);
    }
  };

  const updateForm = <K extends keyof StringSchedule>(
    key: K,
    value: StringSchedule[K],
  ) => {
    setFormData((prev) => {
      prev[key] = value;
      return { ...prev, key: value };
    });
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
        <label>Curso:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("courseId", e.target.value)}
          value={formData.courseId}
        >
          <option value="">------</option>
          {courses &&
            courses.map((course, i) => (
              <option key={i} value={Number(course.id)}>{course.name}</option>
            ))}
        </select>
        <label>Aula:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("classroomId", e.target.value)}
          value={formData.classroomId}
        >
          <option value="">------</option>
          {classrooms &&
            classrooms.map((classroom, i) => (
              <option key={i} value={Number(classroom.id)}>
                {classroom.name}
              </option>
            ))}
        </select>
        <label>Profesor:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("professorId", e.target.value)}
          value={formData.professorId}
        >
          <option value="">------</option>
          {professors &&
            professors.map((professor, i) => (
              <option key={i} value={Number(professor.id)}>
                {professor.name}
              </option>
            ))}
        </select>
        <label>Dia de semana:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("weekday", e.target.value)}
          value={formData.weekday}
        >
          <option value="">------</option>
          <option value="monday">Lunes</option>
          <option value="tuesday">Martes</option>
          <option value="wednesday">Miercoles</option>
          <option value="thursday">Jueves</option>
          <option value="friday">Viernes</option>
        </select>
        <label>Modalidad:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("modality", e.target.value)}
          value={formData.modality}
        >
          <option value="">------</option>
          <option value="f2f">Presencial</option>
          <option value="virtual">Virtual</option>
          <option value="hybrid">Hibrido</option>
        </select>
        <label>Tipo:</label>
        <select
          className="text-black"
          onChange={(e) => updateForm("type", e.target.value)}
          value={formData.type}
        >
          <option value="">------</option>
          <option value="theoretical">Teorica</option>
          <option value="practical">Practica</option>
          <option value="laboratory">Laboratorio</option>
        </select>
        <label>Hora de inicio:</label>
        <input
          className="text-black"
          onChange={(e) => updateForm("startTime", e.target.value)}
          value={formData.startTime}
          pattern="\d{2}(\:\d{2})?"
        />
        <label>Hora de fin:</label>
        <input
          className="text-black"
          onChange={(e) => updateForm("endTime", e.target.value)}
          value={formData.endTime}
        />
        <button type="submit">
          {formData.id === "" ? "Crear" : "Actualizar"}
        </button>
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
