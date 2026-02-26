import { Tool } from '@/data/tools';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
}

const categoryGradients: Record<string, string> = {
  student: 'from-purple-600/20 to-blue-600/20 border-purple-500/30 hover:border-purple-500/60',
  writer: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 hover:border-blue-500/60',
  image: 'from-pink-600/20 to-purple-600/20 border-pink-500/30 hover:border-pink-500/60',
  social: 'from-orange-600/20 to-red-600/20 border-orange-500/30 hover:border-orange-500/60',
  utility: 'from-green-600/20 to-emerald-600/20 border-green-500/30 hover:border-green-500/60',
};

const categoryIconBg: Record<string, string> = {
  student: 'bg-purple-500/20 text-purple-400',
  writer: 'bg-blue-500/20 text-blue-400',
  image: 'bg-pink-500/20 text-pink-400',
  social: 'bg-orange-500/20 text-orange-400',
  utility: 'bg-green-500/20 text-green-400',
};

export function ToolCard({ tool, onSelect }: ToolCardProps) {
  return (
    <button
      onClick={() => onSelect(tool)}
      className={cn(
        'group relative h-full min-h-[180px] sm:min-h-[200px] w-full p-4 sm:p-5 md:p-6',
        'rounded-xl sm:rounded-2xl border border-slate-700/50 transition-all duration-300',
        'bg-gradient-to-br hover:shadow-xl hover:shadow-blue-500/10',
        'active:scale-95 sm:active:scale-100 hover:scale-105 sm:hover:scale-105',
        'backdrop-blur-sm',
        categoryGradients[tool.category] || 'from-slate-600/20 to-slate-700/20 border-slate-600/30'
      )}
    >
      {/* Top Icon */}
      <div className={cn(
        'w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300',
        categoryIconBg[tool.category] || 'bg-slate-700/30 text-slate-400',
        'group-hover:scale-110 group-hover:shadow-lg'
      )}>
        <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Title & Description */}
      <div className="text-left mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
          {tool.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 line-clamp-2 transition-colors">
          {tool.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-500 font-medium">
          Open Tool
        </span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
    </button>
  );
}
