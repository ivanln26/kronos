import type { NextPage } from "next";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";

type LectureDetailProps = {};

const LectureDetail: NextPage<LectureDetailProps> = ({}) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Navbar />
      <h1>Hello World {id}!</h1>
    </>
  );
};

export default LectureDetail;
