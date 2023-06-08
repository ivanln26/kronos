import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Alert from "@/components/Alert";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { trpc } from "@/utils/trpc";

const LectureDetail = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("")

  const { data: session } = useSession();

  const ctx = trpc.useContext();

  const { status, data, error } = trpc.lecture.get.useQuery(id, {
    enabled: !!id,
  });

  const mutation = trpc.lecture.updateState.useMutation({
    onSuccess: () => {
      ctx.lecture.get.invalidate();
      dispatchAlert("¡El estado de la clase se cambio exitosamente!");
    },
  });

  const suscribeMutation = trpc.users.suscribe.useMutation({
    onSuccess: () => {
      dispatchAlert("Te has suscrito a la materia.");
    }
  });
  const unsuscribeMutation = trpc.users.unsuscribe.useMutation({
    onSuccess: () => {
      dispatchAlert("Te has desuscribido a la materia.")
    }
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  const dispatchAlert = (text:string) => {
    setShowAlert(true);
    setAlertText(text)
  }

  const professorItems: DropdownItem[] = [
    {
      name: "Iniciar",
      fn: () => {
        mutation.mutate({ id, state: "ongoing" });
      },
    },
    {
      name: "Cancelar",
      fn: () => {
        mutation.mutate({ id, state: "cancelled" });
      },
    },
    {
      name: "Notificar retraso",
      fn: () => {
        mutation.mutate({ id, state: "delayed" });
      },
    },
  ];

  const studentItems: DropdownItem[] = [
    {
      name: "Seguir",
      fn: () => {
        if (session !== null && data) {
          suscribeMutation.mutate({
            studentId: Number(session.user.id),
            courseId: Number(data.courseId),
          });
        }
      },
    },
    {
      name: "Dejar de Seguir",
      fn: () => {
        if (session !== null && data) {
          unsuscribeMutation.mutate({
            studentId: Number(session.user.id),
            courseId: Number(data.courseId),
          });
        }
      },
    },
  ];

  return (
    <>
      <Navbar />
      <Alert showAlert={showAlert} setShowAlert={setShowAlert} text={alertText}></Alert>
      <main className="flex px-2">
        <section className="prose lg:prose-2xl dark:prose-invert min-w-full px-2 py-6 rounded-xl bg-gradient-to-r bg-primary-99 from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
          {status === "loading"
            ? (
              <div className="flex justify-center py-4">
                <Spinner width="42" height="42" />
              </div>
            )
            : status == "error"
            ? <h1>Status: {error.message}</h1>
            : data && (
              <>
                <div className="flex justify-between mb-6">
                  <div className="px-2">
                    <Link href={"/"}>
                      <svg
                        className="w-4 h-4 md:w-8 md:h-8"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" />
                      </svg>
                    </Link>
                  </div>
                  {session !== null && (
                    <div>
                      {session.user.role === "professor" &&
                        session?.user.id === data.teacherId.toString() && (
                        <Dropdown items={professorItems} />
                      )}
                      {session.user.role === "student" && (
                        <Dropdown items={studentItems} />
                      )}
                    </div>
                  )}
                </div>
                <h1 className="self-center">{data.course}</h1>
                <h3>{data.classroom}</h3>
                <h3>Docente: {data.teacher}</h3>
                <h3>Horario: {data.startDate} - {data.endDate}</h3>
                <h3>Estado: {data.state}</h3>
              </>
            )}
        </section>
      </main>
    </>
  );
};

export default LectureDetail;
