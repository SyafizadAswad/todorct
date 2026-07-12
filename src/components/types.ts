// types.ts
export type Category = "Todo" | "In Progress" | "Done";

export interface TaskItem {
  id: number;
  title: string;
  category: Category;
}
