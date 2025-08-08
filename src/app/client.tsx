"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export const Client = ()=>{

    const trpc = useTRPC()
    const [value,setValue] = useState("")
    const {data} = useSuspenseQuery(trpc.hello.queryOptions({text:"Ankit"}))

    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: ()=>{
            toast.success("Background Job started")
        }
    }))
    
    return (
        <div>
            <Input value={value} onChange={(e)=>setValue(e.target.value)}/>
            <div>{JSON.stringify(data)}</div>
            <Button disabled={invoke.isPending} onClick={()=> invoke.mutate({value:value})}>
                Invoke Background Job
            </Button>
        </div>
    )
}