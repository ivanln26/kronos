import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "./db";

export async function createInnerContext() {
  return {
    prisma,
  };
}

export async function createContext(opts: CreateNextContextOptions) {
  const contextInner = await createInnerContext();
  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
