import { z } from "zod";

export const uccEmail = z.string().regex(/[0-9]{7}@ucc.edu.ar/);

export const user = z.object({
  name: z.string().max(120),
  lastName: z.string().max(120),
  email: uccEmail,
  role: z.enum(["admin", "student", "professor"]),
}).transform(({ email, ...fields }) => {
  const ucc = email.split("@")[0];
  return {
    ...fields,
    ucc,
    email,
  };
});

export type User = z.infer<typeof user>;

export const weekdays = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]);

export type Weekday = z.infer<typeof weekdays>;

export const lectureState = z.enum([
  "scheduled",
  "ongoing",
  "cancelled",
  "delayed",
]);

export type LectureState = z.infer<typeof lectureState>;
