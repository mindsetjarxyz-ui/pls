import React from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultBoxProps {
  content: string;
  isLoading?: boolean;
  onCopy?: () => void;
}

export function ResultBox({ content, isLoading = false, onCopy }: ResultBoxProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (content) {
      const plainText = content.replace(/<[^>]*>/g, '').trim();
      navigator.clipboard.writeText(plainText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onCopy?.();
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 sm:p-6 h-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500 mb-4"></div>
          <p className="text-slate-400 text-sm">Generating...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 sm:p-6 h-full min-h-96 flex items-center justify-center">
        <p className="text-slate-400 text-sm sm:text-base text-center">
          Results will appear here...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 sm:p-6 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        <div 
          className="text-slate-200 text-xs sm:text-sm leading-relaxed prose prose-invert max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1 [&_strong]:text-blue-300 [&_strong]:font-semibold [&_p]:mt-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
        title="Copy to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
