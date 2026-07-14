// App.tsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Taskboard from "./components/Taskboard";

function App() {
  // Simple true/false state to show or hide the form
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div>
      {/* 1. Navbar toggles the state to true */}
      <Navbar onAddTaskClick={() => setIsAdding(true)} />

      {/* 2. Pass the visibility boolean down to the board */}
      <Taskboard
        showAddInput={isAdding}
        onTaskCreated={() => setIsAdding(false)}
      />
    </div>
  );
}

export default App;
