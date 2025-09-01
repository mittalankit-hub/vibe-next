"use client"

import { useMutation, useQueries, useQuery } from "@tanstack/react-query"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { json } from "node:stream/consumers"



const Page =  ()=>{

  const [value,setValue] = useState("")
  const trpc = useTRPC()
  const {data: messages} = useQuery(trpc.messages.getMany.queryOptions())
  const createdMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () =>{
      toast.success("Message Created")
    },
    onError: () =>{
      console.log("error while creating a message")
    }
  }))


  return(
    <>
     <Input value={value} onChange={(e)=>setValue(e.target.value)}/>
     <Button disabled={createdMessage.isPending} onClick={()=> createdMessage.mutate({value:value})}>
          Invoke Background Job
     </Button>
     {JSON.stringify(messages,null,2)}
     </>
  )
}

export default Page