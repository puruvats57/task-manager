import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { CheckSquare2, Inbox, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TaskList = React.memo(() => {
  const { filteredTasks, reorderTasks, filter } = useTaskContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    // Only allow reordering in "all" filter mode
    if (filter !== 'all') return;
    
    reorderTasks(result.source.index, result.destination.index);
  };

  if (filteredTasks.length === 0) {
    const EmptyIcon = filter === 'all' ? Inbox : filter === 'completed' ? CheckCircle2 : Clock;
    const emptyConfig = {
      all: {
        icon: Inbox,
        title: "No tasks yet",
        description: "Start organizing your day by adding your first task above!",
        iconColor: "text-primary/40"
      },
      completed: {
        icon: CheckCircle2,
        title: "No completed tasks",
        description: "Complete some tasks to see them here.",
        iconColor: "text-success/40"
      },
      pending: {
        icon: Clock,
        title: "All caught up!",
        description: "No pending tasks. Great job!",
        iconColor: "text-accent/40"
      }
    };

    const config = emptyConfig[filter];
    const Icon = config.icon;

    return (
      <div className="text-center py-8 md:py-10 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-muted/30 border border-dashed border-border/50 mb-4">
          <Icon className={cn("w-8 h-8 md:w-10 md:h-10", config.iconColor)} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          {config.title}
        </h3>
        <p className="text-muted-foreground/80 text-sm max-w-xs mx-auto">
          {config.description}
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" isDropDisabled={filter !== 'all'}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {filteredTasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
                isDragDisabled={filter !== 'all'}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="animate-fade-in"
                  >
                    <TaskItem task={task} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

TaskList.displayName = 'TaskList';
