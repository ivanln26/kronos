import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const userRouter = router({
  getTeachers: procedure.query(async () => {
    const teachers = await prisma.user.findMany({
        where: {
            role: "professor"
        }
    })

    return teachers.map((teacher) => {
      return {
        id: teacher.id,
        name: teacher.name,
        lastname: teacher.lastName,
        email: teacher.email,
        ucc: teacher.ucc
      };
    });
  }),
})