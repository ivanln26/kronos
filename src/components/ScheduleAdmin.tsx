import type { Schedule } from "@prisma/client";
import { useEffect, useState } from "react";

import { trpc } from "@/utils/trpc";

import AdminScheduleSelect from "./AdminScheduleSelect";
import AdminInput from "./AdminInput";
import Modal from "./Modal";

type ScheduleAdminProps = {
  id: string;
};

const ScheduleAdmin = ({ id }: ScheduleAdminProps) => {
  type StringSchedule = {
    [k in keyof Schedule]: string;
  };

  const [modalIsOpen, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const schedule = trpc.schedules.get.useQuery({ id: id.toString() }).data;

  const ctx = trpc.useContext();
  const create = trpc.schedules.create.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });
  const update = trpc.schedules.update.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });
  const remove = trpc.schedules.delete.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });

  useEffect(() => {
    if (id === "") {
      setFormData({
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
      return;
    }
    if (
      schedule !== undefined &&
      schedule !== null &&
      id !== ""
    ) {
      setFormData({
        id: schedule.id.toString(),
        courseId: schedule.courseId.toString(),
        classroomId: schedule.classroomId.toString(),
        professorId: schedule.professorId.toString(),
        weekday: schedule.weekday,
        modality: schedule.modality,
        type: schedule.type,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      });
    }
  }, [id, schedule]);

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

  const handleRemove = (e: any) => {
    remove.mutate({ id: id });
    setModalContent(
      <div className="flex flex-col justify-center m-4 gap-5">
        <h1 className="text-black">¡operación realizada con exito!</h1>
        <button
          className="bg-blue-300 rounded p-1 px-2"
          onClick={() => {
            setModal(false);
          }}
        >
          Cerrar
        </button>
      </div>,
    );
  };

  const handleModal = (e: any) => {
    e.preventDefault();
    console.log(e.type);
    if (!checkTime(formData.startTime) || !checkTime(formData.endTime)) {
      setModalContent(
        <>
          <div className="m-5">
            <h1 className="text-black">
              Los campos startTime y EndTime tienen que cumplir el formato HH:MM
            </h1>
            <div className="flex flex-row w-full mt-3 gap-10 justify-center">
              <button
                className="bg-red-500 rounded p-1 px-2"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>,
      );
      setModal(true);
      return;
    }
    if (e.type === "submit") { // boton 'crear' o 'actualizar'
      setModalContent(
        <>
          <div className="m-5">
            <h1 className="text-black">
              ¿Esta seguro que desea realizar esta operación?
            </h1>
            <div className="flex flex-row w-full mt-3 gap-10 justify-center">
              <button
                className="bg-red-500 rounded p-1 px-2"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-300 rounded p-1 px-2"
                onClick={() => {
                  handleSubmit(e);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </>,
      );
    } else if (e.type === "click") { // Se clickeo el boton 'borrar'
      setModalContent(
        <div className="m-5">
          <h1 className="text-black">
            ¿Esta seguro que desea realizar esta operación?
          </h1>
          <div className="flex flex-row w-full mt-3 gap-10 justify-center">
            <button
              className="bg-red-500 rounded p-1 px-2"
              onClick={() => {
                setModal(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-300 rounded p-1 px-2"
              onClick={() => {
                handleRemove(e);
              }}
            >
              Aceptar
            </button>
          </div>
        </div>,
      );
    }
    setModal(true);
  };

  const checkTime = (time: string) => {
    const timePattern = /^\d{2}(:\d{2})?$/i;
    return timePattern.test(time);
  };

  const handleSubmit = (e: any) => {
    const data = formData as any;
    if (formData.id === "") {
      create.mutate(data);
    } else {
      update.mutate(data);
    }
    setModalContent(
      <div className="flex flex-col justify-center m-4 gap-5">
        <h1 className="text-black">¡operación realizada con exito!</h1>
        <button
          className="bg-blue-300 rounded p-1 px-2"
          onClick={() => {
            setModal(false);
          }}
        >
          Cerrar
        </button>
      </div>,
    );
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
      <Modal isOpen={modalIsOpen} setModal={setModal}>
        {modalContent}
      </Modal>
      <form onSubmit={handleModal} className="flex flex-col">
        <AdminScheduleSelect
          name="Curso"
          formKey="courseId"
          value={formData.courseId}
          updateForm={updateForm}
        >
          {courses &&
            courses.map((course, i) => (
              <option key={i} value={Number(course.id)}>{course.name}</option>
            ))}
        </AdminScheduleSelect>
        <AdminScheduleSelect
          name="Aula"
          formKey="classroomId"
          value={formData.classroomId}
          updateForm={updateForm}
        >
          {classrooms &&
            classrooms.map((classroom, i) => (
              <option key={i} value={Number(classroom.id)}>
                {classroom.name}
              </option>
            ))}
        </AdminScheduleSelect>
        <AdminScheduleSelect
          name="Profesor"
          formKey="professorId"
          value={formData.professorId}
          updateForm={updateForm}
        >
          {professors &&
            professors.map((professor, i) => (
              <option key={i} value={Number(professor.id)}>
                {professor.name}
              </option>
            ))}
        </AdminScheduleSelect>
        <AdminScheduleSelect
          name="Dia de la semana"
          formKey={"weekday"}
          value={formData.weekday}
          updateForm={updateForm}
        >
          <option value="monday">Lunes</option>
          <option value="tuesday">Martes</option>
          <option value="wednesday">Miercoles</option>
          <option value="thursday">Jueves</option>
          <option value="friday">Viernes</option>
        </AdminScheduleSelect>
        <AdminScheduleSelect
          name={"Modalidad"}
          formKey="modality"
          value={formData.modality}
          updateForm={updateForm}
        >
          <option value="f2f">Presencial</option>
          <option value="virtual">Virtual</option>
          <option value="hybrid">Hibrido</option>
        </AdminScheduleSelect>
        <AdminScheduleSelect
          name="Tipo"
          formKey="type"
          value={formData.type}
          updateForm={updateForm}
        >
          <option value="theoretical">Teorica</option>
          <option value="practical">Practica</option>
          <option value="laboratory">Laboratorio</option>
        </AdminScheduleSelect>
        <AdminInput
          name="Hora de inicio"
          formKey={"startTime"}
          value={formData.startTime}
          updateForm={updateForm}
        />
        <AdminInput
          name="Hora de fin"
          formKey="endTime"
          value={formData.endTime}
          updateForm={updateForm}
        />
        <div className="flex flex-row justify-center md:justify-end md:mr-10 gap-2">
          {formData.id !== "" &&
            (
              <button
                className="bg-red-500 w-40 md:w-80 py-1 rounded my-2"
                type="button"
                onClick={(e) => {
                  handleModal(e);
                }}
              >
                Borrar
              </button>
            )}
          <button
            className="bg-blue-300 w-40 md:w-80 py-1 rounded my-2"
            type="submit"
          >
            {formData.id === "" ? "Crear" : "Actualizar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAdmin;
