import TaskCard, { type TaskCardProps } from "./TaskCard";
import { useDraggable } from "@dnd-kit/core";

function DraggableTaskCard(props: TaskCardProps) {
  const { isDragging, listeners, attributes, setNodeRef } = useDraggable({
    id: props.task.id,
  });

  return (
    <TaskCard
      {...props}
      draggable={{ isDragging, listeners, attributes, setNodeRef }}
    />
  );
}

export default DraggableTaskCard;
