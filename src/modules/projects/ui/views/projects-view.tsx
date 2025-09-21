"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import MessageContainer from "../components/messages-container"
import { Suspense, useState } from "react"
import { Fragment } from "@/generated/prisma"
import { ProjectHeader } from "../components/project-header"


interface Props{
    projectId: string
}


const ProjectsView = ({projectId}:Props)=>{

   //const trpc = useTRPC()
   // const {data: project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({id: projectId}))

   const [activeFragment,setActiveFragment] =  useState<Fragment | null>(null)

    return(
     <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
                <Suspense>
                    <ProjectHeader projectId={projectId}/>
                </Suspense>
                
                <Suspense fallback={<p>Loading Messages... </p>}>
                    <MessageContainer projectId={projectId} activeFragment={activeFragment} setActiveFragment={setActiveFragment}/>
                </Suspense>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={65} minSize={20}  >
             TODO: Project screen
            </ResizablePanel>
        </ResizablePanelGroup>
        
        
     </div>
    )
}
export default ProjectsView