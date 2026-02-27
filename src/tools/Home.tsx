import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    icon: "✍️",
    title: "Grammar Fixer",
    description: "Fix grammar errors, improve writing style, make text formal or casual with one click.",
    tag: "Writing",
    path: "/grammar",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    bg: "rgba(99,102,241,0.1)",
  },
  {
    icon: "🧮",
    title: "Math Solver",
    description: "Solve any math problem step-by-step — from basic arithmetic to calculus.",
    tag: "Mathematics",
    path: "/math",
    gradient: "linear-gradient(135deg, #06b6d4, #6366f1)",
    bg: "rgba(6,182,212,0.1)",
  },
  {
    icon: "📝",
    title: "Essay Writer",
    description: "Generate complete essays — argumentative, descriptive, narrative, and more.",
    tag: "Academic",
    path: "/essay",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    icon: "📄",
    title: "Text Summarizer",
    description: "Summarize long articles, textbooks, or documents into concise key points.",
    tag: "Productivity",
    path: "/summarize",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: "🔄",
    title: "Paraphraser",
    description: "Rewrite any text to avoid plagiarism while preserving the original meaning.",
    tag: "Writing",
    path: "/paraphrase",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    bg: "rgba(139,92,246,0.1)",
  },
  {
    icon: "📚",
    title: "Citation Generator",
    description: "Generate APA, MLA, Chicago, and Harvard citations for any source.",
    tag: "Research",
    path: "/citation",
    gradient: "linear-gradient(135deg, #0ea5e9, #10b981)",
    bg: "rgba(14,165,233,0.1)",
  },
  {
    icon: "🌍",
    title: "Translator",
    description: "Translate text between 50+ languages with natural, accurate phrasing.",
    tag: "Languages",
    path: "/translate",
    gradient: "linear-gradient(135deg, #f59e0b, #10b981)",
    bg: "rgba(245,158,11,0.1)",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <div className="status-dot" />
          Powered by OpenAI GPT
        </div>
        <h1>
          AI Tools for
          <br />
          Smarter Students
        </h1>
        <p>
          Grammar fixer, math solver, essay writer, summarizer and more — all
          powered by the latest AI to help you study smarter, not harder.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="tools-section">
        <div className="section-title">🛠️ All Tools</div>
        <div className="section-subtitle">
          Click any tool to get started — no signup required, just your OpenAI API key.
        </div>
        <div className="tools-grid">
          {tools.map((tool) => (
            <a
              key={tool.path}
              className="tool-card"
              onClick={() => navigate(tool.path)}
              style={{ cursor: "pointer", "--card-gradient": tool.gradient } as React.CSSProperties}
            >
              <div
                className="tool-icon"
                style={{ background: tool.bg }}
              >
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <span className="tool-tag">{tool.tag}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
