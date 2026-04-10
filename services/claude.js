import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateContent(articleContent, styleGuide) {
  const agent = await client.beta.agents.create({
    name: "Content Writer",
    model: "claude-sonnet-4-6",
    system: `คุณเป็น Thai tech content creator สำหรับ Manchinn personal brand
ใช้ style guide นี้:
${styleGuide}

สร้าง content 3 formats จาก article ที่ได้รับ:
1. Facebook post (hook + body + CTA + hashtags)
2. Threads post (กระชับ, 500 chars max, เหมาะ casual discussion)
3. Blog post (SEO-optimized, 800-1500 คำ, H2/H3 structure)

ตอบเป็น JSON format เท่านั้น ไม่มี markdown code fence:
{
  "facebook": { "text": "...", "hashtags": [...] },
  "threads": { "text": "...", "hashtags": [...] },
  "blog": { "title": "...", "meta_description": "...", "content": "...", "tags": [...] }
}`,
    tools: [{ type: "agent_toolset_20260401" }],
  });

  const environment = await client.beta.environments.create({
    name: `content-${Date.now()}`,
    config: { type: "cloud", networking: { type: "unrestricted" } },
  });

  const session = await client.beta.sessions.create({
    agent: agent.id,
    environment_id: environment.id,
  });

  let result = '';

  const stream = client.beta.sessions.events.stream(session.id);
  await client.beta.sessions.events.send(session.id, {
    events: [{
      type: "user.message",
      content: [{ type: "text", text: articleContent }],
    }],
  });

  for await (const event of stream) {
    if (event.type === "agent.message") {
      for (const block of event.content) {
        if (block.type === "text") result += block.text;
      }
    }
    if (event.type === "session.status_idle") break;
  }

  // Cleanup
  await client.beta.environments.archive(environment.id);

  return JSON.parse(result);
}
