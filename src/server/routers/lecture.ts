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
  get: procedure.input(
    z.string().regex(/[0-9]*/).transform((val) => Number(val)),
  ).query(async ({ input }) => {
    const lecture = await prisma.lecture.findUnique({
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
        id: input,
      },
    });

    if (lecture == null) {
      return null;
    }

    return {
      id: lecture.id,
      classroom: lecture.schedules.classroom.name,
      teacher:
        `${lecture.schedules.user.lastName.toUpperCase()}, ${lecture.schedules.user.name}`,
      course: lecture.schedules.course.name,
      state: lecture.state,
      startDate: formatDate(lecture.schedules.startTime),
      endDate: formatDate(lecture.schedules.endTime),
    };
  }),
  getAll: procedure.query(async () => {
    const lectures = await prisma.lecture.findMany({});
    return lectures.map((lecture) => {
      return {
        id: lecture.id,
        date: lecture.date,
        schedule: lecture.scheduleId,
      };
    });
  }),
  getByDay: procedure.input(z.object({
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
        id: l.id,
        classroom: l.schedules.classroom.name,
        teacher:
          `${l.schedules.user.lastName.toUpperCase()}, ${l.schedules.user.name}`,
        course: l.schedules.course.name,
        state: l.state,
        startDate: formatDate(l.schedules.startTime),
        endDate: formatDate(l.schedules.endTime),
      };
    });
  }),
});
