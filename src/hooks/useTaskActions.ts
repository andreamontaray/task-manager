import type { Task } from "../App";

export function useTaskActions(
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>
) {
  function toggleStar(taskId: number) {
    if (!setTasks) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
      )
    );
  }

  return { toggleStar };
}
