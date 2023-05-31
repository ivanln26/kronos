import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const classroomRouter = router({
  get: procedure.query(async () => {
    const classrooms = await prisma.classroom.findMany({});

    return classrooms.map((classroom) => {
      return {
        id: classroom.id,
        name: classroom.name,
      };
    });
  }),
});
