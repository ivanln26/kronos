import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const courseRouter = router({
  get: procedure.query(async () => {
    const courses = await prisma.course.findMany({});

    return courses.map((course) => {
      return {
        id: course.id,
        name: course.name,
        startDate: course.startDate,
        endDate: course.endDate,
      };
    });
  }),
});
