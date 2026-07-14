// Taskboard.tsx
import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import type { TaskItem, Category } from "./types";

interface TaskboardProps {
  showAddInput: boolean;
  onTaskCreated: () => void;
}

export default function Taskboard({
  showAddInput,
  onTaskCreated,
}: TaskboardProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: "Learn React State",
      category: "Todo",
      subtask: [{ id: 101, title: "Watch props video" }],
    },
    { id: 2, title: "Build Todo App", category: "In Progress", subtask: [] },
    { id: 3, title: "Master lifting state up", category: "Done", subtask: [] },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddTask = (
    title: string,
    category: Category,
    dueDate?: string,
  ) => {
    const newTask: TaskItem = {
      id: Date.now(),
      title: title,
      category: category,
      subtask: [], // Initializes as an empty array
      dueDate,
    };
    setTasks([...tasks, newTask]);
    onTaskCreated();
  };

  // 1. FILTER tasks by search query
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. SORT tasks by date (Derived State: Runs automatically on re-render!)
  const sortedAndSearchedTasks = [...searchedTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); // Closest date first
    }
    if (a.dueDate) return -1; // Keep tasks with dates on top
    if (b.dueDate) return 1;
    return 0; // Both have no date
  });

  const handleUpdateTask = (id: number, updatedFields: Partial<TaskItem>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ➕ SUBTASK - CREATE
  const handleAddSubtask = (taskId: number, title: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newSub = { id: Date.now(), title };
          return { ...task, subtask: [...task.subtask, newSub] };
        }
        return task;
      }),
    );
  };

  // 📝 SUBTASK - UPDATE
  const handleUpdateSubtask = (
    taskId: number,
    subtaskId: number,
    newTitle: string,
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtask.map((sub) =>
            sub.id === subtaskId ? { ...sub, title: newTitle } : sub,
          );
          return { ...task, subtask: updatedSubtasks };
        }
        return task;
      }),
    );
  };

  // 🗑️ SUBTASK - DELETE
  const handleDeleteSubtask = (taskId: number, subtaskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const filteredSubtasks = task.subtask.filter(
            (sub) => sub.id !== subtaskId,
          );
          return { ...task, subtask: filteredSubtasks };
        }
        return task;
      }),
    );
  };

  const categories: Category[] = ["Todo", "In Progress", "Done"];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Search Input Markup */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {categories.map((category) => {
        const filteredTasks = sortedAndSearchedTasks.filter(
          (t) => t.category === category,
        );

        return (
          <TaskColumn
            key={category}
            title={category}
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            onAddSubtask={handleAddSubtask}
            onUpdateSubtask={handleUpdateSubtask}
            onDeleteSubtask={handleDeleteSubtask}
            showAddInput={showAddInput}
          />
        );
      })}
    </div>
  );
}
