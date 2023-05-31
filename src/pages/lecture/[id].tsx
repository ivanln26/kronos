import type { NextPage } from "next";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

type LectureDetailProps = {};

const LectureDetail: NextPage<LectureDetailProps> = ({}) => {
  const { query } = useRouter();
  const id = query.id as string;

  const { data: session } = useSession();

  const ctx = trpc.useContext();

  const { status, data, error } = trpc.lecture.get.useQuery(id, {
    enabled: !!id,
  });
  const mutation = trpc.lecture.updateState.useMutation({
    onSuccess: () => {
      ctx.lecture.get.invalidate();
    },
  });

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
      <main className="flex justify-center px-2">
        {status === "loading"
          ? (
            <div className="flex justify-center py-4">
              <Spinner width="42" height="42" />
            </div>
          )
          : status == "error"
          ? <h1>Status: {error.message}</h1>
          : data && (
            <section className="prose lg:prose-2xl dark:prose-invert min-w-full px-2 py-6 my-4 rounded bg-gradient-to-r bg-primary-99 from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
              {session?.user.role === "professor" && (
                <div className="flex justify-end">
                  <Dropdown items={items} />
                </div>
              )}
              <h1>{data.course}</h1>
              <h3>{data.classroom}</h3>
              <h3>Docente: {data.teacher}</h3>
              <h3>Horario: {data.startDate} - {data.endDate}</h3>
              <h3>Estado: {data.state}</h3>
            </section>
          )}
      </main>
    </>
  );
};

export default LectureDetail;
