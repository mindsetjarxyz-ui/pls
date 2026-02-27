import ToolLayout from "../components/ToolLayout";

export default function Paraphraser() {
  return (
    <ToolLayout
      icon="🔄"
      iconBg="linear-gradient(135deg, #8b5cf6, #ec4899)"
      title="Paraphraser"
      description="Rewrite and paraphrase text to avoid plagiarism while keeping the meaning."
      fields={[
        {
          id: "text",
          label: "Original Text",
          type: "textarea",
          placeholder: "Paste the text you want to paraphrase here...",
          rows: 6,
        },
        {
          id: "mode",
          label: "Paraphrase Mode",
          type: "select",
          options: [
            "Standard",
            "Fluency (Improve flow)",
            "Formal",
            "Simple (Easy to read)",
            "Creative",
            "Academic",
          ],
        },
      ]}
      systemPrompt={() =>
        `You are an expert writing assistant. Paraphrase text completely — change sentence structure, vocabulary, and phrasing while keeping the original meaning. The result should not match the original wording.`
      }
      userPrompt={(v) =>
        `Mode: ${v.mode || "Standard"}

Original:
${v.text}

Paraphrase this text using the ${v.mode || "Standard"} mode. Return only the paraphrased version.`
      }
      outputLabel="🔄 Paraphrased Text"
      buttonText="Paraphrase"
    />
  );
}
