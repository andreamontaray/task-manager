import { useEffect, useState, useMemo, type JSX } from "react";
import DraggableTaskCard from "./components/DraggableTaskCard";
import TaskModal from "./components/TaskModal";
import TaskSidebar from "./components/TaskSidebar";
import TaskBoard from "./components/TaskBoard";
import clsx from "clsx";
import TaskNavbar from "./components/TaskNavbar";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  isStarred: boolean;
};
export type TaskStatus = "to-do" | "in-progress" | "done";
export type Priority = "low" | "medium" | "high";
export type View = "all-tasks" | "important" | "this-week";
export type FilteredTasks = {
  todoTasks: JSX.Element[];
  inProgressTasks: JSX.Element[];
  doneTasks: JSX.Element[];
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Welcome to TaskFlow 🎉",
    description: "Explore your dashboard and try creating your first task.",
    status: "done",
    priority: "medium",
    dueDate: "2026-02-20",
    isStarred: true,
  },
  {
    id: 2,
    title: "Create your first task",
    description: "Click the 'Add Task' button and enter a title and description.",
    status: "to-do",
    priority: "high",
    dueDate: "2026-02-25",
    isStarred: true,
  },
  {
    id: 3,
    title: "Organize tasks by priority",
    description: "Set priority levels to focus on what matters most.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-02-27",
    isStarred: false,
  },
  {
    id: 4,
    title: "Mark tasks as completed",
    description: "Update the status to 'done' once you've finished a task.",
    status: "to-do",
    priority: "low",
    dueDate: "2026-03-01",
    isStarred: false,
  },
  {
    id: 5,
    title: "Star important tasks",
    description: "Use the star feature to quickly find important tasks later.",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-02-23",
    isStarred: true,
  },
  {
    id: 6,
    title: "Review your progress",
    description: "Check completed tasks to see how productive you've been.",
    status: "to-do",
    priority: "medium",
    dueDate: "2026-03-05",
    isStarred: false,
  },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
   {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : initialTasks;
}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>("all-tasks");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const todoTasks = useMemo(() => getFilteredTasks("to-do"), [tasks, view]);
  const inProgressTasks = useMemo(
    () => getFilteredTasks("in-progress"),
    [tasks, view]
  );
  const doneTasks = useMemo(() => getFilteredTasks("done"), [tasks, view]);

  const filteredTasks: FilteredTasks = {
    todoTasks,
    inProgressTasks,
    doneTasks,
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function getFilteredTasks(status: TaskStatus) {
    if (view === "all-tasks") {
      return tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            setTasks={setTasks}
            onEdit={onEdit}
          />
        ));
    } else if (view === "important") {
      return tasks
        .filter((task) => task.isStarred && task.status === status)
        .map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            setTasks={setTasks}
            onEdit={onEdit}
          />
        ));
    } else {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return tasks
        .filter((task) => {
          const dueDate = new Date(task.dueDate);

          return (
            dueDate >= startOfWeek &&
            dueDate <= endOfWeek &&
            task.status === status
          );
        })
        .map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            setTasks={setTasks}
            onEdit={onEdit}
          />
        ));
    }
  }

  function onEdit(task: Task) {
    openModal();

    setIsEditing(true);
    setEditingTask(task);
  }

  function resetTaskState() {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingTask(null);
  }

  function openModal() {
    setIsModalOpen(true);
    setModalKey((prev) => prev + 1);
  }

  return (
    <>
      <div
        className={clsx(
          "relative lg:flex lg:h-screen",
          isModalOpen ? "h-screen" : ""
        )}
      >
        <TaskSidebar
          tasks={tasks}
          doneTasks={doneTasks}
          setView={setView}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <TaskNavbar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <TaskBoard
          tasks={tasks}
          filteredTasks={filteredTasks}
          setTasks={setTasks}
          openModal={openModal}
          isModalOpen={isModalOpen}
        />
      </div>

      <TaskModal
        isModalOpen={isModalOpen}
        isEditing={isEditing}
        editingTask={editingTask}
        modalKey={modalKey}
        setTasks={setTasks}
        resetTaskState={resetTaskState}
      />
    </>
  );
}

export default App;
