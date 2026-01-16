import {
  ListTodo,
  ChartColumnBig,
  CircleCheck,
  Flame,
  ClipboardList,
  Star,
  Clock,
  Moon,
  FileDown,
  CircleUser,
  Sun,
} from "lucide-react";
import { calculateDaysUntil } from "../utils/calculateDaysUntilDue";
import { useState, useEffect, type JSX } from "react";
import type { Task, View } from "../App";
import clsx from "clsx";

interface TaskSidebarProps {
  tasks: Task[];
  doneTasks: JSX.Element[];
  isMobileMenuOpen: boolean;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

function TaskSidebar({
  tasks,
  doneTasks,
  isMobileMenuOpen,
  setView,
}: TaskSidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isDarkMode") || "false")
  );

  const dueTodayTasks = tasks.filter(
    (task) => calculateDaysUntil(task.dueDate) === 0
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  function handleViewChange(event: React.ChangeEvent<HTMLInputElement>) {
    setView(event.currentTarget.value as View);
  }

  function exportToCSV(tasks: Task[]) {
    if (tasks.length === 0) {
      alert("No tasks to export");
      return;
    }

    const [task] = tasks;
    const header = Object.keys(task);

    const rows = tasks.map((task) => {
      const rows = Object.values(task).join(",");
      return rows;
    });

    const data = [header, rows.join("\n")].join("\n");

    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.csv";
    a.click();
  }

  function renderThemeToggleLabel() {
    if (isDarkMode)
      return (
        <>
          <Sun size={20} /> Light Mode
        </>
      );
    else
      return (
        <>
          <Moon size={20} /> Dark Mode
        </>
      );
  }

  return (
    <aside className={clsx("sidebar", !isMobileMenuOpen ? "hidden" : "")}>
      <h1>
        <ListTodo /> TaskFlow
      </h1>

      <div className='sidebar-content'>
        <div>
          <div className='sidebar-stats'>
            <h3>STATS</h3>
            <ul>
              <li>
                <ChartColumnBig size={20} />
                <span>
                  <strong>{tasks.length}</strong> Total Tasks
                </span>
              </li>
              <li>
                <CircleCheck size={20} />
                <span>
                  <strong>{doneTasks.length}</strong> Completed
                </span>
              </li>
              <li>
                <Flame size={20} />
                <span>
                  <strong>{dueTodayTasks.length}</strong> Due Today
                </span>
              </li>
            </ul>
          </div>

          <div className='sidebar-views'>
            <h3>VIEWS</h3>
            <div>
              <label>
                <ClipboardList size={20} />
                All Tasks
                <input
                  type='radio'
                  name='view'
                  value='all-tasks'
                  defaultChecked
                  onChange={handleViewChange}
                />
              </label>
              <label>
                <Star size={20} />
                Important
                <input
                  type='radio'
                  name='view'
                  value='important'
                  onChange={handleViewChange}
                />
              </label>
              <label>
                <Clock size={20} />
                This Week
                <input
                  type='radio'
                  name='view'
                  value='this-week'
                  onChange={handleViewChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className='sidebar-actions'>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {renderThemeToggleLabel()}
            </button>
            <button onClick={() => exportToCSV(tasks)}>
              <FileDown size={20} /> Download CSV
            </button>
          </div>
          <div className='sidebar-user'>
            <CircleUser size={20} /> User Name
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TaskSidebar;
