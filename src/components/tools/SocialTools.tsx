import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

export function NameGenerator() {
  const [style, setStyle] = useState('modern');
  const [theme, setTheme] = useState('');
  const [quantity, setQuantity] = useState('5');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!theme.trim()) {
      setError('Please enter a theme');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `Generate ${quantity} ${style} names based on the theme: "${theme}"

Requirements:
- ${style} style names
- Related to: ${theme}
- Creative and unique
- Easy to remember

Format as a numbered list with brief descriptions.
Use clear spacing between names.`;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Name Generator</h1>
          <p className="text-slate-400 text-sm sm:text-base">Create creative names for anything</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <Select
                label="Style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                options={[
                  { value: 'modern', label: 'Modern' },
                  { value: 'classic', label: 'Classic' },
                  { value: 'creative', label: 'Creative' },
                ]}
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <Input
                label="Theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="E.g., startup, blog, game character..."
                className="text-sm sm:text-base"
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <Select
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                options={[
                  { value: '5', label: '5 names' },
                  { value: '10', label: '10 names' },
                  { value: '20', label: '20 names' },
                ]}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Generate Names
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
