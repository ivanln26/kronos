import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import { prisma } from "./db";

type InnerContextOptions = {
  session: Session | null;
};

export async function createInnerContext(opts: InnerContextOptions) {
  return {
    prisma,
    session: opts.session,
  };
}

export async function createContext(opts: CreateNextContextOptions) {
  const { res, req } = opts;
  const session = await getSession({ req });
  const contextInner = await createInnerContext({ session });
  return {
    ...contextInner,
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
