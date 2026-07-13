// TaskColumn.tsx
import React, { useState } from 'react';
import Task from './Task';
import type { TaskItem, Category } from './types';

interface TaskColumnProps {
  title: Category;
  tasks: TaskItem[];
  onUpdateTask: (id: number, updatedFields: Partial<TaskItem>) => void;
  onDeleteTask: (id: number) => void;
  onAddTask: (title: string, category: Category) => void; // 👈 New prop to pass data up
}

export default function TaskColumn({ title, tasks, onUpdateTask, onDeleteTask, onAddTask }: TaskColumnProps) {
  const [newTitle, setNewTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask(newTitle, title); // Sends the text and this column's category to the parent
    setNewTitle(''); // Clears the input
  };

  return (
    <div style={{ flex: 1, margin: '0 10px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '8px', minWidth: '200px' }}>
      <h3>{title} ({tasks.length})</h3>
      
      <div>
        {tasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            onUpdate={onUpdateTask} 
            onDelete={onDeleteTask} 
          />
        ))}
      </div>

      {/* 
        CONDITIONAL RENDER: 
        Only show the input form if this column is the 'Todo' column.
        If you want it on ALL columns later, just remove: `title === 'Todo' &&`
      */}
      {title === 'Todo' && (
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <input 
            type="text" 
            placeholder="+ Add a task..." 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box', marginBottom: '5px' }}
          />
          <button type="submit" style={{ width: '100%' }}>Add</button>
        </form>
      )}
    </div>
  );
}
