"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


interface Props{
    projectId: string
}


const MessageContainer = ({projectId}:Props)=>{
    const trpc = useTRPC()
    const {data: messages}=useSuspenseQuery(trpc.messages.getMany.queryOptions({projectId}))

    return(
        <div>
            {JSON.stringify(messages)}
        </div>
    )
}
export default MessageContainer