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

function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
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
