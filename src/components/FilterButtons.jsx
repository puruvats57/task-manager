import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

const filters = [
  { value: 'all', label: 'All', icon: ListTodo },
  { value: 'pending', label: 'Pending', icon: Clock },
  { value: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export const FilterButtons = React.memo(() => {
  const { filter, setFilter, tasks } = useTaskContext();

  const getCounts = useCallback(() => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    return {
      all: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  const counts = getCounts();

  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {filters.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={filter === value ? 'default' : 'outline'}
          onClick={() => setFilter(value)}
          className={cn(
            "h-14 px-8 rounded-lg font-semibold transition-all duration-200 relative overflow-hidden text-lg",
            "hover:scale-105 active:scale-95",
            filter === value 
              ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 border-0" 
              : "bg-background/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 hover:bg-background/80"
          )}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Icon className={cn(
              "w-6 h-6 transition-all",
              filter === value ? "text-primary-foreground" : "text-muted-foreground"
            )} strokeWidth={2.5} />
            <span>{label}</span>
            <span className={cn(
              "px-4 py-1.5 rounded-full text-base font-semibold transition-all min-w-[32px] text-center",
              filter === value
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {counts[value]}
            </span>
          </span>
          {filter === value && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
        </Button>
      ))}
    </div>
  );
});

FilterButtons.displayName = 'FilterButtons';
