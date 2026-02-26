import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ResultBox } from '@/components/ui/ResultBox';
import { generateText } from '@/services/ai';
import { handleAdBeforeGeneration } from '@/services/adService';

// ==================== LETTER WRITER ====================
export function LetterWriter() {
  const [letterType, setLetterType] = useState('formal');
  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!recipient.trim() || !purpose.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const prompt = `Write a ${letterType} letter to ${recipient}.

Purpose: ${purpose}

Format the letter professionally with:
- Date
- Recipient address
- Greeting
- Body paragraphs
- Closing

Use clear, appropriate language for a ${letterType} letter.
Use proper spacing between sections.`;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Letter Writer</h1>
          <p className="text-slate-400 text-sm sm:text-base">Generate professional letters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
              <Select
                label="Letter Type"
                value={letterType}
                onChange={(e) => setLetterType(e.target.value)}
                options={[
                  { value: 'formal', label: 'Formal' },
                  { value: 'informal', label: 'Informal' },
                  { value: 'business', label: 'Business' },
                ]}
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <Input
                label="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="E.g., Mr. John Smith"
                className="text-sm sm:text-base"
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <TextArea
                label="Purpose of Letter"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="E.g., Job inquiry, complaint, recommendation..."
                rows={4}
                className="text-sm sm:text-base"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Generate Letter
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

// ==================== DEBATE WRITER ====================
export function DebateWriter() {
  const [topic, setTopic] = useState('');
  const [classLevel, setClassLevel] = useState('class-10');
  const [stance, setStance] = useState('for');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    await handleAdBeforeGeneration();
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    setResult('');

    const stanceText = stance === 'for' ? 'in favor of' : stance === 'against' ? 'against' : 'presenting both sides of';
    const levelText = classLevel === 'university' ? 'University' : classLevel.replace('-', ' ').replace('class', 'Class');

    const prompt = `Write a debate speech ${stanceText} the motion: "${topic}"

This is for a ${levelText} level student. Adjust vocabulary and complexity accordingly.

Structure:
1. Opening statement
2. Three main arguments with evidence
3. Counter-arguments and rebuttals
4. Powerful closing statement

Use clear spacing between sections.
Write for ${levelText} level understanding.`;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Debate Writer</h1>
          <p className="text-slate-400 text-sm sm:text-base">Create compelling debate speeches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6 md:p-7">
              <Input
                label="Motion/Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the debate topic..."
                className="text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
                <Select
                  label="Class Level"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  options={[
                    { value: 'class-10', label: 'Class 10' },
                    { value: 'class-12', label: 'Class 12' },
                    { value: 'university', label: 'University' },
                  ]}
                />
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-5 sm:p-6">
                <Select
                  label="Stance"
                  value={stance}
                  onChange={(e) => setStance(e.target.value)}
                  options={[
                    { value: 'for', label: 'For' },
                    { value: 'against', label: 'Against' },
                    { value: 'neutral', label: 'Both Sides' },
                  ]}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            <Button onClick={handleGenerate} loading={loading} className="text-base sm:text-lg py-3 sm:py-4">
              Generate Speech
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
