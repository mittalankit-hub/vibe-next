import {Sandbox} from "@e2b/code-interpreter"
import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";
import { getSanbox } from "./utils";

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
    });

    const summary = await codeAgent.run(`Write the following snippet: ${event.data.value}`);


    const sandboxUrl = await step.run("get-sanbox-url",async () => {
        const sandbox = await getSanbox(sandboxId)
        const host=  sandbox.getHost(3000)
        return `https://${host}`
    })
    return {summary,sandboxUrl };
  },
);