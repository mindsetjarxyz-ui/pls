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

  // Typewriter animation effect (FAST)
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
      }, 15); // VERY FAST typing animation (15ms per character)

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

  // ChatGPT-style text formatting
  const formatChatGPT = (text: string): React.ReactNode => {
    if (!text) return '';

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        elements.push(<div key={idx} className="h-2" />);
        return;
      }

      // Heading detection (all caps, short, ends with colon)
      if (
        trimmed.length < 80 &&
        (trimmed === trimmed.toUpperCase() || 
         trimmed.endsWith(':') ||
         /^#{1,3}\s/.test(trimmed))
      ) {
        const cleanedHeading = trimmed.replace(/^#{1,3}\s/, '');
        elements.push(
          <h3 key={idx} className="text-lg font-bold text-white mt-5 mb-3 leading-relaxed">
            {cleanedHeading}
          </h3>
        );
        return;
      }

      // Bold text detection
      let processed = line;
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/__(.*?)__/g, '<strong>$1</strong>');

      // List items
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) {
        elements.push(
          <div
            key={idx}
            className="text-slate-100 text-base leading-relaxed ml-4 my-2"
            dangerouslySetInnerHTML={{
              __html: processed,
            }}
          />
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p
          key={idx}
          className="text-slate-100 text-base leading-relaxed my-3"
          dangerouslySetInnerHTML={{
            __html: processed,
          }}
        />
      );
    });

    return elements;
  };

  if (isLoading) {
    return (
      <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          {/* Animated spinner */}
          <div className="relative inline-flex justify-center items-center mb-4">
            <div className="absolute w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin opacity-20" />
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
          </div>
          <p className="text-slate-300 text-sm font-medium">Generating with AI...</p>
          <p className="text-slate-500 text-xs mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!displayedContent && !content) {
    return (
      <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
            <Copy className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium">Your result will appear here</p>
          <p className="text-slate-500 text-xs mt-2">Generate content using any tool above</p>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 h-full flex flex-col">
        {/* Edit Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-blue-400" />
            Edit Content
          </h3>
          <button
            onClick={() => setIsEditing(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Edit Textarea */}
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="flex-1 w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 font-sans text-sm"
          placeholder="Edit your content here..."
        />

        {/* Edit Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
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
    <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 h-full flex flex-col overflow-hidden">
      {/* TOP ACTION BAR - Sticky */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">Result Generated</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              copied
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl'
            }`}
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

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-xl"
            title="Edit content"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={() => setDisplayedContent('')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 rounded-lg text-sm font-semibold transition-all duration-200"
            title="Clear content"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTENT AREA - ChatGPT Style */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-none text-slate-200">
          {formatChatGPT(displayedContent)}
          
          {/* Typing cursor animation */}
          {isTyping && (
            <span className="inline-block w-1 h-5 bg-blue-500 ml-1 animate-pulse" />
          )}
        </div>
      </div>

      {/* Footer info */}
      {!isTyping && displayedContent && (
        <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/30 text-xs text-slate-500">
          <span>✓ Content generated • {displayedContent.length} characters</span>
        </div>
      )}
    </div>
  );
}
