import type { NextPage } from "next";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import { trpc } from "@/utils/trpc";
import Spinner from "@/components/Spinner";

type LectureDetailProps = {};

const LectureDetail: NextPage<LectureDetailProps> = ({}) => {
  const { query } = useRouter();
  const id = query.id as string;

  const { status, data, error } = trpc.lecture.get.useQuery(id, {
    enabled: !!id,
  });

  return (
    <>
      <Navbar />
      <main className="flex justify-center px-2">
        {status === "loading"
          ? (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          )
          : status == "error"
          ? <h1>Status: {error.message}</h1>
          : data && (
            <section className="prose lg:prose-2xl dark:prose-invert min-w-full px-2 py-6 my-4 rounded bg-gradient-to-r bg-primary-99 from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
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
