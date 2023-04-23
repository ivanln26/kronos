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
      {status === "loading"
        ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )
        : status == "error"
        ? <h1>Status: {error.message}</h1>
        : data && (
          <>
            <p>{data.classroom}</p>
            <p>{data.course}</p>
            <p>{data.teacher}</p>
            <p>{data.startDate} - {data.endDate}</p>
          </>
        )}
    </>
  );
};

export default LectureDetail;
