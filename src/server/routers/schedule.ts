import { z } from "zod";

import { prisma } from "../db";
import { procedure, router } from "../trpc";
import { modalities, scheduleTypes, weekdays } from "../types";

const formatting = new Intl.DateTimeFormat("es-AR", {
  timeZone: "UTC",
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
  get: procedure.query(async () => {
    return await prisma.schedule.findMany();
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
});
