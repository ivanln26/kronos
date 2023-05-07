import { prisma } from "../db";
import { procedure, router } from "../trpc";

export const attendanceRouter = router({
  get: procedure.query(async () => {
    const attendances = await prisma.attendance.findMany({});

    return attendances.map((attendance) => {
      return {
        id: attendance.id,
        isPresent: attendance.isPresent,
        lecture: attendance.lectureId,
        student: attendance.studentId,
      };
    });
  }),
});
