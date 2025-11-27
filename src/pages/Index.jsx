import { TaskProvider } from '@/contexts/TaskContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterButtons } from '@/components/FilterButtons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CheckSquare2, Sparkles, GripVertical, CheckCircle2, Trash2 } from 'lucide-react';

const Index = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300 relative">
          {/* Theme Toggle - Fixed at top right corner */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>

          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full max-w-2xl mx-auto px-4 py-4 md:py-6 relative z-10 flex flex-col items-center">
            <header className="flex flex-col items-center justify-center mb-4 md:mb-6 animate-fade-in text-center">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-lg blur-md opacity-50 animate-pulse"></div>
                <div className="relative p-2.5 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/90 shadow-lg shadow-primary/30">
                  <CheckSquare2 className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                TaskFlow Manager
              </h1>
            </header>

            <main className="space-y-4 md:space-y-5 animate-scale-in w-full">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md border border-border/50 p-4 md:p-5 transition-all hover:shadow-lg hover:border-primary/20">
                <TaskInput />
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-center">
                  <FilterButtons />
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-md border border-border/50 p-4 md:p-5 transition-all hover:shadow-lg hover:border-primary/20">
                <TaskList />
              </div>
            </main>

            <footer className="mt-4 md:mt-5 text-center animate-fade-in w-full">
              <p className="text-xs text-muted-foreground/70 flex items-center justify-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-1.5">
                  <GripVertical className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Drag to reorder</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Click to complete</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hover to delete</span>
                </span>
              </p>
            </footer>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default Index;
