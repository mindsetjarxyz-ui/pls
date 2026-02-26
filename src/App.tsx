import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ToolCard } from '@/components/layout/ToolCard';
import { EssayWriter } from '@/components/tools/WriterTools';
import { LetterWriter } from '@/components/tools/StudentTools';
import { GrammarTool } from '@/components/tools/GrammarTool';
import { DebateWriter } from '@/components/tools/StudentTools';
import { EssayJudge } from '@/components/tools/UtilityTools';
import { NameGenerator } from '@/components/tools/SocialTools';
import { ImageGenerator } from '@/components/tools/ImageTools';
import { MathSolver } from '@/components/tools/MathTool';
import { Summarizer } from '@/components/tools/WriterTools';
import { tools, Tool } from '@/data/tools';
import { X } from 'lucide-react';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return tools;
    return tools.filter(tool =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderToolComponent = () => {
    if (!selectedTool) return null;

    const toolComponentMap: Record<string, React.ReactNode> = {
      'essay-writer': <EssayWriter />,
      'letter-writer': <LetterWriter />,
      'grammar-corrector': <GrammarTool />,
      'debate-writer': <DebateWriter />,
      'essay-judge': <EssayJudge />,
      'name-generator': <NameGenerator />,
      'image-generator': <ImageGenerator />,
      'math-solver': <MathSolver />,
      'summarizer': <Summarizer />,
    };

    return toolComponentMap[selectedTool.id] || <div>Tool not found</div>;
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile drawer + Desktop sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-50 lg:z-0 lg:relative transition-all duration-300 ${
          sidebarOpen ? 'w-64 sm:w-72' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        <Sidebar
          selectedTool={selectedTool}
          onSelectTool={(tool) => {
            setSelectedTool(tool);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <Header
          title={selectedTool?.title || 'Cutverse AI - All in One AI Tools'}
          showBack={!!selectedTool}
          onBack={() => setSelectedTool(null)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToolSelect={setSelectedTool}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {selectedTool ? (
            // Tool Component View
            <div className="h-full overflow-y-auto">
              <div className="w-full h-full">{renderToolComponent()}</div>
            </div>
          ) : (
            // Grid View
            <div className="h-full overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto pb-6">
                  {filteredTools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelect={setSelectedTool}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                      <X className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      No tools found
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base">
                      Try searching with different keywords
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
