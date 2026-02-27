import ToolLayout from "../components/ToolLayout";

export default function EssayWriter() {
  return (
    <ToolLayout
      icon="📝"
      iconBg="linear-gradient(135deg, #10b981, #06b6d4)"
      title="Essay Writer"
      description="Write complete, well-structured essays on any topic in seconds."
      fields={[
        {
          id: "topic",
          label: "Essay Topic",
          type: "input",
          placeholder: "e.g. The impact of social media on modern communication",
        },
        {
          id: "type",
          label: "Essay Type",
          type: "select",
          options: [
            "Argumentative",
            "Descriptive",
            "Narrative",
            "Expository",
            "Persuasive",
            "Compare & Contrast",
            "Cause & Effect",
            "Critical Analysis",
          ],
        },
        {
          id: "length",
          label: "Essay Length",
          type: "select",
          options: [
            "Short (250-300 words)",
            "Medium (500-600 words)",
            "Long (800-1000 words)",
          ],
        },
        {
          id: "grade",
          label: "Academic Level",
          type: "select",
          options: [
            "Middle School",
            "High School",
            "Undergraduate",
            "Graduate",
          ],
        },
        {
          id: "notes",
          label: "Additional Notes (Optional)",
          type: "textarea",
          placeholder: "Any specific points you want included, thesis ideas, or instructions...",
          rows: 3,
        },
      ]}
      systemPrompt={() =>
        `You are an expert academic writer. Write well-structured, original essays with clear introduction, body paragraphs, and conclusion. Use appropriate vocabulary for the academic level specified.`
      }
      userPrompt={(v) =>
        `Topic: ${v.topic}
Type: ${v.type || "Argumentative"}
Length: ${v.length || "Medium (500-600 words)"}
Level: ${v.grade || "High School"}
${v.notes ? `\nAdditional notes: ${v.notes}` : ""}

Write a complete ${v.type || "argumentative"} essay on the above topic.`
      }
      outputLabel="📝 Your Essay"
      buttonText="Write Essay"
    />
  );
}
