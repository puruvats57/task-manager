import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { CheckSquare2, Inbox, CheckCircle2, Clock } from 'lucide-react';

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
      <div className="text-center py-12 md:py-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-xl bg-muted/30 border-2 border-dashed border-border/50 mb-6">
          <Icon className={`w-14 h-14 md:w-16 md:h-16 ${config.iconColor}`} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          {config.title}
        </h3>
        <p className="text-muted-foreground/80 text-lg max-w-xs mx-auto">
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
            className="space-y-4"
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
