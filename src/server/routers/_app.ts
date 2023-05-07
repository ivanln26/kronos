import { procedure, router } from "@/server/trpc";

import { lectureRouter } from "./lecture";
import { scheduleRouter } from "./schedule";
import { classroomRouter } from "./classroom";
import { userRouter } from "./user";
import { courseRouter } from "./course";
import { attendanceRouter } from "./attendance";
import { enrollmentRouter } from "./enrollment";

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      msg: "hello world",
    };
  }),
  lecture: lectureRouter,
  schedules: scheduleRouter,
  classrooms: classroomRouter,
  users: userRouter,
  courses: courseRouter,
  attendance: attendanceRouter,
  enrollment: enrollmentRouter,
});

export type AppRouter = typeof appRouter;
