import clsx from "clsx";
import { Clock, Star, GripVertical } from "lucide-react";
import { calculateDaysUntil } from "../utils/calculateDaysUntilDue";
import type { Task } from "../App";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { DraggableAttributes } from "@dnd-kit/core";
import { useTaskActions } from "../hooks/useTaskActions";

export interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  draggable?: DraggableProps;
}

interface DraggableProps {
  isDragging: boolean;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  setNodeRef: (element: HTMLElement | null) => void;
}

function TaskCard({ task, onEdit, setTasks, draggable }: TaskCardProps) {
  const { id, title, status, priority, dueDate, isStarred } = task;
  const { isDragging, listeners, attributes, setNodeRef } = draggable ?? {};
  const { toggleStar } = useTaskActions(setTasks);

  const priorityBorder = {
    low: "border-l-green-400 dark:border-l-green-500",
    medium: "border-l-yellow-500 dark:border-l-yellow-400",
    high: "border-l-red-500 dark:border-l-red-400",
  };

  function renderDueDate(dueDate: string) {
    const daysUntilDue = calculateDaysUntil(dueDate);

    const urgencyColor =
      daysUntilDue <= 0
        ? "text-red-600 dark:text-red-400"
        : daysUntilDue <= 3
        ? "text-orange-400 dark:text-orange-300"
        : "text-gray-600 dark:text-gray-300";

    const urgencyText =
      daysUntilDue === 0
        ? "Due today"
        : daysUntilDue === 1
        ? "Due tomorrow"
        : daysUntilDue > 1
        ? `Due in ${daysUntilDue} days`
        : `${Math.abs(daysUntilDue)} day${
            daysUntilDue < -1 ? "s" : ""
          } overdue`;

    return (
      <small className={clsx("task-dueDate", urgencyColor)}>
        <Clock size={12} /> {urgencyText}
      </small>
    );
  }

  function toggleTaskStar(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    toggleStar(id);
  }

  function handleTaskClick() {
    if (!onEdit) return;

    onEdit(task);
  }

  return (
    <li
      className={clsx(
        "board-task",
        priorityBorder[priority],
        isDragging && "opacity-50"
      )}
      ref={setNodeRef}
      onClick={handleTaskClick}
      role='button'
      tabIndex={0}
      aria-label={`Edit task: ${title}`}
      onKeyDown={(e) => {
        if (e.key === " ") handleTaskClick();
      }}
    >
      <div className='flex items-center gap-2'>
        <button {...listeners} {...attributes} aria-label='Drag to move task'>
          <GripVertical
            size={18}
            className={clsx(
              "drag-handle",
              draggable ? "cursor-grab" : "cursor-grabbing"
            )}
          />
        </button>
        <div>
          <h5>{title}</h5> {status !== "done" && renderDueDate(dueDate)}
        </div>
      </div>
      <button
        aria-label={isStarred ? "Unstar task" : "Star task"}
        onClick={toggleTaskStar}
      >
        <Star
          size={17}
          className={clsx("star", isStarred ? "star-active" : "star-inactive")}
        />
      </button>
    </li>
  );
}

export default TaskCard;
