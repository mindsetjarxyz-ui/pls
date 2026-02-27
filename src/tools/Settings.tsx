import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiKey } from "../ApiKeyContext";

export default function Settings() {
  const navigate = useNavigate();
  const { apiKey, setApiKey } = useApiKey();
  const [input, setInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);

  const handleSave = () => {
    setApiKey(input.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="tool-page-title">
          <h1>⚙️ Settings</h1>
          <p>Manage your API key and preferences</p>
        </div>
      </div>

      <div className="tool-card-container">
        <h2 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px" }}>
          🔑 OpenAI API Key
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: 1.6 }}>
          Your API key is stored locally in your browser and never sent to any server other than OpenAI.
          Get your key from{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary-light)" }}
          >
            platform.openai.com/api-keys
          </a>
        </p>

        <div className="form-group">
          <label className="form-label">API Key</label>
          <div style={{ position: "relative" }}>
            <input
              className="form-input"
              type={show ? "text" : "password"}
              placeholder="sk-..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ paddingRight: "80px" }}
            />
            <button
              onClick={() => setShow(!show)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? "✓ Saved!" : "💾 Save API Key"}
        </button>

        {apiKey && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#6ee7b7",
            }}
          >
            ✅ API key is set and ready to use.
          </div>
        )}
      </div>

      <div className="tool-card-container">
        <h2 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "12px" }}>
          ℹ️ About Student AI Tools
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7 }}>
          Student AI Tools uses the OpenAI GPT API to power all its features. Your API key is required
          and is only used to make requests directly to OpenAI from your browser. We never store or
          share your key.
        </p>
      </div>
    </div>
  );
}
