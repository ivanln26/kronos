import { ZodDate, z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";
import { lectureState, weekdays } from "../types";
import type { LectureState } from "../types";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Cordoba",
  hour: "numeric",
  minute: "numeric",
});

function formatDate(date: Date) {
  return formatting.format(date);
}

function mapState(state: LectureState): string {
  switch (state) {
    case "scheduled":
      return "Programada";
    case "ongoing":
      return "En Curso";
    case "cancelled":
      return "Cancelada";
    case "delayed":
      return "Atrasada";
  }
}

const lectureInput = z.object({
  scheduleId: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
  state: z.enum(['scheduled', 'ongoing', 'cancelled', 'delayed']),
  date: z.string(),
});

const editLectureInput = lectureInput.merge(z.object({
  id: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
}));

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
      scheduleId: lecture.scheduleId,
      classroom: lecture.schedules.classroom.name,
      teacher:
        `${lecture.schedules.user.lastName.toUpperCase()}, ${lecture.schedules.user.name}`,
      teacherId: lecture.schedules.user.id,
      course: lecture.schedules.course.name,
      state: mapState(lecture.state),
      date: lecture.date,
      startDate: formatDate(lecture.schedules.startTime),
      endDate: formatDate(lecture.schedules.endTime),
    };
  }),
  getAll: procedure.query(async () => {
    const lectures = await prisma.lecture.findMany({
      include:{
        schedules: {
          include: {
            course: true
          }
        }
      }
    });
    return lectures.map((lecture) => {
      return {
        id: lecture.id,
        date: lecture.date,
        schedule: lecture.schedules,
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
      orderBy: {
        schedules: {
          startTime: "asc"
        }
      }
    });

    return lectures.map((l) => {
      return {
        id: l.id,
        classroom: l.schedules.classroom.name,
        teacher:
          `${l.schedules.user.lastName.toUpperCase()}, ${l.schedules.user.name}`,
        course: l.schedules.course.name,
        state: mapState(l.state),
        startDate: formatDate(l.schedules.startTime),
        endDate: formatDate(l.schedules.endTime),
      };
    });
  }),
  updateState: procedure.input(z.object({
    id: z.string().regex(/[0-9]*/).transform((val) => Number(val)),
    state: lectureState,
  })).mutation(async ({ input }) => {
    await prisma.lecture.update({
      where: { id: input.id },
      data: { state: input.state },
    });
  }),
  create: procedure.input(lectureInput).mutation(async ({ input }) => {
    const result = await prisma.lecture.create({
      data: {
        scheduleId: input.scheduleId,
        date: new Date(input.date),
        state: input.state
      }
    });
    return result;
  }),

  update: procedure.input(editLectureInput).mutation(async ({ input }) => {
    const result = await prisma.lecture.update({
      where: { id: input.id },
      data: {
        scheduleId: input.scheduleId,
        date: new Date(input.date),
        state: input.state
      }
    });
    return result;
  }),

  delete: procedure.input(z.object({ id: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)) })).mutation(async ({input}) => {
    const result = await prisma.lecture.delete({
      where:{id: input.id}
    })
  })
});
