import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

export function EssayJudge() {
  const [essay, setEssay] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!essay.trim()) {
      setError('Please enter an essay to evaluate');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `Evaluate this essay and provide feedback.

Essay:
${essay}

Provide structured feedback:

1. STRENGTHS
   - What works well

2. AREAS FOR IMPROVEMENT
   - Grammar/spelling issues
   - Structure suggestions
   - Content improvements

3. SCORE
   - Overall rating out of 10

4. RECOMMENDATIONS
   - Specific steps to improve

Use clear spacing between sections.`;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Essay Evaluator</h1>
          <p className="text-slate-400 text-sm sm:text-base">Get detailed feedback on your essays</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <label className="text-sm sm:text-base font-semibold text-white mb-3 block">Your Essay</label>
              <TextArea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Paste your essay here..."
                rows={8}
                className="text-sm sm:text-base"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Evaluate Essay
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
