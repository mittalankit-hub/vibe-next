import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
  invoke: baseProcedure.input(z.object({text:z.string()})).mutation(async (data)=>{
    await inngest.send({
      name:"test/hello.world",
      data:{
        email: data.input.text,
      }
    })
    return {ok:"success"}
  }),

  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;