import React, { useEffect, useState } from 'react';
import { Copy, Check, Edit2, Trash2 } from 'lucide-react';

interface ResultBoxProps {
  content: string;
  isLoading?: boolean;
  onCopy?: () => void;
}

export function ResultBox({ content, isLoading = false, onCopy }: ResultBoxProps) {
  const [copied, setCopied] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editContent, setEditContent] = React.useState(content);
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter animation - VERY FAST (10ms per character)
  useEffect(() => {
    if (!isLoading && content) {
      setIsTyping(true);
      const cleanText = content.replace(/<[^>]*>/g, '');
      let index = 0;
      let currentText = '';

      const typeInterval = setInterval(() => {
        if (index < cleanText.length) {
          currentText += cleanText[index];
          setDisplayedContent(currentText);
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 10); // VERY FAST - 10ms per character

      return () => clearInterval(typeInterval);
    }
  }, [content, isLoading]);

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

  if (isLoading) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex justify-center items-center mb-4">
            <div className="absolute w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin opacity-20" />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
          </div>
          <p className="text-slate-300 text-sm font-medium">Generating...</p>
        </div>
      </div>
    );
  }

  if (!displayedContent && !content) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-sm font-medium">Your answer will appear here</p>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full flex flex-col">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="flex-1 w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 font-sans text-sm"
          placeholder="Edit your content here..."
        />
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
          >
            <Check className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 h-full flex flex-col overflow-hidden">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">Answer Ready</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-all"
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>

          <button
            onClick={() => setDisplayedContent('')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-sm font-semibold transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area - Minimalist with proper spacing */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
        <div className="max-w-2xl text-slate-100 text-base leading-relaxed whitespace-pre-wrap font-sans">
          {displayedContent}
          
          {/* Typing cursor */}
          {isTyping && (
            <span className="inline-block w-0.5 h-5 bg-blue-500 ml-1 animate-pulse" />
          )}
        </div>
      </div>

      {/* Footer */}
      {!isTyping && displayedContent && (
        <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/30 text-xs text-slate-500">
          <span>✓ {displayedContent.length} characters</span>
        </div>
      )}
    </div>
  );
}
