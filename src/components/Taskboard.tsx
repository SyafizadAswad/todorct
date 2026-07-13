// Taskboard.tsx
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import type { TaskItem, Category } from './types';

export default function Taskboard() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: 'Learn React State', category: 'Todo' },
    { id: 2, title: 'Build Todo App', category: 'In Progress' },
    { id: 3, title: 'Master lifting state up', category: 'Done' }
  ]);

  // C - CREATE (Now receives arguments directly from the child Column)
  const handleAddTask = (title: string, category: Category) => {
    const newTask: TaskItem = {
      id: Date.now(),
      title: title,
      category: category // Automatically takes on the column's category
    };

    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (id: number, updatedFields: Partial<TaskItem>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const categories: Category[] = ['Todo', 'In Progress', 'Done'];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Team Taskboard (TypeScript)</h2>
      
      {/* COLUMNS CONTAINER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
        {categories.map(category => {
          const filteredTasks = tasks.filter(t => t.category === category);
          
          return (
            <TaskColumn 
              key={category}
              title={category}
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onAddTask={handleAddTask} // 👈 Passing the callback function down
            />
          );
        })}
      </div>
    </div>
  );
}
