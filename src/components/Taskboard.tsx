// Taskboard.tsx
import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import type { TaskItem, Category } from "./types";

export default function Taskboard() {
  // Explicitly typing our state array as TaskItem[]
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: "Learn React State", category: "Todo" },
    { id: 2, title: "Build Todo App", category: "In Progress" },
    { id: 3, title: "Master lifting state up", category: "Done" },
  ]);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<Category>("Todo");

  // C - CREATE
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
    };

    setTasks([...tasks, newTask]);
    setNewTitle("");
  };

  // U - UPDATE
  const handleUpdateTask = (id: number, updatedFields: Partial<TaskItem>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
  };

  // D - DELETE
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const categories: Category[] = ["Todo", "In Progress", "Done"];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Team Taskboard (TypeScript)</h2>

      {/* ADD TASK FORM */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="New task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as Category)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>

      {/* COLUMNS CONTAINER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {categories.map((category) => {
          const filteredTasks = tasks.filter((t) => t.category === category);

          return (
            <TaskColumn
              key={category}
              title={category}
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}
