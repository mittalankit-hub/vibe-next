"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import MessageContainer from "../components/messages-container"
import { Suspense } from "react"


interface Props{
    projectId: string
}


const ProjectsView = ({projectId}:Props)=>{

   //const trpc = useTRPC()
   // const {data: project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({id: projectId}))

    return(
     <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
                <Suspense fallback={<p>Loading Messages... </p>}>
                    <MessageContainer projectId={projectId}/>
                </Suspense>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={65} minSize={20}>
             TODO: Project screen
            </ResizablePanel>
        </ResizablePanelGroup>
        
        
     </div>
    )
}
export default ProjectsView