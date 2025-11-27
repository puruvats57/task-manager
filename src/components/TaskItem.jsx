import React, { useCallback } from 'react';
import { Check, Trash2, GripVertical, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';

export const TaskItem = React.memo(({ task, isDragging }) => {
  const { toggleTask, deleteTask } = useTaskContext();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <div
      className={cn(
        "group flex items-center gap-5 p-5 rounded-lg bg-background/50 backdrop-blur-sm border-2 border-border/50 transition-all duration-200",
        "hover:shadow-md hover:shadow-primary/5 hover:border-primary/30 hover:bg-background/80",
        "hover:-translate-y-0.5",
        isDragging && "opacity-60 rotate-1 scale-[1.02] shadow-lg shadow-primary/20 border-primary/50 z-50",
        task.completed && "bg-task-completed/50 border-task-completed"
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-primary transition-all duration-200 p-2 rounded hover:bg-muted/50 flex-shrink-0"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-6 h-6" strokeWidth={2} />
      </button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={cn(
          "p-0 h-10 w-10 rounded-md border-2 transition-all duration-200 flex-shrink-0 flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          task.completed
            ? "bg-gradient-to-br from-success to-success/90 border-success text-success-foreground shadow-sm shadow-success/20"
            : "border-muted-foreground/40 hover:border-primary hover:bg-primary/5"
        )}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <Check className="w-6 h-6" strokeWidth={3} />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground/40" strokeWidth={2} />
        )}
      </Button>

      <span
        className={cn(
          "flex-1 text-xl transition-all duration-200 font-semibold",
          task.completed 
            ? "line-through text-task-completed-text/80 decoration-2 decoration-task-completed-text/40" 
            : "text-foreground"
        )}
      >
        {task.text}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive-foreground hover:bg-destructive/10 transition-all duration-200 rounded p-2.5 hover:scale-110 active:scale-95 flex-shrink-0"
        aria-label="Delete task"
      >
        <Trash2 className="w-6 h-6" strokeWidth={2} />
      </Button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
