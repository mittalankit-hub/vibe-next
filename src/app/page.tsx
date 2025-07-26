import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from "react"
import { Client } from "./client"



const Page = async ()=>{

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(trpc.hello.queryOptions({text:"Ankit"}))

  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      
        <Suspense fallback={<div>Loading ...</div>}>
          <ErrorBoundary fallback={<div>Error...</div>} >
          <Client/>
          </ErrorBoundary>
        </Suspense>
      
    </HydrationBoundary>
  )
}

export default Page