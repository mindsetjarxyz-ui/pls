import ToolLayout from "../components/ToolLayout";

export default function Summarizer() {
  return (
    <ToolLayout
      icon="📄"
      iconBg="linear-gradient(135deg, #f59e0b, #ef4444)"
      title="Text Summarizer"
      description="Summarize any text, article, or document into clear, concise key points."
      fields={[
        {
          id: "text",
          label: "Text to Summarize",
          type: "textarea",
          placeholder: "Paste the text, article, or document you want to summarize here...",
          rows: 8,
        },
        {
          id: "format",
          label: "Summary Format",
          type: "select",
          options: [
            "Bullet Points",
            "Short Paragraph",
            "Key Points + Paragraph",
            "Executive Summary",
            "One Sentence",
          ],
        },
        {
          id: "length",
          label: "Summary Length",
          type: "select",
          options: ["Very Short (1-2 sentences)", "Short (3-5 points)", "Medium (5-8 points)", "Detailed"],
        },
      ]}
      systemPrompt={() =>
        `You are an expert at summarizing content clearly and accurately. Capture the most important information while being concise. Never add information not in the original text.`
      }
      userPrompt={(v) =>
        `Format: ${v.format || "Bullet Points"}
Length: ${v.length || "Short (3-5 points)"}

Text:
${v.text}

Summarize the above text.`
      }
      outputLabel="📄 Summary"
      buttonText="Summarize"
    />
  );
}
