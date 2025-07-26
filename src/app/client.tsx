"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const Client = ()=>{

    const trpc = useTRPC()

    const {data} = useSuspenseQuery(trpc.hello.queryOptions({text:"Ankit"}))

    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: ()=>{
            toast.success("Background Job started")
        }
    }))
    
    return (
        <div>
            <div>{JSON.stringify(data)}</div>
            <Button disabled={invoke.isPending} onClick={()=> invoke.mutate({text:"Ankiit.mittal"})}>
                Invoke Background Job
            </Button>
        </div>
    )
}