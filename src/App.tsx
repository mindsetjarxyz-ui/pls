import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiKeyProvider } from "./ApiKeyContext";
import Navbar from "./components/Navbar";
import Home from "./tools/Home";
import GrammarWriter from "./tools/GrammarWriter";
import MathSolver from "./tools/MathSolver";
import EssayWriter from "./tools/EssayWriter";
import Summarizer from "./tools/Summarizer";
import Paraphraser from "./tools/Paraphraser";
import CitationGenerator from "./tools/CitationGenerator";
import Translator from "./tools/Translator";
import Settings from "./tools/Settings";

// ✅ DEFAULT EXPORT — fixes "App is not exported" build error
export default function App() {
  return (
    <ApiKeyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grammar" element={<GrammarWriter />} />
          <Route path="/math" element={<MathSolver />} />
          <Route path="/essay" element={<EssayWriter />} />
          <Route path="/summarize" element={<Summarizer />} />
          <Route path="/paraphrase" element={<Paraphraser />} />
          <Route path="/citation" element={<CitationGenerator />} />
          <Route path="/translate" element={<Translator />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <footer className="footer">
          <p>© 2025 Student AI Tools · Powered by OpenAI GPT</p>
        </footer>
      </BrowserRouter>
    </ApiKeyProvider>
  );
}
