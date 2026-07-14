// Navbar.tsx
import React from "react";

interface NavbarProps {
  onAddTaskClick: () => void;
}

export default function Navbar({ onAddTaskClick }: NavbarProps) {
  return (
    <nav
      style={{
        padding: "15px 20px",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>📋 Workspace Board</h1>
      <button
        onClick={onAddTaskClick}
        style={{
          padding: "8px 16px",
          backgroundColor: "#61dafb",
          color: "#282c34",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        + Add Task
      </button>
    </nav>
  );
}
