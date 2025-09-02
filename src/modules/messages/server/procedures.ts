import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const messageRouter = createTRPCRouter({

    getMany: baseProcedure
    .query(async()=>{
        const messages = await prisma.message.findMany({
            orderBy:{
                updatedAt:"desc"
            },
            // include:{
            //     fragment : true
            // }
        })
        return messages
    }),

    create: baseProcedure
    .input(z.object({
        value: z.string().min(1,{message:"Message is Required"}).max(10000,{message:"Message is too long"}),
        projectId: z.string().min(1,{message:"Project ID is required"})
    }),
    )
    .mutation(async ({input})=>{
      const newCreatedMessage =   prisma.message.create({
            data:{
                content: input.value,
                role: "USER",
                type: "RESULT",
                projectId: input.projectId
            }
        })
        await inngest.send({
            name: "code-agent/run",
            data: {
                value: input.value
            }
        })
        return newCreatedMessage
    })
})