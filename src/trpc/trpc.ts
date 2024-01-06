import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create();

export const router = t.router;
// public end-point
export const publicProcedure = t.procedure;
