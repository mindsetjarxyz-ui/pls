// OpenAI API Helper
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function callOpenAI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  model: string = "gpt-3.5-turbo"
): Promise<string> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = (err as any)?.error?.message || `API error ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || "No response generated.";
}

// Ad redirect — opens ad, generation runs in background
export function openAd() {
  try {
    window.open("https://omg10.com/4/10649293", "_blank", "noopener,noreferrer");
  } catch (_) {}
}
