"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import MessageContainer from "../components/messages-container"
import { Suspense, useState } from "react"
import { Fragment } from "@/generated/prisma"
import { ProjectHeader } from "../components/project-header"
import { FragmentWeb } from "../components/fragment-web"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


interface Props{
    projectId: string
}


const ProjectsView = ({projectId}:Props)=>{

   //const trpc = useTRPC()
   // const {data: project} = useSuspenseQuery(trpc.projects.getOne.queryOptions({id: projectId}))

   const [activeFragment,setActiveFragment] =  useState<Fragment | null>(null)
   const [tabState,setTabState] = useState<"Preview" | "Code">("Preview")

    return(
     <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
                <Suspense fallback={<p>Loading Project....</p>}>
                    <ProjectHeader projectId={projectId}/>
                </Suspense>
                <Suspense fallback={<p>Loading Messages... </p>}>
                    <MessageContainer projectId={projectId} activeFragment={activeFragment} setActiveFragment={setActiveFragment}/>
                </Suspense>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={65} minSize={20}>
             <Tabs className="h-full gap-y-0"
                    defaultValue="Preview"
                    value={tabState}
                    onValueChange={(value)=>setTabState(value as "Preview" | "Code")}>
                <div className="w-full flex items-center p-2 border-b gap-x-2">
                    <TabsList className="h-8 p-0 border rounded-md">
                        <TabsTrigger value="Preview" className="rounded-md">
                            <EyeIcon/> <span>Demo</span>
                        </TabsTrigger>
                        <TabsTrigger value="Code" className="rounded-md">
                            <CodeIcon/> <span>Code</span>
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-x-2">
                        <Button asChild size="sm" variant="default">
                            <Link href="/pricing">
                             <CrownIcon/>Upgrade
                            </Link>
                        </Button>
                    </div>
                </div>
                <TabsContent value="Preview">
                 {!!activeFragment && <FragmentWeb data={activeFragment}/> }
                </TabsContent>
                <TabsContent value="Code">
                    <p>TODO:Code</p>
                </TabsContent>
             </Tabs>
            </ResizablePanel>
        </ResizablePanelGroup>
        
        
     </div>
    )
}
export default ProjectsView