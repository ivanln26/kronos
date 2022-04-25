import type { NextPage } from "next";

import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const list = [
    {
      classroom: "Aula 01",
      course: "Materia",
      schedule: "14:00 a 18:00",
      teacher: "Docente",
    },
    {
      classroom: "Aula 01",
      course: "Materia",
      schedule: "14:00 a 18:00",
      teacher: "Docente",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center px-2">
        <div className="flex flex-col basis-full gap-y-2">
          {list.map((l, i) => <Card key={i} {...l} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
