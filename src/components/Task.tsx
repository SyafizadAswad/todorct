// Task.tsx
import React, { useState } from "react";
import type { TaskItem, Category } from "./types";

interface TaskProps {
  task: TaskItem;
  onUpdate: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDelete: (id: number) => void;
}

export default function Task({ task, onUpdate, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title);

  const handleSave = () => {
    onUpdate(task.id, { title: editTitle });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{task.title}</h4>
          <select
            value={task.category}
            onChange={(e) =>
              onUpdate(task.id, { category: e.target.value as Category })
            }
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)} style={{ color: "red" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
