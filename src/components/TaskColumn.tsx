// TaskColumn.tsx
import React from "react";
import Task from "./Task";
import type { TaskItem, Category } from "./types";

interface TaskColumnProps {
  title: Category;
  tasks: TaskItem[];
  onUpdateTask: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: (title: string, category: Category) => void;
  // 👇 Accepting the subtask handlers
  onAddSubtask: (taskId: number, title: string) => void;
  onUpdateSubtask: (taskId: number, subtaskId: number, title: string) => void;
  onDeleteSubtask: (taskId: number, subtaskId: number) => void;
}

export default function TaskColumn({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
  onAddTask,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
}: TaskColumnProps) {
  // ... (keep the same local handleSubmit logic from before)
  const [newTitle, setNewTitle] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle, title);
    setNewTitle("");
  };

  return (
    <div
      style={{
        flex: 1,
        margin: "0 10px",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        minWidth: "250px",
      }}
    >
      <h3>
        {title} ({tasks.length})
      </h3>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            // 👇 Passing down to the card
            onAddSubtask={onAddSubtask}
            onUpdateSubtask={onUpdateSubtask}
            onDeleteSubtask={onDeleteSubtask}
          />
        ))}
      </div>

      {title === "Todo" && (
        <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="+ Add a task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              boxSizing: "border-box",
              marginBottom: "5px",
            }}
          />
          <button type="submit" style={{ width: "100%" }}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}
