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
    <form onSubmit={handleSubmit} className="flex gap-5 items-center w-full mb-20">
      <div className="relative flex-1 min-w-0">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full h-20 md:h-24 pl-6 pr-24 bg-background/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 text-xl placeholder:text-muted-foreground/60 shadow-md hover:border-primary/50"
          maxLength={200}
        />
        {input.length > 0 && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-base text-muted-foreground/60 font-semibold bg-background/90 px-4 py-2 rounded-lg shadow-sm">
            {input.length}/200
          </div>
        )}
      </div>
      <Button 
        type="submit" 
        size="default"
        className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 font-bold hover:scale-105 active:scale-95 flex items-center justify-center p-0"
      >
        <div className="rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm p-3 flex items-center justify-center shadow-inner ring-1 ring-white/20">
          <Plus className="w-12 h-12" strokeWidth={3.5} />
        </div>
      </Button>
    </form>
  );
});

TaskInput.displayName = 'TaskInput';
