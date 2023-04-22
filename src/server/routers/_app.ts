import { procedure, router } from "@/server/trpc";

import { lectureRouter } from "./lecture";

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      msg: "hello world",
    };
  }),
  lecture: lectureRouter,
});

export type AppRouter = typeof appRouter;
