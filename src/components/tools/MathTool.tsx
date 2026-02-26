import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

export function MathSolver() {
  const [problem, setProblem] = useState('');
  const [difficulty, setDifficulty] = useState('general');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    await handleAdBeforeGeneration();
    if (!problem.trim()) {
      setError('Please enter a math problem');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `You are a math tutor. Solve this math problem step by step.

Problem: ${problem}

Please provide:

1. SOLUTION STEPS
   - Break down the problem clearly
   - Show each step separately
   - Explain why each step matters

2. FINAL ANSWER
   - Clear answer highlighted
   - Double-check your work

3. KEY CONCEPTS
   - What math concepts are used?
   - Why does this method work?

4. SIMILAR PROBLEMS
   - How to approach similar questions
   - Common mistakes to avoid

Format with clear spacing between sections. Use simple, tutorial language.`;

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
    setProblem('');
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Math Solver
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Get step-by-step solutions with explanations like a real math tutor
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Input Section */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <label className="text-sm sm:text-base font-semibold text-white mb-3 block">
                Math Problem
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Enter your math problem... (e.g., 'Solve 2x + 5 = 13' or 'What is 25% of 200?')"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                rows={6}
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <label className="text-sm sm:text-base font-semibold text-white mb-3 block">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="basic">Basic (Elementary)</option>
                <option value="general">General (Middle/High School)</option>
                <option value="advanced">Advanced (College/University)</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSolve}
                loading={loading}
                className="flex-1 text-base sm:text-lg py-3 sm:py-4"
              >
                Solve Step by Step
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
