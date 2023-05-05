import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "numeric",
});

const editScheduleInput = z.object({
  id: z.bigint(),
  classroom: z.string(),
  teacher: z.string(),
  course: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

function formatDate(date: Date) {
  return formatting.format(date);
}

export const scheduleRouter = router({
  get: procedure.query(async () => {
    const schedules = await prisma.schedule.findMany({
      include: {
        classroom: true,
        user: true,
        course: true,
      },
    });

    return schedules.map((schedule) => {
      return {
        id: schedule.id,
        classroom: schedule.classroom.id,
        teacher:schedule.user.id,
        course: schedule.course.id,
        startDate: formatDate(schedule.startTime),
        endDate: formatDate(schedule.endTime),
      };
    });
  }),
  mutate: procedure.input(editScheduleInput).mutation(async ({input}) => {
    const startTime = new Date('1970-01-01T' + input.startDate+":00" + 'Z');
    const endTime = new Date('1970-01-01T' + input.endDate+":00" + 'Z');
    const result = prisma.schedule.update({
      where: {id: input.id},
      data: {startTime: startTime, endTime: endTime},
    })
    console.log(result)
    return result;
  },)
})