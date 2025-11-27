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
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300 relative overflow-hidden">
          {/* Theme Toggle - Fixed at top right corner */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>

          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          </div>

          <div className="w-[50vw] max-h-[50vh] mx-auto px-4 pt-6 md:pt-8 relative z-10 overflow-y-auto flex flex-col items-center">
            <header className="flex flex-col items-center justify-center mb-6 md:mb-8 animate-fade-in text-center w-auto max-w-sm">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/90 shadow-xl shadow-primary/30">
                  <CheckSquare2 className="w-11 h-11 md:w-12 md:h-12 text-primary-foreground" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                  TaskFlow Manager
                </h1>
                
              </div>
            </header>

            <main className="space-y-6 md:space-y-8 animate-scale-in w-auto max-w-sm">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 p-6 md:p-8 transition-all hover:shadow-xl hover:border-primary/20">
                <TaskInput />
                <div className="mt-20 pt-8 border-t border-border/50 flex justify-center">
                  <FilterButtons />
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 p-6 md:p-8 transition-all hover:shadow-xl hover:border-primary/20">
                <TaskList />
              </div>
            </main>

            <footer className="mt-6 md:mt-8 text-center animate-fade-in w-auto max-w-sm">
              <p className="text-base text-muted-foreground/80 flex items-center justify-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-2">
                  <GripVertical className="w-6 h-6" />
                  <span className="hidden sm:inline">Drag to reorder</span>
                </span>
                <span className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="hidden sm:inline">Click to complete</span>
                </span>
                <span className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center gap-2">
                  <Trash2 className="w-6 h-6" />
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
