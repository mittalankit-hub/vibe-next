
import ProjectsView from "@/modules/projects/ui/views/projects-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query"
import { Suspense } from "react"

    interface Props{
        params: Promise<{
            projectId: string,
        }>
    }

    const Page = async({params}:Props)=>{
        const {projectId} = await params
        const queryClient = getQueryClient()
        void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({projectId:projectId}))
        void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({id:projectId}))

        return(
            <HydrationBoundary state={dehydrate(queryClient)}>
            
                <ProjectsView projectId={projectId}/>
            
        </HydrationBoundary>
        )
    }   

    export default Page