import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTaskContext } from '@/contexts/TaskContext';
import { toast } from '@/hooks/use-toast';

export const TaskInput = React.memo(() => {
  const [input, setInput] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      
      if (!trimmedInput) {
        toast({
          variant: "destructive",
          title: "Empty Task",
          description: "Please enter a task description.",
        });
        return;
      }

      if (trimmedInput.length > 200) {
        toast({
          variant: "destructive",
          title: "Task Too Long",
          description: "Task description must be less than 200 characters.",
        });
        return;
      }

      addTask(trimmedInput);
      setInput('');
      toast({
        title: "Task Added",
        description: "Your task has been added successfully.",
      });
    },
    [input, addTask]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center w-full">
      <div className="relative flex-1 min-w-0">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full h-11 md:h-12 pl-4 pr-20 bg-background/50 backdrop-blur-sm border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg transition-all duration-200 text-sm placeholder:text-muted-foreground/60 hover:border-primary/50"
          maxLength={200}
        />
        {input.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/60 font-medium bg-background/90 px-2 py-1 rounded shadow-sm">
            {input.length}/200
          </div>
        )}
      </div>
      <Button 
        type="submit" 
        size="default"
        className="h-11 w-11 md:h-12 md:w-12 rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center p-0 flex-shrink-0"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
      </Button>
    </form>
  );
});

TaskInput.displayName = 'TaskInput';
