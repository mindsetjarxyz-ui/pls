import ToolLayout from "../components/ToolLayout";

export default function GrammarWriter() {
  return (
    <ToolLayout
      icon="✍️"
      iconBg="linear-gradient(135deg, #6366f1, #8b5cf6)"
      title="Grammar Fixer & Writer"
      description="Fix grammar, improve writing style, and enhance your text with AI."
      fields={[
        {
          id: "text",
          label: "Your Text",
          type: "textarea",
          placeholder: "Paste or type your text here to fix grammar and improve writing...",
          rows: 7,
        },
        {
          id: "mode",
          label: "Mode",
          type: "select",
          options: [
            "Fix Grammar Only",
            "Fix Grammar + Improve Style",
            "Make Formal",
            "Make Casual",
            "Make Academic",
            "Make Concise",
            "Expand & Elaborate",
          ],
        },
        {
          id: "tone",
          label: "Tone",
          type: "select",
          options: ["Neutral", "Professional", "Friendly", "Confident", "Persuasive"],
        },
      ]}
      systemPrompt={() =>
        `You are an expert writing assistant and grammar specialist. You help students and professionals improve their writing. Always return only the improved text without any explanation unless asked.`
      }
      userPrompt={(v) =>
        `Mode: ${v.mode || "Fix Grammar Only"}
Tone: ${v.tone || "Neutral"}

Original Text:
${v.text}

Please ${v.mode || "fix the grammar"} of the above text with a ${v.tone || "neutral"} tone. Return only the improved text.`
      }
      outputLabel="✍️ Improved Text"
      buttonText="Fix & Improve"
    />
  );
}
