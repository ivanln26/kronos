import { procedure, router } from "@/server/trpc";

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      msg: "hello world",
    };
  }),
});

export type AppRouter = typeof appRouter;
