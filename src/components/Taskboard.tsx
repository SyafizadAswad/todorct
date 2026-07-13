// Taskboard.tsx
import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import type { TaskItem, Category } from "./types";

export default function Taskboard() {
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

  const handleAddTask = (title: string, category: Category) => {
    const newTask: TaskItem = {
      id: Date.now(),
      title: title,
      category: category,
      subtask: [], // Initializes as an empty array
    };
    setTasks([...tasks, newTask]);
  };

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
      <h2>Team Taskboard with Subtasks</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "20px",
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
              onAddTask={handleAddTask}
              // 👇 Pushing handlers down the branch
              onAddSubtask={handleAddSubtask}
              onUpdateSubtask={handleUpdateSubtask}
              onDeleteSubtask={handleDeleteSubtask}
            />
          );
        })}
      </div>
    </div>
  );
}
