export type TaskPriority = 1 | 2 | 3;

export type TaskCategory = "Робота" | "Навчання" | "Особисте" | "Інше";

export type TaskView = "dashboard" | "tasks" | "calendar";

export interface Task {
  id: number;
  name: string;
  category: TaskCategory;
  deadline: string;
  priority: TaskPriority;
  completed: boolean;
}

export interface NewTask {
  name: string;
  category: TaskCategory;
  deadline: string;
  priority: TaskPriority;
}
