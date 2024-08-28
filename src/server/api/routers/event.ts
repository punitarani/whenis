import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import type { SearchResult } from "@/types";

export const eventRouter = createTRPCRouter({
  test: publicProcedure.query(() => {
    return true;
  }),

  code: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const event = await db.events.findFirst({
        where: { code: { equals: input.code, mode: "insensitive" } },
        select: { event: true, code: true, date: true, local: true },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      return event;
    }),

  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const searchResults: SearchResult[] = await db.$queryRaw<SearchResult[]>`
        SELECT 
          event, code, date, local,
          ts_rank(event_tsv, to_tsquery('english', ${input.query})) AS rank,
          similarity(event, ${input.query}) AS similarity
        FROM events
        WHERE 
          event_tsv @@ to_tsquery('english', ${input.query}) OR
          event % ${input.query}
        ORDER BY rank DESC, similarity DESC
        LIMIT 10
      `;

      if (searchResults.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No events matched your search criteria",
        });
      }

      return searchResults;
    }),
});
