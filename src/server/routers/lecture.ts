import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";
import { weekdays } from "../types";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "numeric",
});

function formatDate(date: Date) {
  return formatting.format(date);
}

export const lectureRouter = router({
  get: procedure.input(z.object({
    day: weekdays,
  })).query(async ({ input }) => {
    const { day } = input;
    const lectures = await prisma.lecture.findMany({
      include: {
        schedules: {
          include: {
            classroom: true,
            user: true,
            course: true,
          },
        },
      },
      where: {
        schedules: {
          weekday: day,
        },
      },
    });

    return lectures.map((l) => {
      return {
        classroom: l.schedules.classroom.name,
        teacher: l.schedules.user.name,
        course: l.schedules.course.name,
        startDate: formatDate(l.schedules.startTime),
        endDate: formatDate(l.schedules.endTime),
      };
    });
  }),
});
