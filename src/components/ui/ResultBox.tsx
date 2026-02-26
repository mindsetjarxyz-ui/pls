import React from 'react';
import { Copy, Check, Edit2 } from 'lucide-react';

interface ResultBoxProps {
  content: string;
  isLoading?: boolean;
  onCopy?: () => void;
}

export function ResultBox({ content, isLoading = false, onCopy }: ResultBoxProps) {
  const [copied, setCopied] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editContent, setEditContent] = React.useState(content);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(content.replace(/<[^>]*>/g, '').trim());
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  // Format content with proper spacing and structure
  const formatContent = (text: string): string => {
    if (!text) return '';
    
    // Split by double newlines to create paragraphs
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
    
    return paragraphs.map(para => {
      const lines = para.split('\n');
      
      return lines.map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        
        // Check if it looks like a heading (short line, all caps or ends with colon)
        if (trimmed.length < 100 && (trimmed === trimmed.toUpperCase() || trimmed.endsWith(':'))) {
          return `<h3 class="text-base sm:text-lg font-bold text-blue-300 mt-3 mb-2">${trimmed}</h3>`;
        }
        
        return `<p class="text-slate-200 text-sm sm:text-base leading-relaxed mb-3">${trimmed}</p>`;
      }).join('');
    }).join('');
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

  if (isEditing) {
    return (
      <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 sm:p-6 h-full flex flex-col">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="flex-1 w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 font-mono text-sm"
          placeholder="Edit your content here..."
        />
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleSaveEdit}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 sm:p-6 h-full flex flex-col">
      {/* Content Display Area */}
      <div className="flex-1 overflow-y-auto mb-4 bg-slate-800/30 rounded-lg p-4 sm:p-5">
        <div 
          className="whitespace-pre-wrap text-slate-200 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatContent(content) }}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
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
        
        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
          title="Edit content"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
