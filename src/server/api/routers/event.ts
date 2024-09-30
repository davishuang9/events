import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db.event.create({
        data: {
          name: input.name,
          description: input.description,
          createdBy: {
            connect: { id: ctx.session.user.id },
          },
        },
      }),
    ),
  listEvents: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        direction: z.enum(["forward", "backward"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await ctx.db.event.findMany({
        take: limit + 1, // get an extra item to use as next cursor
        where: {
          createdById: {
            equals: ctx.session.user.id,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: string | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
