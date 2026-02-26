import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

// ==================== ESSAY WRITER ====================
export function EssayWriter() {
  const [topic, setTopic] = useState('');
  const [essayType, setEssayType] = useState('persuasive');
  const [wordCount, setWordCount] = useState('500');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!topic.trim()) {
      setError('Please enter an essay topic');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `Write a ${essayType} essay about: ${topic}

Target word count: ${wordCount} words

Format with:
1. Introduction
2. Body paragraphs
3. Conclusion

Use clear, academic language with proper paragraph spacing.`;

    const response = await generateText(prompt);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setResult(response.output);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Essay Writer</h1>
          <p className="text-slate-400 text-sm sm:text-base">Generate well-structured essays on any topic</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <Input
                label="Essay Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your essay topic..."
                className="text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
                <Select
                  label="Type"
                  value={essayType}
                  onChange={(e) => setEssayType(e.target.value)}
                  options={[
                    { value: 'persuasive', label: 'Persuasive' },
                    { value: 'informative', label: 'Informative' },
                    { value: 'narrative', label: 'Narrative' },
                  ]}
                />
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
                <Select
                  label="Length"
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  options={[
                    { value: '300', label: '300 words' },
                    { value: '500', label: '500 words' },
                    { value: '1000', label: '1000 words' },
                  ]}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Generate Essay
            </Button>
          </div>

          <div className="h-full min-h-[500px] sm:min-h-[600px]">
            <ResultBox content={result} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SUMMARIZER ====================
export function Summarizer() {
  const [text, setText] = useState('');
  const [summaryLength, setSummaryLength] = useState('short');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!text.trim()) {
      setError('Please enter text to summarize');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const lengthGuide = summaryLength === 'short' ? '20%' : summaryLength === 'medium' ? '40%' : '60%';

    const prompt = `Summarize the following text to approximately ${lengthGuide} of the original length.

Text to summarize:
${text}

Provide a clear, concise summary that captures the main points.
Use proper paragraph spacing between sections.`;

    const response = await generateText(prompt);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setResult(response.output);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Text Summarizer</h1>
          <p className="text-slate-400 text-sm sm:text-base">Get concise summaries of any text</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <label className="text-sm sm:text-base font-semibold text-white mb-3 block">Text to Summarize</label>
              <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className="text-sm sm:text-base"
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <Select
                label="Summary Length"
                value={summaryLength}
                onChange={(e) => setSummaryLength(e.target.value)}
                options={[
                  { value: 'short', label: 'Short (20%)' },
                  { value: 'medium', label: 'Medium (40%)' },
                  { value: 'long', label: 'Long (60%)' },
                ]}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Summarize Text
            </Button>
          </div>

          <div className="h-full min-h-[500px] sm:min-h-[600px]">
            <ResultBox content={result} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
