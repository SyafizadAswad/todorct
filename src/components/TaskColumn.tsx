// TaskColumn.tsx
import React, { useState, useRef, useEffect } from "react";
import Task from "./Task";
import type { TaskItem, Category } from "./types";

interface TaskColumnProps {
  title: Category;
  tasks: TaskItem[];
  onUpdateTask: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: (title: string, category: Category, dueDate?: string) => void;
  onAddSubtask: (taskId: number, title: string) => void;
  onUpdateSubtask: (taskId: number, subtaskId: number, title: string) => void;
  onDeleteSubtask: (taskId: number, subtaskId: number) => void;
  showAddInput: boolean;
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
  showAddInput,
}: TaskColumnProps) {
  const [newTitle, setNewTitle] = React.useState<string>("");
  const [newDate, setNewDate] = useState<string>("");

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

      {title === "Todo" && showAddInput && (
        <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Add new task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              boxSizing: "border-box",
              marginBottom: "5px",
            }}
            autoFocus // Automatically focuses when it appears on screen!
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
              fontSize: "12px",
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
