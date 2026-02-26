import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

export function GrammarTool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCorrect = async () => {
    await handleAdBeforeGeneration();
    if (!text.trim()) {
      setError('Please enter text to correct');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `Please correct the grammar, spelling, and punctuation in the following text. 

Text to correct:
${text}

Provide:
1. The corrected version
2. A list of errors found
3. Brief explanations for each correction

Format it clearly with proper spacing between sections.`;

    const response = await generateText(prompt);

    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setResult(formatOutput(response.output));
    }
  };

  const formatOutput = (text: string): string => {
    return text;
  };

  const handleClear = () => {
    setText('');
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Grammar Corrector
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Get professional grammar and spelling corrections with detailed explanations
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Input Section */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <label className="text-sm sm:text-base font-semibold text-white mb-3 block">
                Your Text
              </label>
              <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to correct..."
                rows={8}
                className="text-sm sm:text-base"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleCorrect}
                loading={loading}
                className="flex-1 text-base sm:text-lg py-3 sm:py-4"
              >
                Correct Now
              </Button>
              <Button
                onClick={handleClear}
                variant="secondary"
                className="flex-1 text-base sm:text-lg py-3 sm:py-4"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="h-full min-h-[500px] sm:min-h-[600px]">
            <ResultBox content={result} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
