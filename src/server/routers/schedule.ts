import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "numeric",
});

function formatDate(date: Date) {
  return formatting.format(date);
}

export const scheduleRouter = router({
  get: procedure.query(async () => {
    const schedules = await prisma.lecture.findMany({
      include: {
        schedules: {
          include: {
            classroom: true,
            user: true,
            course: true,
          },
        },
      },
    });

    return schedules.map((l) => {
      return {
        id: l.id,
        classroom: l.schedules.classroom.name,
        teacher:
          `${l.schedules.user.lastName.toUpperCase()}, ${l.schedules.user.name}`,
        course: l.schedules.course.name,
        startDate: formatDate(l.schedules.startTime),
        endDate: formatDate(l.schedules.endTime),
      };
    });
  }),
});
