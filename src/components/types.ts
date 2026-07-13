// types.ts
export type Category = "Todo" | "In Progress" | "Done";

export interface Subtask {
  id: number;
  title: string;
}

export interface TaskItem {
  id: number;
  title: string;
  category: Category;
  subtask: Subtask[]; // 👈 Array of subtasks
}
