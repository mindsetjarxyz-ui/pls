import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callOpenAI, openAd } from "../openai";
import { useApiKey } from "../ApiKeyContext";

interface Field {
  id: string;
  label: string;
  type: "textarea" | "input" | "select";
  placeholder?: string;
  options?: string[];
  rows?: number;
}

interface ToolLayoutProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  fields: Field[];
  systemPrompt: (values: Record<string, string>) => string;
  userPrompt: (values: Record<string, string>) => string;
  outputLabel?: string;
  outputClass?: string;
  buttonText?: string;
}

export default function ToolLayout({
  icon,
  iconBg,
  title,
  description,
  fields,
  systemPrompt,
  userPrompt,
  outputLabel = "✨ Generated Result",
  outputClass = "",
  buttonText = "Generate",
}: ToolLayoutProps) {
  const navigate = useNavigate();
  const { apiKey } = useApiKey();
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [genCount, setGenCount] = useState(0);

  const setValue = (id: string, val: string) =>
    setValues((prev) => ({ ...prev, [id]: val }));

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("Please enter your OpenAI API key in Settings.");
      return;
    }
    const mainField = fields.find((f) => f.type === "textarea");
    if (mainField && !values[mainField.id]?.trim()) {
      setError(`Please fill in the ${mainField.label.toLowerCase()} field.`);
      return;
    }

    setError("");
    setLoading(true);

    // Open ad immediately, generation happens in background
    openAd();

    try {
      const result = await callOpenAI(
        apiKey,
        systemPrompt(values),
        userPrompt(values)
      );
      setOutput(result);
      const newCount = genCount + 1;
      setGenCount(newCount);

      // Show ad on every generation
      if (newCount > 0) {
        openAd();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="tool-page-title">
          <h1>
            {icon} {title}
          </h1>
          <p>{description}</p>
        </div>
      </div>

      {!apiKey && (
        <div className="api-banner">
          ⚠️ &nbsp; No API key set — go to{" "}
          <strong
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/settings")}
          >
            Settings
          </strong>{" "}
          to add your OpenAI API key.
        </div>
      )}

      <div className="tool-card-container">
        {fields.map((field) => (
          <div className="form-group" key={field.id}>
            <label className="form-label">{field.label}</label>
            {field.type === "textarea" && (
              <>
                <textarea
                  className="form-textarea"
                  placeholder={field.placeholder}
                  rows={field.rows || 5}
                  value={values[field.id] || ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
                <div className="char-count">
                  {(values[field.id] || "").length} characters
                </div>
              </>
            )}
            {field.type === "input" && (
              <input
                className="form-input"
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <select
                className="form-select"
                value={values[field.id] || field.options?.[0] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              >
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner" /> Generating...
            </>
          ) : (
            <>✨ {buttonText}</>
          )}
        </button>
      </div>

      <div className="tool-card-container">
        <div className="output-header">
          <span className="output-label">{outputLabel}</span>
          {output && (
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          )}
        </div>
        {output ? (
          <div className={`output-box ${outputClass}`}>{output}</div>
        ) : (
          <div className="output-box empty">
            {loading
              ? "⏳ Generating your content..."
              : "Your result will appear here after you click Generate."}
          </div>
        )}
      </div>
    </div>
  );
}
