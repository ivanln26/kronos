import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const enrollmentRouter = router({
  get: procedure.query(async () => {
    const enrollments = await prisma.enrollment.findMany({});

    return enrollments.map((enrollment) => {
      return {
        id: enrollment.id,
        course: enrollment.courseId,
        student: enrollment.studentId,
      };
    });
  }),
})