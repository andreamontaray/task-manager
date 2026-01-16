import { useDroppable } from "@dnd-kit/core";
import type { JSX } from "react";
import type { LucideIcon } from "lucide-react";
import type { TaskStatus } from "../App";

interface TaskColumnProps {
  header: string;
  status: TaskStatus;
  icon: LucideIcon;
  tasks: JSX.Element[];
}

function TaskColumn({ header, status, icon: Icon, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const emptyStateMessages = {
    "to-do": "No tasks to do...",
    "in-progress": "Not working on anything...",
    done: "No completed tasks yet...",
  };

  return (
    <div className='board-column' ref={setNodeRef}>
      <h3 className='board-column-header'>
        <Icon size={18} />
        {header}
      </h3>
      <div className='board-task-list-wrapper'>
        {tasks.length > 0 ? (
          <>
            <ul className='board-task-list'>{tasks}</ul>
            <div className='scroll-gradient'></div>
          </>
        ) : (
          <p className='empty-task-list'>{emptyStateMessages[status]}</p>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
