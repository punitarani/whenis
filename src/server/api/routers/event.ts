import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";

export const eventRouter = createTRPCRouter({
  test: publicProcedure.query(() => {
    return true;
  }),

  code: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const event = await db.events.findFirst({
        where: { code: { equals: input.code, mode: "insensitive" } },
        select: { event: true, code: true, date: true },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      return event;
    }),
});
