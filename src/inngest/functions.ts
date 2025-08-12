import {Sandbox} from "@e2b/code-interpreter"
import { inngest } from "./client";
import { openai, createAgent, createTool } from "@inngest/agent-kit";
import { getSandbox } from "./utils";
import { z } from "zod";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {

    const sandboxId = await step.run("get-sandbox-id", async ()=>{
        const sandbox = await Sandbox.create("vibe-nextjs-test-4444")
        return sandbox.sandboxId
    })
    const codeAgent = createAgent({
      name: "codeAgent",
      system: "You are an expert next.js developer.  You write readable , maintanable code. You write simple Next.js and react snippets",
      model: openai({ model: "gpt-4o" }),
      tools: [
        createTool({
            name:"terminal",
            description:"Use the terminal to run commands",
            parameters: z.object({
                command: z.string(),
            }),
            handler: async({command}, {step})=>{
                return await step?.run("terminal",async()=>{
                    const buffers = {stdout:"", stderr:""}
                    try {
                        const sandbox = await getSandbox(sandboxId)
                        const result = await sandbox.commands.run(command,{
                            onStdout:(data:string)=>{
                                buffers.stdout += data
                            },
                            onStderr:(data:string)=>{
                                buffers.stderr += data
                            }
                        })
                        return result.stdout
                    }
                    catch(e){
                        console.error(`Command failed: ${e} \nstdout:${buffers.stdout}\nstderr:${buffers.stderr}`)
                        return `Command failed: ${e} \nstdout:${buffers.stdout}\nstderr:${buffers.stderr}`;
                    }
                })
            }
        }),
        createTool({
            name: "createOrUpdateFiles",
            description: "Create or update files in the sandbox",
            parameters:z.object({
                files: z.array(z.object({
                    path:z.string(),
                    content:z.string(),
                }))
            }),
            handler: async ({ files }, { step,network }) => {
                const newFiles = await step?.run("create-or-update-files", async () => {
                    try{
                        const updatedFiles = network.state.data.files || {}
                        const sandbox = await getSandbox(sandboxId)
                        for (const file of files){
                            await sandbox.files.write(file.path, file.content)
                            updatedFiles[file.path] = file.content
                            return updatedFiles
                        }
                    }catch(e){
                        console.error(`Error creating or updating files: ${e}`)
                        return "Error:" +e
                    }
        })
        if(typeof newFiles === "object"){
            network.state.data.files = newFiles;
        }
    
    }}),
    createTool({
        name:"readFiles",
        description:"Read files from the sandbox",
        parameters: z.object({
            files: z.array(z.string())
        }),
        handler: async ({files}, { step }) => {
            return await step?.run("readFiles", async () => {
                try{
                    const sandbox = await getSandbox(sandboxId)
                    const contents = []
                    for (const file of files){
                        const content  = await sandbox.files.read(file)
                        contents.push({path: file,content})
                    }
                    return JSON.stringify(contents)
                }catch(e){
                    console.error(`Error reading files: ${e}`)
                    return "Error:" + e
                }
            })
        }
    })
      ]
    });

    const summary = await codeAgent.run(`Write the following snippet: ${event.data.value}`);


    const sandboxUrl = await step.run("get-sanbox-url",async () => {
        const sandbox = await getSandbox(sandboxId)
        const host=  sandbox.getHost(3000)
        return `https://${host}`
    })
    return {summary,sandboxUrl};
  },
);