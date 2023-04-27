import { procedure, router } from "@/server/trpc";

import { lectureRouter } from "./lecture";
import { scheduleRouter } from "./schedule";

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      msg: "hello world",
    };
  }),
  lecture: lectureRouter,
  schedules: scheduleRouter
});

export type AppRouter = typeof appRouter;
