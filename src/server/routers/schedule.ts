import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";
import { modalities, scheduleTypes, weekdays } from "../types";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Cordoba",
  hour: "numeric",
  minute: "numeric",
});

const scheduleInput = z.object({
  courseId: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
  classroomId: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
  professorId: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
  weekday: weekdays,
  modality: modalities,
  type: scheduleTypes,
  startTime: z.string(),
  endTime: z.string(),
});

const editScheduleInput = scheduleInput.merge(z.object({
  id: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
}));

export type ScheduleInput = z.infer<typeof editScheduleInput>;

function formatDate(date: Date) {
  return formatting.format(date);
}

export const scheduleRouter = router({
  getAll: procedure.query(async () => {
    const schedules = await prisma.schedule.findMany(
      {
        include: {
          course: true,
        },
      },
    );
    return schedules.map((schedule) => {
      return {
        id: schedule.id,
        startTime: formatDate(schedule.startTime),
        endTime: formatDate(schedule.endTime),
        course: schedule.course,
        type: schedule.type,
      };
    });
  }),
  get: procedure.input(
    z.object({
      id: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
    }),
  ).query(async ({ input }) => {
    const schedule = await prisma.schedule.findFirst({
      where: { id: input.id },
    });

    if (schedule === null) return null;

    return {
      id: schedule.id,
      startTime: formatDate(schedule.startTime),
      endTime: formatDate(schedule.endTime),
      courseId: schedule.courseId,
      classroomId: schedule.classroomId,
      professorId: schedule.professorId,
      type: schedule.type,
      weekday: schedule.weekday,
      modality: schedule.modality,
    };
  }),
  create: procedure.input(scheduleInput).mutation(async ({ input }) => {
    const result = await prisma.schedule.create({
      data: {
        courseId: input.courseId,
        classroomId: input.classroomId,
        professorId: input.professorId,
        weekday: input.weekday,
        modality: input.modality,
        type: input.type,
        startTime: new Date(`1970-01-01T${input.startTime}`),
        endTime: new Date(`1970-01-01T${input.endTime}`),
      },
    });
    return result;
  }),
  update: procedure.input(editScheduleInput).mutation(async ({ input }) => {
    const result = await prisma.schedule.update({
      where: { id: input.id },
      data: {
        courseId: input.courseId,
        classroomId: input.classroomId,
        professorId: input.professorId,
        weekday: input.weekday,
        modality: input.modality,
        type: input.type,
        startTime: new Date(`1970-01-01T${input.startTime}`),
        endTime: new Date(`1970-01-01T${input.endTime}`),
      },
    });
    return result;
  }),
  delete: procedure.input(
    z.object({
      id: z.string().regex(/[0-9]*/).transform((val) => BigInt(val)),
    }),
  ).mutation(async ({ input }) => {
    const result = await prisma.schedule.delete({
      where: {
        id: input.id,
      },
    });
    return result;
  }),
});
