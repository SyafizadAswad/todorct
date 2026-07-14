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
  subtask: Subtask[];
  dueDate?: string; //  Add due date (stored as "YYYY-MM-DD")
}
