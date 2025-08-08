import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {

    const codeAgent = createAgent({
      name: "writer",
      system: "You are an expert next.js developer.  You write readable , maintanable code. You write simple Next.js and react snippets",
      model: openai({ model: "gpt-4o" }),
    });

    const summary = await codeAgent.run(`Write the following snippet: ${event.data.value}`);

    return {summary };
  },
);