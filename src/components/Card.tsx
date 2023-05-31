import type { NextPage } from "next";

type Props = {
  classroom: string;
  course: string;
  teacher: string;
  startDate: string;
  endDate: string;
  state: string;
};

// planificada: azul
// en curso: verde
// demorada: amarilla
// cancelada: rojo 

const stateColors = {
  "Programada": "dark:border-blue-600",
  "En Curso": "dark:border-green-600",
  "Cancelada": "dark:border-red-600",
  "Atrasada": "dark:border-yellow-600"
}

const Card: NextPage<Props> = (
  { classroom, course, teacher, startDate, endDate, state },
) => {

  const setStateColor = (state: string) => {
    for (let s in stateColors){
      if (s === state){
        console.log(Object.values(stateColors)[Object.keys(stateColors).indexOf(s)])
        return Object.values(stateColors)[Object.keys(stateColors).indexOf(s)]
      }
    }
  }

  return (
    <div className="flex h-20 select-none">
      <div className="flex basis-1/6 flex-col justify-center rounded-l-sm bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]">
        <h1 className="text-center">{startDate}</h1>
        <h1 className="text-center">-</h1>
        <h1 className="text-center">{endDate}</h1>
      </div>
      <div className={"flex grow flex-col justify-center rounded-r-xl px-2 border-l-8 border-blue-500 bg-primary-99 bg-gradient-to-r from-primary-40/[.05] to-primary-40/[.05] "+setStateColor(state)+" dark:bg-neutral-10 dark:from-primary-80/[.05] dark:to-primary-80/[.05]"}>  
        <h1>{course}</h1>
        <h1>{classroom}</h1>
        <h1>{teacher}</h1>
      </div>
    </div>
  );
};

export default Card;
