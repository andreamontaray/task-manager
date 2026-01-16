import clsx from "clsx";
import { X } from "lucide-react";
import type { Task, TaskStatus, Priority } from "../App";
import { useEffect } from "react";

interface TaskModalProps {
  isModalOpen: boolean;
  isEditing: boolean;
  editingTask: Task | null;
  modalKey: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  resetTaskState: () => void;
}

function TaskModal({
  isModalOpen,
  isEditing,
  editingTask,
  modalKey,
  setTasks,
  resetTaskState,
}: TaskModalProps) {
  useEffect(() => {
    if (isModalOpen) {
      const firstInput = document.querySelector('input[name="title"]');
      (firstInput as HTMLElement)?.focus();
    }
  }, [isModalOpen]);

  function addTask(formData: FormData) {
    if (isEditing && editingTask?.id) handleDeleteTask(editingTask.id);

    const newTask: Task = {
      id: Date.now(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as TaskStatus,
      priority: formData.get("priority") as Priority,
      dueDate: formData.get("dueDate") as string,
      isStarred: editingTask?.isStarred || false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    resetTaskState();
  }

  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    resetTaskState();
  }

  return (
    <div
      className={clsx("modal", isModalOpen ? "flex" : "hidden")}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className='modal-container'>
        <div className='modal-header'>
          <h4 id='modal-title'>{isEditing ? "Edit" : "Add"} Task</h4>
          <button onClick={resetTaskState}>
            <X size={20} className='exit-btn' />
          </button>
        </div>

        <form action={addTask} key={modalKey}>
          <label>
            Title
            <input
              type='text'
              name='title'
              placeholder='e.g. Finish project report'
              defaultValue={editingTask?.title || ""}
              required
            />
          </label>
          <label>
            Description (optional)
            <textarea
              name='description'
              placeholder='Add context, links, or notes...'
              defaultValue={editingTask?.description || ""}
            ></textarea>
          </label>
          <div className='grid grid-cols-2 gap-4'>
            <label>
              Status
              <select
                name='status'
                defaultValue={editingTask?.status || "to-do"}
              >
                <option value='to-do'>To Do</option>
                <option value='in-progress'>In Progress</option>
                <option value='done'>Done</option>
              </select>
            </label>
            <label>
              Priority
              <select
                name='priority'
                defaultValue={editingTask?.priority || "medium"}
              >
                <option value='low'>🟩 Low</option>
                <option value='medium'>🟨 Medium</option>
                <option value='high'>🟥 High</option>
              </select>
            </label>
            <label>
              Due date{" "}
              <input
                type='date'
                name='dueDate'
                defaultValue={editingTask?.dueDate || ""}
                required
              />
            </label>
          </div>

          <div className='form-actions'>
            {isEditing && editingTask?.id && (
              <button
                type='button'
                className='btn btn-delete'
                aria-label='Delete this task'
                onClick={() => handleDeleteTask(editingTask.id)}
              >
                Delete Task
              </button>
            )}

            <div className={!isEditing ? "w-full" : ""}>
              <button
                onClick={resetTaskState}
                type='button'
                className='btn btn-secondary'
              >
                Cancel
              </button>
              <button type='submit' className={"btn btn-primary"}>
                {isEditing ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
