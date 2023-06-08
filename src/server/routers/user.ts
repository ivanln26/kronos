import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const userRouter = router({
  getTeachers: procedure.query(async () => {
    const teachers = await prisma.user.findMany({
      where: {
        role: "professor",
      },
    });

    return teachers.map((teacher) => {
      return {
        id: teacher.id,
        name: teacher.name,
        lastname: teacher.lastName,
        email: teacher.email,
        ucc: teacher.ucc,
      };
    });
  }),
  suscribe: procedure.input(z.object({
    studentId: z.number().int(),
    courseId: z.number().int(),
  })).mutation(async ({ input }) => {
    await prisma.enrollment.create({
      data: {
        studentId: input.studentId,
        courseId: input.courseId,
      },
    });
  }),
  unsuscribe: procedure.input(z.object({
    studentId: z.number().int(),
    courseId: z.number().int(),
  })).mutation(async ({ input }) => {
    await prisma.enrollment.deleteMany({
      where: {
        studentId: input.studentId,
        courseId: input.courseId,
      },
    });
  }),
});
