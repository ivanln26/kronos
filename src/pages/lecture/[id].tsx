import { useRouter } from "next/router";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LectureDetail = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { data: session } = useSession();

  const ctx = trpc.useContext();

  const { status, data, error } = trpc.lecture.get.useQuery(id, {
    enabled: !!id,
  });
  const mutation = trpc.lecture.updateState.useMutation({
    onSuccess: () => {
      ctx.lecture.get.invalidate();
      setShowAlert(true);
    },
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  const items: DropdownItem[] = [
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

  return (
    <>
      <Navbar />
      <div
        id="alert-1"
        className={"flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 mt-2 mx-3" +
          (showAlert ? " visible" : " hidden")}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          ¡El estado de la clase se cambio exitosamente!
        </div>
        <button
          onClick={() => setShowAlert(false)}
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          data-dismiss-target="#alert-1"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            >
            </path>
          </svg>
        </button>
      </div>
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
                  {session?.user.role === "professor" &&
                    session?.user.id === data.teacherId.toString() && (
                    <div>
                      <Dropdown items={items} />
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
