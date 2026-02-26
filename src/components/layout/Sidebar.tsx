import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { tools, Tool } from '@/data/tools';
import { cn } from '@/utils/cn';

interface SidebarProps {
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  onClose?: () => void;
}

const categories = [
  { id: 'student', label: 'Student AI', color: 'from-purple-600 to-blue-600' },
  { id: 'writer', label: 'AI Writing', color: 'from-blue-600 to-cyan-600' },
  { id: 'image', label: 'AI Image', color: 'from-pink-600 to-purple-600' },
  { id: 'social', label: 'Social Media', color: 'from-orange-600 to-red-600' },
  { id: 'utility', label: 'Utilities', color: 'from-green-600 to-emerald-600' },
];

export function Sidebar({ selectedTool, onSelectTool, onClose }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('student');

  const toolsByCategory = categories.map(cat => ({
    ...cat,
    tools: tools.filter(t => t.category === cat.id),
  }));

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-4 sm:py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Cutverse" className="w-8 h-8" />
          <h2 className="text-white font-bold text-sm sm:text-base">Cutverse</h2>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2">
        {toolsByCategory.map(category => (
          <div key={category.id}>
            {/* Category Header */}
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )
              }
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
            >
              <span className={cn(
                'text-xs sm:text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent',
                category.color
              )}>
                {category.label}
              </span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform duration-200',
                  expandedCategory === category.id && 'rotate-180'
                )}
              />
            </button>

            {/* Tools List */}
            {expandedCategory === category.id && (
              <div className="ml-2 mt-1 space-y-1">
                {category.tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => onSelectTool(tool)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2',
                      selectedTool?.id === tool.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    )}
                  >
                    <tool.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tool.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 sm:py-4 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2024 Cutverse AI</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
}
