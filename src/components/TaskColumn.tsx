// TaskColumn.tsx
import React from "react";
import Task from "./Task";
import type { TaskItem, Category } from "./types";

interface TaskColumnProps {
  title: Category;
  tasks: TaskItem[];
  onUpdateTask: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskColumn({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <div
      style={{
        flex: 1,
        margin: "0 10px",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        minWidth: "200px",
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
          />
        ))}
      </div>
    </div>
  );
}
