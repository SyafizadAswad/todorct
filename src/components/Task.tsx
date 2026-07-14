// Task.tsx
import React, { useState } from "react";
import type { TaskItem, Category } from "./types";

interface TaskProps {
  task: TaskItem;
  onUpdate: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDelete: (id: number) => void;
  // 👇 New Subtask CRUD Props passed from the parent
  onAddSubtask: (taskId: number, title: string) => void;
  onUpdateSubtask: (taskId: number, subtaskId: number, title: string) => void;
  onDeleteSubtask: (taskId: number, subtaskId: number) => void;
}

export default function Task({
  task,
  onUpdate,
  onDelete,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title);

  // Local state for adding a new subtask
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<string>("");

  // Local states for tracking which subtask is being edited
  const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
  const [editSubtaskTitle, setEditSubtaskTitle] = useState<string>("");

  const handleSave = () => {
    onUpdate(task.id, { title: editTitle });
    setIsEditing(false);
  };

  const handleAddSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle);
    setNewSubtaskTitle("");
  };

  const handleSaveSubtaskEdit = (subtaskId: number) => {
    if (!editSubtaskTitle.trim()) return;
    onUpdateSubtask(task.id, subtaskId, editSubtaskTitle);
    setEditingSubtaskId(null);
  };

  return (
    <div
      style={{
        padding: "15px",
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
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) =>
              onUpdate(task.id, { dueDate: e.target.value || undefined })
            }
            style={{
              fontSize: "11px",
              padding: "2px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)} style={{ color: "red" }}>
            Delete
          </button>
        </div>
      )}

      {/* --- SUBTASKS SECTION --- */}
      <div
        style={{
          marginTop: "15px",
          borderTop: "1px dashed #eee",
          paddingTop: "10px",
        }}
      >
        <h5>Subtasks ({task.subtask.length})</h5>

        {/* Subtask List */}
        <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
          {task.subtask.map((sub) => (
            <li key={sub.id} style={{ margin: "5px 0" }}>
              {editingSubtaskId === sub.id ? (
                <div>
                  <input
                    type="text"
                    value={editSubtaskTitle}
                    onChange={(e) => setEditSubtaskTitle(e.target.value)}
                  />
                  <button onClick={() => handleSaveSubtaskEdit(sub.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingSubtaskId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{sub.title}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingSubtaskId(sub.id);
                        setEditSubtaskTitle(sub.title);
                      }}
                      style={{ fontSize: "11px", padding: "2px 5px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteSubtask(task.id, sub.id)}
                      style={{
                        fontSize: "11px",
                        color: "red",
                        padding: "2px 5px",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Add Subtask Form */}
        <form
          onSubmit={handleAddSubtaskSubmit}
          style={{ marginTop: "10px", display: "flex" }}
        >
          <input
            type="text"
            placeholder="Add subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            style={{ flex: 1, fontSize: "12px", padding: "4px" }}
          />
          <button type="submit" style={{ fontSize: "12px" }}>
            +
          </button>
        </form>
      </div>
    </div>
  );
}
