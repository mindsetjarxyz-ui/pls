import ToolLayout from "../components/ToolLayout";

export default function Translator() {
  return (
    <ToolLayout
      icon="🌍"
      iconBg="linear-gradient(135deg, #f59e0b, #10b981)"
      title="Language Translator"
      description="Translate text accurately between 50+ languages with natural phrasing."
      fields={[
        {
          id: "text",
          label: "Text to Translate",
          type: "textarea",
          placeholder: "Type or paste the text you want to translate...",
          rows: 5,
        },
        {
          id: "from",
          label: "From Language",
          type: "select",
          options: ["Auto Detect", "English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Portuguese", "Russian", "Italian", "Dutch", "Bengali", "Turkish"],
        },
        {
          id: "to",
          label: "To Language",
          type: "select",
          options: ["Spanish", "English", "French", "German", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Portuguese", "Russian", "Italian", "Dutch", "Bengali", "Turkish"],
        },
      ]}
      systemPrompt={() =>
        `You are an expert multilingual translator. Provide accurate, natural-sounding translations. Preserve tone, meaning, and nuance. Return only the translated text.`
      }
      userPrompt={(v) =>
        `From: ${v.from || "Auto Detect"}
To: ${v.to || "Spanish"}

Text: ${v.text}

Translate the above. Return only the translation.`
      }
      outputLabel="🌍 Translation"
      buttonText="Translate"
    />
  );
}
