import ToolLayout from "../components/ToolLayout";

export default function CitationGenerator() {
  return (
    <ToolLayout
      icon="📚"
      iconBg="linear-gradient(135deg, #0ea5e9, #10b981)"
      title="Citation Generator"
      description="Generate properly formatted citations and references for any source."
      fields={[
        {
          id: "source",
          label: "Source Information",
          type: "textarea",
          placeholder: "Paste the book/article/website info here.\n\nExample:\nTitle: The Great Gatsby\nAuthor: F. Scott Fitzgerald\nYear: 1925\nPublisher: Scribner",
          rows: 6,
        },
        {
          id: "type",
          label: "Source Type",
          type: "select",
          options: ["Book", "Journal Article", "Website", "Newspaper", "Video/YouTube", "Podcast", "Research Paper"],
        },
        {
          id: "style",
          label: "Citation Style",
          type: "select",
          options: ["APA (7th Edition)", "MLA (9th Edition)", "Chicago", "Harvard", "IEEE"],
        },
      ]}
      systemPrompt={() =>
        `You are an expert academic citation specialist. Generate perfectly formatted citations following the exact rules of the specified citation style. Always include all required elements.`
      }
      userPrompt={(v) =>
        `Source Type: ${v.type || "Book"}
Citation Style: ${v.style || "APA (7th Edition)"}

Source Info:
${v.source}

Generate a properly formatted ${v.style || "APA"} citation for this source.`
      }
      outputLabel="📚 Citation"
      buttonText="Generate Citation"
    />
  );
}
