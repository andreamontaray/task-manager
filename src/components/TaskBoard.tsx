import TaskColumn from "./TaskColumn";
import { Circle, Loader, CheckCircle } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Task, TaskStatus, FilteredTasks } from "../App";
import TaskCard from "./TaskCard";
import clsx from "clsx";

interface TaskBoardProps {
  tasks: Task[];
  filteredTasks: FilteredTasks;
  isModalOpen: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  openModal: () => void;
}

function TaskBoard({
  tasks,
  filteredTasks,
  isModalOpen,
  setTasks,
  openModal,
}: TaskBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { todoTasks, inProgressTasks, doneTasks } = filteredTasks;

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = tasks.find((task) => task.id === active.id);

    if (!task) return;

    setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id as TaskStatus;
    const draggedTask = tasks.find((task) => task.id === active.id);

    if (!draggedTask || draggedTask.status === newStatus) return;

    setTasks((prevTasks) => {
      const withoutDraggedTask = prevTasks.filter(
        (task) => task.id !== active.id
      );

      return [...withoutDraggedTask, { ...draggedTask, status: newStatus }];
    });
    setActiveTask(null);
  }

  return (
    <main className={clsx("board", isModalOpen ? "h-screen" : "")}>
      <div className='board-header'>
        <h2>Personal Task Board</h2>
        <button onClick={openModal} className='btn btn-primary'>
          + Add Task
        </button>
      </div>

      <div className='board-columns'>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <TaskColumn
            header='To Do'
            status='to-do'
            icon={Circle}
            tasks={todoTasks}
          />
          <TaskColumn
            header='In Progress'
            status='in-progress'
            icon={Loader}
            tasks={inProgressTasks}
          />
          <TaskColumn
            header='Done'
            status='done'
            icon={CheckCircle}
            tasks={doneTasks}
          />

          <DragOverlay wrapperElement='ul'>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
}

export default TaskBoard;
