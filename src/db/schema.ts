import { InferModel } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  mysqlEnum,
  mysqlTable,
  serial,
  time,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  ucc: varchar("ucc", { length: 8 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  lastName: varchar("last_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["admin", "student", "profesor"]).notNull(),
}, (users) => ({
  uccIndex: uniqueIndex("ucc_idx").on(users.ucc),
}));

export type User = InferModel<typeof users>;

export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});

export type Course = InferModel<typeof courses>;

export const classrooms = mysqlTable("classroom", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 40 }).notNull(),
}, (classrooms) => ({
  nameIndex: uniqueIndex("classroom_name_idx").on(classrooms.name),
}));

export type Classroom = InferModel<typeof classrooms>;

export const schedules = mysqlTable("schedules", {
  id: serial("id").primaryKey(),
  courseId: bigint("course_id", { mode: "number" }).notNull().references(() =>
    courses.id
  ),
  classroomId: bigint("classroom_id", { mode: "number" }).notNull().references(
    () => classrooms.id,
  ),
  professorId: bigint("professor_id", { mode: "number" }).notNull().references(
    () => users.id,
  ),
  weekday: mysqlEnum("weekday", [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]).notNull(),
  modality: mysqlEnum("modality", ["f2f", "virtual", "hybrid"]).notNull()
    .default("f2f"),
  type: mysqlEnum("type", ["theoretical", "practical", "laboratory"]).notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export type Schedule = InferModel<typeof schedules>;

export const enrollments = mysqlTable("enrollments", {
  id: serial("id").primaryKey(),
  studentId: bigint("student_id", { mode: "number" }).notNull().references(() =>
    users.id
  ),
  courseId: bigint("course_id", { mode: "number" }).notNull().references(() =>
    courses.id
  ),
});

export type Enrollment = InferModel<typeof enrollments>;

export const lectures = mysqlTable("lectures", {
  id: serial("id").primaryKey(),
  scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(
    () => schedules.id,
  ),
  date: date("date").notNull(),
});

export type Lecture = InferModel<typeof lectures>;

export const attendances = mysqlTable("attendances", {
  id: serial("id").primaryKey(),
  studentId: bigint("student_id", { mode: "number" }).notNull().references(() =>
    users.id
  ),
  lectureId: bigint("lecture_id", { mode: "number" }).notNull().references(() =>
    lectures.id
  ),
  isPresent: boolean("is_present"),
});

export type Attendance = InferModel<typeof attendances>;
