import type { Lecture } from "@prisma/client";
import { useEffect, useState } from "react";

import { trpc } from "@/utils/trpc";

import AdminLectureSelect from "./AdminLectureSelect";
import Modal from "./Modal";

type LectureAdminProps = {
  id: string;
};

const LectureAdmin = ({ id }: LectureAdminProps) => {
  type StringLecture = {
    [k in keyof Lecture]: string;
  };

  const [modalIsOpen, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const lecture = trpc.lecture.get.useQuery(id.toString()).data;

  const ctx = trpc.useContext();
  const create = trpc.lecture.create.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });
  const update = trpc.lecture.update.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });
  const remove = trpc.lecture.delete.useMutation({
    onSuccess: () => {
      ctx.schedules.getAll.invalidate();
      ctx.lecture.getAll.invalidate();
    },
  });

  useEffect(() => {
    if (id === "") {
      setFormData({
        id: "",
        scheduleId: "",
        state: "",
        date: "",
      });
      return;
    }
    if (
      lecture !== undefined &&
      lecture !== null &&
      id !== ""
    ) {
      setFormData({
        id: lecture.id.toString(),
        scheduleId: lecture.scheduleId.toString(),
        state: lecture.state,
        date: lecture.date.toISOString().split("T")[0],
      });
    }
  }, [id, lecture]);

  const [formData, setFormData] = useState<StringLecture>({
    id: "",
    scheduleId: "",
    state: "",
    date: "",
  });

  const { data: schedules } = trpc.schedules.getAll.useQuery();

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

  const handleSubmit = async (e: any) => {
    const data = { ...formData } as any;
    data["state"] = mapState(data["state"]);
    let flag = false;

    Object.values(formData).forEach((value) => {
      if (value === "") {
        flag = true;
        return;
      }
    });
    if (flag) {
      setModalContent(
        <div className="flex flex-col justify-center m-4 gap-5">
          <h1 className="text-black">Operación fallida</h1>
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
    }
    if (formData.id === "") {
      const res = await create.mutate(data);
    } else {
      const res = await update.mutate(data); // res es undefined?
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

  const updateForm = <K extends keyof StringLecture>(
    key: K,
    value: StringLecture[K],
  ) => {
    setFormData((prev) => {
      prev[key] = value;
      return { ...prev, key: value };
    });
  };

  function mapState(state: string): string | undefined {
    switch (state) {
      case "Programada":
        return "scheduled";
      case "En Curso":
        return "ongoing";
      case "Cancelada":
        return "cancelled";
      case "Atrasada":
        return "delayed";
    }
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} setModal={setModal}>
        {modalContent}
      </Modal>
      <form onSubmit={handleModal} className="flex flex-col">
        <AdminLectureSelect
          name="Horario"
          formKey="scheduleId"
          value={formData.scheduleId}
          updateForm={updateForm}
        >
          {schedules &&
            schedules.map((schedule) => {
              return (
                <option
                  key={Number(schedule.id)}
                  value={schedule.id.toString()}
                >
                  {schedule.course.name} {schedule.type[0].toUpperCase()}
                </option>
              );
            })}
        </AdminLectureSelect>
        <AdminLectureSelect
          name="estado"
          formKey="state"
          value={formData.state}
          updateForm={updateForm}
        >
          <option value="Programada">Programada</option>
          <option value="En Curso">En curso</option>
          <option value="Cancelada">Cancelada</option>
          <option value="Atrasada">Atrasada</option>
        </AdminLectureSelect>
        <div className="flex flex-col justify-items-center mx-6 my-4">
          <label className="mr-2 block mx-5">Selecciona una fecha:</label>
          <input
            required
            type="date"
            name="date"
            onChange={(e) => {
              updateForm("date", e.target.value);
            }}
            value={formData.date}
            className="text-black border rounded p-1 mx-5"
          />
        </div>
        <div
          id=""
          className="flex flex-row justify-center md:justify-end md:mr-10 gap-2"
        >
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

export default LectureAdmin;
